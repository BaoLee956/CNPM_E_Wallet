import {
  IsString,
  IsNotEmpty,
  IsIn,
  Length,
  Matches,
} from 'class-validator';

export class VerifyAccountDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(['VCB', 'TCB', 'BIDV', 'VTB', 'ACB', 'MB', 'VPB', 'TPB', 'STB', 'SHB', 'HDB', 'MSB'])
  bankCode!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{9,16}$/, { message: 'Số tài khoản phải là 9-16 chữ số' })
  accountNumber!: string;
}

export class SendOtpDto {
  @IsString()
  @IsNotEmpty()
  bankCode!: string;

  @IsString()
  @IsNotEmpty()
  accountNumber!: string;
}

export class LinkBankDto {
  @IsString()
  @IsNotEmpty()
  bankCode!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{9,16}$/, { message: 'Số tài khoản phải là 9-16 chữ số' })
  accountNumber!: string;

  @IsString()
  @IsNotEmpty()
  accountName!: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 6, { message: 'OTP phải là 6 chữ số' })
  @Matches(/^\d{6}$/, { message: 'OTP phải là 6 chữ số' })
  otp!: string;
}