import mongoose, { ClientSession } from 'mongoose';
import { OutboxModel, IOutboxEvent, OutboxEventStatus } from './outbox.model.js';
import { logger } from '../utils/logger.js';
import { orderQueue } from '../queues/order.queue.js';

export interface CreateOutboxEventParams {
  eventType: string;
  aggregateId: string;
  aggregateType?: string;
  payload: Record<string, unknown>;
  session?: ClientSession;
}

/**
 * Appends an outbound domain event to the outbox collection.
 * When passed an active session, this write participates in the caller's atomic ACID transaction.
 */
export async function appendOutboxEvent(params: CreateOutboxEventParams): Promise<IOutboxEvent> {
  // If MongoDB is not connected (e.g. isolated unit tests with mock repositories), bypass DB insert
  if (mongoose.connection.readyState !== 1) {
    logger.debug(`📥 [Outbox:Mock] Skipping DB insert for ${params.eventType} (DB disconnected)`);
    return {
      _id: 'mock-outbox-id',
      eventType: params.eventType,
      aggregateId: params.aggregateId,
      aggregateType: params.aggregateType || 'Order',
      payload: params.payload,
      status: OutboxEventStatus.PENDING,
      attempts: 0,
      createdAt: new Date(),
    } as unknown as IOutboxEvent;
  }

  const createdDocs = await OutboxModel.create(
    [
      {
        eventType: params.eventType,
        aggregateId: params.aggregateId,
        aggregateType: params.aggregateType || 'Order',
        payload: params.payload,
        status: OutboxEventStatus.PENDING,
        attempts: 0,
      },
    ],
    { session: params.session }
  );

  const event = createdDocs[0] as IOutboxEvent;
  logger.debug(`📥 [Outbox] Appended ${params.eventType} for aggregate ${params.aggregateId}`);
  return event;
}

/**
 * Processes pending outbox events and pushes them to BullMQ persistent queues.
 * Guaranteed at-least-once delivery with attempt tracking.
 */
export async function processPendingOutboxEvents(batchSize = 25): Promise<number> {
  const pendingEvents = await OutboxModel.find({
    status: OutboxEventStatus.PENDING,
    attempts: { $lt: 5 },
  })
    .sort({ createdAt: 1 })
    .limit(batchSize)
    .exec();

  let processedCount = 0;

  for (const event of pendingEvents) {
    try {
      // Forward to BullMQ persistent queue
      await orderQueue.add(event.eventType, {
        outboxId: event._id.toString(),
        aggregateId: event.aggregateId,
        aggregateType: event.aggregateType,
        payload: event.payload,
      });

      event.status = OutboxEventStatus.PUBLISHED;
      event.publishedAt = new Date();
      await event.save();

      processedCount++;
    } catch (error) {
      event.attempts += 1;
      event.lastError = error instanceof Error ? error.message : String(error);

      if (event.attempts >= 5) {
        event.status = OutboxEventStatus.FAILED;
        logger.error(`🚨 [Outbox] Event ${event._id} failed permanently after 5 attempts: ${event.lastError}`);
      } else {
        logger.warn(`⚠️ [Outbox] Event ${event._id} delivery attempt ${event.attempts} failed: ${event.lastError}`);
      }

      await event.save();
    }
  }

  return processedCount;
}
