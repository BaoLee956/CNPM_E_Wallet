/**
 * frontend/src/components/topup/TopUpPending.tsx
 *
 * Hiển thị khi transaction đang ở trạng thái pending (chờ gateway webhook).
 * FE đang polling ở background (useTopUp hook) → component này chỉ show UI.
 */

"use client";

import { Card } from "@/components/ui";
import { SUPPORTED_BANKS } from "@/services/bankService";
import type { TopUpState } from "@/hooks/useTopUp";

interface TopUpPendingProps {
  state: TopUpState;
  onCancel: () => void;
}

export function TopUpPending({ state, onCancel }: TopUpPendingProps) {
  const bankInfo = state.bankCode
    ? SUPPORTED_BANKS.find((b) => b.code === state.bankCode)
    : null;

  return (
    <Card className="text-center">
      <div className="flex flex-col items-center gap-4 py-6">
        {/* Spinner */}
        <div className="relative flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-brand-subtle border-t-brand-default" />
          <span className="text-2xl">🏦</span>
        </div>

        <div>
          <h2 className="text-lg font-bold text-primary">
            Đang xử lý giao dịch
          </h2>
          <p className="text-sm text-secondary mt-1">
            Vui lòng chờ trong giây lát...
          </p>
        </div>

        {/* Details */}
        <div className="w-full rounded-xl bg-surface-sunken p-4 text-left space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-secondary">Số tiền</span>
            <span className="font-semibold">
              {state.amount?.toLocaleString("vi-VN")} VND
            </span>
          </div>
          {bankInfo && (
            <div className="flex justify-between">
              <span className="text-secondary">Ngân hàng</span>
              <span className="font-medium">{bankInfo.name}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-secondary">Mã giao dịch</span>
            <span className="font-mono text-xs text-tertiary truncate max-w-40">
              {state.transactionId}
            </span>
          </div>
        </div>

        <p className="text-xs text-tertiary max-w-60">
          Hệ thống đang chờ xác nhận từ ngân hàng. Trang sẽ tự động cập nhật khi
          hoàn tất.
        </p>

        <button
          onClick={onCancel}
          className="text-xs text-secondary underline underline-offset-2 hover:text-primary"
        >
          Hủy và quay lại
        </button>
      </div>
    </Card>
  );
}
