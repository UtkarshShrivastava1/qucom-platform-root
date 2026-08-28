'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchStoreProducts } from '@/lib/api/catalog';
import type { ProductQueryDto } from '@repo/shared-types';

export function useStoreProducts(storeId: string, query?: Partial<ProductQueryDto>) {
  return useQuery({
    queryKey: ['products', 'store', storeId, query],
    queryFn: () => fetchStoreProducts(storeId, query),
    staleTime: 3 * 60 * 1000,
    enabled: !!storeId,
  });
}
