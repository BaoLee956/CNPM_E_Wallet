// hooks/useTransfer.ts
import { useState } from "react";
import { transferService, type TransferData, type TransferResult } from "@/services/transferService";
import { useAuth } from "./useAuth"; 

export function useTransfer() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TransferResult | null>(null);
  const { wallet, updateWallet } = useAuth(); 

  const executeTransfer = async (data: TransferData) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await transferService.transfer(data);
      // Cập nhật wallet trong store thông qua useAuth
      if (wallet && res.newBalance) {
        updateWallet({ ...wallet, balance: res.newBalance, updatedAt: new Date().toISOString() });
      }
      setResult(res);
      return res;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setResult(null);
  };

  return { executeTransfer, isLoading, error, result, reset };
}