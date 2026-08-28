'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchFeaturedProducts } from '@/lib/api/catalog';

export function useFeaturedProducts(limit = 12) {
  return useQuery({
    queryKey: ['products', 'featured', limit],
    queryFn: () => fetchFeaturedProducts(limit),
    staleTime: 5 * 60 * 1000,
  });
}
