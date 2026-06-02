// services/transactionService.ts
import http from '@/lib/http';
import type { Transaction } from '@/models/transaction';

export interface TransactionFilters {
  type: "all" | "send" | "receive" | "topup" | "payment";
  search: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
}

// Helper chuẩn hoá loại giao dịch hiển thị trên UI
export function normalizeTransactionType(
  tx: Transaction,
  currentWalletId: string
): string {
  if (tx.type === "transfer") {
    return tx.fromWalletId === currentWalletId ? "send" : "receive";
  }
  if (tx.type === "deposit") return "topup";
  if (tx.type === "withdraw") return "withdraw";
  if (tx.type === "payment") return "payment";
  return tx.type;
}

// Gọi API lấy danh sách giao dịch có phân trang + filter
export async function getTransactions(
  walletId: string, // vẫn giữ tham số để đồng bộ interface cũ, nhưng API không cần walletId riêng
  filters: TransactionFilters,
  page: number = 1,
  pageSize: number = 10
): Promise<PaginatedResult<Transaction>> {
  // Xây dựng query params
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', pageSize.toString());
  if (filters.type !== 'all') {
    params.append('type', filters.type);
  }
  if (filters.search.trim()) {
    params.append('search', filters.search.trim());
  }

  const { data } = await http.get<{
    message: string;
    data: Transaction[];
    total: number;
  }>(`/api/v1/wallets/me/transactions?${params.toString()}`);

  return {
    data: data.data,
    total: data.total,
  };
}