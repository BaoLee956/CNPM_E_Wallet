import { useState, useCallback } from "react";
import { walletService } from "@/services/walletService";
import { useToast } from "@/hooks/useToast";
import type { WithdrawPayload } from "@/services/walletService";
import { SUPPORTED_BANKS } from "@/services/bankService";

interface WithdrawState {
  amount: number;
  bankName?: string;
  accountNumber?: string;
  transactionId?: string;
}

export function useWithdraw() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<WithdrawState | null>(null);
  const { showToast } = useToast();

  const executeWithdraw = useCallback(
    async (payload: WithdrawPayload) => {
      setIsLoading(true);
      setError(null);
      setIsPending(false);
      setIsSuccess(false);

      try {
        const result = await walletService.withdraw(payload);
        const data = result.data;
        const bankCode = data?.bankCode;
        const bankInfo = SUPPORTED_BANKS.find((bank) => bank.code === bankCode);
        const bankName = bankInfo?.name || bankCode;

        setState({
          amount: payload.amount,
          bankName,
          transactionId: data?.transactionId,
        });

        if (data?.status === "pending") {
          setIsPending(true);
          showToast(result.message || "Yêu cầu rút tiền đã được gửi", "info");
        } else if (data?.status === "success" || data?.status === "completed") {
          setIsSuccess(true);
          showToast(result.message || "Rút tiền thành công", "success");
        } else {
          const msg = "Trạng thái giao dịch không xác định";
          setError(msg);
          showToast(msg, "error");
        }
      } catch (err: any) {
        const msg =
          err.response?.data?.message || err.message || "Có lỗi xảy ra";
        setError(msg);
        showToast(msg, "error");
      } finally {
        setIsLoading(false);
      }
    },
    [showToast],
  );

  const reset = useCallback(() => {
    setIsLoading(false);
    setIsPending(false);
    setIsSuccess(false);
    setError(null);
    setState(null);
  }, []);

  return {
    executeWithdraw,
    isLoading,
    isPending,
    isSuccess,
    error,
    state,
    reset,
  };
}
