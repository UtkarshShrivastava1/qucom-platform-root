import type {
  INotification,
  NotificationCategory,
  NotificationRecipientRole,
  NotificationUnreadSummary,
  QueryNotificationsDto,
  CreateNotificationDto,
} from '@repo/shared-types';

export type {
  INotification,
  NotificationCategory,
  NotificationRecipientRole,
  NotificationUnreadSummary,
  QueryNotificationsDto,
  CreateNotificationDto,
};

export interface NotificationFilter {
  recipientId: string;
  category?: NotificationCategory | 'all';
  isRead?: boolean;
}

export interface INotificationRepository {
  create(data: Omit<INotification, 'id' | 'createdAt' | 'updatedAt'>): Promise<INotification>;
  findById(id: string): Promise<INotification | null>;
  findMany(
    filter: NotificationFilter,
    pagination: { page: number; limit: number }
  ): Promise<{ notifications: INotification[]; total: number }>;
  markAsRead(id: string, recipientId: string): Promise<INotification | null>;
  markAllAsRead(recipientId: string, category?: NotificationCategory | 'all'): Promise<number>;
  getUnreadSummary(recipientId: string): Promise<NotificationUnreadSummary>;
}

export interface INotificationService {
  getNotifications(
    recipientId: string,
    query: QueryNotificationsDto
  ): Promise<{
    notifications: INotification[];
    total: number;
    page: number;
    totalPages: number;
    unreadSummary: NotificationUnreadSummary;
  }>;
  markAsRead(id: string, recipientId: string): Promise<INotification>;
  markAllAsRead(
    recipientId: string,
    category?: NotificationCategory | 'all'
  ): Promise<{ markedCount: number }>;
  getUnreadSummary(recipientId: string): Promise<NotificationUnreadSummary>;
  createNotification(dto: CreateNotificationDto): Promise<INotification>;
}

export interface INotificationFacade {
  create(dto: CreateNotificationDto): Promise<INotification>;
  getUnreadSummary(recipientId: string): Promise<NotificationUnreadSummary>;
}
