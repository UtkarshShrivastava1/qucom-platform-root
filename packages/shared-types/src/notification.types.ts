import { z } from 'zod';

export const NOTIFICATION_CATEGORIES = ['order', 'inventory', 'system', 'promo'] as const;
export type NotificationCategory = (typeof NOTIFICATION_CATEGORIES)[number];

export const NOTIFICATION_RECIPIENT_ROLES = ['customer', 'merchant', 'admin'] as const;
export type NotificationRecipientRole = (typeof NOTIFICATION_RECIPIENT_ROLES)[number];

export const NOTIFICATION_CHANNELS = ['in_app', 'socket', 'whatsapp', 'sms'] as const;
export type NotificationChannel = (typeof NOTIFICATION_CHANNELS)[number];

export interface INotification {
  id: string;
  recipientId: string;
  recipientRole: NotificationRecipientRole;
  category: NotificationCategory;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  isRead: boolean;
  readAt?: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface NotificationUnreadSummary {
  total: number;
  byCategory: {
    order: number;
    inventory: number;
    system: number;
    promo: number;
  };
}

export const queryNotificationsSchema = z.object({
  category: z.enum(['all', ...NOTIFICATION_CATEGORIES]).optional().default('all'),
  isRead: z
    .string()
    .optional()
    .transform((val) => {
      if (val === 'true') return true;
      if (val === 'false') return false;
      return undefined;
    }),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(20),
});

export type QueryNotificationsDto = z.infer<typeof queryNotificationsSchema>;

export const createNotificationSchema = z.object({
  recipientId: z.string().min(1, 'Recipient ID is required'),
  recipientRole: z.enum(NOTIFICATION_RECIPIENT_ROLES),
  category: z.enum(NOTIFICATION_CATEGORIES),
  title: z.string().min(2, 'Title is required').max(150),
  message: z.string().min(2, 'Message is required').max(500),
  data: z.record(z.unknown()).optional(),
});

export type CreateNotificationDto = z.infer<typeof createNotificationSchema>;
