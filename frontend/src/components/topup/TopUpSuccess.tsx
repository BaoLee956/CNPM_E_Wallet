// components/topup/TopUpSuccess.tsx
"use client";

import { Button, Card } from "@/components/ui";
import { CheckCircle } from "lucide-react";
import type { TopUpState } from "@/hooks/useTopUp";

interface TopUpSuccessProps {
  state: TopUpState;
  onReset: () => void;
}

export function TopUpSuccess({ state, onReset }: TopUpSuccessProps) {
  return (
    <Card className="text-center">
      <div className="flex flex-col items-center gap-3 py-4">
        <div className="rounded-full bg-success/10 p-4">
          <CheckCircle size={48} className="text-success" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-primary">
            Nạp tiền thành công!
          </h2>
          <p className="text-sm text-secondary mt-1">
            Giao dịch đã được xử lý thành công
          </p>
        </div>

        <div className="w-full rounded-xl bg-surface-sunken p-4 text-left space-y-2 text-sm">
          {state.amount && (
            <div className="flex justify-between">
              <span className="text-secondary">Số tiền nạp</span>
              <span className="font-semibold text-primary">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(state.amount)}
              </span>
            </div>
          )}

          {state.newBalance !== undefined && (
            <div className="flex justify-between border-t border-subtle pt-2 mt-2">
              <span className="text-secondary">Số dư mới</span>
              <span className="font-bold text-brand-default">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(state.newBalance)}
              </span>
            </div>
          )}

          {state.transactionId && (
            <div className="flex justify-between">
              <span className="text-secondary">Mã giao dịch</span>
              <span className="font-mono text-xs text-tertiary truncate max-w-45">
                {state.transactionId}
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-3 w-full mt-2">
          <Button variant="outline" onClick={onReset} fullWidth>
            Nạp thêm
          </Button>
          <Button onClick={() => (window.location.href = "/home")} fullWidth>
            Về trang chủ
          </Button>
        </div>
      </div>
    </Card>
  );
}
