import { describe, it, expect } from 'vitest';
import { StatusCodes } from 'http-status-codes';
import { AppError } from './AppError.js';

describe('AppError Utility', () => {
  it('should instantiate custom AppError correctly', () => {
    const error = new AppError(StatusCodes.NOT_FOUND, 'STORE_NOT_FOUND', 'Store does not exist');
    expect(error.statusCode).toBe(404);
    expect(error.code).toBe('STORE_NOT_FOUND');
    expect(error.message).toBe('Store does not exist');
    expect(error.isOperational).toBe(true);
  });

  it('should support static helper methods', () => {
    const badReq = AppError.badRequest('Invalid payload', 'INVALID_INPUT', { field: 'name' });
    expect(badReq.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(badReq.code).toBe('INVALID_INPUT');
    expect(badReq.details).toEqual({ field: 'name' });

    const unauth = AppError.unauthorized();
    expect(unauth.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    expect(unauth.code).toBe('UNAUTHORIZED');

    const forbidden = AppError.forbidden();
    expect(forbidden.statusCode).toBe(StatusCodes.FORBIDDEN);
  });
});
