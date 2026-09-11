import type { Model } from 'mongoose';
import type {
  INotification,
  INotificationRepository,
  NotificationFilter,
  NotificationUnreadSummary,
  NotificationCategory,
} from './notification.types.js';
import type { INotificationDocument } from './notification.model.js';

function toDto(doc: any): INotification {
  return {
    id: doc._id ? String(doc._id) : String(doc.id),
    recipientId: doc.recipientId,
    recipientRole: doc.recipientRole,
    category: doc.category,
    title: doc.title,
    message: doc.message,
    data: doc.data,
    isRead: Boolean(doc.isRead),
    readAt: doc.readAt ? new Date(doc.readAt) : null,
    createdAt: doc.createdAt ? new Date(doc.createdAt) : new Date(),
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
  };
}

export function createNotificationRepository(
  model: Model<INotificationDocument>,
): INotificationRepository {
  async function create(
    data: Omit<INotification, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<INotification> {
    const doc = new model({
      ...data,
      isRead: false,
      readAt: null,
    });
    const saved = await doc.save();
    return toDto(saved);
  }

  async function findById(id: string): Promise<INotification | null> {
    const doc = await model.findById(id).read('secondaryPreferred');
    return doc ? toDto(doc) : null;
  }

  async function findMany(
    filter: NotificationFilter,
    pagination: { page: number; limit: number },
  ): Promise<{ notifications: INotification[]; total: number }> {
    const query: Record<string, unknown> = { recipientId: filter.recipientId };

    if (filter.category && filter.category !== 'all') {
      query.category = filter.category;
    }

    if (filter.isRead !== undefined) {
      query.isRead = filter.isRead;
    }

    const skip = (pagination.page - 1) * pagination.limit;

    const [docs, total] = await Promise.all([
      model
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pagination.limit)
        .read('secondaryPreferred')
        .lean(),
      model.countDocuments(query),
    ]);

    return {
      notifications: docs.map(toDto),
      total,
    };
  }

  async function markAsRead(id: string, recipientId: string): Promise<INotification | null> {
    const updated = await model.findOneAndUpdate(
      { _id: id, recipientId },
      { isRead: true, readAt: new Date() },
      { new: true },
    );
    return updated ? toDto(updated) : null;
  }

  async function markAllAsRead(
    recipientId: string,
    category?: NotificationCategory | 'all',
  ): Promise<number> {
    const query: Record<string, unknown> = { recipientId, isRead: false };
    if (category && category !== 'all') {
      query.category = category;
    }

    const res = await model.updateMany(query, {
      isRead: true,
      readAt: new Date(),
    });

    return res.modifiedCount;
  }

  async function getUnreadSummary(recipientId: string): Promise<NotificationUnreadSummary> {
    const agg = await model
      .aggregate([
        { $match: { recipientId, isRead: false } },
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
          },
        },
      ])
      .read('secondaryPreferred');

    const byCategory = {
      order: 0,
      inventory: 0,
      system: 0,
      promo: 0,
    };

    let total = 0;
    for (const item of agg) {
      if (item._id in byCategory) {
        byCategory[item._id as keyof typeof byCategory] = item.count;
        total += item.count;
      }
    }

    return { total, byCategory };
  }

  return {
    create,
    findById,
    findMany,
    markAsRead,
    markAllAsRead,
    getUnreadSummary,
  };
}
