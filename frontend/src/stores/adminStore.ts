import { create } from "zustand";

/* ============================================================
   Admin Store — E-Wallet Admin Portal
   Manages all admin state: users, transactions, UI
   ============================================================ */

// --- Types ---
export type UserStatus = "Active" | "Locked" | "Suspicious";

export type NotificationType = "warning" | "error" | "info" | "success";

export interface AdminNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface AdminUser {
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  walletBalance: number;
  status: UserStatus;
  registrationDate: string;
  recentActivities: string[];
  avatar?: string;
}

export type TxStatus = "Pending" | "Timeout" | "Processing" | "Resolved" | "Refunded";
export type PaymentChannel =
  | "Internal Wallet"
  | "Napas Bank"
  | "Visa/Mastercard"
  | "MoMo"
  | "ZaloPay";

export interface AdminTransaction {
  txId: string;
  timestamp: string;
  userId: string;
  userName: string;
  amount: number;
  paymentChannel: PaymentChannel;
  status: TxStatus;
  errorLogs: string;
}

// --- Mock Data: 10 Users ---
const MOCK_USERS: AdminUser[] = [
  {
    userId: "USR-001",
    fullName: "Nguyễn Văn Minh",
    email: "minh.nguyen@example.com",
    phoneNumber: "0901234567",
    walletBalance: 15420000,
    status: "Active",
    registrationDate: "2025-03-12",
    recentActivities: [
      "2026-05-31 08:14 — Logged in from 42.113.45.67",
      "2026-05-30 19:32 — Transferred 2,500,000 VND to USR-003",
      "2026-05-29 11:05 — Topped up 5,000,000 VND via Napas Bank",
      "2026-05-28 15:48 — Logged in from 42.113.45.67",
    ],
  },
  {
    userId: "USR-002",
    fullName: "Trần Thị Lan",
    email: "lan.tran@example.com",
    phoneNumber: "0912345678",
    walletBalance: 8750000,
    status: "Active",
    registrationDate: "2025-01-08",
    recentActivities: [
      "2026-05-30 22:10 — Logged in from 113.185.23.44",
      "2026-05-29 08:55 — Payment of 350,000 VND at Shopee",
      "2026-05-28 14:20 — Logged in from 113.185.23.44",
    ],
  },
  {
    userId: "USR-003",
    fullName: "Lê Hoàng Nam",
    email: "nam.le@example.com",
    phoneNumber: "0934123456",
    walletBalance: 3200000,
    status: "Active",
    registrationDate: "2025-04-20",
    recentActivities: [
      "2026-05-31 09:02 — Received 2,500,000 VND from USR-001",
      "2026-05-30 17:45 — Payment of 180,000 VND at Highlands Coffee",
      "2026-05-29 12:00 — Logged in from 14.226.10.88",
    ],
  },
  {
    userId: "USR-004",
    fullName: "Phạm Thu Hà",
    email: "ha.pham@example.com",
    phoneNumber: "0987654321",
    walletBalance: 0,
    status: "Locked",
    registrationDate: "2025-02-14",
    recentActivities: [
      "2026-05-29 03:17 — Logged in from unexpected IP 185.234.72.15",
      "2026-05-29 03:19 — Rapid consecutive transactions (7 tx in 45s)",
      "2026-05-29 03:22 — Account locked by fraud detection system",
      "2026-05-29 03:22 — Flagged for fraudulent activity",
    ],
  },
  {
    userId: "USR-005",
    fullName: "Đỗ Minh Tuấn",
    email: "tuan.do@example.com",
    phoneNumber: "0977123456",
    walletBalance: 22100000,
    status: "Active",
    registrationDate: "2025-01-30",
    recentActivities: [
      "2026-05-30 16:30 — Topped up 10,000,000 VND via Visa",
      "2026-05-29 10:00 — Transferred 1,000,000 VND to USR-007",
      "2026-05-28 09:15 — Logged in from 118.70.45.123",
    ],
  },
  {
    userId: "USR-006",
    fullName: "Vũ Thị Mai",
    email: "mai.vu@example.com",
    phoneNumber: "0909876543",
    walletBalance: 5600000,
    status: "Suspicious",
    registrationDate: "2025-05-05",
    recentActivities: [
      "2026-05-30 21:45 — Logged in from unexpected IP 45.227.34.90",
      "2026-05-30 21:47 — Rapid consecutive transactions (5 tx in 30s)",
      "2026-05-30 21:50 — Flagged by fraud detection — review pending",
      "2026-05-29 14:00 — Logged in from 14.162.55.200",
    ],
  },
  {
    userId: "USR-007",
    fullName: "Bùi Đức Anh",
    email: "anh.bui@example.com",
    phoneNumber: "0963123456",
    walletBalance: 18300000,
    status: "Active",
    registrationDate: "2025-03-28",
    recentActivities: [
      "2026-05-31 07:50 — Logged in from 1.53.88.234",
      "2026-05-30 20:15 — Payment of 2,000,000 VND at Tiki",
      "2026-05-29 11:30 — Received 1,000,000 VND from USR-005",
    ],
  },
  {
    userId: "USR-008",
    fullName: "Hoàng Thị Yến",
    email: "yen.hoang@example.com",
    phoneNumber: "0945123456",
    walletBalance: 4100000,
    status: "Active",
    registrationDate: "2025-06-10",
    recentActivities: [
      "2026-05-30 18:00 — Topped up 2,000,000 VND via MoMo",
      "2026-05-29 09:30 — Payment of 500,000 VND at Grab",
      "2026-05-28 15:00 — Logged in from 27.2.192.77",
    ],
  },
  {
    userId: "USR-009",
    fullName: "Trịnh Gia Bảo",
    email: "bao.trinh@example.com",
    phoneNumber: "0928123456",
    walletBalance: 0,
    status: "Locked",
    registrationDate: "2025-04-01",
    recentActivities: [
      "2026-05-27 14:33 — Logged in from unexpected IP 103.75.190.44",
      "2026-05-27 14:35 — Attempted to withdraw 50,000,000 VND — FAILED",
      "2026-05-27 14:36 — Account locked — suspicious withdrawal attempt",
      "2026-05-26 10:00 — Last normal login from 27.72.100.55",
    ],
  },
  {
    userId: "USR-010",
    fullName: "Ngô Thị Phương",
    email: "phuong.ngo@example.com",
    phoneNumber: "0956123456",
    walletBalance: 12700000,
    status: "Active",
    registrationDate: "2025-02-22",
    recentActivities: [
      "2026-05-30 14:00 — Logged in from 14.226.11.55",
      "2026-05-29 16:45 — Transferred 3,000,000 VND to USR-002",
      "2026-05-28 08:30 — Topped up 5,000,000 VND via Napas Bank",
    ],
  },
];

