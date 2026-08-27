import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { JwtTokenPayload } from '@repo/shared-types';
import { env } from '../config/env.config.js';
import { AppError } from '../utils/AppError.js';

export const authGuard: RequestHandler = (req: Request, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(AppError.unauthorized('Authorization header missing or invalid format', 'AUTH_TOKEN_MISSING'));
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return next(AppError.unauthorized('Access token is missing', 'AUTH_TOKEN_MISSING'));
  }

  try {
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtTokenPayload;
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(AppError.unauthorized('Access token has expired', 'AUTH_TOKEN_EXPIRED'));
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return next(AppError.unauthorized('Invalid access token', 'AUTH_TOKEN_INVALID'));
    }
    next(error);
  }
};

/**
 * Optional Auth Guard: Attaches user if valid token present, otherwise continues as guest
 */
export const optionalAuthGuard: RequestHandler = (req: Request, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtTokenPayload;
    req.user = decoded;
  } catch {
    // Ignore invalid/expired tokens for optional guest flow
  }

  next();
};
