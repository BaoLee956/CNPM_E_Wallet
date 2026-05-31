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

// Lấy danh sách transaction với lọc & phân trang
export async function getTransactions(
  walletId: string,
  filters: TransactionFilters,
  page: number = 1,
  pageSize: number = 10
): Promise<PaginatedResult<Transaction>> {
  // Mô phỏng độ trễ mạng
  await new Promise((resolve) => setTimeout(resolve, 500));

  let transactions = loadTransactions(walletId);

  // Lọc theo loại
  if (filters.type !== "all") {
    transactions = transactions.filter((tx) => tx.type === filters.type);
  }

  // Lọc theo từ khóa (description, recipientName, senderName)
  if (filters.search.trim()) {
    const keyword = filters.search.toLowerCase();
    transactions = transactions.filter(
      (tx) =>
        tx.description?.toLowerCase().includes(keyword) ||
        tx.recipientName?.toLowerCase().includes(keyword) ||
        tx.senderName?.toLowerCase().includes(keyword)
    );
  }

  // Sắp xếp mới nhất lên đầu
  transactions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const total = transactions.length;
  const start = (page - 1) * pageSize;
  const paginated = transactions.slice(start, start + pageSize);

  return { data: paginated, total };
}