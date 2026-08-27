import { StatusCodes } from 'http-status-codes';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;
  public readonly details?: unknown;

  constructor(
    statusCode: number,
    code: string,
    message: string,
    isOperational = true,
    details?: unknown,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    this.details = details;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string, code = 'BAD_REQUEST', details?: unknown): AppError {
    return new AppError(StatusCodes.BAD_REQUEST, code, message, true, details);
  }

  static unauthorized(message = 'Unauthorized access', code = 'UNAUTHORIZED', details?: unknown): AppError {
    return new AppError(StatusCodes.UNAUTHORIZED, code, message, true, details);
  }

  static forbidden(message = 'Forbidden access', code = 'FORBIDDEN', details?: unknown): AppError {
    return new AppError(StatusCodes.FORBIDDEN, code, message, true, details);
  }

  static notFound(message = 'Resource not found', code = 'NOT_FOUND', details?: unknown): AppError {
    return new AppError(StatusCodes.NOT_FOUND, code, message, true, details);
  }

  static conflict(message = 'Resource conflict', code = 'CONFLICT', details?: unknown): AppError {
    return new AppError(StatusCodes.CONFLICT, code, message, true, details);
  }

  static unprocessable(message = 'Unprocessable entity', code = 'UNPROCESSABLE_ENTITY', details?: unknown): AppError {
    return new AppError(StatusCodes.UNPROCESSABLE_ENTITY, code, message, true, details);
  }

  static internal(message = 'Internal server error', code = 'INTERNAL_ERROR', details?: unknown): AppError {
    return new AppError(StatusCodes.INTERNAL_SERVER_ERROR, code, message, false, details);
  }
}
