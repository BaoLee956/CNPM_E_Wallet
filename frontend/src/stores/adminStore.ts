import { create } from 'zustand';

// ============================================================
// Admin Store — E-Wallet Admin Portal
// Manages all admin state: users, transactions, UI, auth
// ============================================================

// --- Notification types ---
export type NotificationType = 'warning' | 'error' | 'info' | 'success';

export interface AdminNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

// --- Admin User (from BE) ---
export type UserStatus = 'Active' | 'Locked' | 'Suspicious';

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

// --- Admin Transaction (from BE) ---
export type TxStatus = 'Pending' | 'Timeout' | 'Processing' | 'Resolved' | 'Refunded';
export type PaymentChannel =
  | 'Internal Wallet'
  | 'Napas Bank'
  | 'Visa/Mastercard'
  | 'MoMo'
  | 'ZaloPay';

export interface AdminTransaction {
  txId: string;
  timestamp: string;
  userId: string;
  userName: string;
  amount: number;
  paymentChannel: PaymentChannel;
  status: TxStatus;
  errorLogs: string;
  originalId: string;
  type: string;
  currency: string;
}

// --- Admin Statistics ---
export interface AdminStats {
  totalUsers: number;
  newUsersToday: number;
  newUsersThisMonth: number;
  totalTransactions: number;
  transactionsToday: number;
  pendingTransactions: number;
  revenueTotal: number;
  revenueToday: number;
  feeTotal: number;
  revenueYesterday: number;
  revenueDoD: number;
  transactionsYesterday: number;
  txDoD: number;
}

// --- Store State ---
interface AdminState {
  // Data
  users: AdminUser[];
  transactions: AdminTransaction[];
  statistics: AdminStats | null;

  // Pagination
  usersTotal: number;
  usersPage: number;
  usersTotalPages: number;
  transactionsTotal: number;
  transactionsPage: number;
  transactionsTotalPages: number;

  // Loading
  isLoadingUsers: boolean;
  isLoadingTransactions: boolean;
  isLoadingStats: boolean;
  isProcessing: boolean; // For lock/unlock/refund actions

  // Error
  errorUsers: string | null;
  errorTransactions: string | null;
  errorStats: string | null;

  // UI
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  notifications: AdminNotification[];

  // Auth
  adminName: string;
  adminEmail: string;
}

// --- Store Actions ---
interface AdminActions {
  // Setters
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

  // User actions
  updateUserStatus: (userId: string, newStatus: UserStatus) => void;

  // Transaction actions
  updateTransactionStatus: (txId: string, newStatus: TxStatus) => void;

  // Toast
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  clearToast: () => void;

  // Notifications
  addNotification: (n: Omit<AdminNotification, 'id' | 'time' | 'read'>) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
  dismissNotification: (id: string) => void;

  // Auth
  setAdminInfo: (name: string, email: string) => void;
}

// --- Helper: format VND date string from ISO ---
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

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

