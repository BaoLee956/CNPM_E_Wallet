/**
 * frontend/src/components/withdraw/WithdrawForm.tsx  (UPDATED — với confirm sheet)
 *
 * Flow mới:
 *   1. User chọn bank + nhập số tiền → bấm "Rút tiền"
 *   2. Sheet mở với preview đầy đủ
 *   3. User bấm "Xác nhận rút tiền" → gọi onSubmit thật sự
 */

"use client";

import { useState, useEffect } from "react";
import { Button, Input, Card } from "@/components/ui";
import {
  TransactionConfirmSheet,
  type TransactionPreview,
} from "@/components/ui/TransactionConfirmSheet";
import { BankLogo } from "@/components/banks/BankLogo";
import {
  bankService,
  SUPPORTED_BANKS,
  type LinkedBank,
} from "@/services/bankService";
import { type WithdrawPayload } from "@/services/walletService";
import { Building2, CheckCircle2, ChevronRight } from "lucide-react";

interface WithdrawFormProps {
  onSubmit: (data: WithdrawPayload) => Promise<void>;
  isLoading: boolean;
  isPending?: boolean;
  error: string | null;
}

export function WithdrawForm({
  onSubmit,
  isLoading,
  isPending,
  error,
}: WithdrawFormProps) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [linkedBanks, setLinkedBanks] = useState<LinkedBank[]>([]);
  const [selectedBankId, setSelectedBankId] = useState<string | null>(null);
  const [loadingBanks, setLoadingBanks] = useState(true);

  // Confirm sheet state
  const [sheetOpen, setSheetOpen] = useState(false);
  const [preview, setPreview] = useState<TransactionPreview | null>(null);
  const [pendingPayload, setPendingPayload] = useState<WithdrawPayload | null>(
    null,
  );

  const QUICK_AMOUNTS = [
    50_000, 100_000, 200_000, 500_000, 1_000_000, 2_000_000,
  ];

  useEffect(() => {
    bankService
      .getLinkedBanks()
      .then((banks) => {
        setLinkedBanks(banks);
        const defaultBank = banks.find((bank) => bank.isDefault === true);
        if (defaultBank) {
          setSelectedBankId(defaultBank.id);
        }
      })
      .finally(() => setLoadingBanks(false));
  }, []);

  const selectedBank = linkedBanks.find((b) => b.id === selectedBankId);
  const bankInfo = selectedBank
    ? SUPPORTED_BANKS.find((b) => b.code === selectedBank.bankCode)
    : null;

  // Bước 1: validate → mở sheet preview
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < 10_000) return;
    if (!selectedBankId) return;

    const payload: WithdrawPayload = {
      amount: numAmount,
      description: description.trim() || undefined,
      linkedBankId: selectedBankId,
    };

    const previewData: TransactionPreview = {
      type: "withdraw",
      amount: numAmount,
      description: description.trim() || undefined,
      fee: 0,
      note: "Sau khi xác nhận, số tiền sẽ bị trừ ngay khỏi ví và chuyển về tài khoản ngân hàng trong vài phút.",
      ...(selectedBank && bankInfo
        ? {
            bankName: bankInfo.name,
            bankColor: bankInfo.color,
            accountNumber: `**** ${selectedBank.accountNumber.slice(-4)}`,
            accountName: selectedBank.accountName,
          }
        : {}),
    };

    setPendingPayload(payload);
    setPreview(previewData);
    setSheetOpen(true);
  };

  // Bước 2: user xác nhận → gọi API
  const handleConfirm = async () => {
    if (!pendingPayload || isLoading) return;
    await onSubmit(pendingPayload);
    setSheetOpen(false);
  };

  const isProcessing = isLoading || isPending;

  return (
    <>
      <Card>
        <form onSubmit={handleFormSubmit} className="space-y-5">
          {/* ── Chọn ngân hàng nhận tiền ── */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              Rút tiền về tài khoản
            </label>

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
                          **** {bank.accountNumber.slice(-4)} ·{" "}
                          {bank.accountName}
                        </p>
                        {bank.bankBalance != null && (
                          <p className="text-xs text-success font-medium mt-0.5">
                            Số dư: {bank.bankBalance.toLocaleString("vi-VN")} đ
                          </p>
                        )}
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
              </div>
            ) : (
              <a
                href="/banks"
                className="flex items-center gap-3 rounded-xl border border-dashed border-subtle bg-surface-sunken p-3 text-secondary hover:text-primary transition-colors"
              >
                <Building2 size={18} />
                <span className="text-sm">Liên kết ngân hàng để rút tiền</span>
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
              disabled={!selectedBankId}
            />
            <div className="grid grid-cols-3 gap-2">
              {QUICK_AMOUNTS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(String(preset))}
                  disabled={!selectedBankId}
                  className={`rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors ${
                    amount === String(preset)
                      ? "border-brand-default bg-brand-subtle text-brand-default"
                      : "border-subtle bg-white text-secondary hover:border-brand-subtle hover:text-primary"
                  } ${!selectedBankId ? "opacity-50 cursor-not-allowed" : ""}`}
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
            placeholder="Rút tiền..."
            disabled={!selectedBankId}
          />

          {/* ── Pending state ── */}
          {isPending && (
            <div className="flex items-center gap-3 rounded-xl bg-info-light/40 border border-info/20 p-3">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-info border-t-transparent shrink-0" />
              <p className="text-sm text-info">
                Đang xử lý giao dịch rút tiền...
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
            disabled={
              isProcessing ||
              !selectedBankId ||
              !amount ||
              parseFloat(amount) < 10_000
            }
            fullWidth
          >
            {isPending ? "Đang xử lý..." : "Rút tiền"}
          </Button>
        </form>
      </Card>

      {/* ── Confirm Sheet ── */}
      <TransactionConfirmSheet
        open={sheetOpen}
        preview={preview}
        onClose={() => setSheetOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
}
