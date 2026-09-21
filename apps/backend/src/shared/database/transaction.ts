import mongoose, { ClientSession } from 'mongoose';
import { logger } from '../utils/logger.js';

export interface TransactionOptions {
  session?: ClientSession;
}

/**
 * Executes work within an ACID multi-document MongoDB transaction.
 * Automatically handles session lifecycle, commit, rollback, and re-entrant participation.
 */
export async function withTransaction<T>(
  work: (session: ClientSession) => Promise<T>,
  existingSession?: ClientSession
): Promise<T> {
  // If already participating in an active session, pass it through without nested commits
  if (existingSession && existingSession.inTransaction()) {
    return work(existingSession);
  }

  // If MongoDB is not connected (e.g. isolated unit tests with mock repositories), bypass session
  if (mongoose.connection.readyState !== 1) {
    return work(null as unknown as ClientSession);
  }

  const session = await mongoose.startSession();
  try {
    let result: T;
    await session.withTransaction(
      async () => {
        result = await work(session);
      },
      {
        readPreference: 'primary',
        readConcern: { level: 'majority' },
        writeConcern: { w: 'majority', j: true },
      }
    );
    return result!;
  } catch (error) {
    logger.error('❌ Transaction aborted and rolled back:', error);
    throw error;
  } finally {
    await session.endSession();
  }
}
