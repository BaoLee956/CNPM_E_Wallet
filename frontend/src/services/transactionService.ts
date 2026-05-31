// services/transactionService.ts
import type { Transaction } from "@/models/transaction";

export interface TransactionFilters {
  type: "all" | "send" | "receive" | "topup" | "payment";
  search: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
}

// Helper: lưu transactions vào localStorage theo walletId
export function saveTransactions(walletId: string, transactions: Transaction[]) {
  localStorage.setItem(`transactions_${walletId}`, JSON.stringify(transactions));
}

// Helper: đọc transactions từ localStorage
export function loadTransactions(walletId: string): Transaction[] {
  const raw = localStorage.getItem(`transactions_${walletId}`);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Transaction[];
  } catch {
    return [];
  }
}

// Thêm một transaction mới (dùng sau khi transfer/topup/payment)
export function addTransaction(walletId: string, transaction: Transaction) {
  const transactions = loadTransactions(walletId);
  transactions.unshift(transaction); // thêm vào đầu
  saveTransactions(walletId, transactions);
  return transaction;
}

export function normalizeTransactionType(
  tx: Transaction,
  currentWalletId: string
): string {
  if (tx.type === "transfer") {
    return tx.fromWalletId === currentWalletId ? "send" : "receive";
  }
  if (tx.type === "deposit") return "topup";
  return tx.type as string;
}

export async function getTransactions(
  walletId: string,
  filters: TransactionFilters,
  page: number = 1,
  pageSize: number = 10
): Promise<PaginatedResult<Transaction>> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  let transactions = loadTransactions(walletId);

  // Normalize type trước khi filter
  const normalized = transactions.map((tx) => ({
    ...tx,
    _displayType: normalizeTransactionType(tx, walletId), // field tạm để filter
  }));

  // Filter theo display type
  let filtered = normalized;
  if (filters.type !== "all") {
    filtered = normalized.filter((tx) => tx._displayType === filters.type);
  }

  // Filter theo search
  if (filters.search.trim()) {
    const keyword = filters.search.toLowerCase();
    filtered = filtered.filter(
      (tx) =>
        tx.description?.toLowerCase().includes(keyword) ||
        tx.recipientName?.toLowerCase().includes(keyword) ||
        tx.senderName?.toLowerCase().includes(keyword)
    );
  }

  filtered.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const total = filtered.length;
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return { data: paginated, total };
}