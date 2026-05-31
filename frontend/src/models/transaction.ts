// models/transaction.ts
import type { ID, TransactionStatus, TransactionType, Currency, Timestamps } from "./common";

export interface Transaction extends Timestamps {
  id: ID;
  userId: ID; // chủ sở hữu giao dịch
  walletId: ID;
  fromWalletId?: ID;
  toWalletId?: ID;
  referenceCode?: string;
  failureReason?: string | null;
  recipientName?: string;
  senderName?: string;
  type: TransactionType | string;
  status: TransactionStatus | string;
  amount: number; // số tiền (đơn vị nhỏ nhất)
  fee?: number;
  currency: Currency | string;
  referenceId?: string; // ID của bản ghi liên quan (transferId, topupId, paymentId)
  description?: string;
  metadata?: Record<string, any>; // linh hoạt chứa thông tin thêm
  completedAt?: string;
  cancelledAt?: string;
  // transfer-specific fields (used by TransferSuccess display)
  fromWalletId?: string;
  toWalletId?: string;
  recipientName?: string;
  senderName?: string;
}