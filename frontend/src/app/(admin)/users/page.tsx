"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { Search, Eye, Lock, Unlock, X, ShieldCheck, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useAdminStore, type AdminUser, type UserStatus, formatDate, formatTimestamp, mapTransaction } from "@/stores/adminStore";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import type { AdminUserDetailResponse } from "@/types/admin/user";

function SkeletonRow() {
  return (
    <tr className="animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <td key={i} className="px-5 py-4">
          <div className="h-4 rounded bg-slate-800 w-full max-w-[120px]" />
        </td>
      ))}
    </tr>
  );
}

const STATUS_CONFIG: Record<UserStatus, { label: string; dot: string; bg: string; text: string; border: string }> = {
  Active: {
    label: "Active",
    dot: "bg-emerald-400",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
  },
  Locked: {
    label: "Locked",
    dot: "bg-rose-500",
    bg: "bg-rose-500/10",
    text: "text-rose-400",
    border: "border-rose-500/30",
  },
};

function formatVND(n: number) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", minimumFractionDigits: 0 }).format(n);
}

function maskAccountNumber(value: string) {
  if (!value) return "—";
  if (value.length <= 4) return value;
  return `•••• ${value.slice(-4)}`;
}

function mapDetailStatus(detail: AdminUserDetailResponse["data"]): UserStatus {
  if (detail.deletedAt) return "Locked";
  return "Active";
}

