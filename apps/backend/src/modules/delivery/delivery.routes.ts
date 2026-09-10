import { Router } from 'express';
import type { DeliveryController } from './delivery.controller.js';
import { authGuard } from '../../shared/middlewares/authGuard.js';
import { roleGuard } from '../../shared/middlewares/roleGuard.js';
import { validateBody } from '../../shared/middlewares/validateRequest.js';
import {
  assignRiderSchema,
  updateDeliveryStatusSchema,
  verifyDeliveryOtpSchema,
} from './delivery.validator.js';
import { UserRole } from '@repo/shared-types';

export function createDeliveryRouter(controller: DeliveryController): Router {
  const router = Router();

  // Public/Customer tracking view
  router.get('/orders/:orderId/track', controller.getTracking);

  // Merchant or Admin assigns rider partner
  router.post(
    '/orders/:orderId/assign',
    authGuard,
    roleGuard(UserRole.MERCHANT, UserRole.ADMIN),
    validateBody(assignRiderSchema),
    controller.assignRider,
  );

  // Status transition update (Rider or Merchant)
  router.patch(
    '/orders/:orderId/status',
    authGuard,
    validateBody(updateDeliveryStatusSchema),
    controller.updateStatus,
  );

  // Final 4-digit OTP verification upon customer delivery handoff
  router.post(
    '/orders/:orderId/verify-otp',
    authGuard,
    validateBody(verifyDeliveryOtpSchema),
    controller.verifyOtp,
  );

  return router;
}
