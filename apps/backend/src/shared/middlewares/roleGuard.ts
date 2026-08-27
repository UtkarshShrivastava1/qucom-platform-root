import { Request, Response, NextFunction, RequestHandler } from 'express';
import { UserRole } from '@repo/shared-types';
import { AppError } from '../utils/AppError.js';

export const roleGuard = (...allowedRoles: UserRole[]): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(AppError.unauthorized('User not authenticated', 'AUTH_REQUIRED'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        AppError.forbidden(
          `User role '${req.user.role}' is not authorized to access this resource`,
          'ROLE_FORBIDDEN',
        ),
      );
    }

    next();
  };
};
