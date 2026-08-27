import { Router } from 'express';
import {
  registerUserSchema,
  loginUserSchema,
  refreshTokenSchema,
  userAddressSchema,
} from '@repo/shared-types';
import { validateRequest } from '../../shared/middlewares/validateRequest.js';
import { authGuard } from '../../shared/middlewares/authGuard.js';
import * as authController from './auth.controller.js';

const router = Router();

// Public Authentication Endpoints
router.post(
  '/register',
  validateRequest({ body: registerUserSchema }),
  authController.register,
);

router.post(
  '/login',
  validateRequest({ body: loginUserSchema }),
  authController.login,
);

router.post(
  '/refresh-token',
  validateRequest({ body: refreshTokenSchema }),
  authController.refreshToken,
);

// Protected User Profile & Address Endpoints
router.get(
  '/profile',
  authGuard,
  authController.getProfile,
);

router.patch(
  '/profile',
  authGuard,
  authController.updateProfile,
);

router.post(
  '/addresses',
  authGuard,
  validateRequest({ body: userAddressSchema }),
  authController.addAddress,
);

router.delete(
  '/addresses/:addressId',
  authGuard,
  authController.deleteAddress,
);

router.post(
  '/logout',
  authGuard,
  authController.logout,
);

export const authRouter = router;
