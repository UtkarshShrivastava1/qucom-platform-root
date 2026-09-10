import type { Request, Response, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { IDeliveryService } from './delivery.types.js';
import {
  assignRiderSchema,
  updateDeliveryStatusSchema,
  verifyDeliveryOtpSchema,
} from './delivery.validator.js';
import { ApiResponse } from '../../shared/utils/ApiResponse.js';
import { AppError } from '../../shared/utils/AppError.js';
import { catchAsync } from '../../shared/utils/catchAsync.js';

export interface DeliveryController {
  getTracking: RequestHandler;
  assignRider: RequestHandler;
  updateStatus: RequestHandler;
  verifyOtp: RequestHandler;
}

export function createDeliveryController(service: IDeliveryService): DeliveryController {
  const getTracking: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const orderId = req.params.orderId as string;
    const delivery = await service.getTracking(orderId);

    if (!delivery) {
      throw AppError.notFound('Tracking record not found for this order', 'TRACKING_NOT_FOUND');
    }

    return ApiResponse.success(res, delivery, 'Delivery tracking fetched successfully');
  });

  const assignRider: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const orderId = req.params.orderId as string;
    const dto = assignRiderSchema.parse(req.body);

    const delivery = await service.assignRider(orderId, dto);
    if (!delivery) {
      throw AppError.notFound('Delivery record not found', 'DELIVERY_NOT_FOUND');
    }

    return ApiResponse.success(res, delivery, 'Rider assigned successfully', StatusCodes.OK);
  });

  const updateStatus: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const orderId = req.params.orderId as string;
    const dto = updateDeliveryStatusSchema.parse(req.body);
    const actorRole = (req as any).user?.role;

    const delivery = await service.updateStatus(orderId, dto, actorRole);
    if (!delivery) {
      throw AppError.notFound('Delivery record not found', 'DELIVERY_NOT_FOUND');
    }

    return ApiResponse.success(res, delivery, 'Delivery status updated successfully');
  });

  const verifyOtp: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const orderId = req.params.orderId as string;
    const { otp } = verifyDeliveryOtpSchema.parse(req.body);

    const delivery = await service.verifyOtpAndComplete(orderId, otp);
    if (!delivery) {
      throw AppError.badRequest('Failed to complete delivery with provided OTP', 'OTP_VERIFICATION_FAILED');
    }

    return ApiResponse.success(res, delivery, 'Delivery completed and verified successfully');
  });

  return {
    getTracking,
    assignRider,
    updateStatus,
    verifyOtp,
  };
}
