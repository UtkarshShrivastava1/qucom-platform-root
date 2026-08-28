/**
 * Backend-specific validation wrappers for catalog operations.
 * Re-exports shared Zod schemas and adds server-side refinements.
 */

export {
  createProductSchema,
  updateProductSchema,
  productQuerySchema,
  bulkCreateProductsSchema,
  productVariantSchema,
  productAttributeSchema,
} from '@repo/shared-types';

export type {
  CreateProductDto,
  UpdateProductDto,
  ProductQueryDto,
  BulkCreateProductsDto,
} from '@repo/shared-types';
