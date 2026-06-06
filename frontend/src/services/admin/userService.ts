// ============================================================
// Admin User Service — API calls for user management
// ============================================================

import http from '@/lib/http';
import type {
  AdminUsersListResponse,
  AdminUserResponse,
  AdminUserDetailResponse,
  AdminUpdateUserStatusRequest,
  AdminUpdateUserStatusResponse,
} from '@/types/admin/user';
import type { PaginationParams } from '@/types/admin/notification';

export const adminUserService = {
  async getUsers(params?: PaginationParams) {
    const res = await http.get<AdminUsersListResponse>('/api/v1/admin/users', {
      params: {
        page: params?.page ?? 1,
        limit: params?.limit ?? 20,
        search: params?.search ?? undefined,
      },
    });
    return res.data;
  },

  async getUserDetail(userId: string) {
    const res = await http.get<AdminUserDetailResponse>(`/api/v1/admin/users/${userId}`);
    return res.data;
  },

  async updateUserStatus(userId: string, payload: AdminUpdateUserStatusRequest) {
    const res = await http.put<AdminUpdateUserStatusResponse>(
      `/api/v1/admin/users/${userId}/status`,
      payload
    );
    return res.data;
  },
};
