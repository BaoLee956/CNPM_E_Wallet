"use client";
import { useState } from "react";
import { CustomerPage, WalletCard } from "@/components/ui";
import { Badge } from "@/components/ui";
import {
  ArrowUpRight,
  ArrowDownLeft,
  QrCode,
  Plus,
  ArrowLeftRight,
  Clock,
  Zap,
} from "lucide-react";

/* ── Mock data ─────────────────────────────────────── */
const recentTransactions = [
  {
    id: "1",
    name: "Grab Food",
    desc: "Food & Drink",
    amount: -85000,
    date: "Today, 11:32",
    icon: "🍔",
  },
  {
    id: "2",
    name: "Nguyen Van A",
    desc: "Transfer received",
    amount: 500000,
    date: "Today, 09:15",
    icon: "👤",
  },
  {
    id: "3",
    name: "Shopee",
    desc: "Shopping",
    amount: -320000,
    date: "Yesterday",
    icon: "🛍️",
  },
  {
    id: "4",
    name: "Tran Thi B",
    desc: "Transfer received",
    amount: 200000,
    date: "Yesterday",
    icon: "👤",
  },
  {
    id: "5",
    name: "Điện lực TP.HCM",
    desc: "Utilities",
    amount: -156000,
    date: "28 May",
    icon: "⚡",
  },
];

const quickContacts = [
  { id: "1", name: "An", initials: "AN", color: "bg-brand-default" },
  { id: "2", name: "Bình", initials: "BI", color: "bg-purple-400" },
  { id: "3", name: "Chi", initials: "CH", color: "bg-amber-400" },
  { id: "4", name: "Dũng", initials: "DU", color: "bg-rose-400" },
];

/* ── Helpers ────────────────────────────────────────── */
function formatVND(amount: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));
}

/* ── Page ───────────────────────────────────────────── */
export default function HomePage() {
  const [masked, setMasked] = useState(false);

  return (
    <CustomerPage className="pb-2">
      {/* Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-secondary">Good morning 👋</p>
          <h2 className="text-base font-bold text-primary">Nguyen Van A</h2>
        </div>
        <button className="relative flex h-9 w-9 items-center justify-center rounded-full bg-surface-sunken text-secondary">
          <Zap size={16} />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-danger border-2 border-surface-base" />
        </button>
      </div>

      {/* Wallet Card */}
      <WalletCard
        balance="12.450.000 ₫"
        accountName="Nguyen Van A"
        accountNumber="**** 4291"
        masked={masked}
        onToggleMask={() => setMasked((v) => !v)}
      />

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-2">
        {[
          {
            icon: <ArrowUpRight size={18} />,
            label: "Send",
            color: "text-brand-default bg-brand-subtle",
          },
          {
            icon: <ArrowDownLeft size={18} />,
            label: "Receive",
            color: "text-success bg-success-light",
          },
          {
            icon: <QrCode size={18} />,
            label: "QR Pay",
            color: "text-info bg-info-light",
          },
          {
            icon: <Plus size={18} />,
            label: "Top Up",
            color: "text-warning bg-warning-light",
          },
        ].map((action) => (
          <button
            key={action.label}
            className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-surface-base border border-subtle active:scale-95 transition-transform"
          >
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-xl ${action.color}`}
            >
              {action.icon}
            </span>
            <span className="text-2xs font-medium text-secondary">
              {action.label}
            </span>
          </button>
        ))}
      </div>

      {/* Quick Transfer */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-primary">Quick Transfer</h3>
          <button className="text-2xs text-brand-default font-medium">
            See all
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
          {/* Add new */}
          <button className="flex flex-col items-center gap-1.5 shrink-0">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-dashed border-default text-tertiary">
              <Plus size={16} />
            </span>
            <span className="text-2xs text-tertiary">New</span>
          </button>
          {quickContacts.map((c) => (
            <button
              key={c.id}
              className="flex flex-col items-center gap-1.5 shrink-0"
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-full text-white text-xs font-bold ${c.color}`}
              >
                {c.initials}
              </span>
              <span className="text-2xs text-secondary">{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-primary">Recent</h3>
          <a
            href="/history"
            className="text-2xs text-brand-default font-medium flex items-center gap-0.5"
          >
            <Clock size={11} />
            <span>All history</span>
          </a>
        </div>

        <div className="card overflow-hidden p-0 divide-y divide-(--border-subtle)">
          {recentTransactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center gap-3 px-4 py-3 active:bg-surface-sunken transition-colors"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface-sunken text-base">
                {tx.icon}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-primary truncate">
                  {tx.name}
                </p>
                <p className="text-2xs text-tertiary">
                  {tx.desc} · {tx.date}
                </p>
              </div>
              <span
                className={`text-sm font-semibold font-mono tabular-nums ${tx.amount > 0 ? "text-success" : "text-primary"}`}
              >
                {tx.amount > 0 ? "+" : "-"}
                {formatVND(tx.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Promo Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-linear-to-br from-brand-600 to-brand-800 p-4 text-white">
        <span className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-white/5" />
        <span className="absolute -bottom-3 left-8 h-14 w-14 rounded-full bg-white/5" />
        <div className="relative flex items-center justify-between gap-3">
          <div>
            <Badge
              variant="brand"
              size="sm"
              className="bg-white/20 text-white border-white/20 mb-1.5"
            >
              New
            </Badge>
            <p className="text-sm font-bold">Zero-fee transfer</p>
            <p className="text-2xs text-white/70 mt-0.5">
              All banks until June 30
            </p>
          </div>
          <button className="shrink-0 flex items-center gap-1 bg-white text-brand-700 text-xs font-semibold px-3 py-1.5 rounded-lg">
            <ArrowLeftRight size={12} />
            Transfer
          </button>
        </div>
      </div>
    </CustomerPage>
  );
}
