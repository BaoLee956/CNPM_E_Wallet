// ============================================================
// useAdminUsers — Hook for fetching & managing admin users
// ============================================================

import { useCallback } from 'react';
import { useAdminStore, mapUser } from '@/stores/adminStore';
import { adminUserService } from '@/services/admin/userService';
import type { PaginationParams } from '@/types/admin/notification';
import type { AdminUserDetailResponse } from '@/types/admin/user';

export function useAdminUsers() {
  const {
    users, usersTotal, usersPage, usersTotalPages,
    isLoadingUsers, errorUsers,
    setUsers, setLoadingUsers, setErrorUsers,
    updateUserStatus, showToast, addNotification,
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

  const lockUser = useCallback(async (userId: string, reason: string, userName?: string) => {
    try {
      await adminUserService.updateUserStatus(userId, { action: 'lock', reason });
      updateUserStatus(userId, 'Locked');
      const displayName = userName?.trim() || 'this user';
      showToast(`Locked ${displayName}.`, 'success');
      addNotification({
        type: 'warning',
        title: 'Account locked',
        message: `${displayName} was locked.${reason ? ` Reason: ${reason}` : ''}`,
      });
      return true;
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        err?.response?.data?.response?.message ??
        'Failed to lock user.';
      showToast(msg, 'error');
      addNotification({
        type: 'error',
        title: 'Lock account failed',
        message: msg,
      });
      return false;
    }
  }, [updateUserStatus, showToast, addNotification]);

  const unlockUser = useCallback(async (userId: string, reason: string, userName?: string) => {
    try {
      await adminUserService.updateUserStatus(userId, { action: 'unlock', reason });
      updateUserStatus(userId, 'Active');
      const displayName = userName?.trim() || 'this user';
      showToast(`Unlocked ${displayName}.`, 'success');
      addNotification({
        type: 'success',
        title: 'Account unlocked',
        message: `${displayName} was unlocked.${reason ? ` Reason: ${reason}` : ''}`,
      });
      return true;
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        err?.response?.data?.response?.message ??
        'Failed to unlock user.';
      showToast(msg, 'error');
      addNotification({
        type: 'error',
        title: 'Unlock account failed',
        message: msg,
      });
      return false;
    }
  }, [updateUserStatus, showToast, addNotification]);

  const getUserDetail = useCallback(async (userId: string): Promise<AdminUserDetailResponse['data'] | null> => {
    try {
      const res = await adminUserService.getUserDetail(userId);
      return res.data;
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        err?.response?.data?.response?.message ??
        'Failed to load user details.';
      showToast(msg, 'error');
      return null;
    }
  }, [showToast]);

  return {
    users, usersTotal, usersPage, usersTotalPages,
    isLoadingUsers, errorUsers,
    fetchUsers,
    getUserDetail,
    lockUser,
    unlockUser,
  };
}
