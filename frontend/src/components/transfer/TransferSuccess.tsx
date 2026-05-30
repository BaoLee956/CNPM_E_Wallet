// components/transfer/TransferSuccess.tsx
"use client";

import { Card, Button } from "@/components/ui";
import { CheckCircle } from "lucide-react";
import type { TransferResult } from "@/services/transferService";

interface TransferSuccessProps {
  result: TransferResult;
  onReset: () => void;
}

export function TransferSuccess({ result, onReset }: TransferSuccessProps) {
  const formattedAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(result.transaction.amount);

  const formattedNewBalance = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(result.newBalance);

  return (
    <Card padding="lg" className="w-full text-center">
      <div className="flex flex-col items-center gap-2 mb-4">
        <div className="rounded-full bg-success/20 p-3">
          <CheckCircle className="text-success" size={40} />
        </div>
        <h2 className="text-xl font-bold text-primary">Transfer Successful!</h2>
        <p className="text-secondary text-sm">
          Your transaction has been completed.
        </p>
      </div>

      <div className="bg-surface-sunken rounded-xl p-4 text-left space-y-2 mb-5">
        <div className="flex justify-between">
          <span className="text-secondary text-sm">Amount</span>
          <span className="font-semibold text-primary">{formattedAmount}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-secondary text-sm">To Account</span>
          <span className="font-mono text-sm">
            {result.transaction.toWalletId}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-secondary text-sm">Reference</span>
          <span className="font-mono text-sm">
            {result.transaction.referenceCode}
          </span>
        </div>
        <div className="border-t border-subtle pt-2 mt-2">
          <div className="flex justify-between">
            <span className="text-secondary text-sm">New Balance</span>
            <span className="font-bold text-brand-default">
              {formattedNewBalance}
            </span>
          </div>
        </div>
      </div>

      <Button variant="outline" fullWidth onClick={onReset}>
        Make Another Transfer
      </Button>
    </Card>
  );
}
