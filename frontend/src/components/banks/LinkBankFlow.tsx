// components/banks/LinkBankFlow.tsx
"use client";

import { useState } from "react";
import {
  bankService,
  SUPPORTED_BANKS,
  type BankInfo,
} from "@/services/bankService";
import { Button, Input } from "@/components/ui";
import {
  ArrowLeft,
  CheckCircle,
  Building2,
  Shield,
  Smartphone,
} from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { BankLogo } from "./BankLogo";

type Step = "select_bank" | "enter_account" | "confirm_otp" | "success";

interface LinkBankFlowProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function LinkBankFlow({ onSuccess, onCancel }: LinkBankFlowProps) {
  const { showToast } = useToast();
  const [step, setStep] = useState<Step>("select_bank");
  const [selectedBank, setSelectedBank] = useState<BankInfo | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [otp, setOtp] = useState("");
  const [maskedPhone, setMaskedPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBanks = SUPPORTED_BANKS.filter(
    (b) =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.code.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSelectBank = (bank: BankInfo) => {
    setSelectedBank(bank);
    setStep("enter_account");
  };

  const handleVerifyAccount = async () => {
    if (!selectedBank) return;
    setLoading(true);
    try {
      const { accountName: name } = await bankService.verifyAccount(
        selectedBank.code,
        accountNumber,
      );
      setAccountName(name);
      const { maskedPhone: phone } = await bankService.sendOtp({
        bankCode: selectedBank.code,
        accountNumber,
        accountName: name,
      });
      setMaskedPhone(phone);
      setStep("confirm_otp");
    } catch (e) {
      // Lỗi đã được interceptor xử lý, không cần showToast ở đây
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmOtp = async () => {
    if (!selectedBank) return;
    setLoading(true);
    try {
      await bankService.verifyOtpAndLink({
        bankCode: selectedBank.code,
        accountNumber,
        accountName,
        otp,
      });
      setStep("success");
    } catch (e) {
      // Lỗi đã được interceptor xử lý
    } finally {
      setLoading(false);
    }
  };
  const handleResendOtp = async () => {
    if (!selectedBank) return;
    setLoading(true);
    try {
      const { maskedPhone: phone } = await bankService.sendOtp({
        bankCode: selectedBank.code,
        accountNumber,
        accountName,
      });
      setMaskedPhone(phone);
      showToast("Đã gửi lại OTP", "success");
    } catch (e) {
      // Lỗi đã được interceptor xử lý
    } finally {
      setLoading(false);
    }
  };

  // Step: Chọn ngân hàng
  if (step === "select_bank") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-sunken text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 className="text-base font-bold text-primary">Chọn ngân hàng</h2>
            <p className="text-xs text-secondary">
              Hỗ trợ {SUPPORTED_BANKS.length} ngân hàng
            </p>
          </div>
        </div>

        <Input
          placeholder="Tìm ngân hàng..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="grid grid-cols-3 gap-2.5">
          {filteredBanks.map((bank) => (
            <button
              key={bank.code}
              onClick={() => handleSelectBank(bank)}
              className="flex flex-col items-center gap-2 rounded-2xl border border-subtle bg-white p-3.5 text-center transition-all hover:border-brand-default hover:shadow-md active:scale-95"
            >
              <BankLogo
                logoUrl={bank.logoUrl}
                bankName={bank.name}
                size={44}
                backgroundColor={bank.color + "18"}
                rounded="xl"
              />
              <span className="text-2xs font-semibold text-secondary leading-tight">
                {bank.shortName}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Step: Nhập số tài khoản
  if (step === "enter_account" && selectedBank) {
    return (
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setStep("select_bank")}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-sunken text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 className="text-base font-bold text-primary">
              Nhập số tài khoản
            </h2>
            <p className="text-xs text-secondary">{selectedBank.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-subtle bg-surface-sunken p-4">
          <BankLogo
            logoUrl={selectedBank.logoUrl}
            bankName={selectedBank.name}
            size={48}
            backgroundColor={selectedBank.color + "18"}
            rounded="xl"
          />
          <div>
            <p className="text-sm font-semibold text-primary">
              {selectedBank.name}
            </p>
            <p className="text-xs text-tertiary">Ngân hàng đã chọn</p>
          </div>
        </div>

        <Input
          label="Số tài khoản"
          placeholder="Nhập số tài khoản ngân hàng"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
          type="text"
          inputMode="numeric"
          maxLength={16}
          hint="9-16 chữ số"
        />

        <div className="flex items-start gap-2.5 rounded-xl bg-info-light/40 border border-info/20 p-3">
          <Shield size={14} className="text-info mt-0.5 shrink-0" />
          <p className="text-xs text-info">
            Thông tin tài khoản được mã hóa và bảo mật. E-Wallet không lưu trữ
            mật khẩu ngân hàng của bạn.
          </p>
        </div>

        <Button
          fullWidth
          loading={loading}
          disabled={accountNumber.length < 9}
          onClick={handleVerifyAccount}
          iconLeft={<Building2 size={16} />}
        >
          Xác minh tài khoản
        </Button>
      </div>
    );
  }

  // Step: Xác nhận OTP
  if (step === "confirm_otp" && selectedBank) {
    return (
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setStep("enter_account")}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-sunken text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 className="text-base font-bold text-primary">Xác nhận OTP</h2>
            <p className="text-xs text-secondary">
              Nhập mã gửi đến {maskedPhone}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-success/30 bg-success-light/30 p-4 space-y-2">
          <div className="flex items-center gap-2 text-success">
            <CheckCircle size={16} />
            <span className="text-xs font-semibold">Tài khoản hợp lệ</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-secondary">Ngân hàng</span>
            <span className="font-semibold text-primary">
              {selectedBank.name}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-secondary">Số TK</span>
            <span className="font-mono font-semibold text-primary">
              {accountNumber}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-secondary">Chủ TK</span>
            <span className="font-semibold text-primary">{accountName}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Input
            label="Mã OTP"
            placeholder="Nhập 6 chữ số"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
            type="text"
            inputMode="numeric"
            maxLength={6}
          />
          <p className="text-xs text-tertiary text-right">
            <span className="text-secondary">Demo: dùng OTP </span>
            <span className="font-mono font-bold text-brand-default">
              123456
            </span>
          </p>
        </div>

        <div className="flex items-start gap-2.5 rounded-xl bg-surface-sunken p-3">
          <Smartphone size={14} className="text-secondary mt-0.5 shrink-0" />
          <p className="text-xs text-secondary">
            Mã OTP đã gửi đến số điện thoại {maskedPhone} đăng ký với{" "}
            {selectedBank.name}.
            <button
              onClick={handleResendOtp}
              className="ml-1 text-brand-default hover:underline font-medium"
            >
              Gửi lại
            </button>
          </p>
        </div>

        <Button
          fullWidth
          loading={loading}
          disabled={otp.length < 6}
          onClick={handleConfirmOtp}
        >
          Xác nhận liên kết
        </Button>
      </div>
    );
  }

  // Step: Thành công
  if (step === "success" && selectedBank) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="relative">
          <BankLogo
            logoUrl={selectedBank.logoUrl}
            bankName={selectedBank.name}
            size={80}
            backgroundColor={selectedBank.color + "18"}
            rounded="2xl"
          />
          <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-success text-white shadow-md">
            <CheckCircle size={16} />
          </span>
        </div>

        <div>
          <h2 className="text-lg font-bold text-primary">
            Liên kết thành công!
          </h2>
          <p className="text-sm text-secondary mt-1">
            Tài khoản{" "}
            <span className="font-semibold text-primary">
              {selectedBank.name}
            </span>{" "}
            đã được liên kết.
          </p>
        </div>

        <div className="w-full rounded-2xl border border-subtle bg-surface-sunken p-4 text-left space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-secondary">Ngân hàng</span>
            <span className="font-semibold">{selectedBank.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-secondary">Số tài khoản</span>
            <span className="font-mono font-semibold">{accountNumber}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-secondary">Chủ tài khoản</span>
            <span className="font-semibold">{accountName}</span>
          </div>
        </div>

        <Button fullWidth onClick={onSuccess}>
          Xong
        </Button>
      </div>
    );
  }

  return null;
}
