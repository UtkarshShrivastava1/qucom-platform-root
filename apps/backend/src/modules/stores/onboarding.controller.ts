import { Request, Response, RequestHandler } from 'express';
import { catchAsync } from '../../shared/utils/catchAsync.js';
import { ApiResponse } from '../../shared/utils/ApiResponse.js';
import { AppError } from '../../shared/utils/AppError.js';
import { StoreApprovalStatus } from '@repo/shared-types';
import * as onboardingService from './onboarding.service.js';

export const verifyGstin: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { gstin } = req.body;
  if (!gstin) {
    throw AppError.badRequest('GSTIN is required', 'GSTIN_REQUIRED');
  }
  const result = await onboardingService.verifyGstin(gstin);
  return ApiResponse.success(res, result, 'GSTIN verified successfully');
});

export const submitOnboarding: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw AppError.unauthorized();
  }
  const store = await onboardingService.submitCompleteOnboarding(req.user.sub, req.body);
  return ApiResponse.created(res, store, 'Onboarding submitted for admin verification');
});

export const getOnboardingStatus: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw AppError.unauthorized();
  }
  const status = await onboardingService.getMerchantOnboardingStatus(req.user.sub);
  return ApiResponse.success(res, status);
});

export const getPendingQueue: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await onboardingService.getPendingStoresQueue(req.query as any);
  return ApiResponse.success(res, result.stores, undefined, undefined, result.meta);
});

export const reviewStore: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, remarks } = req.body as { status: StoreApprovalStatus.APPROVED | StoreApprovalStatus.REJECTED; remarks?: string };

  if (!id) throw AppError.badRequest('Store ID is required');
  if (![StoreApprovalStatus.APPROVED, StoreApprovalStatus.REJECTED].includes(status)) {
    throw AppError.badRequest('Invalid approval status', 'INVALID_STATUS');
  }

  const store = await onboardingService.reviewStoreRegistration(id, status, remarks);
  return ApiResponse.success(res, store, `Store ${status} successfully`);
});
