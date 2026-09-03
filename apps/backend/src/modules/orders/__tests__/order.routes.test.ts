import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import express, { type Application } from 'express';
import { createOrderRouter } from '../order.routes.js';
import { createOrderController } from '../order.controller.js';
import type { IOrderService, OrderResponse } from '../order.types.js';
import { errorHandler } from '../../../shared/middlewares/errorHandler.js';

function buildFakeService(): IOrderService {
  return {
    createOrder: vi.fn(),
    getOrderById: vi.fn(),
    getOrdersByUserId: vi.fn(),
    getOrdersByStoreId: vi.fn(),
    getAllOrders: vi.fn(),
    updateOrderStatus: vi.fn(),
    verifyDeliveryOtp: vi.fn(),
    cancelOrder: vi.fn(),
  };
}

function buildTestApp(fakeService: IOrderService): Application {
  const app = express();
  app.use(express.json());

  // Inject fake auth context
  app.use((req: any, _res, next) => {
    req.correlationId = 'test-corr-123';
    req.user = {
      id: req.headers['x-user-id'] || 'user-123',
      role: req.headers['x-role'] || 'customer',
      email: 'customer@test.com',
    };
    next();
  });

  const controller = createOrderController(fakeService);
  const bypassGuard = (_req: any, _res: any, next: any) => next();
  app.use('/api/v1/orders', createOrderRouter(controller, bypassGuard));
  app.use(errorHandler);

  return app;
}

const mockOrderResponse: OrderResponse = {
  id: '507f1f77bcf86cd799439011',
  orderNumber: 'ORD-20260903-ABCDEF',
  userId: 'user-123',
  storeId: 'store-456',
  items: [
    { productId: 'p1', sku: 'S1', name: 'Fresh Milk', quantity: 2, unitPrice: 30, storeId: 'store-456' },
  ],
  shippingAddress: {
    fullName: 'Jane Doe',
    street: '45 MG Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560001',
    country: 'IN',
    phone: '9876543210',
  },
  subtotal: 60,
  tax: 3,
  shippingFee: 49,
  grandTotal: 112,
  status: 'PENDING' as any,
  deliveryOtp: '1234',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('Order Routes (HTTP Integration Tests via Supertest)', () => {
  it('POST /api/v1/orders - 201 on valid order creation', async () => {
    const fakeService = buildFakeService();
    vi.mocked(fakeService.createOrder).mockResolvedValue(mockOrderResponse);

    const app = buildTestApp(fakeService);
    const res = await request(app)
      .post('/api/v1/orders')
      .set('x-user-id', 'user-123')
      .send({
        storeId: 'store-456',
        items: mockOrderResponse.items,
        shippingAddress: mockOrderResponse.shippingAddress,
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe('507f1f77bcf86cd799439011');
    expect(fakeService.createOrder).toHaveBeenCalledWith(
      'user-123',
      expect.objectContaining({ storeId: 'store-456' }),
      'test-corr-123',
    );
  });

  it('GET /api/v1/orders/:id - 200 on success', async () => {
    const fakeService = buildFakeService();
    vi.mocked(fakeService.getOrderById).mockResolvedValue(mockOrderResponse);

    const app = buildTestApp(fakeService);
    const res = await request(app)
      .get('/api/v1/orders/507f1f77bcf86cd799439011')
      .set('x-user-id', 'user-123');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.orderNumber).toBe('ORD-20260903-ABCDEF');
  });

  it('POST /api/v1/orders/:id/verify-otp - 200 with validity result', async () => {
    const fakeService = buildFakeService();
    vi.mocked(fakeService.verifyDeliveryOtp).mockResolvedValue(true);

    const app = buildTestApp(fakeService);
    const res = await request(app)
      .post('/api/v1/orders/507f1f77bcf86cd799439011/verify-otp')
      .send({ otp: '1234' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.valid).toBe(true);
  });

  it('POST /api/v1/orders/:id/cancel - 200 on successful cancellation', async () => {
    const fakeService = buildFakeService();
    vi.mocked(fakeService.cancelOrder).mockResolvedValue({
      ...mockOrderResponse,
      status: 'CANCELLED' as any,
    });

    const app = buildTestApp(fakeService);
    const res = await request(app)
      .post('/api/v1/orders/507f1f77bcf86cd799439011/cancel')
      .set('x-user-id', 'user-123');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('CANCELLED');
  });
});
