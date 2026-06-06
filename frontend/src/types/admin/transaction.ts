// ============================================================
// Admin Transaction Types — BE response shapes
// ============================================================

export type BeTransactionStatus = 'pending' | 'success' | 'failed' | 'cancelled' | 'refunded';
export type BeTransactionType = 'deposit' | 'withdraw' | 'transfer' | 'payment' | 'refund';

export interface AdminTransactionResponse {
  id: string;
  userId: string;
  walletId: string;
  fromWalletId: string | null;
  toWalletId: string | null;
  referenceCode: string | null;
  failureReason: string | null;
  recipientName: string | null;
  senderName: string | null;
  type: BeTransactionType;
  status: BeTransactionStatus;
  amount: number;
  fee: number | null;
  currency: string;
  referenceId: string | null;
  description: string | null;
  metadata: Record<string, unknown> | null;
  completedAt: string | null;
  cancelledAt: string | null;
  refundedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    name: string;
    phoneNumber: string;
  };
  wallet: {
    accountNumber: string;
  };
}

export interface AdminTransactionsListResponse {
  message: string;
  data: AdminTransactionResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AdminRefundRequest {
  reason: string;
}

export interface AdminRefundResponse {
  message: string;
  originalTransaction: {
    id: string;
    status: string;
  };
  refundTransaction: {
    id: string;
    amount: number;
    status: string;
  };
  wallet: {
    id: string;
    newBalance: number;
  };
}

export type TxStatus = 'Pending' | 'Timeout' | 'Resolved' | 'Refunded';
