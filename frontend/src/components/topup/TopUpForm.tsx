// components/topup/TopUpForm.tsx
"use client";
import { useState } from "react";
import { Button, Input, Select, Card } from "@/components/ui";
import { type TopUpPayload } from "@/services/walletService";

interface TopUpFormProps {
  onSubmit: (data: TopUpPayload) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const methodOptions = [
  { value: "bank_transfer", label: "🏦 Bank Transfer" },
  { value: "credit_card", label: "💳 Credit Card" },
  { value: "debit_card", label: "💳 Debit Card" },
  { value: "voucher", label: "🎫 Voucher" },
];

export function TopUpForm({ onSubmit, isLoading, error }: TopUpFormProps) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<TopUpPayload["method"]>("bank_transfer");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;
    await onSubmit({
      amount: numAmount,
      method,
      description: description.trim() || undefined,
    });
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Amount (VND)"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g., 100000"
          required
          min="10000"
          step="10000"
          hint="Minimum 10,000 VND, maximum 50,000,000 VND"
        />
        <Select
          label="Payment Method"
          options={methodOptions}
          value={method}
          onChange={(e) => setMethod(e.target.value as any)}
        />
        <Input
          label="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., Top up for shopping"
        />
        {error && (
          <div className="text-danger text-sm text-center">{error}</div>
        )}
        <Button type="submit" loading={isLoading} fullWidth>
          Continue to Pay
        </Button>
      </form>
    </Card>
  );
}
