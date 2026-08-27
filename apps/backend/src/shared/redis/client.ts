import { Redis } from 'ioredis';
import { env } from '../config/env.config.js';
import { logger } from '../utils/logger.js';

let redisClient: Redis | null = null;
let isRedisAvailable = false;

export function getRedisClient(): Redis {
  if (!redisClient) {
    redisClient = new Redis(env.REDIS_URL, {
      maxRetriesPerRequest: 3,
      retryStrategy(times) {
        if (times > 5) {
          logger.warn('⚠️ Redis max connection retry attempts reached. Operating in degraded mode.');
          return null; // Stop retrying
        }
        return Math.min(times * 200, 2000);
      },
      lazyConnect: true,
    });

    redisClient.on('connect', () => {
      isRedisAvailable = true;
      logger.info('⚡ Redis connected successfully');
    });

    redisClient.on('error', (err) => {
      isRedisAvailable = false;
      logger.warn(`⚠️ Redis error: ${err.message}`);
    });

    redisClient.on('close', () => {
      isRedisAvailable = false;
    });
  }

  return redisClient;
}

export async function connectRedis(): Promise<void> {
  const client = getRedisClient();
  try {
    await client.connect();
  } catch (error) {
    logger.warn('⚠️ Redis server unreachable. Caching & PubSub will fallback or degrade gracefully.');
  }
}

export function checkRedisHealth(): boolean {
  return isRedisAvailable;
}

export async function disconnectRedis(): Promise<void> {
  if (redisClient) {
    await redisClient.quit().catch(() => {});
    redisClient = null;
    isRedisAvailable = false;
    logger.info('⚡ Redis connection closed');
  }
}
