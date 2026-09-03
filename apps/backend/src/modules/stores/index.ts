/**
 * STORES MODULE — Public Facade
 * ONLY file other modules and app.ts may import from stores/
 */
import { storeRouter } from './store.routes.js';
import * as storeService from './store.service.js';

export interface IStoreFacade {
  getStoreById(id: string): Promise<{
    id: string;
    name: string;
    isActive: boolean;
    ownerId: string;
    city: string;
  } | null>;
  isStoreActive(id: string): Promise<boolean>;
  verifyStoreExists(id: string): Promise<boolean>;
}

export const storeModule: IStoreFacade = {
  getStoreById: async (id: string) => {
    try {
      const store = await storeService.getStoreById(id);
      if (!store) return null;
      return {
        id: store._id,
        name: store.name,
        isActive: store.isActive,
        ownerId: store.ownerId,
        city: store.address?.city || '',
      };
    } catch {
      return null;
    }
  },
  isStoreActive: async (id: string) => {
    try {
      const store = await storeService.getStoreById(id);
      return store?.isActive ?? false;
    } catch {
      return false;
    }
  },
  verifyStoreExists: async (id: string) => {
    try {
      const store = await storeService.getStoreById(id);
      return !!store;
    } catch {
      return false;
    }
  },
};

export { storeRouter, storeService };
export * from './store.model.js';
