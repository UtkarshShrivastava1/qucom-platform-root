/**
 * DELIVERY MODULE — Public Facade
 * ONLY file other modules and app.ts may import from delivery/
 */
import { createDeliveryModule } from './delivery.module.js';
import type { IDeliveryFacade, DeliveryResponseDto } from './delivery.types.js';

const defaultModule = createDeliveryModule();

export const deliveryRouter = defaultModule.router;
export const deliveryService = defaultModule.service;
export const deliveryRepository = defaultModule.repository;

export const deliveryModule: IDeliveryFacade = {
  getTracking: async (orderId: string): Promise<DeliveryResponseDto | null> => {
    return deliveryService.getTracking(orderId);
  },
  initiateDispatch: async (
    orderId: string,
    storeId: string,
    customerId: string,
  ): Promise<DeliveryResponseDto | null> => {
    return deliveryService.initializeDelivery({
      orderId,
      orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
      storeId,
      customerId,
      pickupLocation: {
        coordinates: [72.8777, 19.076],
        addressText: 'Store Local Depot',
      },
      dropoffLocation: {
        coordinates: [72.885, 19.085],
        addressText: 'Customer Delivery Address',
      },
    });
  },
  isDelivered: async (orderId: string): Promise<boolean> => {
    const tracking = await deliveryService.getTracking(orderId);
    return tracking?.status === 'DELIVERED';
  },
};

export { createDeliveryModule };
export * from './delivery.types.js';
export * from './delivery.validator.js';
export { DeliveryModel } from './delivery.model.js';
