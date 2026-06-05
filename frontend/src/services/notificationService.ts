// services/notificationService.ts
import http from '@/lib/http';
import type { Notification } from '@/models/notification';

// ─── Response types ────────────────────────────────────────────────────────

export interface NotificationApiResponse {
  message: string;
  data: Notification[];
  unreadCount: number;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface MarkAsReadResult {
  message: string;
  data: Notification;
}

export interface MarkAllAsReadResult {
  message: string;
  updatedCount: number;
}

export interface QueryNotificationsParams {
  type?: string;
  isRead?: string;
  page?: number;
  limit?: number;
}

// ─── Service ───────────────────────────────────────────────────────────────

class NotificationService {
  // GET /api/v1/customer/notifications
  async getNotifications(params?: QueryNotificationsParams): Promise<NotificationApiResponse> {
    const { data } = await http.get<NotificationApiResponse>('/api/v1/customer/notifications', { params });
    return data;
  }

  // PATCH /api/v1/customer/notifications/:id/read
  async markAsRead(notificationId: string): Promise<MarkAsReadResult> {
    const { data } = await http.patch<MarkAsReadResult>(`/api/v1/customer/notifications/${notificationId}/read`);
    return data;
  }

  // PATCH /api/v1/customer/notifications/read-all
  async markAllAsRead(): Promise<MarkAllAsReadResult> {
    const { data } = await http.patch<MarkAllAsReadResult>('/api/v1/customer/notifications/read-all');
    return data;
  }
}

export const notificationService = new NotificationService();
