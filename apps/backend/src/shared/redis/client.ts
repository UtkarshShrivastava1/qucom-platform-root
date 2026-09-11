import { Redis } from 'ioredis';
import { env } from '../config/env.config.js';
import { logger } from '../utils/logger.js';

let redisClient: Redis | null = null;
let isRedisAvailable = false;

export function getRedisClient(): Redis | null {
  if (!env.ENABLE_REDIS) {
    return null;
  }

  if (!redisClient) {
    redisClient = new Redis(env.REDIS_URL, {
      maxRetriesPerRequest: 1,
      connectTimeout: 2000,
      lazyConnect: true,
      retryStrategy(times) {
        // Only retry if Redis was already established and temporarily dropped
        if (!isRedisAvailable || times > 3) {
          return null;
        }
        return Math.min(times * 500, 2000);
      },
    });

    redisClient.on('connect', () => {
      isRedisAvailable = true;
      logger.info('⚡ Redis connected successfully');
    });

    redisClient.on('error', (err) => {
      // Only warn if connection was active and dropped
      if (isRedisAvailable) {
        logger.warn(`⚠️ Redis error: ${err.message}`);
      }
      isRedisAvailable = false;
    });

    redisClient.on('close', () => {
      isRedisAvailable = false;
    });
  }

  return redisClient;
}

export async function connectRedis(): Promise<void> {
  if (!env.ENABLE_REDIS) {
    logger.info('⚡ Redis is disabled (ENABLE_REDIS=false). Operating in in-memory mode.');
    return;
  }

  const client = getRedisClient();
  if (!client) return;

  try {
    await client.connect();
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : String(error);
    logger.warn(`⚠️ Redis server unreachable at ${env.REDIS_URL} (${errMessage}). Operating in degraded in-memory mode.`);
    logger.info('💡 To connect Redis: Start local Redis service (Docker/Memurai) or set cloud REDIS_URL (e.g. Upstash) in .env.');

    // Disconnect to avoid background retry noise
    try {
      client.disconnect();
    } catch {
      // Ignore disconnect errors
    }
    redisClient = null;
    isRedisAvailable = false;
  }
}

export function checkRedisHealth(): boolean {
  return isRedisAvailable;
}

export async function disconnectRedis(): Promise<void> {
  if (redisClient) {
    try {
      await redisClient.quit();
    } catch {
      redisClient.disconnect();
    }
    redisClient = null;
    isRedisAvailable = false;
    logger.info('⚡ Redis connection closed');
  }
}

