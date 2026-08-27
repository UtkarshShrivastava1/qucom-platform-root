/**
 * Catalog domain stub types (Expanded in Phase 3)
 */

export interface IProductVariant {
  sku: string;
  size?: string;
  color?: string;
  price: number;
  mrp: number;
  stock: number;
  images: string[];
}

export interface IProduct {
  _id: string;
  storeId: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  subCategory?: string;
  variants: IProductVariant[];
  basePrice: number;
  baseMrp: number;
  isActive: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}
