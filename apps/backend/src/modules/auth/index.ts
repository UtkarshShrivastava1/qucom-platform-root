/**
 * AUTH MODULE — Public Facade
 * ONLY file other modules and app.ts may import from auth/
 */
import { authRouter } from './auth.routes.js';
import * as authService from './auth.service.js';
import { UserRole } from '@repo/shared-types';

export interface IAuthFacade {
  getUserById(id: string): Promise<{
    id: string;
    fullName: string;
    email: string;
    role: UserRole;
    isActive: boolean;
  } | null>;
  isUserActive(id: string): Promise<boolean>;
}

export const authModule: IAuthFacade = {
  getUserById: async (id: string) => {
    try {
      const user = await authService.getUserProfile(id);
      if (!user) return null;
      return {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      };
    } catch {
      return null;
    }
  },
  isUserActive: async (id: string) => {
    try {
      const user = await authService.getUserProfile(id);
      return user?.isActive ?? false;
    } catch {
      return false;
    }
  },
};

export { authRouter, authService };
export * from './auth.model.js';
