"use client";

import { useEffect } from "react";
import {
  Users, ArrowLeftRight, DollarSign, AlertTriangle, TrendingUp, ShieldCheck, Clock, Activity,
} from "lucide-react";
import { useAdminStore } from "@/stores/adminStore";
import { useAdminStats } from "@/hooks/useAdminStats";

function SkeletonCard() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-10 w-10 rounded-xl bg-slate-800" />
        <div className="h-5 w-16 rounded-full bg-slate-800" />
      </div>
      <div className="h-8 w-24 rounded bg-slate-800 mb-2" />
      <div className="h-4 w-32 rounded bg-slate-800" />
    </div>
  );
}

function SkeletonTableRow() {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 animate-pulse">
      <div className="h-8 w-8 rounded-lg bg-slate-700 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="h-3 w-24 rounded bg-slate-700 mb-1" />
        <div className="h-2 w-32 rounded bg-slate-700" />
      </div>
      <div className="text-right shrink-0">
        <div className="h-3 w-16 rounded bg-slate-700 mb-1" />
        <div className="h-2 w-10 rounded bg-slate-700" />
      </div>
    </div>
  );
}

function formatVND(n: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(n);
}

function formatVNDShort(n: number) {
  return n >= 1_000_000
    ? `₫${(n / 1_000_000).toFixed(1)}M`
    : `₫${n.toLocaleString("vi-VN")}`;
}

