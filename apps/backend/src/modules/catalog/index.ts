/**
 * CATALOG MODULE — Public Facade
 * ONLY file other modules and app.ts may import from catalog/
 */
import { catalogRouter } from './catalog.routes.js';
import * as catalogService from './catalog.service.js';

export interface CheckStockItem {
  productId: string;
  sku?: string;
  quantity: number;
}

export interface StockCheckResult {
  available: boolean;
  unavailableItems?: {
    productId: string;
    requested: number;
    available: number;
  }[];
}

export interface ICatalogFacade {
  getProductById(id: string): Promise<{
    id: string;
    name: string;
    price: number;
    storeId: string;
    isActive: boolean;
  } | null>;
  checkStock(items: CheckStockItem[]): Promise<StockCheckResult>;
  deductStock(items: CheckStockItem[]): Promise<void>;
}

export const catalogModule: ICatalogFacade = {
  getProductById: async (id: string) => {
    try {
      const product = await catalogService.getProductById(id);
      if (!product) return null;
      return {
        id: product._id,
        name: product.name,
        price: product.basePrice,
        storeId: product.storeId,
        isActive: product.isActive,
      };
    } catch {
      return null;
    }
  },
  checkStock: async (items: CheckStockItem[]): Promise<StockCheckResult> => {
    try {
      // In this Phase, verify each product exists and is active
      const unavailable: StockCheckResult['unavailableItems'] = [];
      for (const item of items) {
        const p = await catalogService.getProductById(item.productId).catch(() => null);
        if (!p || !p.isActive) {
          unavailable.push({
            productId: item.productId,
            requested: item.quantity,
            available: 0,
          });
        }
      }
      return {
        available: unavailable.length === 0,
        unavailableItems: unavailable.length > 0 ? unavailable : undefined,
      };
    } catch {
      return { available: false };
    }
  },
  deductStock: async (_items: CheckStockItem[]): Promise<void> => {
    // Inventory deduction hook (will decrement stock counts in inventory ledger)
  },
};

export { catalogRouter, catalogService };
export * from './product.model.js';
