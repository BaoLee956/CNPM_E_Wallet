// models/common.ts
export type ID = string; // UUID hoặc cuid

export enum Currency {
  VND = "VND",
  USD = "USD",
}

export enum TransactionStatus {
  PENDING = "pending",
  SUCCESS = "success",
  FAILED = "failed",
  CANCELLED = "cancelled",
}

export enum TransactionType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
  TRANSFER = "transfer",
  PAYMENT = "payment",
  REFUND = "refund",
}

export enum UserRole {
  CUSTOMER = "customer",
  ADMIN = "admin",
  SUPPORT = "support",
}

export enum NotificationType {
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
}

export interface Timestamps {
  createdAt: string; // ISO 8601
  updatedAt: string;
}

export interface SoftDelete {
  deletedAt?: string | null;
}