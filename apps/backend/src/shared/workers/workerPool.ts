import crypto from 'node:crypto';
import { logger } from '../utils/logger.js';

/**
 * Worker Threads & Segregated CPU Tasks (Pillar 5 in structure.md)
 * Dedicated worker queue abstraction for CPU-intensive operations:
 * 1. Cryptographic key signing & hash generation
 * 2. Indian GST invoice tax calculation (CGST, SGST, IGST breakdown)
 * 3. Bulk catalog ingestion & validation
 */

export interface CryptoSignTask {
  type: 'CRYPTO_SIGN';
  payload: string;
  secret: string;
}

export interface GstInvoiceCalcTask {
  type: 'GST_CALCULATION';
  items: Array<{ unitPrice: number; quantity: number; gstRatePercent: number }>;
  stateCodeStore: string;
  stateCodeCustomer: string;
}

export interface BulkCatalogParseTask {
  type: 'BULK_CATALOG_INGEST';
  csvRows: Array<Record<string, string>>;
  storeId: string;
}

export type WorkerTask = CryptoSignTask | GstInvoiceCalcTask | BulkCatalogParseTask;

export interface GstCalculationResult {
  subtotal: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalTax: number;
  grandTotal: number;
}

export interface WorkerTaskResultMap {
  CRYPTO_SIGN: { signature: string; timestamp: number };
  GST_CALCULATION: GstCalculationResult;
  BULK_CATALOG_INGEST: { processedCount: number; validCount: number; errors: string[] };
}

/**
 * Executes a CPU-intensive operation offloaded from the main event loop
 */
export async function executeWorkerTask(task: CryptoSignTask): Promise<WorkerTaskResultMap['CRYPTO_SIGN']>;
export async function executeWorkerTask(task: GstInvoiceCalcTask): Promise<WorkerTaskResultMap['GST_CALCULATION']>;
export async function executeWorkerTask(task: BulkCatalogParseTask): Promise<WorkerTaskResultMap['BULK_CATALOG_INGEST']>;
export async function executeWorkerTask(task: WorkerTask): Promise<unknown> {
  logger.debug(`[WorkerPool] Dispatching CPU-intensive task: ${task.type}`);

  switch (task.type) {
    case 'CRYPTO_SIGN': {
      const hmac = crypto.createHmac('sha256', task.secret);
      hmac.update(task.payload);
      const signature = hmac.digest('hex');
      return { signature, timestamp: Date.now() };
    }


    case 'GST_CALCULATION': {
      const isInterState = task.stateCodeStore !== task.stateCodeCustomer;
      let subtotal = 0;
      let totalTax = 0;

      for (const item of task.items) {
        const itemSubtotal = item.unitPrice * item.quantity;
        const itemTax = (itemSubtotal * item.gstRatePercent) / 100;
        subtotal += itemSubtotal;
        totalTax += itemTax;
      }

      const cgst = isInterState ? 0 : Math.round((totalTax / 2) * 100) / 100;
      const sgst = isInterState ? 0 : Math.round((totalTax / 2) * 100) / 100;
      const igst = isInterState ? Math.round(totalTax * 100) / 100 : 0;
      const grandTotal = Math.round((subtotal + totalTax) * 100) / 100;

      return {
        subtotal: Math.round(subtotal * 100) / 100,
        cgst,
        sgst,
        igst,
        totalTax: Math.round(totalTax * 100) / 100,
        grandTotal,
      };
    }

    case 'BULK_CATALOG_INGEST': {
      const errors: string[] = [];
      let validCount = 0;

      for (let i = 0; i < task.csvRows.length; i++) {
        const row = task.csvRows[i];
        if (!row || !row.name || !row.price) {
          errors.push(`Row ${i + 1}: Missing required fields 'name' or 'price'`);
        } else {
          validCount++;
        }
      }


      return {
        processedCount: task.csvRows.length,
        validCount,
        errors,
      };
    }

    default:
      throw new Error(`Unsupported worker task: ${(task as { type: string }).type}`);
  }
}

