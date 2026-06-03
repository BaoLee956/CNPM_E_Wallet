// ============================================================
// useAdminUsers — Hook for fetching & managing admin users
// ============================================================

import { useCallback } from 'react';
import { useAdminStore, mapUser } from '@/stores/adminStore';
import { adminUserService } from '@/services/admin/userService';
import type { PaginationParams } from '@/types/admin/notification';

export function useAdminUsers() {
  const {
    users, usersTotal, usersPage, usersTotalPages,
    isLoadingUsers, errorUsers,
    setUsers, setLoadingUsers, setErrorUsers,
    updateUserStatus, showToast,
  } = useAdminStore();

  const fetchUsers = useCallback(async (params?: PaginationParams) => {
    setLoadingUsers(true);
    setErrorUsers(null);
    try {
      const res = await adminUserService.getUsers(params);
      const mapped = res.data.map(mapUser);
      setUsers(
        mapped,
        res.pagination.total,
        res.pagination.page,
        res.pagination.totalPages
      );
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        err?.response?.data?.response?.message ??
        'Failed to load users.';
      setErrorUsers(msg);
    }
  }, [setUsers, setLoadingUsers, setErrorUsers]);

  const lockUser = useCallback(async (userId: string, reason: string) => {
    try {
      await adminUserService.updateUserStatus(userId, { action: 'lock', reason });
      updateUserStatus(userId, 'Locked');
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        err?.response?.data?.response?.message ??
        'Failed to lock user.';
      showToast(msg, 'error');
    }
  }, [updateUserStatus, showToast]);

  const unlockUser = useCallback(async (userId: string, reason: string) => {
    try {
      await adminUserService.updateUserStatus(userId, { action: 'unlock', reason });
      updateUserStatus(userId, 'Active');
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        err?.response?.data?.response?.message ??
        'Failed to unlock user.';
      showToast(msg, 'error');
    }
  }, [updateUserStatus, showToast]);

  return {
    users, usersTotal, usersPage, usersTotalPages,
    isLoadingUsers, errorUsers,
    fetchUsers,
    lockUser,
    unlockUser,
  };
}
