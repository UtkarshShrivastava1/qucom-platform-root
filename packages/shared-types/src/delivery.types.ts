import { z } from 'zod';

/**
 * Delivery Domain Status Enum
 */
export enum DeliveryStatus {
  PENDING_ASSIGNMENT = 'PENDING_ASSIGNMENT',
  ASSIGNED = 'ASSIGNED',
  PICKED_UP = 'PICKED_UP',
  IN_TRANSIT = 'IN_TRANSIT',
  ARRIVED = 'ARRIVED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED',
}

/**
 * Rider Vehicle Type
 */
export enum VehicleType {
  BICYCLE = 'BICYCLE',
  MOTORCYCLE = 'MOTORCYCLE',
  SCOOTER = 'SCOOTER',
  ELECTRIC_VEHICLE = 'ELECTRIC_VEHICLE',
}

// ── Zod Validation Schemas ──────────────────────────────────────────────

export const riderInfoSchema = z.object({
  id: z.string().min(1, 'Rider ID is required'),
  name: z.string().min(2, 'Rider name is required'),
  phone: z.string().min(10, 'Valid 10-digit phone number is required'),
  vehicleType: z.nativeEnum(VehicleType).default(VehicleType.MOTORCYCLE),
  vehicleNumber: z.string().optional(),
});

export const assignRiderSchema = z.object({
  rider: riderInfoSchema,
  estimatedMinutes: z.number().int().positive().max(180).default(30),
});

export const updateDeliveryStatusSchema = z.object({
  status: z.nativeEnum(DeliveryStatus),
  note: z.string().max(300).optional(),
  deliveryOtp: z.string().length(4, 'Delivery OTP must be 4 digits').optional(),
});

export const verifyDeliveryOtpSchema = z.object({
  otp: z.string().length(4, 'OTP must be 4 digits'),
});

export const deliveryQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  status: z.nativeEnum(DeliveryStatus).optional(),
});

// ── Inferred DTO Types ─────────────────────────────────────────────────

export type RiderInfoDto = z.infer<typeof riderInfoSchema>;
export type AssignRiderDto = z.infer<typeof assignRiderSchema>;
export type UpdateDeliveryStatusDto = z.infer<typeof updateDeliveryStatusSchema>;
export type VerifyDeliveryOtpDto = z.infer<typeof verifyDeliveryOtpSchema>;
export type DeliveryQueryDto = z.infer<typeof deliveryQuerySchema>;

export interface DeliveryTimelineEntry {
  status: DeliveryStatus;
  timestamp: string;
  note?: string;
}

export interface DeliveryResponseDto {
  id: string;
  orderId: string;
  orderNumber: string;
  storeId: string;
  customerId: string;
  rider?: RiderInfoDto;
  pickupLocation: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
    addressText: string;
  };
  dropoffLocation: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
    addressText: string;
  };
  distanceKm: number;
  estimatedMinutes: number;
  status: DeliveryStatus;
  dispatchMessage?: string;
  timeline: DeliveryTimelineEntry[];
  createdAt: string;
  updatedAt: string;
}
