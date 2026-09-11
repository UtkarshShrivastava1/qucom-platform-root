import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createNotificationService } from './notification.service.js';
import type { INotificationRepository, INotification } from './notification.types.js';
import type { IEventBus } from '../../shared/events/eventBus.js';
import { EVENTS } from '../../shared/events/eventTypes.js';

describe('NotificationService Unit Tests', () => {
  let mockRepo: INotificationRepository;
  let mockEventBus: IEventBus;
  let service: ReturnType<typeof createNotificationService>;

  const sampleNotification: INotification = {
    id: 'notif-1',
    recipientId: 'store-123',
    recipientRole: 'merchant',
    category: 'order',
    title: 'New Order Received',
    message: 'Order #ORD-1001 placed for ₹999.',
    data: { orderId: 'ord-1' },
    isRead: false,
    readAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    mockRepo = {
      create: vi.fn().mockResolvedValue(sampleNotification),
      findById: vi.fn().mockResolvedValue(sampleNotification),
      findMany: vi.fn().mockResolvedValue({
        notifications: [sampleNotification],
        total: 1,
      }),
      markAsRead: vi.fn().mockResolvedValue({ ...sampleNotification, isRead: true, readAt: new Date() }),
      markAllAsRead: vi.fn().mockResolvedValue(3),
      getUnreadSummary: vi.fn().mockResolvedValue({
        total: 4,
        byCategory: { order: 3, inventory: 1, system: 0, promo: 0 },
      }),
    };

    mockEventBus = {
      emit: vi.fn().mockReturnValue(true),
      on: vi.fn().mockReturnThis(),
      off: vi.fn().mockReturnThis(),
    };

    service = createNotificationService(mockRepo, mockEventBus);
  });

  it('should create notification and emit NOTIFICATION_CREATED domain event', async () => {
    const created = await service.createNotification({
      recipientId: 'store-123',
      recipientRole: 'merchant',
      category: 'order',
      title: 'New Order Received',
      message: 'Order #ORD-1001 placed for ₹999.',
      data: { orderId: 'ord-1' },
    });

    expect(mockRepo.create).toHaveBeenCalledOnce();
    expect(created.id).toBe('notif-1');
    expect(mockEventBus.emit).toHaveBeenCalledWith(
      EVENTS.NOTIFICATION_CREATED,
      expect.objectContaining({
        notificationId: 'notif-1',
        recipientId: 'store-123',
        title: 'New Order Received',
      }),
    );
  });

  it('should fetch paginated notifications and calculate totalPages and unreadSummary', async () => {
    const result = await service.getNotifications('store-123', {
      category: 'all',
      page: 1,
      limit: 10,
    });

    expect(mockRepo.findMany).toHaveBeenCalledWith(
      { recipientId: 'store-123', category: 'all', isRead: undefined },
      { page: 1, limit: 10 },
    );
    expect(result.notifications).toHaveLength(1);
    expect(result.total).toBe(1);
    expect(result.totalPages).toBe(1);
    expect(result.unreadSummary.total).toBe(4);
    expect(result.unreadSummary.byCategory.order).toBe(3);
  });

  it('should mark a notification as read', async () => {
    const updated = await service.markAsRead('notif-1', 'store-123');

    expect(mockRepo.markAsRead).toHaveBeenCalledWith('notif-1', 'store-123');
    expect(updated.isRead).toBe(true);
  });

  it('should throw NOTIFICATION_NOT_FOUND when marking a non-existent notification as read', async () => {
    (mockRepo.markAsRead as any).mockResolvedValue(null);

    await expect(service.markAsRead('missing-id', 'store-123')).rejects.toThrow(
      'Notification missing-id not found or access denied',
    );
  });

  it('should mark all notifications as read for a recipient and category', async () => {
    const res = await service.markAllAsRead('store-123', 'order');

    expect(mockRepo.markAllAsRead).toHaveBeenCalledWith('store-123', 'order');
    expect(res.markedCount).toBe(3);
  });

  it('should get unread notification summary breakdown', async () => {
    const summary = await service.getUnreadSummary('store-123');

    expect(mockRepo.getUnreadSummary).toHaveBeenCalledWith('store-123');
    expect(summary.total).toBe(4);
    expect(summary.byCategory.inventory).toBe(1);
  });
});
