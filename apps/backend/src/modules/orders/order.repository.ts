import type { Model, ClientSession } from 'mongoose';
import {
  calculateGrandTotal,
  calculateShippingFee,
  calculateSubtotal,
  calculateTax,
  generateDeliveryOtp,
  generateOrderNumber,
  isValidObjectId,
} from './order.utils.js';
import {
  OrderStatus,
  type CreateOrderDTO,
  type IOrderRepository,
  type IOrderStatusHistoryEntry,
  type OrderDocument,
  type OrderResponse,
  type Page,
} from './order.types.js';

export function createOrderRepository(
  model: Model<OrderDocument>,
): IOrderRepository {
  function toResponse(order: OrderDocument | (OrderDocument & { _id: unknown })): OrderResponse {
    const raw = typeof (order as OrderDocument).toObject === 'function' ? (order as OrderDocument).toObject() : order;
    return {
      id: raw._id ? String(raw._id) : (raw as unknown as { id: string }).id,
      orderNumber: raw.orderNumber,
      userId: raw.userId,
      storeId: raw.storeId,
      items: raw.items,
      shippingAddress: raw.shippingAddress,
      subtotal: raw.subtotal,
      tax: raw.tax,
      shippingFee: raw.shippingFee,
      grandTotal: raw.grandTotal,
      status: raw.status,
      statusHistory: (raw.statusHistory as unknown as IOrderStatusHistoryEntry[]) || [],
      deliveryOtp: raw.deliveryOtp,
      deliveredAt: raw.deliveredAt,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }

  async function create(
    dto: CreateOrderDTO & { userId: string },
    options?: { session?: ClientSession },
  ): Promise<OrderResponse> {
    const subtotal = calculateSubtotal(dto.items);
    const tax = calculateTax(subtotal);
    const shippingFee = calculateShippingFee(subtotal);
    const grandTotal = calculateGrandTotal(subtotal, tax, shippingFee);

    const initialAudit: IOrderStatusHistoryEntry = {
      fromStatus: OrderStatus.PENDING,
      toStatus: OrderStatus.PENDING,
      changedBy: dto.userId,
      timestamp: new Date(),
      note: 'Initial order placement',
    };

    const docs = await model.create(
      [
        {
          ...dto,
          orderNumber: generateOrderNumber(),
          deliveryOtp: generateDeliveryOtp(),
          subtotal,
          tax,
          shippingFee,
          grandTotal,
          status: OrderStatus.PENDING,
          statusHistory: [initialAudit],
        },
      ],
      { session: options?.session }
    );

    return toResponse(docs[0]!);
  }

  async function findById(
    id: string,
    options?: { session?: ClientSession },
  ): Promise<OrderResponse | null> {
    if (isValidObjectId(id)) {
      const query = model.findById(id);
      if (options?.session) {
        query.session(options.session);
      } else {
        query.read('secondaryPreferred');
      }
      const order = await query.exec();
      if (order) return toResponse(order);
    }
    return findByOrderNumber(id, options);
  }

  async function findByOrderNumber(
    orderNumber: string,
    options?: { session?: ClientSession },
  ): Promise<OrderResponse | null> {
    const cleanNumber = orderNumber.replace(/^#+/, '');
    const query = model.findOne({
      $or: [{ orderNumber: cleanNumber }, { orderNumber: `#${cleanNumber}` }],
    });
    if (options?.session) {
      query.session(options.session);
    } else {
      query.read('secondaryPreferred');
    }
    const order = await query.exec();
    return order ? toResponse(order) : null;
  }

  async function findByUserId(
    userId: string,
    page: number,
    limit: number,
  ): Promise<Page<OrderResponse>> {
    const safePage = Math.max(1, page);
    const safeLimit = Math.min(100, Math.max(1, limit));

    const [rows, total] = await Promise.all([
      model
        .find({ userId })
        .read('secondaryPreferred')
        .sort({ createdAt: -1 })
        .skip((safePage - 1) * safeLimit)
        .limit(safeLimit),
      model.countDocuments({ userId }),
    ]);

    return {
      data: rows.map(toResponse),
      pagination: {
        page: safePage,
        limit: safeLimit,
        total,
        hasNext: safePage * safeLimit < total,
      },
    };
  }

  async function findByStoreId(
    storeId: string,
    page: number,
    limit: number,
  ): Promise<Page<OrderResponse>> {
    const safePage = Math.max(1, page);
    const safeLimit = Math.min(100, Math.max(1, limit));

    const [rows, total] = await Promise.all([
      model
        .find({ storeId })
        .read('secondaryPreferred')
        .sort({ createdAt: -1 })
        .skip((safePage - 1) * safeLimit)
        .limit(safeLimit),
      model.countDocuments({ storeId }),
    ]);

    return {
      data: rows.map(toResponse),
      pagination: {
        page: safePage,
        limit: safeLimit,
        total,
        hasNext: safePage * safeLimit < total,
      },
    };
  }

  async function findAll(
    page: number,
    limit: number,
  ): Promise<Page<OrderResponse>> {
    const safePage = Math.max(1, page);
    const safeLimit = Math.min(100, Math.max(1, limit));

    const [rows, total] = await Promise.all([
      model
        .find()
        .read('secondaryPreferred')
        .sort({ createdAt: -1 })
        .skip((safePage - 1) * safeLimit)
        .limit(safeLimit),

      model.countDocuments(),
    ]);

    return {
      data: rows.map(toResponse),
      pagination: {
        page: safePage,
        limit: safeLimit,
        total,
        hasNext: safePage * safeLimit < total,
      },
    };
  }

  async function updateStatus(
    id: string,
    status: OrderStatus,
    options?: {
      session?: ClientSession;
      expectedCurrentStatus?: OrderStatus;
      auditEntry?: IOrderStatusHistoryEntry;
    },
  ): Promise<OrderResponse | null> {
    if (!isValidObjectId(id)) return null;

    const filter: Record<string, unknown> = { _id: id };
    if (options?.expectedCurrentStatus) {
      filter.status = options.expectedCurrentStatus;
    }

    const updateDoc: Record<string, unknown> = {
      $set: {
        status,
        ...(status === OrderStatus.DELIVERED ? { deliveredAt: new Date() } : {}),
      },
    };

    if (options?.auditEntry) {
      updateDoc.$push = {
        statusHistory: options.auditEntry,
      };
    }

    const order = await model.findOneAndUpdate(
      filter,
      updateDoc,
      { new: true, session: options?.session },
    );
    return order ? toResponse(order) : null;
  }

  return {
    create,
    findById,
    findByOrderNumber,
    findByUserId,
    findByStoreId,
    findAll,
    updateStatus,
  };
}
