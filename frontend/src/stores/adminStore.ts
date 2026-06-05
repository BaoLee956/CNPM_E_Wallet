import { create } from 'zustand';
import type { TxStatus } from '@/types/admin/transaction';

export type NotificationType = 'warning' | 'error' | 'info' | 'success';

export interface AdminNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export type UserStatus = 'Active' | 'Locked';

export interface AdminUser {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  walletBalance: number;
  status: UserStatus;
  registrationDate: string;
  recentActivities: string[];
  isActive: boolean;
}

export interface AdminTransaction {
  txId: string;
  timestamp: string;
  userId: string;
  userName: string;
  amount: number;
  paymentChannel: string;
  status: TxStatus;
  errorLogs: string;
  originalId: string;
  type: string;
  currency: string;
  senderName: string;
  recipientName: string;
  fromWalletId: string;
  toWalletId: string;
  referenceCode: string;
  walletAccountNumber: string;
  description: string;
  processingLogs: string[];
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  lockedUsers: number;
  newUsersCurrent: number;
  newUsersPrevious: number;
  totalDeposit: number;
  totalWithdraw: number;
  totalFee: number;
  totalTransactionCount: number;
  totalTransactionValue: number;
  successRate: number;
  failedRate: number;
  successCount: number;
  failedCount: number;
  recentTransactions: AdminTransaction[];
  dailySeries: Array<{
    date: string;
    revenue: number;
    withdraw: number;
    fee: number;
    newUsers: number;
    transactionCount: number;
    transactionValue: number;
    successCount: number;
    failedCount: number;
  }>;
  range: {
    type: 'today' | '7d' | '30d' | 'custom';
    startDate: string;
    endDate: string;
  };
}

interface AdminState {
  users: AdminUser[];
  transactions: AdminTransaction[];
  statistics: AdminStats | null;
  usersTotal: number;
  usersPage: number;
  usersTotalPages: number;
  transactionsTotal: number;
  transactionsPage: number;
  transactionsTotalPages: number;
  isLoadingUsers: boolean;
  isLoadingTransactions: boolean;
  isLoadingStats: boolean;
  isProcessing: boolean;
  errorUsers: string | null;
  errorTransactions: string | null;
  errorStats: string | null;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  notifications: AdminNotification[];
  adminName: string;
  adminEmail: string;
}

