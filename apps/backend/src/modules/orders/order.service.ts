import {
  OrderStatus,
  type CreateOrderDTO,
  type IOrderRepository,
  type IOrderService,
  type OrderResponse,
  type Page,
} from './order.types.js';
import { normalizeAddress } from './order.utils.js';
import { IEventBus } from '../../shared/events/eventBus.js';
import { EVENTS } from '../../shared/events/eventTypes.js';
import { AppError } from '../../shared/utils/AppError.js';
import type { IStoreFacade } from '../stores/index.js';
import type { ICatalogFacade } from '../catalog/index.js';

const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
  [OrderStatus.CONFIRMED]: [OrderStatus.PROCESSING, OrderStatus.CANCELLED],
  [OrderStatus.PROCESSING]: [OrderStatus.SHIPPED, OrderStatus.CANCELLED],
  [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED],
  [OrderStatus.DELIVERED]: [],
  [OrderStatus.CANCELLED]: [],
};

export function createOrderService(
  repo: IOrderRepository,
  bus?: IEventBus,
  storeFacade?: IStoreFacade,
  catalogFacade?: ICatalogFacade,
): IOrderService {
  async function createOrder(
    userId: string,
    dto: CreateOrderDTO,
    _correlationId?: string,
  ): Promise<OrderResponse> {
    if (!dto.items || dto.items.length === 0) {
      throw AppError.badRequest('Order must contain at least one item', 'EMPTY_ORDER');
    }

    // 1. Single-Store Invariant check
    const mismatch = dto.items.some((item) => item.storeId !== dto.storeId);
    if (mismatch) {
      throw AppError.badRequest(
        'All order items must belong to the specified store',
        'CART_STORE_MISMATCH',
      );
    }

    // 2. Verify store is active if storeFacade is provided
    if (storeFacade) {
      const isStoreActive = await storeFacade.isStoreActive(dto.storeId);
      if (!isStoreActive) {
        throw AppError.badRequest('The selected store is currently not accepting orders', 'STORE_INACTIVE');
      }
    }

    // 3. Check stock availability if catalogFacade is provided
    if (catalogFacade) {
      const stockCheck = await catalogFacade.checkStock(
        dto.items.map((i) => ({ productId: i.productId, sku: i.sku, quantity: i.quantity })),
      );
      if (!stockCheck.available) {
        throw AppError.badRequest(
          'One or more items in your cart are currently out of stock',
          'ITEMS_OUT_OF_STOCK',
        );
      }
    }

    // 4. Create order through repository
    const order = await repo.create({
      userId,
      ...dto,
      shippingAddress: normalizeAddress(dto.shippingAddress),
    });

    // 5. Emit asynchronous domain event
    if (bus) {
      bus.emit(EVENTS.ORDER_PLACED, {
        orderId: order.id,
        orderNumber: order.orderNumber,
        userId: order.userId,
        storeId: order.storeId,
        grandTotal: order.grandTotal,
        itemsCount: order.items.length,
      });
    }

    return order;
  }

  async function getOrderById(
    id: string,
    userId: string,
    isAdminOrMerchant: boolean,
  ): Promise<OrderResponse | null> {
    const order = await repo.findById(id);
    if (!order) return null;

    if (!isAdminOrMerchant && order.userId !== userId) {
      throw AppError.forbidden('You do not have access to this order', 'ORDER_ACCESS_DENIED');
    }

    return order;
  }

  async function getOrdersByUserId(
    userId: string,
    page = 1,
    limit = 10,
  ): Promise<Page<OrderResponse>> {
    return repo.findByUserId(userId, page, limit);
  }

  async function getOrdersByStoreId(
    storeId: string,
    page = 1,
    limit = 10,
  ): Promise<Page<OrderResponse>> {
    return repo.findByStoreId(storeId, page, limit);
  }

  async function getAllOrders(
    page = 1,
    limit = 10,
  ): Promise<Page<OrderResponse>> {
    return repo.findAll(page, limit);
  }

  async function updateOrderStatus(
    id: string,
    status: OrderStatus,
    actorUserId: string,
    otp?: string,
  ): Promise<OrderResponse | null> {
    const current = await repo.findById(id);
    if (!current) {
      throw AppError.notFound('Order not found', 'ORDER_NOT_FOUND');
    }

    // State machine guard
    if (!allowedTransitions[current.status].includes(status)) {
      throw AppError.badRequest(
        `Invalid order status transition: ${current.status} -> ${status}`,
        'INVALID_STATUS_TRANSITION',
      );
    }

    // Physical delivery OTP verification guard
    if (status === OrderStatus.DELIVERED) {
      if (!otp || current.deliveryOtp !== otp.trim()) {
        throw AppError.badRequest('Invalid or missing 4-digit delivery OTP', 'INVALID_DELIVERY_OTP');
      }
    }

    const updated = await repo.updateStatus(id, status);

    // Emit domain events
    if (bus && updated) {
      const payload = {
        orderId: updated.id,
        orderNumber: updated.orderNumber,
        previousStatus: current.status,
        newStatus: status,
        actorUserId,
      };

      if (status === OrderStatus.CONFIRMED) bus.emit(EVENTS.ORDER_CONFIRMED, payload);
      if (status === OrderStatus.CANCELLED) bus.emit(EVENTS.ORDER_CANCELLED, payload);
      if (status === OrderStatus.DELIVERED) bus.emit(EVENTS.ORDER_DELIVERED, payload);
    }

    return updated;
  }

  async function verifyDeliveryOtp(id: string, otp: string): Promise<boolean> {
    const order = await repo.findById(id);
    if (!order) return false;
    return order.deliveryOtp === otp.trim();
  }

  async function cancelOrder(
    id: string,
    userId: string,
    isAdmin: boolean,
  ): Promise<OrderResponse | null> {
    const current = await getOrderById(id, userId, isAdmin);
    if (!current) return null;

    if (
      current.status !== OrderStatus.PENDING &&
      current.status !== OrderStatus.CONFIRMED
    ) {
      throw AppError.badRequest('Order cannot be cancelled at its current status', 'CANNOT_CANCEL_ORDER');
    }

    return updateOrderStatus(id, OrderStatus.CANCELLED, userId);
  }

  return {
    createOrder,
    getOrderById,
    getOrdersByUserId,
    getOrdersByStoreId,
    getAllOrders,
    updateOrderStatus,
    verifyDeliveryOtp,
    cancelOrder,
  };
}
