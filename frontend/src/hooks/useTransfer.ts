import { useState } from "react";
import { useAuth } from "./useAuth";
import {
  walletService,
  type TransferPayload,
  type TransferResult,
} from "@/services/walletService";
import { useToast } from "./useToast";

export function useTransfer() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TransferResult | null>(null);
  const { refreshWallet } = useAuth();
  const { showToast } = useToast();

  const executeTransfer = async (data: TransferPayload) => {
    setIsLoading(true);
    setError(null);

    try {
      const transferResult = await walletService.transfer(data);
      setResult(transferResult);
      showToast(transferResult.message || "Chuyển tiền thành công", "success");
      refreshWallet?.().catch((err) => console.warn("Refresh wallet failed:", err));
      return transferResult;
    } catch (err: any) {
      const msg =
        err.response?.data?.message || err.message || "Chuyển tiền thất bại";
      setError(msg);
      showToast(msg, "error");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return { executeTransfer, isLoading, error, result, reset };
}
