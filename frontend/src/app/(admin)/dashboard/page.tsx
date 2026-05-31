"use client";

import {
  Users, ArrowLeftRight, DollarSign, AlertTriangle, TrendingUp, ShieldCheck, Clock, Activity,
} from "lucide-react";
import { useAdminStore } from "@/stores/adminStore";
import { YEAR_DATA } from "@/stores/adminStore";

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
  const { users, transactions } = useAdminStore();

  const today = YEAR_DATA[YEAR_DATA.length - 1];
  const yesterday = YEAR_DATA[YEAR_DATA.length - 2];

  const revToday = today.revenue;
  const revYesterday = yesterday.revenue;
  const revDoD = ((revToday - revYesterday) / revYesterday) * 100;

  const txToday = today.transactions;
  const txYesterday = yesterday.transactions;
  const txDoD = ((txToday - txYesterday) / txYesterday) * 100;

  const revTrendLabel = revDoD >= 0 ? `+${revDoD.toFixed(1)}%` : `${revDoD.toFixed(1)}%`;
  const txTrendLabel = txDoD >= 0 ? `+${txDoD.toFixed(1)}%` : `${txDoD.toFixed(1)}%`;

  const counts = {
    total: users.length,
    active: users.filter((u) => u.status === "Active").length,
    locked: users.filter((u) => u.status === "Locked").length,
    suspicious: users.filter((u) => u.status === "Suspicious").length,
  };

  const txCounts = {
    pending: transactions.filter((t) => t.status === "Pending").length,
    timeout: transactions.filter((t) => t.status === "Timeout").length,
    processing: transactions.filter((t) => t.status === "Processing").length,
    resolved: transactions.filter((t) => t.status === "Resolved").length,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-slate-400 mt-1">
          Real-time overview of E-Wallet platform operations
        </p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {([
          {
            label: "Today's Revenue",
            value: formatVNDShort(revToday),
            sub: `vs yesterday (${formatVNDShort(revYesterday)})`,
            icon: <DollarSign size={20} />,
            border: "border-emerald-500/30",
            iconBg: "bg-emerald-500/20",
            iconColor: "text-emerald-400",
            trend: revTrendLabel,
            trendUp: revDoD >= 0,
          },
          {
            label: "Transactions Today",
            value: txToday.toLocaleString(),
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
            value: counts.total,
            sub: `${counts.active} active`,
            icon: <Users size={20} />,
            border: "border-indigo-500/30",
            iconBg: "bg-indigo-500/20",
            iconColor: "text-indigo-400",
            trend: "Static",
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
      </div>

      {/* Middle row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent activity */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-bold text-white">Recent Transactions</h3>
              <p className="text-xs text-slate-500 mt-0.5">Latest {Math.min(5, transactions.length)} entries</p>
            </div>
            <a href="/transactions" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
              View all →
            </a>
          </div>
          <div className="space-y-2">
            {transactions.slice(0, 5).map((tx) => (
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
                  <p className="text-xs font-semibold text-slate-200 truncate">{tx.txId}</p>
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
            ))}
          </div>
        </div>

        {/* System status */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white mb-5">System Status</h3>
          <div className="space-y-4">
            {[
              { label: "Payment Gateway", status: "Operational", color: "emerald" },
              { label: "Napas Bank API", status: "Operational", color: "emerald" },
              { label: "Visa/Mastercard", status: "Degraded", color: "amber" },
              { label: "MoMo Integration", status: "Operational", color: "emerald" },
              { label: "ZaloPay API", status: "Down", color: "rose" },
              { label: "Internal Wallet", status: "Operational", color: "emerald" },
            ].map((sys) => (
              <div key={sys.label} className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{sys.label}</span>
                <div className="flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${
                    sys.color === "emerald" ? "bg-emerald-400 animate-pulse" :
                    sys.color === "amber" ? "bg-amber-400" :
                    "bg-rose-400"
                  }`} />
                  <span className={`text-xs font-semibold ${
                    sys.color === "emerald" ? "text-emerald-400" :
                    sys.color === "amber" ? "text-amber-400" :
                    "text-rose-400"
                  }`}>{sys.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <Activity size={13} className="text-indigo-400" />
              <span className="text-xs font-semibold text-slate-300">Platform Health</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-indigo-500 h-2 rounded-full" style={{ width: "87%" }} />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[10px] text-slate-600">0%</span>
              <span className="text-[10px] text-emerald-400 font-semibold">87% uptime</span>
              <span className="text-[10px] text-slate-600">100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Quick access */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: "User Management",
            sub: `${counts.suspicious} suspicious · ${counts.locked} locked`,
            href: "/users",
            icon: <Users size={22} />,
            color: "indigo",
            border: "border-indigo-500/30",
            bg: "bg-indigo-500/10",
            text: "text-indigo-400",
          },
          {
            label: "Transaction Audit",
            sub: `${txCounts.pending + txCounts.timeout} need audit`,
            href: "/transactions",
            icon: <Clock size={22} />,
            color: "amber",
            border: "border-amber-500/30",
            bg: "bg-amber-500/10",
            text: "text-amber-400",
          },
          {
            label: "Reports & Export",
            sub: "Financial dashboards & analytics",
            href: "/reports",
            icon: <TrendingUp size={22} />,
            color: "emerald",
            border: "border-emerald-500/30",
            bg: "bg-emerald-500/10",
            text: "text-emerald-400",
          },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`group bg-slate-900 border ${item.border} rounded-2xl p-6 flex items-center gap-4 hover:${item.bg} transition-all hover:-translate-y-0.5`}
          >
            <div className={`shrink-0 flex items-center justify-center h-12 w-12 rounded-xl ${item.bg}`}>
              <span className={item.text}>{item.icon}</span>
            </div>
            <div>
              <p className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">{item.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{item.sub}</p>
            </div>
            <div className="ml-auto">
              <div className={`h-7 w-7 rounded-lg ${item.bg} flex items-center justify-center group-hover:translate-x-0.5 transition-transform`}>
                <span className={`${item.text} text-sm`}>→</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
