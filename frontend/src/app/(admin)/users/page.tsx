"use client";

import { useState, useMemo } from "react";
import { Search, Eye, Lock, Unlock, X, ShieldCheck, AlertTriangle, CheckCircle2, Clock, ShieldAlert } from "lucide-react";
import { useAdminStore, type AdminUser, type UserStatus } from "@/stores/adminStore";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

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
  Suspicious: {
    label: "Suspicious",
    dot: "bg-amber-400",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/30",
  },
};

function formatVND(n: number) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", minimumFractionDigits: 0 }).format(n);
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
  onClose,
}: {
  user: AdminUser;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Drawer */}
      <div
        className="relative z-10 w-full max-w-md h-full bg-slate-900 border-l border-slate-700 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <div>
            <h2 className="text-base font-bold text-white">Activity Timeline</h2>
            <p className="text-xs text-slate-400 mt-0.5">{user.fullName} · {user.userId}</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* User info strip */}
        <div className="px-5 py-4 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
              {user.fullName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">{user.fullName}</p>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>
            <StatusBadge status={user.status} />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="bg-slate-800/80 rounded-xl p-3">
              <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider mb-0.5">Balance</p>
              <p className="text-sm font-bold text-white font-mono">{formatVND(user.walletBalance)}</p>
            </div>
            <div className="bg-slate-800/80 rounded-xl p-3">
              <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider mb-0.5">Registered</p>
              <p className="text-sm font-medium text-white">{user.registrationDate}</p>
            </div>
          </div>
        </div>

        {/* Activity timeline */}
        <div className="flex-1 overflow-y-auto p-5">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Recent Activity</h3>
          <div className="relative space-y-0">
            {user.recentActivities.map((activity, i) => {
              const isWarning = activity.includes("unexpected") || activity.includes("Rapid") || activity.includes("Flagged") || activity.includes("locked");
              return (
                <div key={i} className="flex gap-3 pb-5 relative">
                  {/* Line */}
                  {i < user.recentActivities.length - 1 && (
                    <div className="absolute left-3.5 top-8 bottom-0 w-px bg-slate-800" />
                  )}
                  {/* Icon */}
                  <div className={`shrink-0 h-7 w-7 rounded-full flex items-center justify-center mt-0.5 ${
                    isWarning ? "bg-amber-500/20 border border-amber-500/40" : "bg-slate-800 border border-slate-700"
                  }`}>
                    {isWarning ? (
                      <AlertTriangle size={13} className="text-amber-400" />
                    ) : (
                      <Clock size={13} className="text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm leading-relaxed ${isWarning ? "text-amber-200" : "text-slate-300"}`}>
                      {activity}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Risk assessment */}
          {user.status === "Suspicious" && (
            <div className="mt-6 p-4 rounded-2xl border border-amber-500/30 bg-amber-500/5">
              <div className="flex items-center gap-2 mb-2">
                <ShieldAlert size={16} className="text-amber-400" />
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Risk Assessment</span>
              </div>
              <p className="text-xs text-amber-300/80 leading-relaxed">
                This account has been flagged by the fraud detection system. Recent login from unexpected IP and rapid consecutive transactions detected. Manual review is recommended before taking action.
              </p>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-5 border-t border-slate-700 bg-slate-900">
          <button
            onClick={() => {
              onClose();
            }}
            className="w-full h-11 rounded-xl bg-slate-800 text-slate-300 font-semibold text-sm hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function UsersPage() {
  const { users, toggleUserStatus } = useAdminStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "All">("All");
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [pendingToggle, setPendingToggle] = useState<{ userId: string; action: "lock" | "unlock"; name: string } | null>(null);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        !search ||
        u.fullName.toLowerCase().includes(search.toLowerCase()) ||
        u.userId.toLowerCase().includes(search.toLowerCase()) ||
        u.phoneNumber.includes(search) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "All" || u.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [users, search, statusFilter]);

  const counts = useMemo(() => ({
    total: users.length,
    active: users.filter((u) => u.status === "Active").length,
    locked: users.filter((u) => u.status === "Locked").length,
    suspicious: users.filter((u) => u.status === "Suspicious").length,
  }), [users]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-sm text-slate-400 mt-1">
            Search, monitor, and manage user account statuses
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
            <ShieldCheck size={13} className="text-indigo-400" />
            {counts.total} total
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400">
            <CheckCircle2 size={13} />
            {counts.active} active
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Users", value: counts.total, icon: "👥", color: "indigo" },
          { label: "Active", value: counts.active, icon: "✅", color: "emerald" },
          { label: "Locked", value: counts.locked, icon: "🔒", color: "rose" },
        ].map((s) => (
          <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500 font-medium">{s.label}</span>
              <span className="text-base">{s.icon}</span>
            </div>
            <p className={`text-3xl font-bold font-mono text-${s.color}-400`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by name, ID, phone, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 h-10 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          {(["All", "Active", "Locked", "Suspicious"] as const).map((s) => (
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
                    : s === "Locked"
                    ? "bg-rose-500/20 border-rose-500/50 text-rose-400"
                    : "bg-amber-500/20 border-amber-500/50 text-amber-400"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300",
              ].join(" ")}
            >
              {s}
              {s !== "All" && (
                <span className="ml-1.5 opacity-60">
                  {s === "Active" ? counts.active : s === "Locked" ? counts.locked : counts.suspicious}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                {["User", "Contact", "Balance", "Status", "Registered", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3.5 text-left text-[11px] font-bold text-slate-500 uppercase tracking-widest"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center text-slate-500 text-sm">
                    No users match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((user) => {
                  const cfg = STATUS_CONFIG[user.status];
                  return (
                    <tr
                      key={user.userId}
                      className="group hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold text-sm shrink-0">
                            {user.fullName.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-100">{user.fullName}</p>
                            <p className="text-xs text-slate-500 font-mono">{user.userId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-xs text-slate-300">{user.email}</p>
                        <p className="text-xs text-slate-500">{user.phoneNumber}</p>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm font-mono font-semibold text-slate-100">
                          {formatVND(user.walletBalance)}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={user.status} />
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs text-slate-400">{user.registrationDate}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedUser(user)}
                            title="View details"
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:bg-indigo-600/20 hover:border-indigo-500/40 hover:text-indigo-400 transition-all"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            onClick={() => {
                              setPendingToggle({
                                userId: user.userId,
                                action: user.status === "Locked" ? "unlock" : "lock",
                                name: user.fullName,
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
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Drawer */}
      {selectedUser && (
        <ActivityDrawer user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}

      {/* Lock / Unlock Confirmation Dialog */}
      {pendingToggle && (
        <ConfirmDialog
          open
          title={pendingToggle.action === "lock" ? "Lock Account" : "Unlock Account"}
          message={
            pendingToggle.action === "lock"
              ? `Are you sure you want to lock the account "${pendingToggle.name}"? They will lose access immediately.`
              : `Are you sure you want to unlock the account "${pendingToggle.name}"? They will regain access immediately.`
          }
          confirmLabel={pendingToggle.action === "lock" ? "Lock Account" : "Unlock Account"}
          variant={pendingToggle.action === "lock" ? "danger" : "warning"}
          onConfirm={() => {
            toggleUserStatus(pendingToggle.userId);
            setPendingToggle(null);
          }}
          onCancel={() => setPendingToggle(null)}
        />
      )}
    </div>
  );
}
