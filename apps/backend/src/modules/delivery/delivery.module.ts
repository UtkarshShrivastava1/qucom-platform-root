import type { Router } from 'express';
import { DeliveryModel } from './delivery.model.js';
import { createDeliveryRepository } from './delivery.repository.js';
import { createDeliveryService } from './delivery.service.js';
import { createDeliveryController } from './delivery.controller.js';
import { createDeliveryRouter } from './delivery.routes.js';
import { eventBus, type IEventBus } from '../../shared/events/eventBus.js';
import { EVENTS } from '../../shared/events/eventTypes.js';
import { orderModule, type IOrderFacade } from '../orders/index.js';
import type { IDeliveryRepository, IDeliveryService } from './delivery.types.js';
import { logger } from '../../shared/utils/logger.js';

export interface DeliveryModule {
  router: Router;
  service: IDeliveryService;
  repository: IDeliveryRepository;
}

export function createDeliveryModule(
  events: IEventBus = eventBus,
  orders: IOrderFacade = orderModule,
): DeliveryModule {
  const repository = createDeliveryRepository(DeliveryModel);
  const service = createDeliveryService(repository, events, orders);
  const controller = createDeliveryController(service);
  const router = createDeliveryRouter(controller);

  // Asynchronous event reaction: When order is confirmed, initialize delivery record
  events.on(EVENTS.ORDER_CONFIRMED, async ({ orderId, orderNumber }) => {
    try {
      logger.info(`[DeliveryModule] Order #${orderNumber} confirmed. Initializing dispatch...`);
      await service.initializeDelivery({
        orderId,
        orderNumber,
        storeId: 'store-dispatch-placeholder',
        customerId: 'customer-placeholder',
        pickupLocation: {
          coordinates: [72.8777, 19.076], // Default Mumbai hub
          addressText: 'Store Local Depot',
        },
        dropoffLocation: {
          coordinates: [72.885, 19.085], // ~1.5km delivery dropoff
          addressText: 'Customer Delivery Address',
        },
      });
    } catch (err) {
      logger.warn(`[DeliveryModule] Failed to auto-initialize delivery on order confirmation: ${err instanceof Error ? err.message : String(err)}`);
    }
  });

  return { router, service, repository };
}
