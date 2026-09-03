import type { Router } from 'express';
import { OrderModel } from './order.model.js';
import { createOrderRepository } from './order.repository.js';
import { createOrderService } from './order.service.js';
import { createOrderController } from './order.controller.js';
import { createOrderRouter } from './order.routes.js';
import { eventBus, type IEventBus } from '../../shared/events/eventBus.js';
import { EVENTS } from '../../shared/events/eventTypes.js';
import { storeModule, type IStoreFacade } from '../stores/index.js';
import { catalogModule, type ICatalogFacade } from '../catalog/index.js';
import { OrderStatus, type IOrderRepository, type IOrderService } from './order.types.js';
import { logger } from '../../shared/utils/logger.js';

export interface OrderModule {
  router: Router;
  service: IOrderService;
  repository: IOrderRepository;
}

export function createOrderModule(
  events: IEventBus = eventBus,
  stores: IStoreFacade = storeModule,
  catalog: ICatalogFacade = catalogModule,
): OrderModule {
  const repository = createOrderRepository(OrderModel);
  const service = createOrderService(repository, events, stores, catalog);
  const controller = createOrderController(service);
  const router = createOrderRouter(controller);

  // Asynchronous event listeners for orders domain
  events.on(EVENTS.PAYMENT_SUCCEEDED, async ({ orderId }) => {
    try {
      logger.info(`[OrderModule] Payment succeeded, confirming order: ${orderId}`);
      await service.updateOrderStatus(orderId, OrderStatus.CONFIRMED, 'system');
    } catch (error) {
      logger.error(`[OrderModule] Failed to auto-confirm order on payment: ${error instanceof Error ? error.message : String(error)}`);
    }
  });

  return { router, service, repository };
}
