import { IsString, IsNotEmpty, MinLength } from "class-validator";

export class LoginDto {
    @IsString()
    @IsNotEmpty({ message: "Phone number is required" })
    phoneNumber!: string;

    @IsString()
    @IsNotEmpty({ message: "Password is required" })
    @MinLength(6, { message: "Password must be at least 6 characters long" })
    password!: string;
}