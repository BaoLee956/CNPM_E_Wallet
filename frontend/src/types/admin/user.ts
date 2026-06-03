// ============================================================
// Admin User Types — BE response shapes
// ============================================================

export interface AdminUserResponse {
  id: string;
  name: string;
  phoneNumber: string | null;
  email: string;
  role: string;
  deletedAt: string | null;
  createdAt: string;
  wallets: {
    isActive: boolean;
    balance: number;
  }[];
}

export interface AdminUsersListResponse {
  message: string;
  data: AdminUserResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AdminUpdateUserStatusRequest {
  action: 'lock' | 'unlock';
  reason: string;
}

export interface AdminUpdateUserStatusResponse {
  message: string;
  user: {
    id: string;
    name: string;
    phoneNumber: string;
    isLocked: boolean;
    reason: string;
  };
}

export interface AdminUser {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  walletBalance: number;
  status: 'Active' | 'Locked' | 'Suspicious';
  registrationDate: string;
  recentActivities: string[];
}
