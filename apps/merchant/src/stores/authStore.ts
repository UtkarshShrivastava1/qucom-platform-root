import { create } from 'zustand';
import { IUser, UserRole } from '@repo/shared-types';

interface AuthState {
  user: IUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: IUser, token: string, refreshToken?: string) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,

  setAuth: (user, token, refreshToken) => {
    localStorage.setItem('access_token', token);
    if (refreshToken) localStorage.setItem('refresh_token', refreshToken);
    localStorage.setItem('user_session', JSON.stringify(user));
    set({ user, accessToken: token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_session');
    set({ user: null, accessToken: null, isAuthenticated: false });
  },

  initialize: () => {
    const token = localStorage.getItem('access_token');
    const storedUser = localStorage.getItem('user_session');
    if (token && storedUser) {
      try {
        const user = JSON.parse(storedUser) as IUser;
        set({ user, accessToken: token, isAuthenticated: true });
      } catch {
        localStorage.clear();
      }
    }
  },
}));
