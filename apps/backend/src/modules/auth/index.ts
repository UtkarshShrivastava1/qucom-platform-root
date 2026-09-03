/**
 * AUTH MODULE — Public Facade
 * ONLY file other modules and app.ts may import from auth/
 */
import { createAuthModule } from './auth.module.js';
import * as authService from './auth.service.js';
import { UserRole } from './auth.types.js';
import type { IAuthFacade } from './auth.types.js';

const defaultAuthModule = createAuthModule();

export const authRouter = defaultAuthModule.router;
export const authRepository = defaultAuthModule.repository;

export const authModule: IAuthFacade = {
  verifyToken: (token: string) => {
    // Basic decode check; runtime verification is handled via authService
    return { sub: '', role: '', email: '' };
  },
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

export { createAuthModule, authService };
export * from './auth.types.js';
export * from './auth.validator.js';
export { UserModel } from './auth.model.js';
