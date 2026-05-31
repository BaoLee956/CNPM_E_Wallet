// components/topup/TopUpForm.tsx
"use client";

import { useState } from "react";
import { Button, Input, Select, Card } from "@/components/ui";
import type { TopUpMethod, TopUpData } from "@/services/topUpService";

interface TopUpFormProps {
  onSubmit: (data: TopUpData) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const methodOptions = [
  { value: "card", label: "💳 Credit / Debit Card" },
  { value: "bank_transfer", label: "🏦 Bank Transfer" },
  { value: "ewallet", label: "📱 E-Wallet (MoMo, ZaloPay)" },
];

export function TopUpForm({ onSubmit, isLoading, error }: TopUpFormProps) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<TopUpMethod>("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [bankCode, setBankCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount.replace(/,/g, ""));
    if (isNaN(numAmount) || numAmount <= 0) {
      // error handled by toast in hook
      return;
    }
    const data: TopUpData = {
      amount: numAmount,
      method,
      ...(method === "card" && { cardNumber, expiry, cvv }),
      ...(method === "bank_transfer" && { bankCode }),
    };
    await onSubmit(data);
  };

  const formatAmount = (value: string) => {
    const num = parseFloat(value.replace(/,/g, ""));
    if (isNaN(num)) return "";
    return num.toLocaleString("vi-VN");
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Amount (VND)"
          type="text"
          value={amount ? formatAmount(amount) : ""}
          onChange={(e) => setAmount(e.target.value.replace(/,/g, ""))}
          placeholder="e.g., 100,000"
          required
          hint="Minimum 10,000 VND, maximum 50,000,000 VND"
        />

        <Select
          label="Payment Method"
          options={methodOptions}
          value={method}
          onChange={(e) => setMethod(e.target.value as TopUpMethod)}
        />

        {method === "card" && (
          <div className="space-y-4 rounded-lg border border-subtle p-4">
            <Input
              label="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Expiry (MM/YY)"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="MM/YY"
                required
              />
              <Input
                label="CVV"
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="123"
                required
              />
            </div>
          </div>
        )}

        {method === "bank_transfer" && (
          <Select
            label="Select Bank"
            options={[
              { value: "VCB", label: "Vietcombank" },
              { value: "TCB", label: "Techcombank" },
              { value: "BIDV", label: "BIDV" },
              { value: "VNPAY", label: "VNPay" },
            ]}
            value={bankCode}
            onChange={(e) => setBankCode(e.target.value)}
            required
          />
        )}

        {method === "ewallet" && (
          <div className="rounded-lg border border-subtle p-4 text-center text-secondary text-sm">
            You will be redirected to the e-wallet app to complete payment.
          </div>
        )}

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
