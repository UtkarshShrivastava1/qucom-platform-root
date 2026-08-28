import type { IProduct, IProductListResponse, ProductQueryDto } from '@repo/shared-types';
import { api } from './client';

export async function fetchProducts(
  query: Partial<ProductQueryDto>,
): Promise<IProductListResponse> {
  const params: Record<string, string | number | string[] | undefined> = {};

  if (query.search) params.search = query.search;
  if (query.category) params.category = query.category;
  if (query.subCategory) params.subCategory = query.subCategory;
  if (query.subType) params.subType = query.subType;
  if (query.sort) params.sort = query.sort;
  if (query.page) params.page = query.page;
  if (query.limit) params.limit = query.limit;
  if (query.minPrice !== undefined) params.minPrice = query.minPrice;
  if (query.maxPrice !== undefined) params.maxPrice = query.maxPrice;
  if (query.storeId) params.storeId = query.storeId;

  // Array params
  if (query.sizes) {
    params.sizes = Array.isArray(query.sizes) ? query.sizes : [query.sizes];
  }
  if (query.colors) {
    params.colors = Array.isArray(query.colors) ? query.colors : [query.colors];
  }
  if (query.brands) {
    params.brands = Array.isArray(query.brands) ? query.brands : [query.brands];
  }

  const res = await api.get<IProduct[]>('catalog/products', params);

  return {
    products: res.data,
    facets: { sizes: [], colors: [], brands: [], priceRange: { min: 0, max: 0 }, categories: [], totalCount: 0 },
    meta: res.meta as IProductListResponse['meta'],
  };
}

export async function fetchFeaturedProducts(limit = 12): Promise<IProduct[]> {
  const res = await api.get<IProduct[]>('catalog/products/featured', { limit });
  return res.data;
}

export async function fetchProductBySlug(slug: string): Promise<IProduct> {
  const res = await api.get<IProduct>(`catalog/products/${slug}`);
  return res.data;
}

export async function fetchStoreProducts(
  storeId: string,
  query?: Partial<ProductQueryDto>,
): Promise<IProductListResponse> {
  const params: Record<string, string | number | undefined> = {};
  if (query?.page) params.page = query.page;
  if (query?.limit) params.limit = query.limit;
  if (query?.sort) params.sort = query.sort;
  if (query?.category) params.category = query.category;

  const res = await api.get<IProduct[]>(`catalog/stores/${storeId}/products`, params);

  return {
    products: res.data,
    facets: { sizes: [], colors: [], brands: [], priceRange: { min: 0, max: 0 }, categories: [], totalCount: 0 },
    meta: res.meta as IProductListResponse['meta'],
  };
}
