// models/transaction.ts
import type { ID, TransactionStatus, TransactionType, Currency, Timestamps } from "./common";

export interface Transaction extends Timestamps {
  id: ID;
  userId: ID;
  walletId: ID;
  fromWalletId?: ID;
  toWalletId?: ID;
  referenceCode?: string;
  failureReason?: string | null;
  recipientName?: string;
  senderName?: string;
  type: TransactionType | string;
  status: TransactionStatus | string;
  amount: number;
  fee?: number;
  currency: Currency | string;
  referenceId?: string;
  description?: string;
  metadata?: Record<string, unknown>;
  completedAt?: string;
  cancelledAt?: string;
  // transfer-specific fields (used by TransferSuccess display)
  fromWalletAccountNumber?: string | null;
  toWalletAccountNumber?: string | null;
}
