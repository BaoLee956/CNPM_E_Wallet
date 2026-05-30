// models/transaction.ts
import type { ID, TransactionStatus, TransactionType, Currency, Timestamps } from "./common";

export interface Transaction extends Timestamps {
  id: ID;
  userId: ID; // chủ sở hữu giao dịch
  walletId: ID;
  type: TransactionType;
  status: TransactionStatus;
  amount: number; // số tiền (đơn vị nhỏ nhất)
  fee?: number;
  currency: Currency;
  referenceId?: string; // ID của bản ghi liên quan (transferId, topupId, paymentId)
  description?: string;
  metadata?: Record<string, any>; // linh hoạt chứa thông tin thêm
  completedAt?: string;
  cancelledAt?: string;
}