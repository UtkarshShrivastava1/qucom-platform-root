import { Worker, Job } from 'bullmq';
import {
  ORDER_QUEUE_NAME,
  ORDER_DLQ_NAME,
  orderQueue,
  deadLetterQueue,
  getBullMQConnection,
} from './order.queue.js';
import { logger } from '../utils/logger.js';
import { eventBus } from '../events/eventBus.js';
import { EVENTS } from '../events/eventTypes.js';

export interface OrderJobData {
  outboxId?: string;
  aggregateId: string;
  aggregateType?: string;
  payload: Record<string, unknown>;
}

import { env } from '../config/env.config.js';

const isRedisEnabled = env.ENABLE_REDIS && env.NODE_ENV !== 'test';

/**
 * Enterprise BullMQ Worker for Order processing with concurrency, rate-limiting, and DLQ routing.
 */
export const orderWorker: Worker<OrderJobData> | null = isRedisEnabled
  ? new Worker<OrderJobData>(
      ORDER_QUEUE_NAME,
      async (job: Job<OrderJobData>) => {
        logger.info(`⚙️ [OrderWorker] Processing job ${job.id} (${job.name}) for order ${job.data.aggregateId}`);

        switch (job.name) {
          case 'ORDER_CREATED': {
            await eventBus.emit('order.placed', {
              orderId: job.data.aggregateId,
              orderNumber: (job.data.payload.orderNumber as string) || `ORD-${job.data.aggregateId.slice(-6)}`,
              userId: job.data.payload.userId as string,
              storeId: job.data.payload.storeId as string,
              grandTotal: job.data.payload.grandTotal as number,
              itemsCount: (job.data.payload.itemsCount as number) || 1,
            });
            break;
          }

          case 'ORDER_STATUS_UPDATED': {
            const newStatus = job.data.payload.newStatus as string;
            const payload = {
              orderId: job.data.aggregateId,
              orderNumber: (job.data.payload.orderNumber as string) || `ORD-${job.data.aggregateId.slice(-6)}`,
              previousStatus: (job.data.payload.previousStatus as string) || 'PENDING',
              newStatus: newStatus || 'CONFIRMED',
              actorUserId: job.data.payload.actorUserId as string | undefined,
            };

            if (newStatus === 'confirmed') await eventBus.emit(EVENTS.ORDER_CONFIRMED, payload);
            else if (newStatus === 'cancelled') await eventBus.emit(EVENTS.ORDER_CANCELLED, payload);
            else if (newStatus === 'delivered') await eventBus.emit(EVENTS.ORDER_DELIVERED, payload);
            break;
          }

          case 'AUTO_CANCEL_TIMEOUT': {
            logger.info(`⏱️ [OrderWorker] Auto-cancellation evaluated for order ${job.data.aggregateId}`);
            break;
          }

          default:
            logger.warn(`⚠️ [OrderWorker] Unrecognized job type: ${job.name}`);
        }

        return { success: true, processedAt: new Date().toISOString() };
      },
      {
        connection: getBullMQConnection(),
        concurrency: 5,
        limiter: {
          max: 50,
          duration: 1000,
        },
      }
    )
  : null;

if (orderWorker) {
  // Dead Letter Queue (DLQ) Hook
  orderWorker.on('failed', async (job: Job<OrderJobData> | undefined, err: Error) => {
    if (!job) return;

    const maxAttempts = job.opts.attempts || 5;

    if (job.attemptsMade >= maxAttempts) {
      logger.error(`🚨 [DLQ Alert] Job ${job.id} (${job.name}) failed permanently after ${job.attemptsMade} attempts: ${err.message}`);

      await deadLetterQueue.add(`dlq-${job.name}`, {
        originalJobId: job.id,
        originalQueue: ORDER_QUEUE_NAME,
        jobName: job.name,
        data: job.data,
        error: {
          message: err.message,
          stack: err.stack,
        },
        attemptsMade: job.attemptsMade,
        failedAt: new Date().toISOString(),
      });
    } else {
      logger.warn(`⚠️ [OrderWorker] Job ${job.id} attempt ${job.attemptsMade}/${maxAttempts} failed. Backing off...`);
    }
  });

  orderWorker.on('completed', (job: Job) => {
    logger.debug(`✅ [OrderWorker] Job ${job.id} (${job.name}) completed successfully`);
  });
}

/**
 * Replays jobs from the Dead Letter Queue back into the active processing queue.
 */
export async function replayDeadLetterJobs(limit = 50): Promise<number> {
  if (!orderWorker) return 0;
  const failedJobs = await deadLetterQueue.getJobs(['waiting', 'failed', 'completed'], 0, limit);
  let replayedCount = 0;

  for (const job of failedJobs) {
    await orderQueue.add(job.name, job.data);
    await job.remove();
    replayedCount++;
  }

  logger.info(`🔄 Replayed ${replayedCount} DLQ jobs into active queue`);
  return replayedCount;
}
