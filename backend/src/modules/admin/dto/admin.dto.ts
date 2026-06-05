import { IsString, IsNotEmpty, IsOptional, IsInt, Min, MinLength, IsIn, IsDateString } from 'class-validator';
import { Type, Transform } from 'class-transformer';

// DTO cho query tìm kiếm danh sách Users
export class QueryUsersDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}

// DTO cho cập nhật trạng thái User (dùng action thay vì status)
export class UpdateUserStatusDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(['lock', 'unlock'], { message: 'action phải là lock hoặc unlock' })
  action!: string;

  @IsString()
  @IsNotEmpty({ message: 'Lý do không được để trống' })
  reason!: string;
}

// DTO cho query danh sách Transactions
export class QueryTransactionsDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  @IsIn(['pending', 'success', 'failed', 'cancelled', 'refunded', ''], {
    message: 'Trạng thái không hợp lệ',
  })
  status?: string;

  @IsOptional()
  @IsString()
  @IsIn(['deposit', 'withdraw', 'transfer', 'payment', 'refund', ''], {
    message: 'Loại giao dịch không hợp lệ',
  })
  type?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}

export class QueryStatisticsDto {
  @IsOptional()
  @IsString()
  @IsIn(['today', '7d', '30d', 'custom'], {
    message: 'Khoảng thời gian không hợp lệ',
  })
  range?: string = 'today';

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}

// DTO cho Refund
export class RefundDto {
  @IsString()
  @IsNotEmpty({ message: 'Lý do hoàn tiền không được để trống' })
  reason!: string;
}

// DTO cho đổi mật khẩu admin
export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty({ message: 'Mật khẩu hiện tại không được để trống' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  currentPassword!: string;

  @IsString()
  @IsNotEmpty({ message: 'Mật khẩu mới không được để trống' })
  @MinLength(6, { message: 'Mật khẩu mới phải có ít nhất 6 ký tự' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  newPassword!: string;
}