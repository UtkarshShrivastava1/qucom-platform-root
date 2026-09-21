import { describe, it, expect, vi, beforeEach } from 'vitest';
import { idempotency } from '../../../shared/middlewares/idempotency.middleware.js';
import { appendOutboxEvent } from '../../../shared/database/outbox.service.js';
import { orderQueue, deadLetterQueue } from '../../../shared/queues/order.queue.js';
import { Request, Response } from 'express';

describe('Tier 2 Enterprise Hardening Suite (Orders & Distributed Primitives)', () => {
  describe('Transactional Outbox Pattern', () => {
    it('appends outbound domain events with correct metadata and PENDING state', async () => {
      const event = await appendOutboxEvent({
        eventType: 'ORDER_CREATED',
        schemaVersion: 1,
        aggregateId: 'ord-ent-999',
        aggregateType: 'Order',
        correlationId: 'trace-corr-999',
        payload: {
          grandTotal: 1499,
          itemsCount: 3,
        },
      });

      expect(event).toBeDefined();
      expect(event.eventType).toBe('ORDER_CREATED');
      expect(event.schemaVersion).toBe(1);
      expect(event.correlationId).toBe('trace-corr-999');
      expect(event.aggregateId).toBe('ord-ent-999');
      expect(event.status).toBe('PENDING');
    });

    it('enforces schemaVersion and correlationId propagation', async () => {
      const event = await appendOutboxEvent({
        eventType: 'ORDER_STATUS_UPDATED',
        schemaVersion: 2,
        aggregateId: 'ord-ent-888',
        correlationId: 'trace-v2-abc',
        payload: { previousStatus: 'PENDING', newStatus: 'CONFIRMED' },
      });

      expect(event.schemaVersion).toBe(2);
      expect(event.correlationId).toBe('trace-v2-abc');
    });
  });

  describe('Distributed Idempotency Engine', () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let next: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      mockReq = {
        headers: {},
      };
      mockRes = {
        statusCode: 200,
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
        setHeader: vi.fn().mockReturnThis(),
      };
      next = vi.fn();
    });

    it('passes through normally when x-idempotency-key is absent', async () => {
      const middleware = idempotency();
      await middleware(mockReq as Request, mockRes as Response, next);
      expect(next).toHaveBeenCalledTimes(1);
    });

    it('intercepts and caches response on first call, then replays on duplicate call', async () => {
      const middleware = idempotency({ ttlSeconds: 60 });
      mockReq.headers = { 'x-idempotency-key': 'test-idem-key-123' };

      // First call -> sets processing, calls next
      await middleware(mockReq as Request, mockRes as Response, next);
      expect(next).toHaveBeenCalledTimes(1);

      // Simulate handler finishing and sending response
      mockRes.statusCode = 201;
      mockRes.json!({ orderId: 'ord-123', status: 'created' });

      // Second call with same idempotency key -> should replay cached response without calling next
      const secondRes: Partial<Response> = {
        statusCode: 200,
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
        setHeader: vi.fn().mockReturnThis(),
      };
      const secondNext = vi.fn();

      await middleware(mockReq as Request, secondRes as Response, secondNext);
      expect(secondNext).not.toHaveBeenCalled();
      expect(secondRes.setHeader).toHaveBeenCalledWith('x-idempotency-replayed', 'true');
      expect(secondRes.status).toHaveBeenCalledWith(201);
      expect(secondRes.json).toHaveBeenCalledWith({ orderId: 'ord-123', status: 'created' });
    });
  });

  describe('BullMQ & Dead Letter Queue (DLQ) Topology', () => {
    it('exposes order-lifecycle queue and dead-letter queue instances', () => {
      expect(orderQueue).toBeDefined();
      expect(deadLetterQueue).toBeDefined();
    });

    it('successfully enqueues jobs to the order queue', async () => {
      const job = await orderQueue.add('ORDER_CREATED', {
        aggregateId: 'ord-ent-100',
        payload: { storeId: 'store-456' },
      });

      expect(job).toBeDefined();
      expect(job.name).toBe('ORDER_CREATED');
    });
  });

  describe('Atomic Compare-and-Swap (CAS) State Guard & Audit Ledger', () => {
    it('appends audit log entries and prevents concurrent state transitions when state changes', async () => {
      const { OrderStatus } = await import('../order.types.js');
      const mockRepo: any = {
        findById: vi.fn().mockResolvedValue({
          id: 'ord-cas-1',
          status: OrderStatus.PENDING,
          deliveryOtp: '1234',
        }),
        updateStatus: vi.fn().mockResolvedValue(null), // Simulates CAS condition failure (concurrent write won)
      };

      const { createOrderService } = await import('../order.service.js');
      const service = createOrderService(mockRepo);

      await expect(
        service.updateOrderStatus('ord-cas-1', OrderStatus.CONFIRMED, 'user-admin-1', undefined, 'trace-cas-1'),
      ).rejects.toThrow(/Order status was modified concurrently/);

      expect(mockRepo.updateStatus).toHaveBeenCalledWith(
        'ord-cas-1',
        OrderStatus.CONFIRMED,
        expect.objectContaining({
          expectedCurrentStatus: OrderStatus.PENDING,
          auditEntry: expect.objectContaining({
            fromStatus: OrderStatus.PENDING,
            toStatus: OrderStatus.CONFIRMED,
            changedBy: 'user-admin-1',
          }),
        }),
      );
    });
  });
});
