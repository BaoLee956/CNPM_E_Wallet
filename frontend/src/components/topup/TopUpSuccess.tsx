// components/topup/TopUpSuccess.tsx
"use client";

import { Button, Card } from "@/components/ui";
import { CheckCircle } from "lucide-react";
import type { TopUpResult } from "@/services/topUpService";

interface TopUpSuccessProps {
  result: TopUpResult;
  onReset: () => void;
}

export function TopUpSuccess({ result, onReset }: TopUpSuccessProps) {
  return (
    <Card className="text-center">
      <div className="flex flex-col items-center gap-3 py-4">
        <CheckCircle size={48} className="text-success" />
        <h2 className="text-xl font-bold text-primary">Top-up Successful!</h2>
        <p className="text-secondary">
          Your balance has been updated to{" "}
          <span className="font-bold text-primary">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(result.newBalance)}
          </span>
        </p>
        <p className="text-xs text-tertiary">
          Transaction ID: {result.transactionId}
        </p>
        <div className="flex gap-3 mt-2">
          <Button onClick={onReset} variant="outline">
            Top Up Again
          </Button>
          <Button onClick={() => (window.location.href = "/home")}>
            Back to Home
          </Button>
        </div>
      </div>
    </Card>
  );
}
