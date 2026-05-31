// services/transferService.ts
import type { Transaction } from "@/models/transaction";
import { TransactionType, TransactionStatus } from "@/models/common";
import { walletService } from "./walletService";
import { addTransaction } from "./transactionService";

export interface TransferData {
  toAccountNumber: string;
  amount: number;
  description?: string;
}

export interface TransferResult {
  transaction: Transaction;
  newBalance: number;
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

    // Cộng tiền người nhận vào mock_users
    this.creditRecipientBalance(recipient.walletId, data.amount);

    // Tạo transaction record
    const now = new Date().toISOString();
    const transaction: Transaction = {
      id: `txn_${Date.now()}`,
      fromWalletId: currentWallet.id,
      toWalletId: recipient.walletId,
      amount: data.amount,
      currency: currentWallet.currency,
      type: TransactionType.TRANSFER,
      status: TransactionStatus.SUCCESS,
      description: data.description || "",
      referenceId: `REF${Math.floor(Math.random() * 1000000)}`,
      createdAt: now,
      updatedAt: now,
      // optional fields
      fee: 0,
      completedAt: now,
    };

    const senderTx: Transaction = {
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
      fee: 0,
      completedAt: now,
    };

    const receiverTx: Transaction = {
      ...senderTx,
      id: `txn_${Date.now()}_recv`,
      senderName: currentWallet.accountNumber,
    };

    addTransaction(currentWallet.id, senderTx);
    addTransaction(recipient.walletId, receiverTx);

    return {
      transaction,
      newBalance: updatedSenderWallet.balance,
    };
  }

  private async findRecipientByAccountNumber(accountNumber: string) {
    const stored = localStorage.getItem("mock_users");
    if (!stored) return null;

    const users = JSON.parse(stored);
    const normalizedInput = accountNumber.trim().replace(/\s+/g, "");

    console.log("Input:", JSON.stringify(normalizedInput));
    console.log("Stored accounts:", Object.values(users).map((u: any) => u.wallet?.accountNumber));

    for (const email in users) {
      const record = users[email];
      const storedNumber = record.wallet?.accountNumber?.toString().trim();

      if (storedNumber === normalizedInput) {
        return {
          walletId: record.wallet.id,
          userId: record.user.id,
          name: record.user.name,
        };
      }
    }
    return null;
  }

  async getTransactionHistory(limit = 20): Promise<Transaction[]> {
    const transactions = loadTransactions();
    return transactions.slice(0, limit);
  }

  private creditRecipientBalance(recipientWalletId: string, amount: number): void {
    const raw = localStorage.getItem("mock_users");
    if (!raw) return;

    const users = JSON.parse(raw);

    for (const email in users) {
      const wallet = users[email].wallet;
      if (wallet?.id !== recipientWalletId) continue;

      // Cập nhật balance trong mock_users
      const updatedWallet = {
        ...wallet,
        balance: wallet.balance + amount,
        updatedAt: new Date().toISOString(),
      };
      users[email].wallet = updatedWallet;
      localStorage.setItem("mock_users", JSON.stringify(users));

      // Nếu người nhận đang là user hiện tại trên tab này
      // (edge case: transfer cho chính mình hoặc test trên 1 tab)
      const activeWalletRaw = localStorage.getItem("ewallet_wallet");
      if (activeWalletRaw) {
        const activeWallet = JSON.parse(activeWalletRaw);
        if (activeWallet.id === recipientWalletId) {
          localStorage.setItem("ewallet_wallet", JSON.stringify(updatedWallet));
        }
      }

      break;
    }
  }
}

export const transferService = new TransferService();