function StatusBadge({ status }: { status: UserStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot} ${status === "Locked" ? "animate-pulse" : ""}`} />
      {cfg.label}
    </span>
  );
}

function ActivityDrawer({
  user,
  detail,
  isLoading,
  onClose,
}: {
  user: AdminUser;
  detail: AdminUserDetailResponse["data"] | null;
  isLoading: boolean;
  onClose: () => void;
}) {
  const status = detail ? mapDetailStatus(detail) : user.status;
  const wallet = detail?.wallets?.[0];
  const linkedBanks = detail?.linkedBanks ?? [];
  const transactions = detail?.transactions ?? [];
  const notifications = detail?.notifications ?? [];

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative z-10 w-full max-w-md h-full bg-slate-900 border-l border-slate-700 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <div>
            <h2 className="text-base font-bold text-white">User Details</h2>
            <p className="text-xs text-slate-400 mt-0.5">{user.fullName} · {user.userId}</p>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="px-5 py-4 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
              {user.fullName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">{detail?.name ?? user.fullName}</p>
              <p className="text-xs text-slate-400">{detail?.email ?? user.email}</p>
            </div>
            <StatusBadge status={status} />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="bg-slate-800/80 rounded-xl p-3">
              <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider mb-0.5">Balance</p>
              <p className="text-sm font-bold text-white font-mono">{formatVND(wallet?.balance ?? user.walletBalance)}</p>
            </div>
            <div className="bg-slate-800/80 rounded-xl p-3">
              <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider mb-0.5">Registered</p>
              <p className="text-sm font-medium text-white">{detail ? formatDate(detail.createdAt) : user.registrationDate}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {isLoading ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-24 rounded-2xl bg-slate-800" />
              <div className="h-24 rounded-2xl bg-slate-800" />
              <div className="h-32 rounded-2xl bg-slate-800" />
            </div>
          ) : (
            <>
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Contact</h3>
                <div className="space-y-2">
                  <div className="bg-slate-800/60 rounded-xl p-3">
                    <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider mb-0.5">Email</p>
                    <p className="text-sm text-slate-200">{detail?.email ?? user.email}</p>
                    <p className="text-[11px] text-slate-500 mt-1">Verified: {detail?.isEmailVerified ? "Yes" : "No"}</p>
                  </div>
                  <div className="bg-slate-800/60 rounded-xl p-3">
                    <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider mb-0.5">Phone</p>
                    <p className="text-sm text-slate-200">{detail?.phoneNumber ?? user.phoneNumber}</p>
                    <p className="text-[11px] text-slate-500 mt-1">Verified: {detail?.isPhoneVerified ? "Yes" : "No"}</p>
                  </div>
                  <div className="bg-slate-800/60 rounded-xl p-3">
                    <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider mb-0.5">Security</p>
                    <p className="text-sm text-slate-200">2FA: {detail?.twoFactorEnabled ? "Enabled" : "Disabled"}</p>
                    <p className="text-[11px] text-slate-500 mt-1">Last login: {detail?.lastLoginAt ? formatTimestamp(detail.lastLoginAt) : "Never"}</p>
                  </div>
                  <div className="bg-slate-800/60 rounded-xl p-3">
                    <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider mb-0.5">User ID</p>
                    <p className="text-sm text-slate-200 font-mono break-all">{user.userId}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Wallet</h3>
                <div className="bg-slate-800/60 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between gap-3 text-sm"><span className="text-slate-400">Account</span><span className="text-slate-200 font-mono">{wallet ? maskAccountNumber(wallet.accountNumber) : "—"}</span></div>
                  <div className="flex items-center justify-between gap-3 text-sm"><span className="text-slate-400">Currency</span><span className="text-slate-200">{wallet?.currency ?? "VND"}</span></div>
                  <div className="flex items-center justify-between gap-3 text-sm"><span className="text-slate-400">Status</span><span className={wallet?.isActive ? "text-emerald-400" : "text-rose-400"}>{wallet?.isActive ? "Active" : "Inactive"}</span></div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Linked Banks</h3>
                {linkedBanks.length === 0 ? (
                  <div className="bg-slate-800/60 rounded-xl p-3 text-sm text-slate-500">No linked bank accounts.</div>
                ) : (
                  <div className="space-y-2">
                    {linkedBanks.map((bank) => (
                      <div key={bank.id} className="bg-slate-800/60 rounded-xl p-3">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold text-slate-200">{bank.bankCode}</p>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${bank.isVerified ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" : "text-amber-400 border-amber-500/30 bg-amber-500/10"}`}>
                            {bank.isVerified ? "Verified" : "Pending"}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{bank.accountName} · {maskAccountNumber(bank.accountNumber)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Recent Transactions</h3>
                {transactions.length === 0 ? (
                  <div className="bg-slate-800/60 rounded-xl p-3 text-sm text-slate-500">No recent transactions.</div>
                ) : (
                  <div className="space-y-2">
                    {transactions.slice(0, 5).map((tx) => {
                      const mapped = mapTransaction({ ...tx, user: { name: detail?.name ?? user.fullName }, userId: detail?.id ?? user.id, wallet: { accountNumber: wallet?.accountNumber ?? "—" } });
                      return (
                        <div key={tx.id} className="bg-slate-800/60 rounded-xl p-3">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-xs text-slate-200 font-mono">{tx.id.slice(0, 12)}...</p>
                            <span className="text-xs text-slate-400">{mapped.status}</span>
                          </div>
                          <p className="text-sm text-white font-semibold mt-1">{formatVND(tx.amount)}</p>
                          <p className="text-[11px] text-slate-500 mt-1">{formatTimestamp(tx.createdAt)} · {tx.type}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Recent Notifications</h3>
                {notifications.length === 0 ? (
                  <div className="bg-slate-800/60 rounded-xl p-3 text-sm text-slate-500">No notifications.</div>
                ) : (
                  <div className="space-y-2">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="bg-slate-800/60 rounded-xl p-3">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold text-slate-200">{notification.title}</p>
                          <span className={`text-[10px] ${notification.isRead ? "text-slate-500" : "text-indigo-400"}`}>{notification.isRead ? "Read" : "Unread"}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{notification.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className="p-5 border-t border-slate-700 bg-slate-900">
          <button onClick={onClose} className="w-full h-11 rounded-xl bg-slate-800 text-slate-300 font-semibold text-sm hover:bg-slate-700 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function UsersPage() {
  const { users, usersTotal, usersPage, usersTotalPages, isLoadingUsers, errorUsers } = useAdminUsers();
  const { lockUser, unlockUser, fetchUsers, getUserDetail } = useAdminUsers();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "All">("All");
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [selectedUserDetail, setSelectedUserDetail] = useState<AdminUserDetailResponse["data"] | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [pendingToggle, setPendingToggle] = useState<{
    userId: string;
    action: "lock" | "unlock";
    name: string;
    reason: string;
  } | null>(null);

  useEffect(() => {
    fetchUsers({ page: 1, limit: 20 });
  }, [fetchUsers]);

  const handleSearch = useCallback((s: string) => {
    setSearch(s);
    fetchUsers({ search: s || undefined, page: 1, limit: 20 });
  }, [fetchUsers]);

  const handlePageChange = useCallback((page: number) => {
    fetchUsers({ search: search || undefined, page, limit: 20 });
  }, [fetchUsers, search]);

  const filtered = useMemo(() => {
    if (statusFilter === "All") return users;
    return users.filter((u) => u.status === statusFilter);
  }, [users, statusFilter]);

  const counts = useMemo(() => ({
    total: users.length,
    active: users.filter((u) => u.status === "Active").length,
    locked: users.filter((u) => u.status === "Locked").length,
  }), [users]);

  const openUserDetail = useCallback(async (user: AdminUser) => {
    setSelectedUser(user);
    setSelectedUserDetail(null);
    setIsLoadingDetail(true);
    const detail = await getUserDetail(user.id);
    setSelectedUserDetail(detail);
    setIsLoadingDetail(false);
  }, [getUserDetail]);

  const handleToggleConfirm = async (reason?: string) => {
    if (!pendingToggle) return;
    const { userId, action, name } = pendingToggle;
    const success = action === "lock"
      ? await lockUser(userId, reason || "Locked by admin", name)
      : await unlockUser(userId, reason || "Unlocked by admin", name);
    setPendingToggle(null);
    if (success) {
      fetchUsers({ search: search || undefined, page: usersPage, limit: 20 });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-sm text-slate-400 mt-1">Search, monitor, and manage user account statuses</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400"><ShieldCheck size={13} className="text-indigo-400" />{usersTotal} total</div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400"><CheckCircle2 size={13} />{counts.active} active</div>
        </div>
      </div>

      {errorUsers && (
        <div className="flex items-center gap-3 bg-rose-500/10 border border-rose-500/30 rounded-2xl px-5 py-4">
          <AlertTriangle size={16} className="text-rose-400 shrink-0" />
          <p className="text-sm text-rose-400">{errorUsers}</p>
          <button onClick={() => fetchUsers({ page: 1, limit: 20 })} className="ml-auto text-xs text-rose-400 underline hover:no-underline">Retry</button>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Users", value: usersTotal, icon: "👥", color: "indigo" },
          { label: "Active", value: counts.active, icon: "✅", color: "emerald" },
          { label: "Locked", value: counts.locked, icon: "🔒", color: "rose" },
        ].map((s) => (
          <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2"><span className="text-xs text-slate-500 font-medium">{s.label}</span><span className="text-base">{s.icon}</span></div>
            <p className={`text-3xl font-bold font-mono text-${s.color}-400`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by name, phone, email, ID..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-9 pr-4 h-10 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          {(["All", "Active", "Locked"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={[
                "h-10 px-4 rounded-xl text-xs font-semibold border transition-all duration-150",
                statusFilter === s
                  ? s === "All"
                    ? "bg-indigo-600/20 border-indigo-500/50 text-indigo-400"
                    : s === "Active"
                    ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                    : "bg-rose-500/20 border-rose-500/50 text-rose-400"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300",
              ].join(" ")}
            >
              {s}
              {s !== "All" && <span className="ml-1.5 opacity-60">{s === "Active" ? counts.active : counts.locked}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                {["User", "Contact", "Balance", "Status", "Registered", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[11px] font-bold text-slate-500 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {isLoadingUsers ? (
                Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-16 text-center text-slate-500 text-sm">{errorUsers ? "Failed to load users." : "No users match your filters."}</td></tr>
              ) : (
                filtered.map((user) => (
                  <tr key={user.id} className="group hover:bg-slate-800/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold text-sm shrink-0">{user.fullName.charAt(0)}</div>
                        <div>
                          <p className="text-sm font-semibold text-slate-100">{user.fullName}</p>
                          <p className="text-xs text-slate-500 font-mono break-all">{user.userId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4"><p className="text-xs text-slate-300">{user.email}</p><p className="text-xs text-slate-500">{user.phoneNumber}</p></td>
                    <td className="px-5 py-4"><span className="text-sm font-mono font-semibold text-slate-100">{formatVND(user.walletBalance)}</span></td>
                    <td className="px-5 py-4"><StatusBadge status={user.status} /></td>
                    <td className="px-5 py-4"><span className="text-xs text-slate-400">{user.registrationDate}</span></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openUserDetail(user)} title="View details" className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:bg-indigo-600/20 hover:border-indigo-500/40 hover:text-indigo-400 transition-all"><Eye size={14} /></button>
                        <button
                          onClick={() => {
                            setPendingToggle({
                              userId: user.id,
                              action: user.status === "Locked" ? "unlock" : "lock",
                              name: user.fullName,
                              reason: "",
                            });
                          }}
                          title={user.status === "Locked" ? "Unlock account" : "Lock account"}
                          className={[
                            "flex h-8 w-8 items-center justify-center rounded-lg border transition-all",
                            user.status === "Locked"
                              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
                              : "bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20",
                          ].join(" ")}
                        >
                          {user.status === "Locked" ? <Unlock size={14} /> : <Lock size={14} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {usersTotalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-800">
            <p className="text-xs text-slate-500">Showing {(usersPage - 1) * 20 + 1}–{Math.min(usersPage * 20, usersTotal)} of {usersTotal}</p>
            <div className="flex items-center gap-1.5">
              <button onClick={() => handlePageChange(usersPage - 1)} disabled={usersPage === 1} className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:bg-slate-700 disabled:opacity-40 transition-colors">‹</button>
              {Array.from({ length: Math.min(5, usersTotalPages) }, (_, i) => {
                const p = Math.max(1, Math.min(usersPage - 2, usersTotalPages - 4)) + i;
                return (
                  <button key={p} onClick={() => handlePageChange(p)} className={[
                    "h-8 w-8 flex items-center justify-center rounded-lg text-xs font-semibold border transition-colors",
                    p === usersPage ? "bg-indigo-600 border-indigo-500/50 text-white" : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700",
                  ].join(" ")}>{p}</button>
                );
              })}
              <button onClick={() => handlePageChange(usersPage + 1)} disabled={usersPage >= usersTotalPages} className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:bg-slate-700 disabled:opacity-40 transition-colors">›</button>
            </div>
          </div>
        )}
      </div>

      {selectedUser && (
        <ActivityDrawer user={selectedUser} detail={selectedUserDetail} isLoading={isLoadingDetail} onClose={() => setSelectedUser(null)} />
      )}

      {pendingToggle && (
        <ConfirmDialog
          open
          title={pendingToggle.action === "lock" ? "Khóa tài khoản" : "Mở khóa tài khoản"}
          message={pendingToggle.action === "lock" ? `Nhập lý do khóa tài khoản của ${pendingToggle.name}.` : `Nhập lý do mở khóa tài khoản của ${pendingToggle.name}.`}
          confirmLabel={pendingToggle.action === "lock" ? "Khóa tài khoản" : "Mở khóa tài khoản"}
          variant={pendingToggle.action === "lock" ? "danger" : "warning"}
          reasonRequired
          reasonLabel="Lý do"
          reasonPlaceholder="Nhập lý do để ghi nhận audit log và gửi thông báo cho người dùng"
          onConfirm={handleToggleConfirm}
          onCancel={() => setPendingToggle(null)}
        />
      )}
    </div>
  );
}