// --- Mock Data: 15 Transactions ---
const MOCK_TRANSACTIONS: AdminTransaction[] = [
  {
    txId: "TXN-20260531001",
    timestamp: "2026-05-31 10:42:18",
    userId: "USR-001",
    userName: "Nguyễn Văn Minh",
    amount: 2500000,
    paymentChannel: "Napas Bank",
    status: "Pending",
    errorLogs: "Gateway timeout — no response from bank after 30s",
  },
  {
    txId: "TXN-20260531002",
    timestamp: "2026-05-31 10:38:05",
    userId: "USR-003",
    userName: "Lê Hoàng Nam",
    amount: 180000,
    paymentChannel: "Internal Wallet",
    status: "Resolved",
    errorLogs: "—",
  },
  {
    txId: "TXN-20260531003",
    timestamp: "2026-05-31 10:30:00",
    userId: "USR-005",
    userName: "Đỗ Minh Tuấn",
    amount: 10000000,
    paymentChannel: "Visa/Mastercard",
    status: "Timeout",
    errorLogs: "Card issuer declined — insufficient daily limit on card",
  },
  {
    txId: "TXN-20260531004",
    timestamp: "2026-05-31 10:15:22",
    userId: "USR-007",
    userName: "Bùi Đức Anh",
    amount: 2000000,
    paymentChannel: "Internal Wallet",
    status: "Processing",
    errorLogs: "—",
  },
  {
    txId: "TXN-20260531005",
    timestamp: "2026-05-31 09:55:11",
    userId: "USR-002",
    userName: "Trần Thị Lan",
    amount: 350000,
    paymentChannel: "MoMo",
    status: "Resolved",
    errorLogs: "—",
  },
  {
    txId: "TXN-20260531006",
    timestamp: "2026-05-31 09:40:33",
    userId: "USR-006",
    userName: "Vũ Thị Mai",
    amount: 5000000,
    paymentChannel: "ZaloPay",
    status: "Timeout",
    errorLogs: "ZaloPay API error 504: Gateway Timeout after 45s",
  },
  {
    txId: "TXN-20260531007",
    timestamp: "2026-05-31 09:20:09",
    userId: "USR-010",
    userName: "Ngô Thị Phương",
    amount: 3000000,
    paymentChannel: "Napas Bank",
    status: "Pending",
    errorLogs: "Idempotency key conflict — duplicate request detected",
  },
  {
    txId: "TXN-20260531008",
    timestamp: "2026-05-31 08:55:44",
    userId: "USR-008",
    userName: "Hoàng Thị Yến",
    amount: 2000000,
    paymentChannel: "Visa/Mastercard",
    status: "Resolved",
    errorLogs: "—",
  },
  {
    txId: "TXN-20260531009",
    timestamp: "2026-05-31 08:30:15",
    userId: "USR-001",
    userName: "Nguyễn Văn Minh",
    amount: 500000,
    paymentChannel: "Internal Wallet",
    status: "Resolved",
    errorLogs: "—",
  },
  {
    txId: "TXN-20260531010",
    timestamp: "2026-05-31 08:10:00",
    userId: "USR-005",
    userName: "Đỗ Minh Tuấn",
    amount: 1500000,
    paymentChannel: "Napas Bank",
    status: "Timeout",
    errorLogs: "Bank system maintenance window — service unavailable",
  },
  {
    txId: "TXN-20260531011",
    timestamp: "2026-05-31 07:50:22",
    userId: "USR-003",
    userName: "Lê Hoàng Nam",
    amount: 750000,
    paymentChannel: "MoMo",
    status: "Processing",
    errorLogs: "—",
  },
  {
    txId: "TXN-20260531012",
    timestamp: "2026-05-31 07:30:10",
    userId: "USR-007",
    userName: "Bùi Đức Anh",
    amount: 1200000,
    paymentChannel: "ZaloPay",
    status: "Resolved",
    errorLogs: "—",
  },
  {
    txId: "TXN-20260531013",
    timestamp: "2026-05-31 07:10:05",
    userId: "USR-002",
    userName: "Trần Thị Lan",
    amount: 890000,
    paymentChannel: "Internal Wallet",
    status: "Refunded",
    errorLogs: "Previous attempt TXN-20260530099 failed — user refunded",
  },
  {
    txId: "TXN-20260531014",
    timestamp: "2026-05-31 06:45:30",
    userId: "USR-008",
    userName: "Hoàng Thị Yến",
    amount: 3200000,
    paymentChannel: "Visa/Mastercard",
    status: "Timeout",
    errorLogs: "Card declined — suspected fraud flag on issuer side",
  },
  {
    txId: "TXN-20260531015",
    timestamp: "2026-05-31 06:20:00",
    userId: "USR-010",
    userName: "Ngô Thị Phương",
    amount: 450000,
    paymentChannel: "Internal Wallet",
    status: "Resolved",
    errorLogs: "—",
  },
];

