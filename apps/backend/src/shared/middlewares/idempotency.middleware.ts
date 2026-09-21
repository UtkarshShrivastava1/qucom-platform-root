import { Request, Response, NextFunction } from 'express';
import { getRedisClient } from '../redis/client.js';
import { logger } from '../utils/logger.js';

interface CachedResponse {
  status: 'PROCESSING' | 'COMPLETED';
  statusCode?: number;
  body?: unknown;
}

// In-memory fallback if Redis is unavailable
const memoryIdempotencyStore = new Map<string, { data: CachedResponse; expiresAt: number }>();

/**
 * Enterprise Idempotency Middleware.
 * Prevents duplicate financial/ordering mutations using the `x-idempotency-key` header.
 */
export function idempotency(options = { ttlSeconds: 120 }) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const key = req.headers['x-idempotency-key'] as string | undefined;

    // If client did not supply an idempotency key, proceed normally
    if (!key || typeof key !== 'string' || !key.trim()) {
      return next();
    }

    const redis = getRedisClient();
    const redisKey = `idempotency:${key.trim()}`;

    try {
      let cached: CachedResponse | null = null;

      if (redis) {
        const raw = await redis.get(redisKey);
        if (raw) {
          cached = JSON.parse(raw) as CachedResponse;
        }
      } else {
        const item = memoryIdempotencyStore.get(redisKey);
        if (item && item.expiresAt > Date.now()) {
          cached = item.data;
        } else if (item) {
          memoryIdempotencyStore.delete(redisKey);
        }
      }

      // If already completed, replay the response immediately
      if (cached && cached.status === 'COMPLETED') {
        logger.info(`🔁 [Idempotency] Replaying cached response for key: ${key}`);
        res.setHeader('x-idempotency-replayed', 'true');
        res.status(cached.statusCode || 200).json(cached.body);
        return;
      }

      // If currently processing, reject concurrent retry
      if (cached && cached.status === 'PROCESSING') {
        logger.warn(`⏳ [Idempotency] Concurrent execution detected for key: ${key}`);
        res.status(409).json({
          success: false,
          error: {
            code: 'CONCURRENT_REQUEST',
            message: 'A request with this idempotency key is currently being processed. Please wait.',
          },
        });
        return;
      }

      // Mark as PROCESSING
      const processingState: CachedResponse = { status: 'PROCESSING' };
      if (redis) {
        await redis.set(redisKey, JSON.stringify(processingState), 'EX', options.ttlSeconds);
      } else {
        memoryIdempotencyStore.set(redisKey, {
          data: processingState,
          expiresAt: Date.now() + options.ttlSeconds * 1000,
        });
      }

      // Intercept res.json to capture and cache response upon completion
      const originalJson = res.json.bind(res);
      res.json = ((body: unknown) => {
        // Only cache successful 2xx responses
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const completedState: CachedResponse = {
            status: 'COMPLETED',
            statusCode: res.statusCode,
            body,
          };

          if (redis) {
            redis.set(redisKey, JSON.stringify(completedState), 'EX', 86400).catch((err) => {
              logger.error(`Failed to cache idempotency response in Redis: ${err.message}`);
            });
          } else {
            memoryIdempotencyStore.set(redisKey, {
              data: completedState,
              expiresAt: Date.now() + 86400 * 1000,
            });
          }
        } else {
          // If request failed, release the lock so the client can retry
          if (redis) {
            redis.del(redisKey).catch(() => {});
          } else {
            memoryIdempotencyStore.delete(redisKey);
          }
        }

        return originalJson(body);
      }) as typeof res.json;

      next();
    } catch (error) {
      logger.error(`Idempotency middleware error: ${error instanceof Error ? error.message : String(error)}`);
      // Fail-open to avoid blocking requests if cache layer experiences hiccups
      next();
    }
  };
}
