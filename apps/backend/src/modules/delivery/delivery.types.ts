import type { Document } from 'mongoose';
import {
  DeliveryStatus,
  VehicleType,
  type RiderInfoDto,
  type AssignRiderDto,
  type UpdateDeliveryStatusDto,
  type DeliveryResponseDto,
  type DeliveryTimelineEntry,
} from '@repo/shared-types';

export { DeliveryStatus, VehicleType };
export type {
  RiderInfoDto,
  AssignRiderDto,
  UpdateDeliveryStatusDto,
  DeliveryResponseDto,
  DeliveryTimelineEntry,
};

export interface IDeliveryDocument extends Document {
  orderId: string;
  orderNumber: string;
  storeId: string;
  customerId: string;
  rider?: RiderInfoDto;
  pickupLocation: {
    type: 'Point';
    coordinates: [number, number];
    addressText: string;
  };
  dropoffLocation: {
    type: 'Point';
    coordinates: [number, number];
    addressText: string;
  };
  distanceKm: number;
  estimatedMinutes: number;
  status: DeliveryStatus;
  dispatchMessage?: string;
  timeline: DeliveryTimelineEntry[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDeliveryParams {
  orderId: string;
  orderNumber: string;
  storeId: string;
  customerId: string;
  pickupLocation: {
    coordinates: [number, number];
    addressText: string;
  };
  dropoffLocation: {
    coordinates: [number, number];
    addressText: string;
  };
}

export interface IDeliveryRepository {
  create(params: CreateDeliveryParams): Promise<DeliveryResponseDto>;
  findByOrderId(orderId: string): Promise<DeliveryResponseDto | null>;
  findById(id: string): Promise<DeliveryResponseDto | null>;
  findByStoreId(storeId: string, page: number, limit: number): Promise<{ data: DeliveryResponseDto[]; total: number }>;
  findByRiderId(riderId: string, page: number, limit: number): Promise<{ data: DeliveryResponseDto[]; total: number }>;
  assignRider(orderId: string, rider: RiderInfoDto, estimatedMinutes: number, dispatchMessage?: string): Promise<DeliveryResponseDto | null>;
  updateStatus(orderId: string, status: DeliveryStatus, note?: string): Promise<DeliveryResponseDto | null>;
}

export interface IDeliveryService {
  initializeDelivery(params: CreateDeliveryParams): Promise<DeliveryResponseDto>;
  getTracking(orderId: string): Promise<DeliveryResponseDto | null>;
  assignRider(orderId: string, dto: AssignRiderDto): Promise<DeliveryResponseDto | null>;
  updateStatus(orderId: string, dto: UpdateDeliveryStatusDto, actorRole?: string): Promise<DeliveryResponseDto | null>;
  verifyOtpAndComplete(orderId: string, otp: string): Promise<DeliveryResponseDto | null>;
  calculateEta(pickup: [number, number], dropoff: [number, number]): { distanceKm: number; estimatedMinutes: number };
}

export interface IDeliveryFacade {
  getTracking(orderId: string): Promise<DeliveryResponseDto | null>;
  initiateDispatch(orderId: string, storeId: string, customerId: string): Promise<DeliveryResponseDto | null>;
  isDelivered(orderId: string): Promise<boolean>;
}
