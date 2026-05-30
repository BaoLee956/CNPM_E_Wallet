// models/payment.ts
import type { ID, TransactionStatus, Timestamps } from "./common";

export enum PaymentType {
  BILL = "bill",
  MERCHANT = "merchant",
  SUBSCRIPTION = "subscription",
}

export interface Payment extends Timestamps {
  id: ID;
  userId: ID;
  walletId: ID;
  amount: number;
  fee?: number;
  type: PaymentType;
  merchantId?: ID; // nếu có
  billCode?: string;
  description?: string;
  status: TransactionStatus;
  transactionId: ID;
  completedAt?: string;
}