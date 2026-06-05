import { IsString, IsNotEmpty, MinLength, IsEmail } from "class-validator";

export class RegisterDto {
    @IsString()
    @IsNotEmpty({ message: 'Họ và tên không được để trống' })
    name!: string;

    @IsString()
    @IsNotEmpty({ message: "Số điện thoại không được để trống" })
    phoneNumber!: string;

    @IsString()
    @IsNotEmpty({ message: "Mật khẩu không được để trống" })
    @MinLength(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" })
    password!: string;

    @IsEmail({}, { message: 'Email không hợp lệ' })
    @IsNotEmpty({ message: 'Email không được để trống' })
    email!: string;
}