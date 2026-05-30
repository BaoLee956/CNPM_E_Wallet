// components/transfer/TransferForm.tsx
"use client";

import { useState } from "react";
import { Button, Input, Card } from "@/components/ui";
import { CreditCard, Send, AlertCircle } from "lucide-react";

interface TransferFormProps {
  onSubmit: (data: {
    toAccountNumber: string;
    amount: number;
    description: string;
  }) => Promise<void>;
  isLoading: boolean;
  error?: string | null;
}

export function TransferForm({
  onSubmit,
  isLoading,
  error,
}: TransferFormProps) {
  const [toAccountNumber, setToAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    if (!toAccountNumber.trim()) {
      setLocalError("Account number is required");
      return;
    }
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setLocalError("Please enter a valid amount");
      return;
    }
    if (amountNum < 1000) {
      setLocalError("Minimum transfer amount is 1,000 VND");
      return;
    }

    try {
      await onSubmit({
        toAccountNumber: toAccountNumber.trim(),
        amount: amountNum,
        description: description.trim(),
      });
    } catch (err) {
      // error is already set in hook
    }
  };

  const displayError = localError || error;

  return (
    <Card padding="lg" className="w-full">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Recipient Account Number"
          type="text"
          placeholder="12-digit account number"
          value={toAccountNumber}
          onChange={(e) => setToAccountNumber(e.target.value)}
          iconLeft={<CreditCard size={16} />}
          required
          autoComplete="off"
        />

        <Input
          label="Amount (VND)"
          type="number"
          placeholder="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          iconLeft={<Send size={16} />}
          required
          min="1000"
          step="1000"
        />

        <Input
          label="Description (optional)"
          type="text"
          placeholder="Transfer note"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {displayError && (
          <div className="flex items-center gap-2 text-danger text-sm bg-danger-light/20 p-3 rounded-lg">
            <AlertCircle size={16} />
            <span>{displayError}</span>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={isLoading}
          iconLeft={<Send size={18} />}
        >
          Transfer Now
        </Button>
      </form>
    </Card>
  );
}
