import mongoose from 'mongoose';
import { env } from '../config/env.config.js';
import { logger } from '../utils/logger.js';

export async function connectDatabase(): Promise<typeof mongoose> {
  try {
    mongoose.connection.on('connected', () => {
      logger.info('📦 MongoDB connection established successfully');
    });

    mongoose.connection.on('error', (err) => {
      logger.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('⚠️ MongoDB connection lost');
    });

    const conn = await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: env.NODE_ENV !== 'production',
    });

    return conn;
  } catch (error) {
    logger.error('❌ Failed to connect to MongoDB:', error);
    throw error;
  }
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.connection.close();
  logger.info('📦 MongoDB connection closed');
}
