/**
 * frontend/src/components/transfer/TransferForm.tsx  (UPDATED — với confirm sheet)
 *
 * Flow mới:
 *   1. User nhập số tài khoản + số tiền → debounce lookup tên người nhận
 *   2. Bấm "Chuyển tiền" → mở sheet với đầy đủ thông tin (bao gồm tên người nhận)
 *   3. User bấm "Xác nhận chuyển tiền" → gọi onSubmit thật
 */

"use client";

import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/useToast";
import { Button, Input, Card } from "@/components/ui";
import {
  TransactionConfirmSheet,
  type TransactionPreview,
} from "@/components/ui/TransactionConfirmSheet";
import { CreditCard, Send, AlertCircle, User, Loader2 } from "lucide-react";
import { walletService } from "@/services/walletService";

interface TransferFormProps {
  onSubmit: (data: {
    toAccountNumber: string;
    amount: number;
    description: string;
  }) => Promise<unknown>;
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
  const { showToast } = useToast();

  // Recipient lookup state
  const [recipientName, setRecipientName] = useState<string | null>(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const lookupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Confirm sheet state
  const [sheetOpen, setSheetOpen] = useState(false);
  const [preview, setPreview] = useState<TransactionPreview | null>(null);
  const [pendingData, setPendingData] = useState<{
    toAccountNumber: string;
    amount: number;
    description: string;
  } | null>(null);

  const QUICK_AMOUNTS = [
    50_000, 100_000, 200_000, 500_000, 1_000_000, 2_000_000,
  ];

  // ── Debounce lookup tên người nhận ──────────────────────────────────────
  useEffect(() => {
    setRecipientName(null);
    setLookupError(null);

    const trimmed = toAccountNumber.trim();
    if (trimmed.length < 6) return; // chờ đủ ký tự

    if (lookupTimer.current) clearTimeout(lookupTimer.current);

    lookupTimer.current = setTimeout(async () => {
      setLookupLoading(true);
      try {
        const result = await walletService.lookupRecipient(trimmed);
        setRecipientName(result.name);
        setLookupError(null);
      } catch (err: any) {
        setRecipientName(null);
        setLookupError(err.message ?? "Không tìm thấy tài khoản");
      } finally {
        setLookupLoading(false);
      }
    }, 600);

    return () => {
      if (lookupTimer.current) clearTimeout(lookupTimer.current);
    };
  }, [toAccountNumber]);

  // ── Bước 1: validate → mở sheet ────────────────────────────────────────
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    setAmount(val);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    if (!toAccountNumber.trim()) {
      const msg = "Vui lòng nhập số tài khoản người nhận";
      setLocalError(msg);
      showToast(msg, "warning");
      return;
    }
    if (lookupError || !recipientName) {
      const msg =
        "Không tìm thấy tài khoản người nhận. Kiểm tra lại số tài khoản.";
      setLocalError(msg);
      showToast(msg, "warning");
      return;
    }
    const amountNum = parseFloat(amount);
    if (!amount || isNaN(amountNum) || amountNum < 1_000) {
      const msg = "Số tiền chuyển tối thiểu là 1,000 VND";
      setLocalError(msg);
      showToast(msg, "warning");
      return;
    }

    const data = {
      toAccountNumber: toAccountNumber.trim(),
      amount: amountNum,
      description: description.trim(),
    };

    const previewData: TransactionPreview = {
      type: "transfer",
      amount: amountNum,
      description: description.trim() || undefined,
      fee: 0,
      recipientName,
      recipientAccountNumber: toAccountNumber.trim(),
    };

    setPendingData(data);
    setPreview(previewData);
    setSheetOpen(true);
  };

  // ── Bước 2: xác nhận → gọi API ─────────────────────────────────────────
  const handleConfirm = async () => {
    if (!pendingData) return;
    await onSubmit(pendingData);
    setSheetOpen(false);
  };

  const displayError = localError || error;

  return (
    <>
      <Card padding="lg" className="w-full">
        <form onSubmit={handleFormSubmit} className="space-y-5">
          {/* ── Số tài khoản người nhận ── */}
          <div className="space-y-1.5">
            <Input
              label="Số tài khoản người nhận"
              type="text"
              placeholder="Nhập số tài khoản (12-16 số)"
              value={toAccountNumber}
              onChange={(e) => {
                setToAccountNumber(e.target.value);
                setLocalError("");
              }}
              iconLeft={<CreditCard size={16} />}
              required
              autoComplete="off"
            />

            {/* Recipient lookup feedback */}
            {lookupLoading && (
              <div className="flex items-center gap-2 text-xs text-secondary px-1">
                <Loader2 size={12} className="animate-spin" />
                <span>Đang tra cứu tài khoản...</span>
              </div>
            )}
            {recipientName && !lookupLoading && (
              <div className="flex items-center gap-2 rounded-lg bg-success/8 border border-success/20 px-3 py-2">
                <div className="h-7 w-7 rounded-full bg-success/15 flex items-center justify-center shrink-0">
                  <User size={13} className="text-success" />
                </div>
                <div>
                  <p className="text-xs text-secondary">Người nhận</p>
                  <p className="text-sm font-semibold text-success">
                    {recipientName}
                  </p>
                </div>
              </div>
            )}
            {lookupError &&
              !lookupLoading &&
              toAccountNumber.trim().length >= 6 && (
                <div className="flex items-center gap-2 text-xs text-danger px-1">
                  <AlertCircle size={12} />
                  <span>{lookupError}</span>
                </div>
              )}
          </div>

          {/* ── Số tiền ── */}
          <div className="space-y-2">
            <Input
              label="Số tiền (VND)"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="0"
              value={amount}
              onChange={handleAmountChange}
              iconLeft={<Send size={16} />}
              required
              min="1000"
              step="1000"
              hint="Tối thiểu 1,000 VND"
            />
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

          {/* ── Nội dung ── */}
          <Input
            label="Nội dung (tuỳ chọn)"
            type="text"
            placeholder="Nội dung chuyển tiền..."
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
            disabled={isLoading || lookupLoading}
            iconLeft={<Send size={18} />}
          >
            Chuyển tiền
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
