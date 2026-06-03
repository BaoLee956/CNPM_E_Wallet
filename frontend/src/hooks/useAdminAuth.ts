// ============================================================
// useAdminAuth — Hook for admin authentication
// ============================================================

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { setToken } from '@/utils/auth-token';
import { adminAuthService } from '@/services/admin/authService';
import { useAdminStore } from '@/stores/adminStore';
import type { AdminLoginRequest } from '@/types/admin/auth';

export function useAdminAuth() {
  const router = useRouter();
  const { showToast, setAdminInfo } = useAdminStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (credentials: AdminLoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminAuthService.login(credentials);

      if (res.access_token) {
        setToken(res.access_token);
        adminAuthService.saveSession({
          id: '',
          name: credentials.phoneNumber,
          email: '',
          phoneNumber: credentials.phoneNumber,
          role: res.role,
          access_token: res.access_token,
        });

        // Try to get admin profile
        try {
          const me = await adminAuthService.getMe();
          setAdminInfo(me.name ?? 'Admin', me.email ?? '');
          adminAuthService.saveSession({
            id: me.id,
            name: me.name ?? 'Admin',
            email: me.email ?? '',
            phoneNumber: me.phoneNumber ?? '',
            role: me.role,
            access_token: res.access_token,
          });
        } catch {
          // Continue even if getMe fails
        }

        showToast('Login successful!', 'success');
        router.push('/dashboard');
      }
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        err?.response?.data?.response?.message ??
        'Login failed. Please check your credentials.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [router, showToast, setAdminInfo]);

  const logout = useCallback(() => {
    adminAuthService.clearSession();
    router.push('/login');
  }, [router]);

  return { login, logout, loading, error };
}