// --- Mock notifications ---
const MOCK_NOTIFICATIONS: AdminNotification[] = [
  {
    id: "1",
    type: "error",
    title: "Suspicious Transaction Detected",
    message: "TXN-20250631-0847 flagged — rapid consecutive transfers from account #U007",
    time: "2 min ago",
    read: false,
  },
  {
    id: "2",
    type: "warning",
    title: "Account Locked Automatically",
    message: "Account #U009 locked by fraud system — 5 failed login attempts",
    time: "12 min ago",
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "Gateway Timeout — 3 Pending",
    message: "3 transactions from Napas channel timed out and need manual review",
    time: "34 min ago",
    read: true,
  },
  {
    id: "4",
    type: "success",
    title: "New User Registered",
    message: "New user registered: alice.martinez@outlook.com with initial wallet top-up",
    time: "1 hr ago",
    read: true,
  },
];

// --- Store ---
interface AdminState {
  users: AdminUser[];
  transactions: AdminTransaction[];
  isLoading: boolean;
  toast: { message: string; type: "success" | "error" | "info" } | null;
  notifications: AdminNotification[];
}

interface AdminActions {
  toggleUserStatus: (userId: string) => void;
  showToast: (message: string, type?: "success" | "error" | "info") => void;
  clearToast: () => void;
  resolveTransaction: (txId: string, newStatus: TxStatus) => void;
  addNotification: (n: Omit<AdminNotification, "id" | "time" | "read">) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
  dismissNotification: (id: string) => void;
}

