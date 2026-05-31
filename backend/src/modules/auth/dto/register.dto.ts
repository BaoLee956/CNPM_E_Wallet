import { IsString, IsNotEmpty, MinLength, IsEmail } from "class-validator";

export class RegisterDto {
    @IsString()
    @IsNotEmpty({ message: 'Họ và tên không được để trống' }) // Thêm trường này
    name!: string;

    @IsString()
    @IsNotEmpty({ message: "Phone number is required" })
    phoneNumber!: string;

    @IsString()
    @IsNotEmpty({ message: "Password is required" })
    @MinLength(6, { message: "Password must be at least 6 characters long" })
    password!: string;

    @IsEmail({}, { message: 'Email không hợp lệ' })
    @IsNotEmpty({ message: 'Email không được để trống' })
    email!: string;
}