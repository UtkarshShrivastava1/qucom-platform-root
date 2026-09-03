import type { Router } from 'express';
import { StoreModel } from './store.model.js';
import { createStoreRepository } from './store.repository.js';
import { storeRouter } from './store.routes.js';
import * as storeService from './store.service.js';
import { eventBus, type IEventBus } from '../../shared/events/eventBus.js';
import type { IStoreRepository, IStoreDocument } from './store.types.js';
import type { Model } from 'mongoose';

export interface StoreModule {
  router: Router;
  repository: IStoreRepository;
  service: typeof storeService;
}

export function createStoreModule(
  events: IEventBus = eventBus,
  model: Model<IStoreDocument> = StoreModel as unknown as Model<IStoreDocument>,
): StoreModule {
  const repository = createStoreRepository(model);
  const router = storeRouter;

  return { router, repository, service: storeService };
}
