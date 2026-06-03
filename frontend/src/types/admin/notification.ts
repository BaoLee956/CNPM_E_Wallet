// ============================================================
// Admin Notification Types
// ============================================================

export interface AdminNotification {
  id: string;
  type: 'warning' | 'error' | 'info' | 'success';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  type?: string;
}
