// services/walletService.ts
import http from '@/lib/http';
import type { Wallet } from '@/models/wallet';

// ─── Response types ────────────────────────────────────────────────────────

interface WalletApiResponse {
  message: string;
  data: Wallet;
}

export interface TopUpPayload {
  amount: number;
  linkedBankId?: string;
  method?: 'bank_transfer' | 'credit_card' | 'debit_card' | 'voucher';
  description?: string;
}

export interface WithdrawPayload {
  amount: number;
  linkedBankId?: string;
  description?: string;
}

export interface TransferPayload {
  toAccountNumber: string;
  amount: number;
  description?: string;
}

export interface PaymentPayload {
  amount: number;
  type: 'bill' | 'merchant' | 'subscription';
  merchantId?: string;
  billCode?: string;
  description?: string;
}

export interface UpdateLimitsPayload {
  dailyLimit?: number;
  monthlyLimit?: number;
}

export interface TransactionResult {
  id: string;
  type: string;
  amount: number;
  status: string;
  createdAt: string;
}

export interface TopUpResult {
  message: string;
  data: {
    transaction: TransactionResult;
    wallet: Pick<Wallet, 'id' | 'balance'>;
  };
}

export interface WithdrawResult {
  message: string;
  data: {
    transaction: TransactionResult;
    wallet: Pick<Wallet, 'id' | 'balance'>;
  };
}

export interface TransferResult {
  message: string;
  data: {
    transferId: string;
    amount: number;
    recipient: { name: string; accountNumber: string };
    transaction: TransactionResult;
    wallet: Pick<Wallet, 'id' | 'balance'>;
  };
}

export interface PaymentResult {
  message: string;
  data: {
    paymentId: string;
    transaction: TransactionResult;
    wallet: Pick<Wallet, 'id' | 'balance'>;
  };
}

export interface UpdateLimitsResult {
  message: string;
  data: Pick<Wallet, 'id' | 'dailyLimit' | 'monthlyLimit' | 'currentDailyUsage' | 'currentMonthlyUsage'>;
}

// ─── Service ───────────────────────────────────────────────────────────────

class WalletService {
  // GET /api/v1/wallets/me
  async getWallet(): Promise<Wallet | null> {
    try {
      const { data } = await http.get<WalletApiResponse>('/api/v1/wallets/me');
      return data.data;
    } catch {
      return null;
    }
  }

  // POST /api/v1/wallets/top-up
  async topUp(payload: TopUpPayload): Promise<TopUpResult> {
    const { data } = await http.post<TopUpResult>('/api/v1/wallets/top-up', payload);
    return data;
  }

  // POST /api/v1/wallets/withdraw
  async withdraw(payload: WithdrawPayload): Promise<WithdrawResult> {
    const { data } = await http.post<WithdrawResult>('/api/v1/wallets/withdraw', payload);
    return data;
  }

  // POST /api/v1/wallets/transfer
  async transfer(payload: TransferPayload): Promise<TransferResult> {
    const { data } = await http.post<TransferResult>('/api/v1/wallets/transfer', payload);
    return data;
  }

  // POST /api/v1/wallets/payment
  async payment(payload: PaymentPayload): Promise<PaymentResult> {
    const { data } = await http.post<PaymentResult>('/api/v1/wallets/payment', payload);
    return data;
  }

  // PATCH /api/v1/wallets/limits
  async updateLimits(payload: UpdateLimitsPayload): Promise<UpdateLimitsResult> {
    const { data } = await http.patch<UpdateLimitsResult>('/api/v1/wallets/limits', payload);
    return data;
  }
}

export const walletService = new WalletService();