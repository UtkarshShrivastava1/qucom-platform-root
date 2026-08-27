import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createApp } from './app.js';
import { env } from './shared/config/env.config.js';
import { connectDatabase, disconnectDatabase } from './shared/database/connection.js';
import { connectRedis, disconnectRedis, getRedisClient, checkRedisHealth } from './shared/redis/client.js';
import { logger } from './shared/utils/logger.js';

async function bootstrap() {
  try {
    logger.info('🚀 Bootstrapping backend services...');

    // 1. Connect MongoDB
    await connectDatabase();

    // 2. Connect Redis
    await connectRedis();

    // 3. Create Express App
    const app = createApp();
    const server = http.createServer(app);

    // 4. Attach Socket.io
    const io = new SocketIOServer(server, {
      cors: {
        origin: [
          env.CLIENT_WEB_URL,
          env.CLIENT_MERCHANT_URL,
          'http://localhost:3000',
          'http://localhost:3001',
        ],
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });

    // Wire Redis Adapter for cross-instance Socket.io if Redis is active
    if (checkRedisHealth()) {
      try {
        const pubClient = getRedisClient();
        const subClient = pubClient.duplicate();
        io.adapter(createAdapter(pubClient, subClient));
        logger.info('⚡ Socket.io configured with Redis adapter');
      } catch (err) {
        logger.warn('⚠️ Socket.io Redis adapter setup skipped, using in-memory adapter');
      }
    }

    io.on('connection', (socket) => {
      logger.debug(`🔌 New Socket client connected: ${socket.id}`);

      socket.on('disconnect', (reason) => {
        logger.debug(`🔌 Socket client disconnected: ${socket.id} (${reason})`);
      });
    });

    // Make io accessible across app if needed
    app.set('io', io);

    // 5. Start HTTP Listener
    server.listen(env.PORT, () => {
      logger.info(`✨ Server running on http://localhost:${env.PORT}`);
      logger.info(`📡 API Version: /api/${env.API_VERSION}`);
      logger.info(`🌍 Environment: ${env.NODE_ENV}`);
    });

    // 6. Graceful Shutdown Traps
    const handleShutdown = async (signal: string) => {
      logger.info(`🛑 Received ${signal}. Initiating graceful shutdown...`);

      server.close(async () => {
        logger.info('🛑 HTTP server closed.');
        await disconnectRedis();
        await disconnectDatabase();
        logger.info('🛑 All connections terminated. Exiting process.');
        process.exit(0);
      });

      // Force terminate after 10s if hung
      setTimeout(() => {
        logger.error('⚠️ Forcefully terminating process after timeout.');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => handleShutdown('SIGTERM'));
    process.on('SIGINT', () => handleShutdown('SIGINT'));

    process.on('unhandledRejection', (reason: unknown) => {
      logger.error('💥 Unhandled Rejection:', reason);
    });

    process.on('uncaughtException', (err: Error) => {
      logger.error('💥 Uncaught Exception:', err);
      process.exit(1);
    });
  } catch (error) {
    logger.error('❌ Critical startup failure:', error);
    process.exit(1);
  }
}

bootstrap();
