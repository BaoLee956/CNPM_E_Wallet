// hooks/useTopUp.ts
import { useState } from "react";
import { useAuth } from "./useAuth";
import { walletService, type TopUpPayload, type TopUpResult } from "@/services/walletService";
import { useToast } from "./useToast";

export function useTopUp() {
  const { refreshWallet } = useAuth();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TopUpResult | null>(null);

  const executeTopUp = async (data: TopUpPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const topUpResult = await walletService.topUp(data);
      setResult(topUpResult); 
      // Refresh wallet ở background để không làm chậm UI
      refreshWallet().catch(err => console.warn("Refresh wallet failed:", err));
      showToast(topUpResult.message, "success");
      return topUpResult;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Nạp tiền thất bại";
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

  return { executeTopUp, isLoading, error, result, reset };
}