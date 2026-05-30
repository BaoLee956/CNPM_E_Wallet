// services/transferService.ts
import type { Transaction } from "@/models/transaction";
import { walletService } from "./walletService";

export interface TransferData {
  toAccountNumber: string;
  amount: number;
  description?: string;
}

export interface TransferResult {
  transaction: Transaction;
  newBalance: number;
}

// Mock lưu transactions
const TRANSACTIONS_KEY = "mock_transactions";

function loadTransactions(): Transaction[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(TRANSACTIONS_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveTransactions(transactions: Transaction[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
}

class TransferService {
  async transfer(data: TransferData): Promise<TransferResult> {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate network

    // Lấy wallet hiện tại
    const currentWallet = await walletService.getWallet();
    if (!currentWallet) throw new Error("Wallet not found");

    // Kiểm tra số dư
    if (currentWallet.balance < data.amount) {
      throw new Error("Insufficient balance");
    }

    // Tìm người nhận qua số tài khoản (mock)
    const recipient = await this.findRecipientByAccountNumber(data.toAccountNumber);
    if (!recipient) throw new Error("Recipient account not found");

    // Trừ tiền từ wallet người gửi
    const updatedSenderWallet = await walletService.updateBalance(data.amount, "transfer");

    // Tạo transaction record
    const now = new Date().toISOString();
    const transaction: Transaction = {
      id: `txn_${Date.now()}`,
      fromWalletId: currentWallet.id,
      toWalletId: recipient.walletId,
      amount: data.amount,
      currency: currentWallet.currency,
      type: "transfer",
      status: "completed",
      description: data.description || "",
      referenceCode: `REF${Math.floor(Math.random() * 1000000)}`,
      createdAt: now,
      updatedAt: now,
      // optional fields
      fee: 0,
      failureReason: null,
      completedAt: now,
    };

    // Lưu transaction
    const transactions = loadTransactions();
    transactions.unshift(transaction); // mới nhất lên đầu
    saveTransactions(transactions);

    return {
      transaction,
      newBalance: updatedSenderWallet.balance,
    };
  }

  private async findRecipientByAccountNumber(accountNumber: string): Promise<{ walletId: string; userId: string; name: string } | null> {
    // Mock: tìm trong mock_users
    const MOCK_USERS_KEY = "mock_users";
    const stored = localStorage.getItem(MOCK_USERS_KEY);
    if (!stored) return null;
    const users = JSON.parse(stored);
    for (const email in users) {
      const wallet = users[email].wallet;
      if (wallet.accountNumber === accountNumber) {
        return {
          walletId: wallet.id,
          userId: users[email].user.id,
          name: users[email].user.name,
        };
      }
    }
    return null;
  }

  async getTransactionHistory(limit = 20): Promise<Transaction[]> {
    const transactions = loadTransactions();
    return transactions.slice(0, limit);
  }
}

export const transferService = new TransferService();