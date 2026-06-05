// app/(customer)/topup/page.tsx
"use client";

import { CustomerPage } from "@/components/ui/CustomerLayout";
import { TopUpForm } from "@/components/topup/TopUpForm";
import { TopUpSuccess } from "@/components/topup/TopUpSuccess";
import { TopUpPending } from "@/components/topup/TopUpPending";
import { TopUpSkeleton } from "@/components/topup/TopUpSkeleton";
import { useTopUp } from "@/hooks/useTopUp";
import { useAuth } from "@/hooks/useAuth";

export default function TopUpPage() {
  const { executeTopUp, isLoading, isPending, isSuccess, error, state, reset } =
    useTopUp();
  const { isLoading: authLoading, isAuthenticated } = useAuth();

  if (authLoading || !isAuthenticated) {
    return (
      <CustomerPage>
        <TopUpSkeleton />
      </CustomerPage>
    );
  }

  return (
    <CustomerPage>
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-bold text-primary">Nạp tiền</h1>
          <p className="text-secondary text-sm">
            Nạp tiền vào ví từ tài khoản ngân hàng
          </p>
        </div>

        {isSuccess ? (
          <TopUpSuccess state={state} onReset={reset} />
        ) : isPending ? (
          <TopUpPending state={state} onCancel={reset} />
        ) : (
          <TopUpForm
            onSubmit={executeTopUp}
            isLoading={isLoading}
            isPending={isPending}
            error={error}
          />
        )}
      </div>
    </CustomerPage>
  );
}
