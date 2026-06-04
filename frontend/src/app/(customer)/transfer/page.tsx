"use client";

import { useState, useEffect } from "react";
import { CustomerPage } from "@/components/ui";
import { TransferForm } from "@/components/transfer/TransferForm";
import { TransferSuccess } from "@/components/transfer/TransferSuccess";
import { WithdrawForm } from "@/components/withdraw/WithdrawForm";
import { WithdrawSuccess } from "@/components/withdraw/WithdrawSuccess";
import { WithdrawPending } from "@/components/withdraw/WithdrawPending";
import { TransferSkeleton } from "@/components/transfer/TransferSkeleton";
import { useTransfer } from "@/hooks/useTransfer";
import { useWithdraw } from "@/hooks/useWithdraw";
import { useRequireAuth } from "@/hooks/useRequireAuth";

export default function TransactionPage() {
  const [type, setType] = useState<"transfer" | "withdraw">("transfer");

  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();

  const {
    executeTransfer,
    isLoading: transferLoading,
    error: transferError,
    result: transferResult,
    reset: resetTransfer,
  } = useTransfer();

  const {
    executeWithdraw,
    isLoading: withdrawLoading,
    isPending: withdrawPending,
    isSuccess: withdrawSuccess,
    error: withdrawError,
    state: withdrawState,
    reset: resetWithdraw,
  } = useWithdraw();

  // Reset state của form kia khi chuyển tab
  useEffect(() => {
    if (type === "transfer") {
      resetWithdraw();
    } else {
      resetTransfer();
    }
  }, [type, resetTransfer, resetWithdraw]);

  const isLoading = type === "transfer" ? transferLoading : withdrawLoading;
  const error = type === "transfer" ? transferError : withdrawError;

  const showTransferSuccess = type === "transfer" && transferResult !== null;
  const showWithdrawSuccess = type === "withdraw" && withdrawSuccess;
  const showWithdrawPending =
    type === "withdraw" && withdrawPending && !withdrawSuccess;

  if (authLoading || !isAuthenticated) {
    return (
      <CustomerPage>
        <TransferSkeleton />
      </CustomerPage>
    );
  }

  return (
    <CustomerPage>
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-bold text-primary">
            {type === "transfer" ? "Chuyển tiền" : "Rút tiền"}
          </h1>
          <p className="text-secondary text-sm">
            {type === "transfer"
              ? "Chuyển tiền đến ví khác"
              : "Rút tiền từ ví về tài khoản ngân hàng"}
          </p>
        </div>

        <div className="flex gap-2 border-b">
          <button
            className={`px-4 py-2 ${type === "transfer" ? "border-b-2 border-primary font-semibold" : "text-secondary"}`}
            onClick={() => setType("transfer")}
          >
            Chuyển tiền
          </button>
          <button
            className={`px-4 py-2 ${type === "withdraw" ? "border-b-2 border-primary font-semibold" : "text-secondary"}`}
            onClick={() => setType("withdraw")}
          >
            Rút tiền
          </button>
        </div>

        {type === "transfer" ? (
          <>
            {showTransferSuccess ? (
              <TransferSuccess
                result={transferResult!}
                onReset={() => {
                  resetTransfer();
                  // Có thể giữ nguyên tab transfer hoặc chuyển về form
                }}
              />
            ) : (
              <TransferForm
                onSubmit={executeTransfer}
                isLoading={isLoading}
                error={error}
              />
            )}
          </>
        ) : (
          <>
            {showWithdrawSuccess ? (
              <WithdrawSuccess state={withdrawState!} onReset={resetWithdraw} />
            ) : showWithdrawPending ? (
              <WithdrawPending
                state={withdrawState!}
                onCancel={resetWithdraw}
              />
            ) : (
              <WithdrawForm
                onSubmit={executeWithdraw}
                isLoading={isLoading}
                isPending={withdrawPending}
                error={error}
              />
            )}
          </>
        )}
      </div>
    </CustomerPage>
  );
}
