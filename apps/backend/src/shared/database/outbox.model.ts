import mongoose, { Schema, Document } from 'mongoose';

export enum OutboxEventStatus {
  PENDING = 'PENDING',
  PUBLISHED = 'PUBLISHED',
  FAILED = 'FAILED',
}

export interface IOutboxEvent extends Document {
  eventType: string;
  aggregateId: string;
  aggregateType: string;
  payload: Record<string, unknown>;
  status: OutboxEventStatus;
  attempts: number;
  lastError?: string;
  createdAt: Date;
  publishedAt?: Date;
}

const outboxSchema = new Schema<IOutboxEvent>(
  {
    eventType: { type: String, required: true, index: true },
    aggregateId: { type: String, required: true, index: true },
    aggregateType: { type: String, required: true, default: 'Order' },
    payload: { type: Schema.Types.Mixed, required: true },
    status: {
      type: String,
      enum: Object.values(OutboxEventStatus),
      default: OutboxEventStatus.PENDING,
      index: true,
    },
    attempts: { type: Number, default: 0 },
    lastError: { type: String },
    publishedAt: { type: Date },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

// Compound index for high-throughput outbox poller queries
outboxSchema.index({ status: 1, createdAt: 1 });

export const OutboxModel = mongoose.model<IOutboxEvent>('OutboxEvent', outboxSchema);
