import { describe, it, expect, vi } from 'vitest';
import { cacheAside } from './cache.js';

describe('Cache-Aside Pattern (structure.md Pillar 6)', () => {
  it('should invoke fetcher on cache miss or in-memory mode', async () => {
    const fetcher = vi.fn().mockResolvedValue({ storeId: 'store-1', name: 'Downtown Grocery' });

    const result = await cacheAside('store:store-1', 60, fetcher);

    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ storeId: 'store-1', name: 'Downtown Grocery' });
  });

  it('should return fetcher data even if cache operations encounter warnings', async () => {
    const fetcher = vi.fn().mockResolvedValue(['cat-1', 'cat-2']);

    const result = await cacheAside('categories:all', 300, fetcher);

    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(result).toEqual(['cat-1', 'cat-2']);
  });
});
