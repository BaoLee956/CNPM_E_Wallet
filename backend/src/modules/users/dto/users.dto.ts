import { IsString, IsNotEmpty, MinLength, IsIn, IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty({ message: 'Mật khẩu cũ không được để trống' })
  oldPassword!: string;

  @IsString()
  @IsNotEmpty({ message: 'Mật khẩu mới không được để trống' })
  @MinLength(6, { message: 'Mật khẩu mới phải có ít nhất 6 ký tự' })
  newPassword!: string;
}

export class UpdateProfileDto {
  @IsString()
  @IsNotEmpty({ message: 'Tên không được để trống' })
  name!: string;
}

export class QueryCustomerTransactionsDto {
  @IsOptional()
  @IsString()
  @IsIn(['deposit', 'withdraw', 'transfer', 'payment', 'refund', ''])
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