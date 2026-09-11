import mongoose, { Schema, Model, Document } from 'mongoose';
import type { INotification } from './notification.types.js';

export interface INotificationDocument extends Omit<INotification, 'id'>, Document {}

const notificationSchema = new Schema<INotificationDocument>(
  {
    recipientId: { type: String, required: true, index: true },
    recipientRole: {
      type: String,
      enum: ['customer', 'merchant', 'admin'],
      required: true,
      index: true,
    },
    category: {
      type: String,
      enum: ['order', 'inventory', 'system', 'promo'],
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    data: { type: Schema.Types.Mixed },
    isRead: { type: Boolean, default: false, index: true },
    readAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret: Record<string, any>) {
        ret.id = ret._id ? ret._id.toString() : '';
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

// Compound ESR Indexes (structure.md Pillar 7: Equality, Sort, Range)
notificationSchema.index({ recipientId: 1, recipientRole: 1, category: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ recipientId: 1, isRead: 1, createdAt: -1 });

export const NotificationModel: Model<INotificationDocument> =
  mongoose.models.Notification ||
  mongoose.model<INotificationDocument>('Notification', notificationSchema);
