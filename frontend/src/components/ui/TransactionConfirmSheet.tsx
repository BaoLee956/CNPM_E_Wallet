/**
 * frontend/src/components/ui/TransactionConfirmSheet.tsx
 *
 * Sheet nội dung xác nhận giao dịch — dùng chung cho topup / transfer / withdraw.
 * Nhận vào một `TransactionPreview` object và render phù hợp theo type.
 */

"use client";

import { useState } from "react";
import { ConfirmSheet } from "./ConfirmSheet";
import { Button } from "./Button";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Send,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────

export type ConfirmTransactionType = "topup" | "transfer" | "withdraw";

export interface TransactionPreview {
  type: ConfirmTransactionType;

  amount: number;
  description?: string;

  // Top-up / Withdraw — nguồn tiền / đích
  bankName?: string;
  bankLogo?: string;
  bankColor?: string;
  accountNumber?: string; // masked: **** 1234
  accountName?: string;

  // Transfer — người nhận
  recipientName?: string;
  recipientAccountNumber?: string;

  // Misc
  fee?: number;
  note?: string; // cảnh báo hoặc ghi chú thêm
}

interface TransactionConfirmSheetProps {
  open: boolean;
  preview: TransactionPreview | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────

const TYPE_META = {
  topup: {
    label: "Nạp tiền",
    icon: ArrowDownToLine,
    iconBg: "bg-success/10",
    iconColor: "text-success",
    actionLabel: "Xác nhận nạp tiền",
    actionVariant: "primary" as const,
  },
  transfer: {
    label: "Chuyển tiền",
    icon: Send,
    iconBg: "bg-brand-subtle",
    iconColor: "text-brand-default",
    actionLabel: "Xác nhận chuyển tiền",
    actionVariant: "primary" as const,
  },
  withdraw: {
    label: "Rút tiền",
    icon: ArrowUpFromLine,
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
    actionLabel: "Xác nhận rút tiền",
    actionVariant: "primary" as const,
  },
} as const;

function formatVND(amount: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

// ─── Row component ────────────────────────────────────────────────────────

function Row({
  label,
  value,
  valueClass = "",
  mono = false,
}: {
  label: string;
  value: React.ReactNode;
  valueClass?: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <span className="text-sm text-secondary shrink-0">{label}</span>
      <span
        className={`text-sm text-right break-all ${mono ? "font-mono" : "font-medium"} text-primary ${valueClass}`}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────

export function TransactionConfirmSheet({
  open,
  preview,
  onClose,
  onConfirm,
}: TransactionConfirmSheetProps) {
  const [confirming, setConfirming] = useState(false);

  if (!preview) return null;

  const meta = TYPE_META[preview.type];
  const Icon = meta.icon;
  const fee = preview.fee ?? 0;
  const total = preview.amount + fee;

  const handleConfirm = async () => {
    setConfirming(true);
    try {
      await onConfirm();
      // onConfirm tự đóng sheet khi thành công (parent reset state)
    } finally {
      setConfirming(false);
    }
  };

  return (
    <ConfirmSheet open={open} onClose={onClose} title="Xác nhận giao dịch">
      <div className="px-5 py-4 space-y-4">
        {/* ── Icon + loại GD ── */}
        <div className="flex flex-col items-center gap-2 py-2">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl ${meta.iconBg}`}
          >
            <Icon size={26} className={meta.iconColor} />
          </div>
          <span className="text-sm font-semibold text-secondary">
            {meta.label}
          </span>
        </div>

        {/* ── Số tiền nổi bật ── */}
        <div className="rounded-2xl bg-surface-sunken px-4 py-5 text-center">
          <p className="text-3xl font-bold text-primary tracking-tight">
            {formatVND(preview.amount)}
          </p>
          {fee > 0 && (
            <p className="text-xs text-secondary mt-1">
              + phí {formatVND(fee)} = tổng {formatVND(total)}
            </p>
          )}
          {fee === 0 && (
            <p className="text-xs text-success mt-1 font-medium">
              Miễn phí giao dịch
            </p>
          )}
        </div>

        {/* ── Chi tiết ── */}
        <div className="divide-y divide-subtle rounded-2xl border border-subtle px-4">
          {/* Loại giao dịch */}
          <Row label="Loại giao dịch" value={meta.label} />

          {/* Thông tin ngân hàng (topup / withdraw) */}
          {preview.type === "topup" && preview.bankName && (
            <>
              <Row label="Nguồn tiền" value={preview.bankName} />
              {preview.accountNumber && (
                <Row label="Số tài khoản" value={preview.accountNumber} mono />
              )}
              {preview.accountName && (
                <Row label="Chủ tài khoản" value={preview.accountName} />
              )}
            </>
          )}

          {preview.type === "topup" && !preview.bankName && (
            <Row label="Nguồn tiền" value="Nạp nhanh (mock)" />
          )}

          {preview.type === "withdraw" && preview.bankName && (
            <>
              <Row label="Ngân hàng nhận" value={preview.bankName} />
              {preview.accountNumber && (
                <Row label="Số tài khoản" value={preview.accountNumber} mono />
              )}
              {preview.accountName && (
                <Row label="Chủ tài khoản" value={preview.accountName} />
              )}
            </>
          )}

          {/* Thông tin người nhận (transfer) */}
          {preview.type === "transfer" && (
            <>
              {preview.recipientName && (
                <Row
                  label="Người nhận"
                  value={preview.recipientName}
                  valueClass="text-brand-default"
                />
              )}
              {preview.recipientAccountNumber && (
                <Row
                  label="Số tài khoản"
                  value={preview.recipientAccountNumber}
                  mono
                />
              )}
            </>
          )}

          {/* Phí */}
          <Row
            label="Phí giao dịch"
            value={fee === 0 ? "Miễn phí" : formatVND(fee)}
            valueClass={fee === 0 ? "text-success" : ""}
          />

          {/* Nội dung */}
          {preview.description && (
            <Row label="Nội dung" value={preview.description} />
          )}
        </div>

        {/* ── Cảnh báo nếu có ── */}
        {preview.note && (
          <div className="flex items-start gap-2.5 rounded-xl bg-warning/8 border border-warning/20 p-3">
            <AlertTriangle size={16} className="text-warning shrink-0 mt-0.5" />
            <p className="text-xs text-warning leading-relaxed">
              {preview.note}
            </p>
          </div>
        )}

        {/* ── Disclaimer ── */}
        <div className="flex items-start gap-2.5 rounded-xl bg-surface-sunken p-3">
          <ShieldCheck size={16} className="text-secondary shrink-0 mt-0.5" />
          <p className="text-xs text-secondary leading-relaxed">
            Giao dịch được mã hoá và bảo mật. Sau khi xác nhận, giao dịch sẽ
            được xử lý và không thể hoàn tác.
          </p>
        </div>

        {/* ── Actions ── */}
        <div className="flex gap-3 pb-2">
          <Button
            variant="outline"
            fullWidth
            onClick={onClose}
            disabled={confirming}
          >
            Huỷ
          </Button>
          <Button
            variant="primary"
            fullWidth
            loading={confirming}
            onClick={handleConfirm}
          >
            {meta.actionLabel}
          </Button>
        </div>
      </div>
    </ConfirmSheet>
  );
}
