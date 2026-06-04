/**
 * backend/src/modules/gateway/gateway.service.ts
 *
 * HTTP client gọi tới Mock Gateway (localhost:3001).
 * Tất cả error từ gateway đều được wrap lại thành BadRequestException
 * để FE nhận được message rõ ràng.
 */

import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import axios, { AxiosError } from 'axios';

const GATEWAY_URL = process.env.GATEWAY_URL || 'http://localhost:3001';

// Response shape từ Mock Gateway
interface GatewayResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

@Injectable()
export class GatewayService {
  private readonly logger = new Logger(GatewayService.name);

  private async post<T>(endpoint: string, body: object): Promise<T> {
    try {
      const { data } = await axios.post<GatewayResponse<T>>(
        `${GATEWAY_URL}/gateway/${endpoint}`,
        body,
        { timeout: 10_000 },
      );
      if (!data.success) {
        throw new BadRequestException(data.error || 'Lỗi từ cổng thanh toán');
      }
      return data.data as T;
    } catch (err) {
      if (err instanceof BadRequestException) throw err;
      const axiosErr = err as AxiosError<GatewayResponse>;
      const msg = axiosErr.response?.data?.error || 'Không thể kết nối cổng thanh toán';
      this.logger.error(`Gateway error [${endpoint}]: ${msg}`);
      throw new BadRequestException(msg);
    }
  }

  // ─── Verify account ──────────────────────────────────────────────────────
  async verifyAccount(bankCode: string, accountNumber: string) {
    return this.post<{ bankCode: string; accountNumber: string; accountName: string }>(
      'verify-account',
      { bankCode, accountNumber },
    );
  }

  // ─── Send OTP ────────────────────────────────────────────────────────────
  async sendOtp(bankCode: string, accountNumber: string) {
    return this.post<{ maskedPhone: string }>('send-otp', { bankCode, accountNumber });
  }

  // ─── Verify OTP (khi liên kết ngân hàng) ────────────────────────────────
  async verifyOtp(bankCode: string, accountNumber: string, otp: string) {
    return this.post<{ verified: boolean }>('verify-otp', { bankCode, accountNumber, otp });
  }

  // ─── Debit: trừ tiền TK ngân hàng (nạp tiền vào ví) ────────────────────
  async debit(params: {
    bankCode: string;
    accountNumber: string;
    amount: number;
    referenceId: string;   // Transaction ID bên E-Wallet
    callbackUrl: string;
  }) {
    return this.post<{ gatewayTransactionId: string; status: string }>(
      'debit',
      params,
    );
  }

  // ─── Credit: cộng tiền vào TK ngân hàng (rút tiền từ ví) ────────────────
  async credit(params: {
    bankCode: string;
    accountNumber: string;
    amount: number;
    referenceId: string;
    callbackUrl: string;
  }) {
    return this.post<{ gatewayTransactionId: string; status: string }>(
      'credit',
      params,
    );
  }
}