import type {
  INotification,
  INotificationRepository,
  INotificationService,
  NotificationUnreadSummary,
  QueryNotificationsDto,
  CreateNotificationDto,
  NotificationCategory,
} from './notification.types.js';
import { AppError } from '../../shared/utils/AppError.js';
import { eventBus, type IEventBus } from '../../shared/events/eventBus.js';
import { EVENTS } from '../../shared/events/eventTypes.js';
import { logger } from '../../shared/utils/logger.js';

export function createNotificationService(
  repository: INotificationRepository,
  bus: IEventBus = eventBus,
): INotificationService {
  async function createNotification(dto: CreateNotificationDto): Promise<INotification> {
    const notification = await repository.create({
      recipientId: dto.recipientId,
      recipientRole: dto.recipientRole,
      category: dto.category,
      title: dto.title,
      message: dto.message,
      data: dto.data,
      isRead: false,
      readAt: null,
    });

    // Emit domain event for real-time Socket.io broadcasting
    bus.emit(EVENTS.NOTIFICATION_CREATED, {
      notificationId: notification.id,
      recipientId: notification.recipientId,
      recipientRole: notification.recipientRole,
      category: notification.category,
      title: notification.title,
      message: notification.message,
      data: notification.data,
      createdAt: notification.createdAt,
    });

    logger.debug(`[NotificationService] Created notification ${notification.id} for ${dto.recipientRole}:${dto.recipientId}`);
    return notification;
  }

  async function getNotifications(
    recipientId: string,
    query: QueryNotificationsDto,
  ): Promise<{
    notifications: INotification[];
    total: number;
    page: number;
    totalPages: number;
    unreadSummary: NotificationUnreadSummary;
  }> {
    const page = query.page || 1;
    const limit = query.limit || 20;

    const [result, unreadSummary] = await Promise.all([
      repository.findMany(
        {
          recipientId,
          category: query.category,
          isRead: query.isRead,
        },
        { page, limit },
      ),
      repository.getUnreadSummary(recipientId),
    ]);

    return {
      notifications: result.notifications,
      total: result.total,
      page,
      totalPages: Math.ceil(result.total / limit) || 1,
      unreadSummary,
    };
  }

  async function markAsRead(id: string, recipientId: string): Promise<INotification> {
    const notification = await repository.markAsRead(id, recipientId);
    if (!notification) {
      throw new AppError(404, 'NOTIFICATION_NOT_FOUND', `Notification ${id} not found or access denied`);
    }
    return notification;
  }

  async function markAllAsRead(
    recipientId: string,
    category?: NotificationCategory | 'all',
  ): Promise<{ markedCount: number }> {
    const markedCount = await repository.markAllAsRead(recipientId, category);
    return { markedCount };
  }

  async function getUnreadSummary(recipientId: string): Promise<NotificationUnreadSummary> {
    return repository.getUnreadSummary(recipientId);
  }

  return {
    createNotification,
    getNotifications,
    markAsRead,
    markAllAsRead,
    getUnreadSummary,
  };
}
