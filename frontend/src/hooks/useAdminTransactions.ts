// ============================================================
// useAdminTransactions — Hook for fetching & managing admin transactions
// ============================================================

import { useCallback } from 'react';
import { useAdminStore, mapTransaction } from '@/stores/adminStore';
import { adminTransactionService } from '@/services/admin/transactionService';
import type { PaginationParams } from '@/types/admin/notification';

export function useAdminTransactions() {
  const {
    transactions, transactionsTotal, transactionsPage, transactionsTotalPages,
    isLoadingTransactions, errorTransactions,
    setTransactions, setLoadingTransactions, setErrorTransactions,
    updateTransactionStatus, showToast,
  } = useAdminStore();

  const fetchTransactions = useCallback(async (params?: PaginationParams) => {
    setLoadingTransactions(true);
    setErrorTransactions(null);
    try {
      const res = await adminTransactionService.getTransactions(params);
      const mapped = res.data.map(mapTransaction);
      setTransactions(
        mapped,
        res.pagination.total,
        res.pagination.page,
        res.pagination.totalPages
      );
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        err?.response?.data?.response?.message ??
        'Failed to load transactions.';
      setErrorTransactions(msg);
    }
  }, [setTransactions, setLoadingTransactions, setErrorTransactions]);

  const refundTransaction = useCallback(async (transactionId: string, reason: string) => {
    try {
      await adminTransactionService.refundTransaction(transactionId, { reason });
      updateTransactionStatus(transactionId, 'Refunded');
      return true;
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        err?.response?.data?.response?.message ??
        'Failed to refund transaction.';
      showToast(msg, 'error');
      return false;
    }
  }, [updateTransactionStatus, showToast]);

  const resolveTransaction = useCallback(async (transactionId: string) => {
    try {
      await adminTransactionService.resolveTransaction(transactionId);
      updateTransactionStatus(transactionId, 'Resolved');
      return true;
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        err?.response?.data?.response?.message ??
        'Failed to resolve transaction.';
      showToast(msg, 'error');
      return false;
    }
  }, [updateTransactionStatus, showToast]);

  return {
    transactions, transactionsTotal, transactionsPage, transactionsTotalPages,
    isLoadingTransactions, errorTransactions,
    fetchTransactions,
    refundTransaction,
    resolveTransaction,
  };
}
