import { Router } from 'express';
import {
  createStoreSchema,
  updateStoreSchema,
  nearbyStoresQuerySchema,
  approveStoreSchema,
  UserRole,
} from '@repo/shared-types';
import { validateRequest } from '../../shared/middlewares/validateRequest.js';
import { authGuard } from '../../shared/middlewares/authGuard.js';
import { roleGuard } from '../../shared/middlewares/roleGuard.js';
import * as storeController from './store.controller.js';

const router = Router();

// Public Store Discovery Endpoints
router.get(
  '/nearby',
  validateRequest({ query: nearbyStoresQuerySchema }),
  storeController.getNearbyStores,
);

router.get(
  '/',
  storeController.listStores,
);

router.get(
  '/slug/:slug',
  storeController.getStoreBySlug,
);

// Merchant Authenticated Endpoints
router.get(
  '/mine',
  authGuard,
  roleGuard(UserRole.MERCHANT, UserRole.ADMIN),
  storeController.getMyStores,
);

router.post(
  '/',
  authGuard,
  roleGuard(UserRole.MERCHANT, UserRole.ADMIN),
  validateRequest({ body: createStoreSchema }),
  storeController.createStore,
);

router.patch(
  '/:id',
  authGuard,
  roleGuard(UserRole.MERCHANT, UserRole.ADMIN),
  validateRequest({ body: updateStoreSchema }),
  storeController.updateStore,
);

// Admin Approval Endpoint
router.patch(
  '/:id/approve',
  authGuard,
  roleGuard(UserRole.ADMIN),
  validateRequest({ body: approveStoreSchema }),
  storeController.approveStore,
);

// Public Single Store by ID
router.get(
  '/:id',
  storeController.getStoreById,
);

export const storeRouter = router;
