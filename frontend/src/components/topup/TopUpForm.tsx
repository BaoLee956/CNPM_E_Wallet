/**
 * frontend/src/components/topup/TopUpForm.tsx  (UPDATED)
 *
 * Thêm section chọn ngân hàng đã liên kết.
 * Nếu user chọn linked bank → gửi linkedBankId thay vì method.
 */

"use client";

import { useState, useEffect } from "react";
import { Button, Input, Card } from "@/components/ui";
import { BankLogo } from "@/components/banks/BankLogo";
import {
  bankService,
  SUPPORTED_BANKS,
  type LinkedBank,
} from "@/services/bankService";
import { type TopUpPayload } from "@/services/walletService";
import { Building2, Zap, ChevronRight, CheckCircle2 } from "lucide-react";

interface TopUpFormProps {
  onSubmit: (data: TopUpPayload) => Promise<void>;
  isLoading: boolean;
  isPending?: boolean;
  error: string | null;
}

export function TopUpForm({
  onSubmit,
  isLoading,
  isPending,
  error,
}: TopUpFormProps) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [linkedBanks, setLinkedBanks] = useState<LinkedBank[]>([]);
  const [selectedBankId, setSelectedBankId] = useState<string | null>(null);
  const [loadingBanks, setLoadingBanks] = useState(true);

  const QUICK_AMOUNTS = [
    50_000, 100_000, 200_000, 500_000, 1_000_000, 2_000_000,
  ];

  useEffect(() => {
    bankService
      .getLinkedBanks()
      .then(setLinkedBanks)
      .finally(() => setLoadingBanks(false));
  }, []);

  const selectedBank = linkedBanks.find((b) => b.id === selectedBankId);
  const bankInfo = selectedBank
    ? SUPPORTED_BANKS.find((b) => b.code === selectedBank.bankCode)
    : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < 10_000) return;

    const payload: TopUpPayload = {
      amount: numAmount,
      description: description.trim() || undefined,
      ...(selectedBankId
        ? { linkedBankId: selectedBankId }
        : { method: "bank_transfer" }),
    };

    await onSubmit(payload);
  };

  const isProcessing = isLoading || isPending;

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* ── Chọn nguồn tiền ── */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">Nguồn tiền</label>

          {loadingBanks ? (
            <div className="h-16 animate-pulse rounded-xl bg-surface-sunken" />
          ) : linkedBanks.length > 0 ? (
            <div className="space-y-2">
              {linkedBanks.map((bank) => {
                const info = SUPPORTED_BANKS.find(
                  (b) => b.code === bank.bankCode,
                );
                const isSelected = selectedBankId === bank.id;
                return (
                  <button
                    key={bank.id}
                    type="button"
                    onClick={() =>
                      setSelectedBankId(isSelected ? null : bank.id)
                    }
                    className={`w-full flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                      isSelected
                        ? "border-brand-default bg-brand-subtle"
                        : "border-subtle bg-white hover:border-brand-subtle"
                    }`}
                  >
                    <BankLogo
                      logoUrl={info?.logoUrl || ""}
                      bankName={info?.name || bank.bankCode}
                      size={40}
                      backgroundColor={(info?.color || "#666") + "18"}
                      rounded="lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-primary">
                        {info?.name ?? bank.bankCode}
                      </p>
                      <p className="text-xs text-secondary font-mono">
                        **** {bank.accountNumber.slice(-4)} · {bank.accountName}
                      </p>
                    </div>
                    {bank.isDefault && (
                      <span className="text-xs font-medium text-brand-default bg-brand-subtle px-2 py-0.5 rounded-full">
                        Mặc định
                      </span>
                    )}
                    {isSelected && (
                      <CheckCircle2
                        size={18}
                        className="text-brand-default shrink-0"
                      />
                    )}
                  </button>
                );
              })}

              {/* Tuỳ chọn nạp không qua ngân hàng */}
              <button
                type="button"
                onClick={() => setSelectedBankId(null)}
                className={`w-full flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                  selectedBankId === null
                    ? "border-brand-default bg-brand-subtle"
                    : "border-subtle bg-white hover:border-brand-subtle"
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-sunken">
                  <Zap size={18} className="text-secondary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-primary">
                    Nạp nhanh (mock)
                  </p>
                  <p className="text-xs text-secondary">Không qua ngân hàng</p>
                </div>
                {selectedBankId === null && (
                  <CheckCircle2
                    size={18}
                    className="text-brand-default shrink-0"
                  />
                )}
              </button>
            </div>
          ) : (
            // Chưa liên kết ngân hàng nào
            <a
              href="/banks"
              className="flex items-center gap-3 rounded-xl border border-dashed border-subtle bg-surface-sunken p-3 text-secondary hover:text-primary transition-colors"
            >
              <Building2 size={18} />
              <span className="text-sm">
                Liên kết ngân hàng để nạp tiền nhanh hơn
              </span>
              <ChevronRight size={16} className="ml-auto" />
            </a>
          )}
        </div>

        {/* ── Số tiền ── */}
        <div className="space-y-2">
          <Input
            label="Số tiền (VND)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            required
            min="10000"
            step="10000"
            hint="Tối thiểu 10,000 VND"
          />
          {/* Quick amounts */}
          <div className="grid grid-cols-3 gap-2">
            {QUICK_AMOUNTS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setAmount(String(preset))}
                className={`rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors ${
                  amount === String(preset)
                    ? "border-brand-default bg-brand-subtle text-brand-default"
                    : "border-subtle bg-white text-secondary hover:border-brand-subtle hover:text-primary"
                }`}
              >
                {(preset / 1000).toLocaleString()}k
              </button>
            ))}
          </div>
        </div>

        {/* ── Mô tả ── */}
        <Input
          label="Nội dung (tuỳ chọn)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Nạp tiền mua sắm..."
        />

        {/* ── Summary ── */}
        {selectedBank && bankInfo && amount && parseFloat(amount) >= 10_000 && (
          <div className="rounded-xl bg-surface-sunken p-3 space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-secondary">Từ tài khoản</span>
              <span className="font-medium">
                {bankInfo.name} *{selectedBank.accountNumber.slice(-4)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">Số tiền nạp</span>
              <span className="font-semibold text-primary">
                {parseFloat(amount).toLocaleString("vi-VN")} VND
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-tertiary">Phí giao dịch</span>
              <span className="text-success font-medium">Miễn phí</span>
            </div>
          </div>
        )}

        {/* ── Pending state ── */}
        {isPending && (
          <div className="flex items-center gap-3 rounded-xl bg-info-light/40 border border-info/20 p-3">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-info border-t-transparent shrink-0" />
            <p className="text-sm text-info">
              Đang chờ xác nhận từ ngân hàng...
            </p>
          </div>
        )}

        {error && (
          <div className="text-danger text-sm text-center bg-danger-light/20 rounded-lg p-3">
            {error}
          </div>
        )}

        <Button
          type="submit"
          loading={isLoading}
          disabled={isProcessing || !amount || parseFloat(amount) < 10_000}
          fullWidth
        >
          {isPending
            ? "Đang xử lý..."
            : selectedBankId
              ? "Nạp từ ngân hàng"
              : "Nạp tiền"}
        </Button>
      </form>
    </Card>
  );
}
