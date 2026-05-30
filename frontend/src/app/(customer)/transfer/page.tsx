// app/transfer/page.tsx
"use client";

import { useState, useEffect } from "react";
import { CustomerPage } from "@/components/ui";
import { TransferForm } from "@/components/transfer/TransferForm";
import { TransferSuccess } from "@/components/transfer/TransferSuccess";
import { TransferSkeleton } from "@/components/transfer/TransferSkeleton";
import { useTransfer } from "@/hooks/useTransfer";
import { useAuthStore } from "@/stores/authStore";

export default function TransferPage() {
  const { executeTransfer, isLoading, error, result, reset } = useTransfer();
  const { isAuthenticated, checkAuth } = useAuthStore();
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await checkAuth();
      setPageLoading(false);
    };
    init();
  }, [checkAuth]);

  if (pageLoading || !isAuthenticated) {
    return (
      <CustomerPage>
        <TransferSkeleton />
      </CustomerPage>
    );
  }

  const handleTransfer = async (data: any) => {
    await executeTransfer(data);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <CustomerPage>
      <div className="space-y-4">
        <div className="mb-2">
          <h1 className="text-xl font-bold text-primary">Transfer Money</h1>
          <p className="text-secondary text-sm">
            Send money to another e-wallet account
          </p>
        </div>

        {result ? (
          <TransferSuccess result={result} onReset={handleReset} />
        ) : (
          <TransferForm
            onSubmit={handleTransfer}
            isLoading={isLoading}
            error={error}
          />
        )}
      </div>
    </CustomerPage>
  );
}
