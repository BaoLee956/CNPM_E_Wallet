// app/home/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { CustomerPage, WalletCard, Badge } from "@/components/ui";
import {
  ArrowUpRight,
  ArrowDownLeft,
  QrCode,
  Plus,
  ArrowLeftRight,
  Clock,
  Zap,
  Bell,
} from "lucide-react";
import Link from "next/link";

/* ── Mock data (only used when authenticated) ── */
const recentTransactions = [
  // ... same as before ...
];
const quickContacts = [
  // ... same as before ...
];

function formatVND(amount: number) {
  // ... same helper ...
}

export default function HomePage() {
  const [masked, setMasked] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, wallet, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Dynamic greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <CustomerPage>
        <div className="space-y-5 animate-pulse">
          {/* Greeting skeleton */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-3 w-20 rounded-full bg-slate-200" />
              <div className="h-5 w-32 rounded-lg bg-slate-200" />
            </div>
            <div className="h-9 w-9 rounded-full bg-slate-200" />
          </div>
          {/* Wallet skeleton */}
          <div className="h-44 rounded-2xl bg-slate-200" />
          {/* Actions skeleton */}
          <div className="grid grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square rounded-2xl bg-slate-200" />
            ))}
          </div>
          {/* Quick transfer skeleton */}
          <div className="flex gap-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 w-14 rounded-full bg-slate-200" />
            ))}
          </div>
          {/* Transactions skeleton */}
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-slate-200" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-4 w-24 rounded bg-slate-200" />
                  <div className="h-3 w-32 rounded bg-slate-200" />
                </div>
                <div className="h-4 w-16 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </CustomerPage>
    );
  }

  // Unauthenticated welcome screen
  if (!isAuthenticated) {
    return (
      <CustomerPage>
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
          <div className="relative">
            <div className="absolute inset-0 bg-brand-default/10 blur-3xl rounded-full transform scale-75" />
            <div className="relative bg-white p-5 rounded-full shadow-xl shadow-brand-default/10 ring-1 ring-brand-subtle">
              <Zap size={36} className="text-brand-default" />
            </div>
          </div>
          <h2 className="mt-6 text-2xl font-bold tracking-tight text-primary">
            Welcome to E‑Wallet
          </h2>
          <p className="mt-2 max-w-xs text-sm text-secondary">
            Your digital wallet for fast, secure, and convenient payments.
          </p>
          <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
            <Link
              href="/auth/login"
              className="rounded-2xl bg-brand-default px-6 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-brand-default/25 transition-all hover:bg-brand-hover hover:shadow-xl active:scale-[0.98]"
            >
              Log In
            </Link>
            <Link
              href="/auth/register"
              className="rounded-2xl border-2 border-default bg-white px-6 py-3.5 text-center text-sm font-semibold text-primary transition-all hover:bg-surface-sunken hover:border-brand-default active:scale-[0.98]"
            >
              Create Account
            </Link>
          </div>
        </div>
      </CustomerPage>
    );
  }

  // Authenticated dashboard
  return (
    <CustomerPage className="pb-6">
      <div
        className={`space-y-5 transition-all duration-500 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        {/* ── Greeting & Notification ── */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar placeholder (first letter of name) */}
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-brand-400 to-brand-600 text-white font-bold shadow-md">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <p className="text-xs text-secondary">{getGreeting()} 👋</p>
              <h2 className="text-base font-bold text-primary">
                {user?.name || "User"}
              </h2>
            </div>
          </div>
          <button className="relative flex h-11 w-11 items-center justify-center rounded-full bg-surface-sunken text-secondary transition hover:bg-gray-200">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-danger border-2 border-white shadow-sm" />
          </button>
        </div>

        {/* ── Wallet Card ── */}
        {wallet && (
          <div className="transition-transform duration-200 hover:scale-[1.01]">
            <WalletCard
              wallet={wallet}
              user={user!}
              masked={masked}
              onToggleMask={() => setMasked(!masked)}
            />
          </div>
        )}

        {/* ── Quick Actions ── */}
        <div className="grid grid-cols-4 gap-3">
          {[
            {
              icon: <ArrowUpRight size={20} />,
              label: "Send",
              color: "bg-brand-subtle text-brand-default",
            },
            {
              icon: <ArrowDownLeft size={20} />,
              label: "Receive",
              color: "bg-success-light text-success",
            },
            {
              icon: <QrCode size={20} />,
              label: "QR Pay",
              color: "bg-info-light text-info",
            },
            {
              icon: <Plus size={20} />,
              label: "Top Up",
              color: "bg-warning-light text-warning",
            },
          ].map((action) => (
            <button
              key={action.label}
              className="flex flex-col items-center gap-2 py-4 rounded-2xl bg-white border border-soft shadow-sm transition-all active:scale-95 hover:shadow-md hover:border-brand-subtle"
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${action.color}`}
              >
                {action.icon}
              </span>
              <span className="text-xs font-medium text-secondary">
                {action.label}
              </span>
            </button>
          ))}
        </div>

        {/* ── Quick Transfer ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-primary">
              Quick Transfer
            </h3>
            <button className="text-xs font-medium text-brand-default hover:underline">
              See all
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 snap-x scrollbar-hide">
            <button className="flex flex-col items-center gap-1.5 shrink-0 snap-start">
              <span className="flex h-13 w-13 items-center justify-center rounded-full border-2 border-dashed border-default bg-surface-sunken text-tertiary transition hover:border-brand-default hover:text-brand-default">
                <Plus size={20} />
              </span>
              <span className="text-2xs text-tertiary">Add</span>
            </button>
            {quickContacts.map((c) => (
              <button
                key={c.id}
                className="flex flex-col items-center gap-1.5 shrink-0 snap-start"
              >
                <span
                  className={`flex h-13 w-13 items-center justify-center rounded-full text-white text-sm font-bold shadow-md transition-transform hover:scale-105 ${c.color}`}
                >
                  {c.initials}
                </span>
                <span className="text-2xs text-secondary">{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Recent Transactions ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-primary">
              Recent Transactions
            </h3>
            <Link
              href="/history"
              className="text-xs font-medium text-brand-default flex items-center gap-1 hover:underline"
            >
              <Clock size={12} />
              History
            </Link>
          </div>
          <div className="rounded-2xl bg-white border border-soft shadow-sm overflow-hidden divide-y divide-soft">
            {recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-surface-sunken active:bg-gray-100"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-sunken text-lg">
                  {tx.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-primary truncate">
                    {tx.name}
                  </p>
                  <p className="text-2xs text-tertiary mt-0.5">
                    {tx.desc} · {tx.date}
                  </p>
                </div>
                <span
                  className={`text-sm font-semibold font-mono tabular-nums ${
                    tx.amount > 0 ? "text-success" : "text-danger"
                  }`}
                >
                  {tx.amount > 0 ? "+" : "−"}
                  {formatVND(Math.abs(tx.amount))}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Promo Banner ── */}
        <div className="relative rounded-2xl overflow-hidden bg-linear-to-br from-brand-600 via-brand-700 to-brand-800 p-5 text-white shadow-lg shadow-brand-default/20">
          {/* Decorative blobs */}
          <span className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-white/10 blur-xl" />
          <span className="absolute -bottom-4 left-10 h-20 w-20 rounded-full bg-white/5 blur-lg" />
          <div className="relative flex items-center justify-between gap-4">
            <div>
              <Badge
                variant="brand"
                size="sm"
                className="bg-white/20 text-white border-white/20 mb-2 backdrop-blur-sm"
              >
                Limited offer
              </Badge>
              <p className="text-base font-bold leading-tight">
                Zero-fee transfers
              </p>
              <p className="text-xs text-white/70 mt-1">
                All banks · Until June 30
              </p>
            </div>
            <button className="shrink-0 flex items-center gap-1.5 bg-white text-brand-700 text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md transition-all hover:bg-gray-100 active:scale-95">
              <ArrowLeftRight size={14} />
              Transfer Now
            </button>
          </div>
        </div>
      </div>
    </CustomerPage>
  );
}
