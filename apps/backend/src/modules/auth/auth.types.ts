import { UserRole, IUser } from '@repo/shared-types';
import type { IUserDocument } from './auth.model.js';

export { UserRole };
export type { IUser, IUserDocument };

export interface RegisterDto {
  fullName: string;
  email: string;
  password: string;
  role?: UserRole;
  phone?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface TokenPayload {
  sub: string;
  role: string;
  email: string;
}

export interface AuthResponse {
  user: {
    id: string;
    fullName: string;
    email: string;
    role: UserRole;
    phone?: string;
    isActive: boolean;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn?: number;
  };
}

export interface IAuthRepository {
  findByEmail(email: string): Promise<IUserDocument | null>;
  findById(id: string): Promise<IUserDocument | null>;
  create(dto: RegisterDto & { password: string }): Promise<IUserDocument>;
  saveRefreshToken(id: string, token: string): Promise<void>;
  clearRefreshToken(id: string): Promise<void>;
  setActive(id: string, isActive: boolean): Promise<void>;
}

export interface IAuthService {
  register(dto: RegisterDto): Promise<AuthResponse>;
  login(dto: LoginDto): Promise<AuthResponse>;
  logout(userId: string): Promise<void>;
  refreshTokens(token: string): Promise<{ accessToken: string; refreshToken: string }>;
  verifyToken(token: string): TokenPayload;
  getUserById(id: string): Promise<IUser | null>;
}

export interface IAuthFacade {
  verifyToken(token: string): TokenPayload;
  getUserById(id: string): Promise<{
    id: string;
    fullName: string;
    email: string;
    role: UserRole;
    isActive: boolean;
  } | null>;
  isUserActive(id: string): Promise<boolean>;
}
