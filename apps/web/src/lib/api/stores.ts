import type { IStore, StoreCategory } from '@repo/shared-types';
import { api } from './client';

export async function fetchNearbyStores(
  lng: number,
  lat: number,
  radiusKm = 4,
  category?: StoreCategory,
): Promise<IStore[]> {
  const res = await api.get<IStore[]>('stores/nearby', {
    lng,
    lat,
    radiusKm,
    ...(category ? { category } : {}),
  });
  return res.data;
}

export async function fetchStoreBySlug(slug: string): Promise<IStore> {
  const res = await api.get<IStore>(`stores/slug/${slug}`);
  return res.data;
}

export async function fetchStoreById(id: string): Promise<IStore> {
  const res = await api.get<IStore>(`stores/${id}`);
  return res.data;
}

export async function fetchAllStores(params: {
  page?: number;
  limit?: number;
  category?: StoreCategory;
  search?: string;
  city?: string;
}): Promise<{ stores: IStore[]; meta: { page: number; limit: number; total: number; totalPages: number; hasNextPage: boolean; hasPrevPage: boolean } }> {
  const res = await api.get<IStore[]>('stores', params as Record<string, string | number>);
  return {
    stores: res.data,
    meta: res.meta as { page: number; limit: number; total: number; totalPages: number; hasNextPage: boolean; hasPrevPage: boolean },
  };
}
