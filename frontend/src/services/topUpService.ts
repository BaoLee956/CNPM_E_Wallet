// services/topUpService.ts
export type TopUpMethod = "card" | "bank_transfer" | "ewallet";

export interface TopUpData {
  amount: number;
  method: TopUpMethod;
  // additional fields depending on method
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
  bankCode?: string;
}

export interface TopUpResult {
  success: boolean;
  transactionId: string;
  newBalance: number;
  message: string;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const topUpService = {
  async topUp(data: TopUpData): Promise<TopUpResult> {
    await delay(1500); // Simulate network

    // Validate amount
    if (data.amount <= 0) {
      throw new Error("Amount must be greater than 0");
    }
    if (data.amount < 10000) {
      throw new Error("Minimum top-up amount is 10,000 VND");
    }
    if (data.amount > 50000000) {
      throw new Error("Maximum top-up amount is 50,000,000 VND");
    }

    // Mock successful response
    const currentBalance = localStorage.getItem("mock_balance")
      ? parseInt(localStorage.getItem("mock_balance")!)
      : 1000000;
    const newBalance = currentBalance + data.amount;
    localStorage.setItem("mock_balance", newBalance.toString());

    return {
      success: true,
      transactionId: `TXN_${Date.now()}`,
      newBalance,
      message: `Successfully topped up ${data.amount.toLocaleString("vi-VN")} VND`,
    };
  },
};