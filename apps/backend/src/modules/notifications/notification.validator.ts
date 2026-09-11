import { z } from 'zod';

export {
  queryNotificationsSchema,
  createNotificationSchema,
  type QueryNotificationsDto,
  type CreateNotificationDto,
} from '@repo/shared-types';

export const notificationIdParamSchema = z.object({
  id: z.string().min(1, 'Notification ID is required'),
});

export const markAllReadSchema = z.object({
  category: z.enum(['all', 'order', 'inventory', 'system', 'promo']).optional().default('all'),
});
