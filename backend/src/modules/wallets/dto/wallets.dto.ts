/**
 * backend/src/modules/wallets/dto/wallets.dto.ts  (UPDATED)
 *
 * Thêm linkedBankId vào TopUpDto và WithdrawDto để support gateway flow.
 * Các DTO khác giữ nguyên.
 */

import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsIn,
  IsUUID,
  Min,
  MaxLength,
} from 'class-validator';

// ─── Top Up ───────────────────────────────────────────────────────────────
export class TopUpDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Số tiền không được để trống' })
  @Min(10000, { message: 'Số tiền nạp tối thiểu là 10,000 VND' })
  amount!: number;

  // Nếu có linkedBankId → dùng gateway flow (async)
  // Nếu không → fallback về method truyền thống (mock instant)
  @IsOptional()
  @IsUUID()
  linkedBankId?: string;

  @IsOptional()
  @IsString()
  @IsIn(['bank_transfer', 'credit_card', 'debit_card', 'voucher'])
  method?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

// ─── Withdraw ────────────────────────────────────────────────────────────
export class WithdrawDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Số tiền không được để trống' })
  @Min(10000, { message: 'Số tiền rút tối thiểu là 10,000 VND' })
  amount!: number;

  // Nếu có linkedBankId → rút về TK ngân hàng qua gateway
  @IsOptional()
  @IsUUID()
  linkedBankId?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

// ─── Transfer (giữ nguyên) ────────────────────────────────────────────────
export class TransferDto {
  @IsString()
  @IsNotEmpty({ message: 'Số tài khoản người nhận không được để trống' })
  toAccountNumber!: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Số tiền không được để trống' })
  @Min(1000, { message: 'Số tiền chuyển tối thiểu là 1,000 VND' })
  amount!: number;

  @IsOptional()
  @IsString()
  @MaxLength(200, { message: 'Nội dung chuyển khoản tối đa 200 ký tự' })
  description?: string;
}

// ─── Payment (giữ nguyên) ─────────────────────────────────────────────────
export class PaymentDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Số tiền không được để trống' })
  @Min(1000, { message: 'Số tiền thanh toán tối thiểu là 1,000 VND' })
  amount!: number;

  @IsString()
  @IsNotEmpty({ message: 'Loại thanh toán không được để trống' })
  @IsIn(['bill', 'merchant', 'subscription'])
  type!: string;

  @IsOptional()
  @IsString()
  merchantId?: string;

  @IsOptional()
  @IsString()
  billCode?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  description?: string;
}

// ─── Update Wallet Limits (giữ nguyên) ───────────────────────────────────
export class UpdateWalletLimitsDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  dailyLimit?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  monthlyLimit?: number;
}