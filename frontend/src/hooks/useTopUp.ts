// hooks/useTopUp.ts
import { useState } from "react";
import { useAuth } from "./useAuth";
import { topUpService, type TopUpData, type TopUpResult } from "@/services/topUpService";
import { useToast } from "./useToast";

export function useTopUp() {
  const { refreshWallet } = useAuth();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TopUpResult | null>(null);

  const executeTopUp = async (data: TopUpData) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await topUpService.topUp(data);
      setResult(res);
      await refreshWallet(); // Cập nhật số dư mới trong store
      showToast(res.message, "success");
      return res;
    } catch (err: any) {
      const msg = err.message || "Top-up failed";
      setError(msg);
      showToast(msg, "error");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setResult(null);
  };

  return { executeTopUp, isLoading, error, result, reset };
}