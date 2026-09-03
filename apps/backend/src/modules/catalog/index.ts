/**
 * CATALOG MODULE — Public Facade
 * ONLY file other modules and app.ts may import from catalog/
 */
import { createCatalogModule } from './catalog.module.js';
import * as catalogService from './catalog.service.js';
import type { ICatalogFacade, CheckStockItem, StockCheckResult } from './catalog.types.js';

const defaultCatalogModule = createCatalogModule();

export const catalogRouter = defaultCatalogModule.router;
export const catalogRepository = defaultCatalogModule.repository;

export const catalogModule: ICatalogFacade = {
  getProductById: async (id: string) => {
    try {
      const product = await catalogService.getProductById(id);
      if (!product) return null;
      return {
        id: product._id,
        name: product.name,
        price: product.basePrice,
        storeId: product.storeId,
        isActive: product.isActive,
      };
    } catch {
      return null;
    }
  },
  checkStock: async (items: CheckStockItem[]): Promise<StockCheckResult> => {
    try {
      const unavailable: StockCheckResult['unavailableItems'] = [];
      for (const item of items) {
        const p = await catalogService.getProductById(item.productId).catch(() => null);
        if (!p || !p.isActive) {
          unavailable.push({
            productId: item.productId,
            requested: item.quantity,
            available: 0,
          });
        }
      }
      return {
        available: unavailable.length === 0,
        unavailableItems: unavailable.length > 0 ? unavailable : undefined,
      };
    } catch {
      return { available: false };
    }
  },
  deductStock: async (_items: CheckStockItem[]): Promise<void> => {
    // Inventory deduction hook
  },
};

export { createCatalogModule, catalogService };
export * from './catalog.types.js';
export * from './catalog.validator.js';
export { ProductModel } from './product.model.js';
