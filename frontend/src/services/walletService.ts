import http from '@/lib/http';
import type { Wallet } from '@/models/wallet';

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
  type?: string;
  amount?: number;
  status: string;
  createdAt: string;
}

interface WalletSnapshot {
  id: string;
  balance: number;
}

export interface TopUpResult {
  message: string;
  data: {
    transactionId: string;
    status: string;
    amount: number;
    bankCode?: string;
    accountNumber?: string;
    wallet?: WalletSnapshot;
  };
}

export interface WithdrawResult {
  message: string;
  data: {
    transactionId: string;
    status: string;
    amount: number;
    bankCode?: string;
    wallet?: WalletSnapshot;
  };
}

export interface TransferResult {
  message: string;
  data: {
    transferId: string;
    amount: number;
    recipient: { name: string; accountNumber: string };
    transaction: TransactionResult;
    wallet: WalletSnapshot;
  };
}

export interface PaymentResult {
  message: string;
  data: {
    paymentId: string;
    transaction: TransactionResult;
    wallet: WalletSnapshot;
  };
}

export interface UpdateLimitsResult {
  message: string;
  data: Pick<
    Wallet,
    'id' | 'dailyLimit' | 'monthlyLimit' | 'currentDailyUsage' | 'currentMonthlyUsage'
  >;
}

export interface RecipientLookupResult {
  accountNumber: string;
  name: string;
}

class WalletService {
  async getWallet(): Promise<Wallet | null> {
    try {
      const { data } = await http.get<WalletApiResponse>('/api/v1/wallets/me');
      return data.data;
    } catch {
      return null;
    }
  }

  async lookupRecipient(accountNumber: string): Promise<RecipientLookupResult> {
    const { data } = await http.get<{
      message: string;
      data: RecipientLookupResult;
    }>(`/api/v1/wallets/lookup?accountNumber=${encodeURIComponent(accountNumber)}`);
    return data.data;
  }

  async topUp(payload: TopUpPayload): Promise<TopUpResult> {
    const { data } = await http.post<TopUpResult>('/api/v1/wallets/top-up', payload);
    return data;
  }

  async withdraw(payload: WithdrawPayload): Promise<WithdrawResult> {
    const { data } = await http.post<WithdrawResult>('/api/v1/wallets/withdraw', payload);
    return data;
  }

  async transfer(payload: TransferPayload): Promise<TransferResult> {
    const { data } = await http.post<TransferResult>('/api/v1/wallets/transfer', payload);
    return data;
  }

  async payment(payload: PaymentPayload): Promise<PaymentResult> {
    const { data } = await http.post<PaymentResult>('/api/v1/wallets/payment', payload);
    return data;
  }

  async updateLimits(payload: UpdateLimitsPayload): Promise<UpdateLimitsResult> {
    const { data } = await http.patch<UpdateLimitsResult>('/api/v1/wallets/limits', payload);
    return data;
  }
}

export const walletService = new WalletService();
