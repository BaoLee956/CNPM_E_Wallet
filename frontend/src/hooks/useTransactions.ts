// hooks/useTransactions.ts
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "./useAuth"; 
import {
  getTransactions,
  type TransactionFilters,
  type PaginatedResult,
} from "@/services/transactionService";
import type { Transaction } from "@/models/transaction";
import { useToast } from "./useToast";

export function useTransactions() {
  const { wallet, isAuthenticated } = useAuth(); 
  const { showToast } = useToast();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [filters, setFilters] = useState<TransactionFilters>({
    type: "all",
    search: "",
  });

  const fetchTransactions = useCallback(async () => {
    if (!isAuthenticated || !wallet?.id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result: PaginatedResult<Transaction> = await getTransactions(
        wallet.id,
        filters,
        page,
        pageSize
      );
      setTransactions(result.data);
      setTotal(result.total);
    } catch (err: any) {
      const msg = err.message || "Failed to load transactions";
      setError(msg);
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, wallet?.id, filters, page, pageSize, showToast]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const resetFilters = () => {
    setFilters({ type: "all", search: "" });
    setPage(1);
  };

  return {
    transactions,
    total,
    loading,
    error,
    page,
    pageSize,
    filters,
    setPage,
    setFilters,
    resetFilters,
    refetch: fetchTransactions,
  };
}