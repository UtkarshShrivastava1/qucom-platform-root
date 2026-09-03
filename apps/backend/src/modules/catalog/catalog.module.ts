import type { Router } from 'express';
import { ProductModel } from './product.model.js';
import { createCatalogRepository } from './catalog.repository.js';
import { catalogRouter } from './catalog.routes.js';
import * as catalogService from './catalog.service.js';
import { eventBus, type IEventBus } from '../../shared/events/eventBus.js';
import { storeModule, type IStoreFacade } from '../stores/index.js';
import type { ICatalogRepository, IProductDocument } from './catalog.types.js';
import type { Model } from 'mongoose';

export interface CatalogModule {
  router: Router;
  repository: ICatalogRepository;
  service: typeof catalogService;
}

export function createCatalogModule(
  events: IEventBus = eventBus,
  stores: IStoreFacade = storeModule,
  model: Model<IProductDocument> = ProductModel as unknown as Model<IProductDocument>,
): CatalogModule {
  const repository = createCatalogRepository(model);
  const router = catalogRouter;

  return { router, repository, service: catalogService };
}
