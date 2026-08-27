import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserRole } from '@repo/shared-types';
import * as authService from './auth.service.js';
import { UserModel } from './auth.model.js';

vi.mock('./auth.model.js');

describe('Auth Service Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('generateTokenPair', () => {
    it('should generate valid access and refresh tokens', () => {
      const mockUser = {
        _id: '507f1f77bcf86cd799439011',
        role: UserRole.CUSTOMER,
        email: 'customer@example.com',
        phone: '9876543210',
      };

      const tokens = authService.generateTokenPair(mockUser);
      expect(tokens).toHaveProperty('accessToken');
      expect(tokens).toHaveProperty('refreshToken');
      expect(typeof tokens.accessToken).toBe('string');
      expect(typeof tokens.refreshToken).toBe('string');
      expect(tokens.expiresIn).toBe(900);
    });
  });

  describe('findUserById', () => {
    it('should query UserModel by id and return user', async () => {
      const mockUser = {
        _id: '507f1f77bcf86cd799439011',
        fullName: 'Test User',
        email: 'test@example.com',
        role: UserRole.CUSTOMER,
      };

      vi.spyOn(UserModel, 'findById').mockReturnValue({
        lean: vi.fn().mockResolvedValue(mockUser),
      } as any);

      const result = await authService.findUserById('507f1f77bcf86cd799439011');
      expect(result).toEqual(mockUser);
      expect(UserModel.findById).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
    });

    it('should return null when user is not found', async () => {
      vi.spyOn(UserModel, 'findById').mockReturnValue({
        lean: vi.fn().mockResolvedValue(null),
      } as any);

      const result = await authService.findUserById('nonexistent_id');
      expect(result).toBeNull();
    });
  });
});
