import { getRedisClient, checkRedisHealth } from './client.js';
import { logger } from '../utils/logger.js';

/**
 * Cache-Aside Helper (Pillar 6 in structure.md)
 * Inspects Redis cache first. On miss, invokes fetcher() and saves result with TTL.
 */
export async function cacheAside<T>(
  key: string,
  ttlSeconds: number,
  fetcher: () => Promise<T>,
): Promise<T> {
  const client = getRedisClient();
  if (checkRedisHealth() && client) {
    try {
      const cached = await client.get(key);
      if (cached) {
        logger.debug(`[Cache-Aside] HIT: ${key}`);
        return JSON.parse(cached) as T;
      }
    } catch (err) {
      logger.warn(
        `[Cache-Aside] Redis read error for ${key}: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  // Fetch from primary database
  const result = await fetcher();

  if (checkRedisHealth() && client && result !== null && result !== undefined) {
    try {
      await client.set(key, JSON.stringify(result), 'EX', ttlSeconds);
      logger.debug(`[Cache-Aside] MISS -> SET: ${key} (TTL ${ttlSeconds}s)`);
    } catch (err) {
      logger.warn(
        `[Cache-Aside] Redis write error for ${key}: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  return result;
}

/**
 * Invalidate cache key or pattern
 */
export async function invalidateCache(patternOrKey: string): Promise<void> {
  const client = getRedisClient();
  if (!checkRedisHealth() || !client) return;

  try {
    if (patternOrKey.includes('*')) {
      const keys = await client.keys(patternOrKey);
      if (keys.length > 0) {
        await client.del(...keys);
        logger.debug(`[Cache-Aside] Invalidated ${keys.length} keys matching: ${patternOrKey}`);
      }
    } else {
      await client.del(patternOrKey);
      logger.debug(`[Cache-Aside] Invalidated key: ${patternOrKey}`);
    }
  } catch (err) {
    logger.warn(
      `[Cache-Aside] Redis invalidation error: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
}
