import type { Model } from 'mongoose';
import {
  CreateProductDto,
  UpdateProductDto,
  ProductQueryDto,
  IProduct,
  IProductListResponse,
  ICatalogRepository,
  IProductDocument,
} from './catalog.types.js';
import { listProducts } from './catalog.service.js';

export function createCatalogRepository(
  productModel: Model<IProductDocument>,
): ICatalogRepository {
  async function create(
    storeId: string,
    storeName: string,
    dto: CreateProductDto & { slug: string },
  ): Promise<IProduct> {
    const product = new productModel({
      ...dto,
      storeId,
      storeName,
      isActive: true,
    });
    await product.save();
    return (product.toJSON ? product.toJSON() : product) as unknown as IProduct;
  }

  async function findById(id: string): Promise<IProduct | null> {
    const product = await productModel.findOne({ _id: id, isActive: true }).lean();
    return product as unknown as IProduct;
  }

  async function findBySlug(slug: string): Promise<IProduct | null> {
    const product = await productModel.findOne({ slug, isActive: true }).lean();
    return product as unknown as IProduct;
  }

  async function list(query: ProductQueryDto): Promise<IProductListResponse> {
    return listProducts(query);
  }

  async function update(id: string, dto: UpdateProductDto): Promise<IProduct | null> {
    const product = await productModel.findByIdAndUpdate(
      id,
      { $set: dto },
      { new: true, runValidators: true },
    );
    return product ? ((product.toJSON ? product.toJSON() : product) as unknown as IProduct) : null;
  }

  async function deleteProduct(id: string): Promise<boolean> {
    const res = await productModel.findByIdAndUpdate(id, { isActive: false });
    return !!res;
  }

  return {
    create,
    findById,
    findBySlug,
    list,
    update,
    delete: deleteProduct,
  };
}
