// app/(customer)/topup/page.tsx
"use client";

import { CustomerPage } from "@/components/ui/CustomerLayout";
import { TopUpForm } from "@/components/topup/TopUpForm";
import { TopUpSuccess } from "@/components/topup/TopUpSuccess";
import { TopUpSkeleton } from "@/components/topup/TopUpSkeleton";
import { useTopUp } from "@/hooks/useTopUp";
import { useAuth } from "@/hooks/useAuth";

export default function TopUpPage() {
  const { executeTopUp, isLoading, error, result, reset } = useTopUp();
  const { isLoading: authLoading, isAuthenticated } = useAuth();

  if (authLoading || !isAuthenticated) {
    return (
      <CustomerPage>
        <TopUpSkeleton />
      </CustomerPage>
    );
  }

  const handleSubmit = async (data: any) => {
    await executeTopUp(data);
  };

  return (
    <CustomerPage>
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-bold text-primary">Top Up Wallet</h1>
          <p className="text-secondary text-sm">
            Add funds to your e-wallet using various payment methods
          </p>
        </div>

        {result ? (
          <TopUpSuccess result={result} onReset={reset} />
        ) : (
          <TopUpForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
          />
        )}
      </div>
    </CustomerPage>
  );
}
