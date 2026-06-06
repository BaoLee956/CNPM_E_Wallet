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

export interface AdminUserDetailResponse {
  message: string;
  data: {
    id: string;
    name: string;
    phoneNumber: string | null;
    email: string;
    role: string;
    deletedAt: string | null;
    createdAt: string;
    lastLoginAt: string | null;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    twoFactorEnabled: boolean | null;
    wallets: {
      id: string;
      accountNumber: string;
      balance: number;
      currency: string;
      isActive: boolean;
      dailyLimit: number | null;
      monthlyLimit: number | null;
      currentDailyUsage: number | null;
      currentMonthlyUsage: number | null;
      createdAt: string;
    }[];
    linkedBanks: {
      id: string;
      bankCode: string;
      accountNumber: string;
      accountName: string;
      isDefault: boolean;
      isVerified: boolean;
      linkedAt: string;
    }[];
    transactions: {
      id: string;
      type: string;
      status: string;
      amount: number;
      fee: number | null;
      currency: string;
      description: string | null;
      failureReason: string | null;
      createdAt: string;
      completedAt: string | null;
    }[];
    notifications: {
      id: string;
      title: string;
      message: string;
      type: string;
      isRead: boolean;
      createdAt: string;
    }[];
  };
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
  status: 'Active' | 'Locked';
  registrationDate: string;
  recentActivities: string[];
}