interface AdminActions {
  setUsers: (users: AdminUser[], total: number, page: number, totalPages: number) => void;
  setTransactions: (txs: AdminTransaction[], total: number, page: number, totalPages: number) => void;
  setStatistics: (stats: AdminStats) => void;
  setLoadingUsers: (v: boolean) => void;
  setLoadingTransactions: (v: boolean) => void;
  setLoadingStats: (v: boolean) => void;
  setProcessing: (v: boolean) => void;
  setErrorUsers: (msg: string | null) => void;
  setErrorTransactions: (msg: string | null) => void;
  setErrorStats: (msg: string | null) => void;
  updateUserStatus: (userId: string, newStatus: UserStatus) => void;
  updateTransactionStatus: (txId: string, newStatus: TxStatus) => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  clearToast: () => void;
  addNotification: (n: Omit<AdminNotification, 'id' | 'time' | 'read'>) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
  dismissNotification: (id: string) => void;
  setAdminInfo: (name: string, email: string) => void;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function formatTimestamp(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString('en-GB', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
}

function mapUser(u: any): AdminUser {
  const wallet = u.wallets?.[0];
  const isLocked = !!u.deletedAt;
  return {
    id: u.id,
    userId: u.id,
    fullName: u.name ?? '—',
    email: u.email ?? '—',
    phoneNumber: u.phoneNumber ?? '—',
    walletBalance: wallet?.balance ?? 0,
    status: isLocked ? 'Locked' : 'Active',
    registrationDate: formatDate(u.createdAt),
    recentActivities: [],
    isActive: wallet?.isActive ?? !isLocked,
  };
}

function mapStatus(beStatus: string): TxStatus {
  switch (beStatus) {
    case 'pending':
      return 'Pending';
    case 'failed':
      return 'Timeout';
    case 'refunded':
      return 'Refunded';
    case 'success':
      return 'Resolved';
    default:
      return 'Pending';
  }
}

function mapChannel(type: string): string {
  switch (type) {
    case 'deposit':
      return 'Bank Transfer';
    case 'withdraw':
      return 'Cash Out';
    case 'transfer':
      return 'Internal Wallet';
    case 'payment':
      return 'Merchant Payment';
    case 'refund':
      return 'Refund';
    default:
      return 'Internal Wallet';
  }
}

function buildProcessingLogs(tx: any): string[] {
  const logs = [`Created at ${formatTimestamp(tx.createdAt)}`];
  if (tx.completedAt) logs.push(`Completed at ${formatTimestamp(tx.completedAt)}`);
  if (tx.refundedAt) logs.push(`Refunded at ${formatTimestamp(tx.refundedAt)}`);
  if (tx.failureReason) logs.push(`System note: ${tx.failureReason}`);
  if (tx.description) logs.push(`Description: ${tx.description}`);
  return logs;
}

function mapTransaction(tx: any): AdminTransaction {
  return {
    txId: tx.id,
    timestamp: formatTimestamp(tx.createdAt),
    userId: tx.userId ?? '—',
    userName: tx.user?.name ?? '—',
    amount: tx.amount,
    paymentChannel: mapChannel(tx.type),
    status: mapStatus(tx.status),
    errorLogs: tx.failureReason ? `[${tx.status}] ${tx.failureReason}` : '—',
    originalId: tx.id,
    type: tx.type,
    currency: tx.currency,
    senderName: tx.senderName ?? '—',
    recipientName: tx.recipientName ?? '—',
    fromWalletId: tx.fromWalletId ?? '—',
    toWalletId: tx.toWalletId ?? '—',
    referenceCode: tx.referenceCode ?? '—',
    walletAccountNumber: tx.wallet?.accountNumber ?? '—',
    description: tx.description ?? '—',
    processingLogs: buildProcessingLogs(tx),
  };
}

export const useAdminStore = create<AdminState & AdminActions>((set, get) => ({
  users: [],
  transactions: [],
  statistics: null,
  usersTotal: 0,
  usersPage: 1,
  usersTotalPages: 1,
  transactionsTotal: 0,
  transactionsPage: 1,
  transactionsTotalPages: 1,
  isLoadingUsers: false,
  isLoadingTransactions: false,
  isLoadingStats: false,
  isProcessing: false,
  errorUsers: null,
  errorTransactions: null,
  errorStats: null,
  toast: null,
  notifications: [],
  adminName: 'Admin',
  adminEmail: 'admin@ewallet.vn',
  setUsers: (users, total, page, totalPages) => set({ users, usersTotal: total, usersPage: page, usersTotalPages: totalPages, isLoadingUsers: false, errorUsers: null }),
  setTransactions: (txs, total, page, totalPages) => set({ transactions: txs, transactionsTotal: total, transactionsPage: page, transactionsTotalPages: totalPages, isLoadingTransactions: false, errorTransactions: null }),
  setStatistics: (stats) => set({ statistics: stats, isLoadingStats: false, errorStats: null }),
  setLoadingUsers: (v) => set({ isLoadingUsers: v }),
  setLoadingTransactions: (v) => set({ isLoadingTransactions: v }),
  setLoadingStats: (v) => set({ isLoadingStats: v }),
  setProcessing: (v) => set({ isProcessing: v }),
  setErrorUsers: (msg) => set({ errorUsers: msg, isLoadingUsers: false }),
  setErrorTransactions: (msg) => set({ errorTransactions: msg, isLoadingTransactions: false }),
  setErrorStats: (msg) => set({ errorStats: msg, isLoadingStats: false }),
  updateUserStatus: (userId, newStatus) => {
    set((state) => ({
      users: state.users.map((u) => (u.id === userId ? { ...u, status: newStatus } : u)),
    }));
  },
  updateTransactionStatus: (txId, newStatus) => {
    set((state) => ({
      transactions: state.transactions.map((t) => (t.originalId === txId ? { ...t, status: newStatus } : t)),
    }));
  },
  showToast: (message, type = 'info') => {
    set({ toast: { message, type } });
    setTimeout(() => set({ toast: null }), 3500);
  },
  clearToast: () => set({ toast: null }),
  addNotification: (n) => {
    const newNotif: AdminNotification = {
      ...n,
      id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      time: 'Just now',
      read: false,
    };
    set((state) => ({ notifications: [newNotif, ...state.notifications] }));
  },
  markAllNotificationsRead: () => set((state) => ({ notifications: state.notifications.map((n) => ({ ...n, read: true })) })),
  clearNotifications: () => set({ notifications: [] }),
  dismissNotification: (id) => set((state) => ({ notifications: state.notifications.filter((n) => n.id !== id) })),
  setAdminInfo: (name, email) => set({ adminName: name, adminEmail: email }),
}));

export { mapUser, mapTransaction, formatDate, formatTimestamp };