// --- Helper: map BE user → AdminUser ---
function mapUser(u: any): AdminUser {
  const wallet = u.wallets?.[0];
  const isLocked = !!u.deletedAt;
  return {
    id: u.id,
    userId: `USR-${u.id.slice(0, 6).toUpperCase()}`,
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

// --- Helper: map BE transaction → AdminTransaction ---
function mapTransaction(tx: any): AdminTransaction {
  const channel = mapChannel(tx.type);
  const status = mapStatus(tx.status, tx.type);
  const errorLogs = tx.failureReason
    ? `[${tx.status}] ${tx.failureReason}`
    : '—';
  return {
    txId: tx.id,
    timestamp: formatTimestamp(tx.createdAt),
    userId: `USR-${tx.userId?.slice(0, 6).toUpperCase() ?? 'UNKNOWN'}`,
    userName: tx.user?.name ?? '—',
    amount: tx.amount,
    paymentChannel: channel,
    status,
    errorLogs,
    originalId: tx.id,
    type: tx.type,
    currency: tx.currency,
  };
}

function mapChannel(type: string): PaymentChannel {
  switch (type) {
    case 'deposit': return 'Napas Bank';
    case 'withdraw': return 'Napas Bank';
    case 'transfer': return 'Internal Wallet';
    case 'payment': return 'Napas Bank';
    default: return 'Internal Wallet';
  }
}

function mapStatus(beStatus: string, type: string): TxStatus {
  if (type === 'refund') return 'Refunded';
  switch (beStatus) {
    case 'pending': return 'Pending';
    case 'success': return 'Resolved';
    case 'failed': return 'Timeout';
    case 'cancelled': return 'Refunded';
    default: return 'Processing';
  }
}

export const useAdminStore = create<AdminState & AdminActions>((set, get) => ({
  // Initial state
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

  // --- Setters ---
  setUsers: (users, total, page, totalPages) => {
    set({ users, usersTotal: total, usersPage: page, usersTotalPages: totalPages, isLoadingUsers: false, errorUsers: null });
  },
  setTransactions: (txs, total, page, totalPages) => {
    set({ transactions: txs, transactionsTotal: total, transactionsPage: page, transactionsTotalPages: totalPages, isLoadingTransactions: false, errorTransactions: null });
  },
  setStatistics: (stats) => set({ statistics: stats, isLoadingStats: false, errorStats: null }),
  setLoadingUsers: (v) => set({ isLoadingUsers: v }),
  setLoadingTransactions: (v) => set({ isLoadingTransactions: v }),
  setLoadingStats: (v) => set({ isLoadingStats: v }),
  setProcessing: (v) => set({ isProcessing: v }),
  setErrorUsers: (msg) => set({ errorUsers: msg, isLoadingUsers: false }),
  setErrorTransactions: (msg) => set({ errorTransactions: msg, isLoadingTransactions: false }),
  setErrorStats: (msg) => set({ errorStats: msg, isLoadingStats: false }),

  // --- User actions ---
  updateUserStatus: (userId, newStatus) => {
    set((state) => ({
      users: state.users.map((u) =>
        u.id === userId ? { ...u, status: newStatus } : u
      ),
    }));
    const user = get().users.find((u) => u.id === userId);
    get().showToast(
      `${user?.fullName ?? userId} — status updated to "${newStatus}"`,
      'success'
    );
    get().addNotification({
      type: newStatus === 'Locked' ? 'warning' : 'success',
      title: newStatus === 'Locked' ? 'Account Locked' : 'Account Unlocked',
      message: `Account "${user?.fullName ?? userId}" has been ${newStatus === 'Locked' ? 'locked' : 'unlocked'} by admin.`,
    });
  },

  // --- Transaction actions ---
  updateTransactionStatus: (txId, newStatus) => {
    const tx = get().transactions.find((t) => t.originalId === txId);
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.originalId === txId ? { ...t, status: newStatus } : t
      ),
    }));
    get().showToast(
      `Transaction ${txId.slice(0, 8)}... status updated to "${newStatus}"`,
      'success'
    );
    get().addNotification({
      type: newStatus === 'Refunded' ? 'warning' : 'success',
      title: newStatus === 'Refunded' ? 'Transaction Refunded' : 'Transaction Resolved',
      message: `Transaction ${txId.slice(0, 8)}... (${tx?.userName ?? ''} · ₫${((tx?.amount ?? 0) / 1_000_000).toFixed(1)}M) marked as "${newStatus}".`,
    });
  },

  // --- Toast ---
  showToast: (message, type = 'info') => {
    set({ toast: { message, type } });
    setTimeout(() => set({ toast: null }), 3500);
  },
  clearToast: () => set({ toast: null }),

  // --- Notifications ---
  addNotification: (n) => {
    const newNotif: AdminNotification = {
      ...n,
      id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      time: 'Just now',
      read: false,
    };
    set((state) => ({
      notifications: [newNotif, ...state.notifications],
    }));
  },
  markAllNotificationsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
  clearNotifications: () => set({ notifications: [] }),
  dismissNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  // --- Auth ---
  setAdminInfo: (name, email) => set({ adminName: name, adminEmail: email }),
}));

// Export mappers so components can use them
export { mapUser, mapTransaction, formatDate, formatTimestamp, timeAgo };

// ============================================================
// YEAR_DATA — Mock historical data for charts (used by Reports)
// Kept for chart visualization; BE provides real-time stats
// ============================================================

type DailyEntry = { date: string; dayLabel: string; revenue: number; transactions: number; newUsers: number; gtv: number };

function generateYearData(): DailyEntry[] {
  const entries: DailyEntry[] = [];
  const start = new Date("2025-06-01");
  const end = new Date("2026-05-31");

  let id = 0;
  const current = new Date(start);
  while (current <= end) {
    const dayNum = current.getDay();
    const isWeekend = dayNum === 0 || dayNum === 6;
    const noiseFactor = (Math.sin(id * 7.3) * 0.5 + 0.5) * 0.2 + 0.9;
    const daysSinceStart = id;
    const growthFactor = 1 + (daysSinceStart / 365) * 0.6;
    const weekendDip = isWeekend ? 0.72 : 1;
    const baseRevenue = 180_000_000 * growthFactor * weekendDip;
    const revenue = Math.round(baseRevenue * noiseFactor);
    const transactions = Math.round(revenue / 150_000);
    const usersGrowthFactor = 1 + (daysSinceStart / 365) * 1.5;
    const usersWeekendBoost = isWeekend ? 1.2 : 1;
    const userNoise = (Math.cos(id * 5.1) * 0.5 + 0.5) * 0.2 + 0.9;
    const newUsers = Math.round(120 * usersGrowthFactor * usersWeekendBoost * userNoise);
    const gtvNoise = (Math.sin(id * 3.7) * 0.5 + 0.5) * 0.4 + 4.3;
    const gtv = Math.round(revenue * gtvNoise);
    const dateStr = current.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" });
    const dayLabel = current.toLocaleDateString("en-GB", { weekday: "short" });
    entries.push({ date: dateStr, dayLabel, revenue, transactions, newUsers, gtv });
    current.setDate(current.getDate() + 1);
    id++;
  }
  return entries;
}

export const YEAR_DATA = generateYearData();
export const DAILY_TARGET = 250_000_000;
