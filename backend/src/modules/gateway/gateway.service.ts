import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import axios, { AxiosError } from 'axios';

const GATEWAY_URL = process.env.GATEWAY_URL || 'http://localhost:3001';

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
      if (err instanceof BadRequestException || err instanceof NotFoundException) {
        throw err;
      }

      const axiosErr = err as AxiosError<GatewayResponse>;
      const msg =
        axiosErr.response?.data?.error || 'Không thể kết nối cổng thanh toán';
      this.logger.error(`Gateway error [${endpoint}]: ${msg}`);

      if (
        axiosErr.response?.status === 404 ||
        msg.toLowerCase().includes('tài khoản')
      ) {
        throw new NotFoundException(msg);
      }

      if (!axiosErr.response) {
        throw new ServiceUnavailableException(msg);
      }

      throw new BadRequestException(msg);
    }
  }

  private async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    try {
      const { data } = await axios.get<GatewayResponse<T>>(
        `${GATEWAY_URL}/gateway/${endpoint}`,
        { params, timeout: 10_000 },
      );

      if (!data.success) {
        throw new BadRequestException(data.error || 'Lỗi từ cổng thanh toán');
      }

      return data.data as T;
    } catch (err) {
      if (err instanceof BadRequestException || err instanceof NotFoundException) {
        throw err;
      }

      const axiosErr = err as AxiosError<GatewayResponse>;
      const msg =
        axiosErr.response?.data?.error || 'Không thể kết nối cổng thanh toán';
      this.logger.error(`Gateway error [GET ${endpoint}]: ${msg}`);

      if (axiosErr.response?.status === 404 || msg.toLowerCase().includes('tài khoản')) {
        throw new NotFoundException(msg);
      }

      if (!axiosErr.response) {
        throw new ServiceUnavailableException(msg);
      }

      throw new BadRequestException(msg);
    }
  }

  async verifyAccount(bankCode: string, accountNumber: string) {
    return this.post<{
      bankCode: string;
      accountNumber: string;
      accountName: string;
    }>('verify-account', { bankCode, accountNumber });
  }

  async sendOtp(bankCode: string, accountNumber: string) {
    return this.post<{ maskedPhone: string }>('send-otp', {
      bankCode,
      accountNumber,
    });
  }

  async verifyOtp(bankCode: string, accountNumber: string, otp: string) {
    return this.post<{ verified: boolean }>('verify-otp', {
      bankCode,
      accountNumber,
      otp,
    });
  }

  async debit(params: {
    bankCode: string;
    accountNumber: string;
    amount: number;
    referenceId: string;
    callbackUrl: string;
  }) {
    return this.post<{ gatewayTransactionId: string; status: string }>(
      'debit',
      params,
    );
  }

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

  async getAccountBalance(bankCode: string, accountNumber: string) {
    return this.get<{
      bankCode: string;
      accountNumber: string;
      accountName: string;
      balance: number;
    }>('account-balance', { bankCode, accountNumber });
  }
}
