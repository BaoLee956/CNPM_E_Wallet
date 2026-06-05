// ============================================================
// Admin Transaction Service — API calls for transaction management
// ============================================================

import http from '@/lib/http';
import type {
  AdminTransactionsListResponse,
  AdminRefundRequest,
  AdminRefundResponse,
} from '@/types/admin/transaction';
import type { PaginationParams } from '@/types/admin/notification';

export const adminTransactionService = {
  async getTransactions(params?: PaginationParams) {
    const res = await http.get<AdminTransactionsListResponse>(
      '/api/v1/admin/transactions',
      {
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 20,
          status: params?.status ?? undefined,
          type: params?.type ?? undefined,
        },
      }
    );
    return res.data;
  },

  async refundTransaction(transactionId: string, payload: AdminRefundRequest) {
    const res = await http.post<AdminRefundResponse>(
      `/api/v1/admin/transactions/${transactionId}/refund`,
      payload
    );
    return res.data;
  },
};
