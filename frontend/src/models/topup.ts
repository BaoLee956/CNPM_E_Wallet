// models/topup.ts
import type { ID, TransactionStatus, Timestamps } from "./common";

export enum TopUpMethod {
  BANK_TRANSFER = "bank_transfer",
  CREDIT_CARD = "credit_card",
  DEBIT_CARD = "debit_card",
  VOUCHER = "voucher",
}

export interface TopUp extends Timestamps {
  id: ID;
  userId: ID;
  walletId: ID;
  amount: number;
  method: TopUpMethod;
  status: TransactionStatus;
  externalReference?: string; // mã giao dịch từ ngân hàng/cổng thanh toán
  transactionId: ID; // liên kết với Transaction
  completedAt?: string;
}