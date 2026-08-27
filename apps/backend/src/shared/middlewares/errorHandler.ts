import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import { AppError } from '../utils/AppError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { logger } from '../utils/logger.js';
import { env } from '../config/env.config.js';

export const errorHandler: ErrorRequestHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  // Operational AppError
  if (err instanceof AppError) {
    if (err.statusCode >= 500) {
      logger.error(`[AppError 500]: ${err.message}`, { stack: err.stack, details: err.details });
    }
    ApiResponse.error(res, err.statusCode, err.code, err.message, err.details);
    return;
  }

  // Mongoose Validation Error
  if (err instanceof mongoose.Error.ValidationError) {
    const details = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    ApiResponse.error(
      res,
      StatusCodes.BAD_REQUEST,
      'DB_VALIDATION_ERROR',
      'Database validation failed',
      details,
    );
    return;
  }

  // Mongoose CastError (e.g. invalid ObjectId)
  if (err instanceof mongoose.Error.CastError) {
    ApiResponse.error(
      res,
      StatusCodes.BAD_REQUEST,
      'INVALID_ID',
      `Invalid format for ${err.path}: ${err.value}`,
    );
    return;
  }

  // MongoDB Duplicate Key Error (Code 11000)
  if ((err as { code?: number }).code === 11000) {
    const keyValue = (err as { keyValue?: Record<string, unknown> }).keyValue || {};
    const field = Object.keys(keyValue)[0] || 'field';
    ApiResponse.error(
      res,
      StatusCodes.CONFLICT,
      'DUPLICATE_ENTRY',
      `An entry with this ${field} already exists`,
      { duplicateField: field },
    );
    return;
  }

  // JSON parsing syntax error in body
  if (err instanceof SyntaxError && 'body' in err) {
    ApiResponse.error(
      res,
      StatusCodes.BAD_REQUEST,
      'INVALID_JSON',
      'Invalid JSON syntax in request body',
    );
    return;
  }

  // Unhandled / Internal Server Error
  logger.error('💥 Unhandled Exception caught by global error handler:', {
    message: err.message,
    stack: err.stack,
  });

  const message =
    env.NODE_ENV === 'production'
      ? 'An unexpected internal server error occurred'
      : err.message || 'Internal Server Error';

  const details = env.NODE_ENV === 'production' ? undefined : { stack: err.stack };

  ApiResponse.error(
    res,
    StatusCodes.INTERNAL_SERVER_ERROR,
    'INTERNAL_SERVER_ERROR',
    message,
    details,
  );
};
