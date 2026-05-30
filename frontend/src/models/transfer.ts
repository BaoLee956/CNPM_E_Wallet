// models/transfer.ts
import type { ID, TransactionStatus, Timestamps } from "./common";

export interface Transfer extends Timestamps {
  id: ID;
  fromUserId: ID;
  toUserId: ID;
  fromWalletId: ID;
  toWalletId: ID;
  amount: number;
  fee?: number;
  status: TransactionStatus;
  reference?: string; // nội dung chuyển tiền
  transactionId: ID; // liên kết với Transaction của người gửi
  counterpartTransactionId: ID; // Transaction của người nhận
  completedAt?: string;
}