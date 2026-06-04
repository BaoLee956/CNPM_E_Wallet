// hooks/useWithdraw.ts
import { useState, useCallback } from "react";
import { walletService } from "@/services/walletService";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/hooks/useAuth";
import type { WithdrawPayload } from "@/services/walletService";

// Bạn cần import SUPPORTED_BANKS để map bankCode -> tên ngân hàng
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

  const executeWithdraw = useCallback(async (payload: WithdrawPayload) => {
    setIsLoading(true);
    setError(null);
    setIsPending(false);
    setIsSuccess(false);

    try {
      const result = await walletService.withdraw(payload);
      // Response có dạng: { message, data: { transactionId, status, amount, bankCode, wallet } }
      const data = result.data;
      const status = data?.status;
      const transactionId = data?.transactionId;
      const bankCode = data?.bankCode;
      
      // Tìm tên ngân hàng từ bankCode
      const bankInfo = SUPPORTED_BANKS.find(b => b.code === bankCode);
      const bankName = bankInfo?.name || bankCode;

      // Lưu ý: API không trả về accountNumber, chỉ có bankCode.
      // Bạn có thể để undefined, và trong component sẽ hiển thị "***" hoặc bỏ qua.
      // Nếu muốn hiển thị số tài khoản, cần lấy từ linkedBank đã chọn (payload có linkedBankId)
      // Tạm thời để undefined, component sẽ xử lý an toàn.
      let accountNumber: string | undefined = undefined;
      if (payload.linkedBankId) {
        // Bạn có thể fetch lại linked bank nếu cần, nhưng đơn giản là không hiển thị
        // Hoặc lưu accountNumber từ lúc chọn bank (cần sửa WithdrawForm để truyền thêm)
        // Ở đây tôi để trống, component sẽ bỏ qua phần hiển thị accountNumber
      }

      if (status === "pending") {
        setIsPending(true);
        setState({
          amount: payload.amount,
          bankName: bankName,
          accountNumber: accountNumber,
          transactionId: transactionId,
        });
        showToast("Yêu cầu rút tiền đã được gửi", "info");
      } else if (status === "success" || status === "completed") {
        setIsSuccess(true);
        setState({
          amount: payload.amount,
          bankName: bankName,
          accountNumber: accountNumber,
          transactionId: transactionId,
        });
        showToast("Rút tiền thành công", "success");
        // Nên refresh wallet để cập nhật số dư mới
        // Nếu có useAuth.refreshWallet, gọi ở đây
      } else {
        // Các status khác (nếu có)
        setError("Trạng thái giao dịch không xác định");
        showToast("Rút tiền thất bại", "error");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Có lỗi xảy ra");
      showToast("Rút tiền thất bại", "error");
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

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