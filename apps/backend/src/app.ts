import express, { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import mongoSanitize from 'mongo-sanitize';
import { StatusCodes } from 'http-status-codes';
import { env } from './shared/config/env.config.js';
import { errorHandler } from './shared/middlewares/errorHandler.js';
import { AppError } from './shared/utils/AppError.js';
import { ApiResponse } from './shared/utils/ApiResponse.js';
import { logger } from './shared/utils/logger.js';

// Import domain module routes
import { authRouter } from './modules/auth/auth.routes.js';
import { storeRouter } from './modules/stores/store.routes.js';
import { catalogRouter } from './modules/catalog/catalog.routes.js';

export function createApp(): Express {
  const app: Express = express();

  // Security Headers
  app.use(helmet());

  // CORS Configuration
  const allowedOrigins = [
    env.CLIENT_WEB_URL,
    env.CLIENT_MERCHANT_URL,
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps, curl, Postman)
        if (!origin || allowedOrigins.includes(origin)) {
          return callback(null, true);
        }
        return callback(new AppError(StatusCodes.FORBIDDEN, 'CORS_ERROR', `Origin ${origin} not permitted by CORS`));
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    }),
  );

  // Request Rate Limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: env.NODE_ENV === 'production' ? 300 : 1500, // relaxed for dev/testing
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      error: {
        code: 'TOO_MANY_REQUESTS',
        message: 'Too many requests from this IP, please try again after 15 minutes',
      },
    },
  });
  app.use('/api', limiter);

  // Body Parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Sanitize NoSQL injection attempts in body/query/params
  app.use((req: Request, _res: Response, next: NextFunction) => {
    if (req.body) req.body = mongoSanitize(req.body);
    if (req.params) req.params = mongoSanitize(req.params);
    next();
  });

  // Request Logging in dev
  if (env.NODE_ENV === 'development') {
    app.use((req: Request, _res: Response, next: NextFunction) => {
      logger.debug(`📥 ${req.method} ${req.originalUrl}`);
      next();
    });
  }

  // Healthcheck Route
  app.get('/health', (_req: Request, res: Response) => {
    ApiResponse.success(res, {
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
      version: env.API_VERSION,
    });
  });

  // API Domain Routes (Versioned under /api/v1)
  const apiV1 = express.Router();
  apiV1.use('/auth', authRouter);
  apiV1.use('/stores', storeRouter);
  apiV1.use('/catalog', catalogRouter);

  app.use(`/api/${env.API_VERSION}`, apiV1);

  // 404 Route Handler
  app.use((req: Request, _res: Response, next: NextFunction) => {
    next(AppError.notFound(`Endpoint ${req.method} ${req.originalUrl} not found on this server`, 'ROUTE_NOT_FOUND'));
  });

  // Centralized Global Error Handler
  app.use(errorHandler);

  return app;
}
