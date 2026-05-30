// models/wallet.ts
export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  currency: string; // 'VND' or 'USD'
  accountNumber: string;
  createdAt: string;
  updatedAt: string;
}