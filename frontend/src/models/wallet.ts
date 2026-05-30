// models/wallet.ts
import type { ID, Currency, Timestamps } from "./common";

export interface Wallet extends Timestamps {
  id: ID;
  userId: ID;
  balance: number; // dùng số nguyên, đơn vị là subunit (VD: VND * 100)
  currency: Currency;
  accountNumber: string; // 12-16 digits
  isActive: boolean;
  // giới hạn giao dịch
  dailyLimit?: number;
  monthlyLimit?: number;
  currentDailyUsage?: number;
  currentMonthlyUsage?: number;
}