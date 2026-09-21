import { Queue } from 'bullmq';
import { env } from '../config/env.config.js';
import { logger } from '../utils/logger.js';

// Dedicated connection configuration for BullMQ
export function getBullMQConnection() {
  const url = new URL(env.REDIS_URL);
  return {
    host: url.hostname || '127.0.0.1',
    port: parseInt(url.port || '6379', 10),
    password: url.password || undefined,
    username: url.username || undefined,
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  };
}

export const ORDER_QUEUE_NAME = 'order-lifecycle';
export const ORDER_DLQ_NAME = 'order-dead-letter-queue';

const isRedisEnabled = env.ENABLE_REDIS && env.NODE_ENV !== 'test';

class MockQueue {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  async add(name: string, data: unknown) {
    logger.debug(`📦 [MockQueue:${this.name}] Simulated enqueue job: ${name}`);
    return { id: `mock-${Date.now()}`, name, data } as any;
  }
}

/**
 * Primary BullMQ Queue for all asynchronous order lifecycle operations
 */
export const orderQueue: Queue = isRedisEnabled
  ? new Queue(ORDER_QUEUE_NAME, {
      connection: getBullMQConnection(),
      defaultJobOptions: {
        attempts: 5,
        backoff: {
          type: 'exponential',
          delay: 1000, // 1s, 2s, 4s, 8s, 16s
        },
        removeOnComplete: {
          count: 1000,
          age: 24 * 3600, // 24 hours
        },
        removeOnFail: false, // Keep failed jobs for inspection
      },
    })
  : (new MockQueue(ORDER_QUEUE_NAME) as unknown as Queue);

/**
 * Dead Letter Queue (DLQ) for isolating permanently exhausted jobs
 */
export const deadLetterQueue: Queue = isRedisEnabled
  ? new Queue(ORDER_DLQ_NAME, {
      connection: getBullMQConnection(),
      defaultJobOptions: {
        removeOnComplete: false,
        removeOnFail: false,
      },
    })
  : (new MockQueue(ORDER_DLQ_NAME) as unknown as Queue);

if (isRedisEnabled) {
  logger.info(`📦 BullMQ Queues initialized: [${ORDER_QUEUE_NAME}, ${ORDER_DLQ_NAME}]`);
} else {
  logger.info(`📦 BullMQ running in simulated in-memory mode (Redis disabled/test env)`);
}
