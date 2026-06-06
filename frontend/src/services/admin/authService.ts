// ============================================================
// Admin Auth Service — API calls for admin authentication
// ============================================================

import http from '@/lib/http';
import type {
  AdminLoginRequest,
  AdminLoginResponse,
  AdminMeResponse,
  AdminSession,
  ChangePasswordRequest,
  ChangePasswordResponse,
} from '@/types/admin/auth';

export const adminAuthService = {
  async login(credentials: AdminLoginRequest): Promise<AdminLoginResponse> {
    const res = await http.post<AdminLoginResponse>(
      '/api/v1/auth/login',
      credentials
    );
    return res.data;
  },

  async getMe(): Promise<AdminMeResponse> {
    const res = await http.get<AdminMeResponse>('/api/v1/auth/me');
    return res.data;
  },

  getSession(): AdminSession | null {
    if (typeof window === 'undefined') return null;
    try {
      const raw = sessionStorage.getItem('admin_session');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  saveSession(session: AdminSession) {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem('admin_session', JSON.stringify(session));
  },

  clearSession() {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem('admin_session');
    localStorage.removeItem('ewallet_token');
    document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
  },

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!this.getSession() && !!localStorage.getItem('ewallet_token');
  },

  async changePassword(data: ChangePasswordRequest): Promise<ChangePasswordResponse> {
    const res = await http.put<ChangePasswordResponse>(
      '/api/v1/admin/change-password',
      data
    );
    return res.data;
  },
};