export default function DashboardPage() {
  const { users, errorStats } = useAdminStore();
  const { statistics, isLoadingStats, fetchStatistics } = useAdminStats();

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  const stats = statistics;
  const recentTransactions = stats?.recentTransactions ?? [];
  const fallbackUsers = users.length > 0;
  const fallbackTx = recentTransactions.length > 0;

  const totalUsers = stats?.totalUsers ?? (fallbackUsers ? users.length : 0);
  const activeUsers = stats?.activeUsers ?? (fallbackUsers ? users.filter((u) => u.status === "Active").length : 0);
  const lockedUsers = stats?.lockedUsers ?? (fallbackUsers ? users.filter((u) => u.status === "Locked").length : 0);

  const pendingTx = stats?.pendingTransactions ?? (fallbackTx ? recentTransactions.filter((t) => t.status === "Pending").length : 0);
  const timeoutTx = fallbackTx ? recentTransactions.filter((t) => t.status === "Timeout").length : 0;
  const resolvedTx = fallbackTx ? recentTransactions.filter((t) => t.status === "Resolved").length : 0;

  const revToday = stats?.totalFee ?? 0;
  const revYesterday = stats?.revenueYesterday ?? 0;
  const revDoD = stats?.revenueDoD ?? (revYesterday > 0 ? ((revToday - revYesterday) / revYesterday) * 100 : 0);

  const txToday = stats?.dailySeries?.[0]?.transactionCount ?? stats?.totalTransactionCount ?? 0;
  const txYesterday = stats?.transactionsYesterday ?? 0;
  const txDoD = stats?.txDoD ?? (txYesterday > 0 ? ((txToday - txYesterday) / txYesterday) * 100 : 0);

  const revTrendLabel = revDoD >= 0 ? `+${revDoD.toFixed(1)}%` : `${revDoD.toFixed(1)}%`;
  const txTrendLabel = txDoD >= 0 ? `+${txDoD.toFixed(1)}%` : `${txDoD.toFixed(1)}%`;

  const counts = {
    total: totalUsers,
    active: activeUsers,
    locked: lockedUsers,
  };

  const txCounts = {
    pending: pendingTx,
    timeout: timeoutTx,
    processing: fallbackTx ? recentTransactions.filter((t) => t.status === "Processing").length : 0,
    resolved: resolvedTx,
  };

  const isLoading = isLoadingStats && !stats;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-slate-400 mt-1">
          Real-time overview of E-Wallet platform operations
          {isLoading && <span className="ml-2 text-indigo-400 animate-pulse">— Updating...</span>}
        </p>
        {errorStats && (
          <p className="text-xs text-rose-400 mt-1">API error: {errorStats}</p>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            {([
              {
                label: "Today's Revenue",
                value: formatVNDShort(revToday),
                sub: revYesterday > 0 ? `vs yesterday (${formatVNDShort(revYesterday)})` : "Today",
                icon: <DollarSign size={20} />,
                border: "border-emerald-500/30",
                iconBg: "bg-emerald-500/20",
                iconColor: "text-emerald-400",
                trend: revTrendLabel,
                trendUp: revDoD >= 0,
              },
              {
                label: "Transactions Today",
                value: txToday > 0 ? txToday.toLocaleString() : "—",
                sub: `${txCounts.resolved} resolved · today`,
                icon: <ArrowLeftRight size={20} />,
                border: "border-cyan-500/30",
                iconBg: "bg-cyan-500/20",
                iconColor: "text-cyan-400",
                trend: txTrendLabel,
                trendUp: txDoD >= 0,
              },
              {
                label: "Alerts",
                value: (txCounts.pending + txCounts.timeout).toString(),
                sub: "Need attention",
                icon: <AlertTriangle size={20} />,
                border: "border-amber-500/30",
                iconBg: "bg-amber-500/20",
                iconColor: "text-amber-400",
                trend: "Action needed",
                trendUp: false,
              },
              {
                label: "Total Users",
                value: counts.total.toLocaleString(),
                sub: `${counts.active} active · ${counts.locked} locked`,
                icon: <Users size={20} />,
                border: "border-indigo-500/30",
                iconBg: "bg-indigo-500/20",
                iconColor: "text-indigo-400",
                trend: stats ? `+${stats.newUsersThisMonth} this month` : "Live data",
                trendUp: true,
              },
            ] as const).map((card) => (
              <div key={card.label} className={`bg-slate-900 border ${card.border} rounded-2xl p-5`}>
                <div className="flex items-center justify-between mb-4">
                  <span className={`flex items-center justify-center h-10 w-10 rounded-xl ${card.iconBg}`}>
                    <span className={card.iconColor}>{card.icon}</span>
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    card.trendUp
                      ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/30"
                      : "text-amber-400 bg-amber-500/10 border border-amber-500/30"
                  }`}>
                    {card.trend}
                  </span>
                </div>
                <p className="text-2xl font-bold font-mono text-white mb-0.5">{card.value}</p>
                <p className="text-xs text-slate-400 font-medium">{card.label}</p>
                <p className="text-[10px] text-slate-600 mt-0.5">{card.sub}</p>
              </div>
            ))}
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-bold text-white">Recent Transactions</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Latest {recentTransactions.length > 0 ? Math.min(5, recentTransactions.length) : "—"} entries
              </p>
            </div>
            <a href="/transactions" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
              View all →
            </a>
          </div>
          <div className="space-y-2">
            {isLoading ? (
              <>
                <SkeletonTableRow />
                <SkeletonTableRow />
                <SkeletonTableRow />
                <SkeletonTableRow />
                <SkeletonTableRow />
              </>
            ) : recentTransactions.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm">
                No transactions to display
              </div>
            ) : (
              recentTransactions.slice(0, 5).map((tx) => (
                <div key={tx.txId} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 transition-colors">
                  <div className={`shrink-0 h-8 w-8 rounded-lg flex items-center justify-center ${
                    tx.status === "Pending" ? "bg-amber-500/20" :
                    tx.status === "Timeout" ? "bg-rose-500/20" :
                    tx.status === "Processing" ? "bg-blue-500/20" :
                    "bg-emerald-500/20"
                  }`}>
                    <ArrowLeftRight size={14} className={
                      tx.status === "Pending" ? "text-amber-400" :
                      tx.status === "Timeout" ? "text-rose-400" :
                      tx.status === "Processing" ? "text-blue-400" :
                      "text-emerald-400"
                    } />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-200 truncate">{tx.txId.slice(0, 12)}...</p>
                    <p className="text-[10px] text-slate-500">{tx.userName} · {tx.paymentChannel}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-mono font-semibold text-white">{formatVND(tx.amount)}</p>
                    <span className={`text-[10px] font-semibold ${
                      tx.status === "Resolved" ? "text-emerald-400" :
                      tx.status === "Timeout" ? "text-rose-400" :
                      tx.status === "Pending" ? "text-amber-400" :
                      "text-blue-400"
                    }`}>{tx.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck size={16} className="text-emerald-400" />
              <h3 className="text-sm font-bold text-white">User Status</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: "Active users", value: counts.active, color: "text-emerald-400" },
                { label: "Locked users", value: counts.locked, color: "text-rose-400" },
                { label: "New this month", value: stats?.newUsersThisMonth ?? 0, color: "text-indigo-400" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">{item.label}</span>
                  <span className={`text-sm font-mono font-semibold ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Activity size={16} className="text-cyan-400" />
              <h3 className="text-sm font-bold text-white">Transaction Health</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: "Pending", value: txCounts.pending, color: "text-amber-400" },
                { label: "Processing", value: txCounts.processing, color: "text-blue-400" },
                { label: "Resolved", value: txCounts.resolved, color: "text-emerald-400" },
                { label: "Failed/Timeout", value: txCounts.timeout, color: "text-rose-400" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">{item.label}</span>
                  <span className={`text-sm font-mono font-semibold ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
