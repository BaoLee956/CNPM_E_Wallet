// app/transfer/page.tsx
"use client";

import { CustomerPage } from "@/components/ui";
import { TransferForm } from "@/components/transfer/TransferForm";
import { TransferSuccess } from "@/components/transfer/TransferSuccess";
import { TransferSkeleton } from "@/components/transfer/TransferSkeleton";
import { useTransfer } from "@/hooks/useTransfer";
import { useAuth } from "@/hooks/useAuth";

export default function TransferPage() {
  const { executeTransfer, isLoading, error, result, reset } = useTransfer();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  if (authLoading || !isAuthenticated) {
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
