// components/banks/BankList.tsx
"use client";

import { useState } from "react";
import {
  bankService,
  type LinkedBank,
  SUPPORTED_BANKS,
} from "@/services/bankService";
import { Badge } from "@/components/ui";
import { Trash2, Star, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { BankLogo } from "./BankLogo";

interface BankListProps {
  banks: LinkedBank[];
  loading?: boolean;
  onRefresh: () => void;
}

export function BankList({ banks, loading, onRefresh }: BankListProps) {
  const { showToast } = useToast();
  const [removing, setRemoving] = useState<string | null>(null);
  const [settingDefault, setSettingDefault] = useState<string | null>(null);

  const getBankInfo = (code: string) =>
    SUPPORTED_BANKS.find((b) => b.code === code);

  const handleRemove = async (bank: LinkedBank) => {
    if (!confirm(`Bỏ liên kết ${getBankInfo(bank.bankCode)?.name}?`)) return;
    setRemoving(bank.id);
    try {
      await bankService.removeLinkedBank(bank.id);
      showToast("Đã bỏ liên kết ngân hàng", "success");
      onRefresh();
    } catch (e: any) {
      showToast(e.message, "error");
    } finally {
      setRemoving(null);
    }
  };

  const handleSetDefault = async (bank: LinkedBank) => {
    setSettingDefault(bank.id);
    try {
      await bankService.setDefault(bank.id);
      showToast("Đã đặt làm mặc định", "success");
      onRefresh();
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Có lỗi xảy ra", "error");
    } finally {
      setSettingDefault(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-20 animate-pulse rounded-2xl bg-surface-sunken"
          />
        ))}
      </div>
    );
  }

  if (banks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-sunken">
          <CreditCard size={28} className="text-tertiary" />
        </div>
        <p className="text-sm font-medium text-secondary">
          Chưa liên kết ngân hàng nào
        </p>
        <p className="text-xs text-tertiary">
          Liên kết tài khoản ngân hàng để nạp tiền nhanh hơn
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {banks.map((bank) => {
        const info = getBankInfo(bank.bankCode);
        const isRemoving = removing === bank.id;
        const isSettingDefault = settingDefault === bank.id;

        return (
          <div
            key={bank.id}
            className="flex items-center gap-4 rounded-2xl border border-subtle bg-white p-4 shadow-sm"
          >
            <BankLogo
              logoUrl={info?.logoUrl || ""}
              bankName={info?.name || bank.bankCode}
              size={48}
              backgroundColor={info?.color + "15"}
              rounded="xl"
            />

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-primary">
                  {info?.name ?? bank.bankCode}
                </p>
                {bank.isDefault && (
                  <Badge variant="brand" size="sm">
                    Mặc định
                  </Badge>
                )}
              </div>
              <p className="text-xs text-secondary font-mono mt-0.5">
                {bank.accountNumber.replace(/(\d{4})(?=\d)/g, "$1 ")}
              </p>
              <p className="text-xs text-tertiary truncate">
                {bank.accountName}
              </p>
            </div>

            <div className="flex items-center gap-1">
              {!bank.isDefault && (
                <button
                  onClick={() => handleSetDefault(bank)}
                  disabled={isSettingDefault}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-tertiary hover:text-warning hover:bg-warning-light transition-colors"
                  title="Đặt làm mặc định"
                >
                  {isSettingDefault ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-warning border-t-transparent" />
                  ) : (
                    <Star size={16} />
                  )}
                </button>
              )}
              <button
                onClick={() => handleRemove(bank)}
                disabled={isRemoving}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-tertiary hover:text-danger hover:bg-danger-light transition-colors"
                title="Bỏ liên kết"
              >
                {isRemoving ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-danger border-t-transparent" />
                ) : (
                  <Trash2 size={16} />
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
