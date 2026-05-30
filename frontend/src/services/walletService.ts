// services/walletService.ts
import type { Wallet } from "@/models/wallet";

const MOCK_USERS_KEY = "mock_users";
const WALLET_KEY = "ewallet_wallet";

function loadMockUsers() {
  if (typeof window === "undefined") return {};
  const stored = localStorage.getItem(MOCK_USERS_KEY);
  return stored ? JSON.parse(stored) : {};
}

function saveMockUsers(users: any) {
  if (typeof window === "undefined") return;
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
}

class WalletService {
  async getWallet(): Promise<Wallet | null> {
    if (typeof window === "undefined") return null;
    const walletStr = localStorage.getItem(WALLET_KEY);
    return walletStr ? JSON.parse(walletStr) : null;
  }

  async updateBalance(amount: number, type: "deposit" | "withdraw" | "transfer"): Promise<Wallet> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    let wallet = await this.getWallet();
    if (!wallet) throw new Error("Wallet not found");

    let newBalance = wallet.balance;
    if (type === "deposit") newBalance += amount;
    else if (type === "withdraw" || type === "transfer") {
      if (wallet.balance < amount) throw new Error("Insufficient balance");
      newBalance -= amount;
    }

    const updatedWallet: Wallet = {
      ...wallet,
      balance: newBalance,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(WALLET_KEY, JSON.stringify(updatedWallet));

    // Also update in mock users storage for consistency
    const users = loadMockUsers();
    for (const email in users) {
      if (users[email].wallet.id === wallet.id) {
        users[email].wallet = updatedWallet;
        break;
      }
    }
    saveMockUsers(users);
    return updatedWallet;
  }
}

export const walletService = new WalletService();