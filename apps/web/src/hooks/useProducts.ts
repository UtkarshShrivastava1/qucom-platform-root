'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/lib/api/catalog';
import type { ProductQueryDto } from '@repo/shared-types';

export function useProducts(query: Partial<ProductQueryDto>) {
  return useQuery({
    queryKey: ['products', query],
    queryFn: () => fetchProducts(query),
    staleTime: 3 * 60 * 1000,
  });
}
