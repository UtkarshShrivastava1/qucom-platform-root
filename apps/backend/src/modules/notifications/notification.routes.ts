import { Router } from 'express';
import { UserRole } from '@repo/shared-types';
import type { NotificationController } from './notification.controller.js';
import { authGuard } from '../../shared/middlewares/authGuard.js';
import { roleGuard } from '../../shared/middlewares/roleGuard.js';

export function createNotificationRouter(controller: NotificationController): Router {
  const router = Router();

  // All notification endpoints require authenticated session
  router.use(authGuard);

  // Read endpoints
  router.get('/unread-summary', controller.getUnreadSummary);
  router.get('/', controller.getNotifications);

  // Mutation endpoints
  router.patch('/read-all', controller.markAllAsRead);
  router.patch('/:id/read', controller.markAsRead);

  // Admin broadcast / manual creation
  router.post('/', roleGuard(UserRole.ADMIN), controller.createNotification);

  return router;
}
