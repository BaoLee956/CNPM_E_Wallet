// app/(customer)/home/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { useRequireAuth } from "@/hooks/useRequireAuth";
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
  LogOut,
  Landmark,
  ChevronRight,
  Wallet,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import {
  loadTransactions,
  normalizeTransactionType,
} from "@/services/transactionService";
import {
  bankService,
  type LinkedBank,
  SUPPORTED_BANKS,
} from "@/services/bankService";
import type { Transaction } from "@/models/transaction";
import { BankLogo } from "@/components/banks/BankLogo";

const quickContacts = [
  { id: "1", name: "Minh", initials: "M", color: "bg-info" },
  { id: "2", name: "Lan", initials: "L", color: "bg-success" },
  { id: "3", name: "Hùng", initials: "H", color: "bg-warning" },
  { id: "4", name: "Trang", initials: "T", color: "bg-danger" },
  { id: "5", name: "Anh", initials: "A", color: "bg-brand-default" },
];

function formatVND(amount: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

/* ─── Recent Tx helpers ──────────────────────────────────────────── */

function TxTypeIcon({ type }: { type: string }) {
  const cfg: Record<string, { icon: React.ReactNode; bg: string }> = {
    send: {
      icon: <ArrowUpRight size={16} />,
      bg: "bg-danger-light text-danger",
    },
    receive: {
      icon: <ArrowDownLeft size={16} />,
      bg: "bg-success-light text-success",
    },
    topup: { icon: <Wallet size={16} />, bg: "bg-info-light text-info" },
    payment: {
      icon: <CreditCard size={16} />,
      bg: "bg-warning-light text-warning",
    },
  };
  const c = cfg[type] ?? cfg.send;
  return (
    <span
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${c.bg}`}
    >
      {c.icon}
    </span>
  );
}

function RecentTxRow({ tx, walletId }: { tx: Transaction; walletId?: string }) {
  const displayType = normalizeTransactionType(tx, walletId ?? "");
  const isDebit = displayType === "send" || displayType === "payment";
  const typeLabels: Record<string, string> = {
    send: "Chuyển tiền",
    receive: "Nhận tiền",
    topup: "Nạp tiền",
    payment: "Thanh toán",
  };
  const date = new Date(tx.createdAt);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();
  const dateLabel = isToday
    ? `Hôm nay, ${date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}`
    : isYesterday
      ? `Hôm qua, ${date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}`
      : date.toLocaleDateString("vi-VN");

  return (
    <Link
      href="/history"
      className="flex items-center gap-3 px-4 py-3.5 transition-colors duration-150 hover:bg-surface-sunken active:bg-surface-hover"
    >
      <TxTypeIcon type={displayType} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-primary truncate">
          {tx.description || typeLabels[displayType] || displayType}
        </p>
        <p className="text-2xs text-tertiary mt-0.5">{dateLabel}</p>
      </div>
      <span
        className={`text-sm font-semibold font-mono tabular-nums ${isDebit ? "text-danger" : "text-success"}`}
      >
        {isDebit ? "−" : "+"}
        {formatVND(Math.abs(tx.amount))}
      </span>
    </Link>
  );
}

function BankEntryCard({ banks }: { banks: LinkedBank[] }) {
  const hasLinked = banks.length > 0;
  const defaultBank = banks.find((b) => b.isDefault) ?? banks[0];
  const bankInfo = defaultBank
    ? SUPPORTED_BANKS.find((b) => b.code === defaultBank.bankCode)
    : null;

  return (
    <Link
      href="/banks"
      className="group relative flex items-center gap-4 rounded-2xl overflow-hidden p-4 transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
      style={{
        background: hasLinked
          ? `linear-gradient(135deg, ${bankInfo?.color ?? "#1aaba3"}18 0%, ${bankInfo?.color ?? "#1aaba3"}08 100%)`
          : "linear-gradient(135deg, var(--color-brand-50) 0%, white 100%)",
        border: `1px solid ${hasLinked ? (bankInfo?.color ?? "#1aaba3") + "30" : "var(--color-brand-200)"}`,
      }}
    >
      {/* Decorative circle */}
      <span
        className="absolute -right-4 -top-4 h-20 w-20 rounded-full opacity-10 transition-transform duration-300 group-hover:scale-125"
        style={{ backgroundColor: bankInfo?.color ?? "var(--color-brand-500)" }}
      />

      {/* Icon - using BankLogo component */}
      <div className="relative shrink-0">
        {hasLinked && bankInfo ? (
          <BankLogo
            logoUrl={bankInfo.logoUrl}
            bankName={bankInfo.name}
            size={48}
            backgroundColor={bankInfo.color + "20"}
            rounded="xl"
          />
        ) : (
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl shadow-sm"
            style={{ backgroundColor: "var(--color-brand-100)" }}
          >
            <Landmark size={22} className="text-brand-default" />
          </div>
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        {hasLinked ? (
          <>
            <p className="text-sm font-semibold text-primary truncate">
              {bankInfo?.name ?? defaultBank!.bankCode}
            </p>
            <p className="text-xs text-secondary font-mono mt-0.5 truncate">
              ••••{defaultBank!.accountNumber.slice(-4)}
              {banks.length > 1 && (
                <span className="ml-1.5 font-sans not-italic text-tertiary">
                  +{banks.length - 1} tài khoản
                </span>
              )}
            </p>
          </>
        ) : (
          <>
            <p className="text-sm font-semibold text-primary">
              Liên kết ngân hàng
            </p>
            <p className="text-xs text-secondary mt-0.5">
              Nạp tiền nhanh hơn với tài khoản NH
            </p>
          </>
        )}
      </div>

      {/* Chevron / CTA */}
      <div className="shrink-0 flex items-center gap-1.5">
        {!hasLinked && (
          <span className="rounded-full bg-brand-default px-2.5 py-1 text-2xs font-semibold text-white shadow-sm">
            Liên kết
          </span>
        )}
        <ChevronRight
          size={16}
          className="text-tertiary transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-brand-default"
        />
      </div>
    </Link>
  );
}

/* ─── Main page ──────────────────────────────────────────────────── */

export default function HomePage() {
  const router = useRouter();
  const [masked, setMasked] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { showToast } = useToast();
  const { user, wallet, isAuthenticated, isLoading } = useRequireAuth();
  const { logout } = useAuth();

  const [recentTxs, setRecentTxs] = useState<Transaction[]>([]);
  const [linkedBanks, setLinkedBanks] = useState<LinkedBank[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (wallet?.id) {
      setRecentTxs(loadTransactions(wallet.id).slice(0, 4));
    }
  }, [wallet?.id]);

  useEffect(() => {
    bankService.getLinkedBanks().then(setLinkedBanks);
  }, []);

  const getGreeting = () => {
    const h = new Date().getHours();
    return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
  };

  const goToTransfer = () => router.push("/transfer");
  const showComingSoon = () =>
    showToast("This feature is coming soon!", "info", 2000);

  /* ── Loading skeleton ── */
  if (isLoading) {
    return (
      <CustomerPage>
        <div className="space-y-5 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-3 w-20 rounded-full bg-surface-sunken" />
              <div className="h-5 w-32 rounded-lg bg-surface-sunken" />
            </div>
            <div className="h-9 w-9 rounded-full bg-surface-sunken" />
          </div>
          <div className="h-44 rounded-2xl bg-surface-sunken" />
          <div className="grid grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl bg-surface-sunken"
              />
            ))}
          </div>
          <div className="h-16 rounded-2xl bg-surface-sunken" />
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-surface-sunken" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-4 w-24 rounded bg-surface-sunken" />
                  <div className="h-3 w-32 rounded bg-surface-sunken" />
                </div>
                <div className="h-4 w-16 rounded bg-surface-sunken" />
              </div>
            ))}
          </div>
        </div>
      </CustomerPage>
    );
  }

  /* ── Not authenticated ── */
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

  /* ── Main ── */
  return (
    <CustomerPage className="pb-6">
      <div
        className={`space-y-5 transition-all duration-500 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
      >
        {/* Greeting */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
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
          <div className="flex items-center gap-1">
            <button className="relative flex h-11 w-11 items-center justify-center rounded-full bg-surface-sunken text-secondary transition-colors duration-150 hover:bg-surface-hover hover:text-primary">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-danger border-2 border-white shadow-sm" />
            </button>
            <button
              onClick={async () => {
                await logout();
                router.push("/");
              }}
              title="Sign Out"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-sunken text-secondary transition-colors duration-150 hover:bg-rose-50 hover:text-danger"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* Wallet Card */}
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

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3">
          {[
            {
              label: "Send",
              icon: <ArrowUpRight size={20} />,
              bg: "bg-brand-subtle text-brand-default",
              action: goToTransfer,
            },
            {
              label: "Receive",
              icon: <ArrowDownLeft size={20} />,
              bg: "bg-success-light text-success",
              action: showComingSoon,
            },
            {
              label: "QR Pay",
              icon: <QrCode size={20} />,
              bg: "bg-info-light text-info",
              action: showComingSoon,
            },
            {
              label: "Top Up",
              icon: <Plus size={20} />,
              bg: "bg-warning-light text-warning",
              action: () => router.push("/topup"),
            },
          ].map(({ label, icon, bg, action }) => (
            <button
              key={label}
              onClick={action}
              className="flex flex-col items-center gap-2 py-4 rounded-2xl bg-white border border-soft shadow-sm transition-all duration-150 hover:shadow-md hover:border-brand-default active:scale-95 cursor-pointer"
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg}`}
              >
                {icon}
              </span>
              <span className="text-xs font-medium text-secondary">
                {label}
              </span>
            </button>
          ))}
        </div>

        {/* ── Bank Account Entry ─────────────────────────────────── */}
        <BankEntryCard banks={linkedBanks} />

        {/* Quick Transfer */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-primary">
              Quick Transfer
            </h3>
            <button
              onClick={goToTransfer}
              className="text-xs font-medium text-brand-default hover:underline transition-colors"
            >
              See all
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 snap-x scrollbar-hide">
            <button
              onClick={showComingSoon}
              className="flex flex-col items-center gap-1.5 shrink-0 snap-start transition-transform hover:scale-105"
            >
              <span className="flex h-13 w-13 items-center justify-center rounded-full border-2 border-dashed border-default bg-surface-sunken text-tertiary transition-colors duration-150 hover:border-brand-default hover:text-brand-default">
                <Plus size={20} />
              </span>
              <span className="text-2xs text-tertiary">Add</span>
            </button>
            {quickContacts.map((c) => (
              <button
                key={c.id}
                onClick={goToTransfer}
                className="flex flex-col items-center gap-1.5 shrink-0 snap-start transition-transform hover:scale-105"
              >
                <span
                  className={`flex h-13 w-13 items-center justify-center rounded-full text-white text-sm font-bold shadow-md ${c.color}`}
                >
                  {c.initials}
                </span>
                <span className="text-2xs text-secondary">{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Recent Transactions — real data ───────────────────── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-primary">
              Recent Transactions
            </h3>
            <Link
              href="/history"
              className="text-xs font-medium text-brand-default flex items-center gap-1 transition-colors hover:underline"
            >
              <Clock size={12} />
              History
            </Link>
          </div>
          <div className="rounded-2xl bg-white border border-soft shadow-sm overflow-hidden divide-y divide-soft">
            {recentTxs.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-10 text-center px-4">
                <span className="text-2xl">💳</span>
                <p className="text-sm font-medium text-secondary">
                  Chưa có giao dịch
                </p>
                <p className="text-xs text-tertiary">
                  Hãy thực hiện nạp tiền hoặc chuyển khoản đầu tiên
                </p>
              </div>
            ) : (
              recentTxs.map((tx) => (
                <RecentTxRow key={tx.id} tx={tx} walletId={wallet?.id} />
              ))
            )}
          </div>
        </div>

        {/* Promo Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-linear-to-br from-brand-600 via-brand-700 to-brand-800 p-5 text-white shadow-lg shadow-brand-default/20">
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
            <button
              onClick={goToTransfer}
              className="shrink-0 flex items-center gap-1.5 bg-white text-brand-700 text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md transition-all duration-150 hover:bg-gray-100 active:scale-95"
            >
              <ArrowLeftRight size={14} />
              Transfer Now
            </button>
          </div>
        </div>
      </div>
    </CustomerPage>
  );
}