export const useAdminStore = create<AdminState & AdminActions>((set, get) => ({
  users: MOCK_USERS,
  transactions: MOCK_TRANSACTIONS,
  isLoading: false,
  toast: null,
  notifications: MOCK_NOTIFICATIONS,

  toggleUserStatus: (userId) => {
    const prev = get().users.find((u) => u.userId === userId);
    const prevStatus = prev?.status ?? "Active";
    const newStatus: UserStatus = prevStatus === "Locked" ? "Active" : "Locked";

    set((state) => ({
      users: state.users.map((u) =>
        u.userId === userId ? { ...u, status: newStatus } : u
      ),
    }));
    get().showToast(
      `${prev?.fullName ?? userId} has been ${newStatus === "Locked" ? "locked" : "unlocked"}.`,
      "success"
    );
    get().addNotification({
      type: newStatus === "Locked" ? "warning" : "success",
      title: newStatus === "Locked" ? "Account Locked" : "Account Unlocked",
      message: `Account "${prev?.fullName ?? userId}" (${userId}) has been ${newStatus === "Locked" ? "locked" : "unlocked"} by admin.`,
    });
  },

  showToast: (message, type = "info") => {
    set({ toast: { message, type } });
    setTimeout(() => {
      set({ toast: null });
    }, 3500);
  },

  clearToast: () => set({ toast: null }),

  resolveTransaction: (txId, newStatus) => {
    const tx = get().transactions.find((t) => t.txId === txId);
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.txId === txId ? { ...t, status: newStatus } : t
      ),
    }));
    get().showToast(
      `Transaction ${txId} — status updated to "${newStatus}".`,
      "success"
    );
    get().addNotification({
      type: newStatus === "Refunded" ? "warning" : "success",
      title: newStatus === "Refunded" ? "Transaction Refunded" : "Transaction Resolved",
      message: `Transaction ${txId} (${tx?.userName ?? ""} · ₫${((tx?.amount ?? 0) / 1_000_000).toFixed(1)}M) has been marked as "${newStatus}" by admin.`,
    });
  },

  addNotification: (n) => {
    const newNotif: AdminNotification = {
      ...n,
      id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      time: "Just now",
      read: false,
    };
    set((state) => ({
      notifications: [newNotif, ...state.notifications],
    }));
  },

  markAllNotificationsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    }));
  },

  clearNotifications: () => set({ notifications: [] }),

  dismissNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },
}));

// --- Report mock data helpers ---
// Generates 365 days of realistic daily data (ending 2026-05-31)
// Weekends have ~30% less traffic; months show growth trend

type DailyEntry = { date: string; dayLabel: string; revenue: number; transactions: number; newUsers: number; gtv: number };

function generateYearData(): DailyEntry[] {
  const entries: DailyEntry[] = [];
  const start = new Date("2025-06-01");
  const end = new Date("2026-05-31");

  let id = 0;
  const current = new Date(start);
  while (current <= end) {
    const dayNum = current.getDay(); // 0=Sun, 6=Sat
    const isWeekend = dayNum === 0 || dayNum === 6;
    // Deterministic noise based on day index (no Math.random() — avoids SSR hydration mismatch)
    const noiseFactor = (Math.sin(id * 7.3) * 0.5 + 0.5) * 0.2 + 0.9; // 0.9–1.1
    // Progressive growth: 0% at start → ~60% growth at end
    const daysSinceStart = id;
    const growthFactor = 1 + (daysSinceStart / 365) * 0.6;
    const weekendDip = isWeekend ? 0.72 : 1;

    const baseRevenue = 180_000_000 * growthFactor * weekendDip;
    const revenue = Math.round(baseRevenue * noiseFactor);
    const transactions = Math.round(revenue / 150_000);

    // New users: base 120/day growing to 300/day, weekends higher
    const usersGrowthFactor = 1 + (daysSinceStart / 365) * 1.5;
    const usersWeekendBoost = isWeekend ? 1.2 : 1;
    const userNoise = (Math.cos(id * 5.1) * 0.5 + 0.5) * 0.2 + 0.9;
    const newUsers = Math.round(120 * usersGrowthFactor * usersWeekendBoost * userNoise);

    // GTV: ~5× revenue
    const gtvNoise = (Math.sin(id * 3.7) * 0.5 + 0.5) * 0.4 + 4.3; // 4.3–4.7
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

// Derived slices
export const REVENUE_DATA = YEAR_DATA.slice(-7).map((d) => ({
  day: `${d.dayLabel} ${d.date}`,
  revenue: d.revenue,
  transactions: d.transactions,
}));

export const USER_GROWTH_DATA = YEAR_DATA.slice(-7).map((d) => ({
  day: d.dayLabel,
  newUsers: d.newUsers,
  gtv: d.gtv,
}));

// Today = last entry, yesterday = second-to-last
export const REVENUE_TODAY = YEAR_DATA[YEAR_DATA.length - 1].revenue;
export const REVENUE_YESTERDAY = YEAR_DATA[YEAR_DATA.length - 2].revenue;
export const USERS_TODAY = YEAR_DATA[YEAR_DATA.length - 1].newUsers;
export const USERS_YESTERDAY = YEAR_DATA[YEAR_DATA.length - 2].newUsers;

export const DAILY_TARGET = 250_000_000;
export const TODAY_TARGET_PCT = Math.round((REVENUE_TODAY / DAILY_TARGET) * 100);
