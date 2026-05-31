import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';

// DTO cho API Nạp tiền
export class TopUpDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Số tiền không được để trống' })
  @Min(1000, { message: 'Số tiền nạp tối thiểu là 1,000 VND' })
  amount!: number;
}
