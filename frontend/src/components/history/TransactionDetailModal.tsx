// components/history/TransactionDetailModal.tsx
"use client";

import { useEffect } from "react";
import type { Transaction } from "@/models/transaction";
import { Badge } from "@/components/ui";
import {
  X,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet as WalletIcon,
  CreditCard,
  Clock,
  Hash,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Banknote,
} from "lucide-react";

interface TransactionDetailModalProps {
  transaction: Transaction | null;
  currentWalletId?: string;
  onClose: () => void;
}

function getDisplayType(tx: Transaction, currentWalletId?: string): string {
  if (tx.type === "transfer" || tx.type === "TRANSFER") {
    return tx.fromWalletId === currentWalletId ? "send" : "receive";
  }
  if (tx.type === "deposit" || tx.type === "DEPOSIT") return "topup";
  if (tx.type === "payment" || tx.type === "PAYMENT") return "payment";
  if (tx.type === "withdraw" || tx.type === "WITHDRAW") return "withdraw";
  return tx.type as string;
}

const typeConfig: Record<
  string,
  {
    label: string;
    icon: React.ReactNode;
    iconBg: string;
    amountColor: string;
    sign: string;
  }
> = {
  send: {
    label: "Chuyển tiền đi",
    icon: <ArrowUpRight size={22} />,
    iconBg: "bg-danger-light text-danger",
    amountColor: "text-danger",
    sign: "−",
  },
  receive: {
    label: "Nhận tiền",
    icon: <ArrowDownLeft size={22} />,
    iconBg: "bg-success-light text-success",
    amountColor: "text-success",
    sign: "+",
  },
  topup: {
    label: "Nạp tiền",
    icon: <WalletIcon size={22} />,
    iconBg: "bg-info-light text-info",
    amountColor: "text-success",
    sign: "+",
  },
  payment: {
    label: "Thanh toán",
    icon: <CreditCard size={22} />,
    iconBg: "bg-warning-light text-warning",
    amountColor: "text-danger",
    sign: "−",
  },
  withdraw: {
    label: "Rút tiền",
    icon: <Banknote size={22} />,
    iconBg: "bg-danger-light text-danger",
    amountColor: "text-danger",
    sign: "−",
  },
};

const statusConfig: Record<
  string,
  {
    variant: "success" | "warning" | "danger" | "default";
    icon: React.ReactNode;
    label: string;
  }
> = {
  completed: {
    variant: "success",
    icon: <CheckCircle size={12} />,
    label: "Thành công",
  },
  success: {
    variant: "success",
    icon: <CheckCircle size={12} />,
    label: "Thành công",
  },
  pending: {
    variant: "warning",
    icon: <AlertTriangle size={12} />,
    label: "Đang xử lý",
  },
  failed: { variant: "danger", icon: <XCircle size={12} />, label: "Thất bại" },
};

function Row({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-subtle last:border-0">
      <span className="text-xs text-secondary shrink-0">{label}</span>
      <span
        className={`text-xs font-medium text-primary text-right ${mono ? "font-mono" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

export function TransactionDetailModal({
  transaction,
  currentWalletId,
  onClose,
}: TransactionDetailModalProps) {
  // Trap scroll
  useEffect(() => {
    if (transaction) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [transaction]);

  if (!transaction) return null;

  const displayType = getDisplayType(transaction, currentWalletId);
  const config = typeConfig[displayType] ?? typeConfig.send;
  const statusInfo =
    statusConfig[transaction.status as string] ?? statusConfig.completed;

  const formattedAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: transaction.currency || "VND",
  }).format(transaction.amount);

  const formattedDate = new Date(transaction.createdAt).toLocaleString(
    "vi-VN",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    },
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Bottom sheet */}
      <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 animate-in slide-in-from-bottom-4 duration-300">
        <div className="rounded-t-3xl bg-white shadow-xl overflow-hidden">
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="h-1 w-10 rounded-full bg-neutral-200" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-subtle">
            <h3 className="text-sm font-bold text-primary">
              Chi tiết giao dịch
            </h3>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-tertiary hover:bg-surface-sunken hover:text-primary transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          <div className="px-5 pb-8 overflow-y-auto max-h-[75vh]">
            {/* Amount hero */}
            <div className="flex flex-col items-center gap-3 py-6">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ${config.iconBg}`}
              >
                {config.icon}
              </div>
              <div className="text-center">
                <p
                  className={`text-3xl font-bold font-mono tabular-nums ${config.amountColor}`}
                >
                  {config.sign} {formattedAmount}
                </p>
                <p className="text-sm text-secondary mt-1">{config.label}</p>
              </div>
              <Badge variant={statusInfo.variant} size="sm">
                <span className="flex items-center gap-1">
                  {statusInfo.icon}
                  {statusInfo.label}
                </span>
              </Badge>
            </div>

            {/* Detail rows */}
            <div className="rounded-2xl bg-surface-sunken px-4 py-1 mb-4">
              <Row
                label="Thời gian"
                value={
                  <span className="flex items-center gap-1.5">
                    <Clock size={11} className="text-tertiary" />
                    {formattedDate}
                  </span>
                }
              />

              {transaction.referenceCode && (
                <Row
                  label="Mã tham chiếu"
                  value={
                    <span className="flex items-center gap-1.5">
                      <Hash size={11} className="text-tertiary" />
                      {transaction.referenceCode}
                    </span>
                  }
                  mono
                />
              )}

              {transaction.description && (
                <Row
                  label="Nội dung"
                  value={
                    <span className="flex items-center gap-1.5">
                      <FileText size={11} className="text-tertiary" />
                      {transaction.description}
                    </span>
                  }
                />
              )}

              {transaction.fromWalletId && (
                <Row
                  label="Từ ví (số TK)"
                  value={
                    transaction.fromWalletAccountNumber
                      ? transaction.fromWalletAccountNumber
                      : transaction.fromWalletId.slice(0, 8) + "..."
                  }
                  mono
                />
              )}

              {transaction.toWalletId && (
                <Row
                  label="Đến ví (số TK)"
                  value={
                    transaction.toWalletAccountNumber
                      ? transaction.toWalletAccountNumber
                      : transaction.toWalletId.slice(0, 8) + "..."
                  }
                  mono
                />
              )}

              {transaction.fee !== undefined && transaction.fee > 0 && (
                <Row
                  label="Phí giao dịch"
                  value={new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: transaction.currency || "VND",
                  }).format(transaction.fee)}
                />
              )}

              {transaction.senderName && (
                <Row label="Người gửi" value={transaction.senderName} />
              )}

              {transaction.recipientName && (
                <Row label="Người nhận" value={transaction.recipientName} />
              )}

              {(transaction as any).bankName && (
                <Row label="Ngân hàng" value={(transaction as any).bankName} />
              )}
              {(transaction as any).accountNumber && (
                <Row
                  label="Số tài khoản"
                  value={`**** ${(transaction as any).accountNumber.slice(-4)}`}
                  mono
                />
              )}

              <Row label="Mã giao dịch" value={transaction.id} mono />
            </div>

            {/* Failure reason */}
            {transaction.failureReason && (
              <div className="flex items-start gap-2.5 rounded-xl bg-danger-light/40 border border-danger/20 p-3">
                <XCircle size={14} className="text-danger mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-danger">
                    Lý do thất bại
                  </p>
                  <p className="text-xs text-danger/80 mt-0.5">
                    {transaction.failureReason}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
