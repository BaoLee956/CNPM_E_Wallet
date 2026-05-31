import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {}

  async register(dto: RegisterDto) {
    const { phoneNumber, email, password, name } = dto;
    
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ phoneNumber }, { email }]
      }
    });

    if (existingUser) {
      throw new BadRequestException('Số điện thoại hoặc Email đã tồn tại');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        name,
        email,
        phoneNumber,
        passwordHash: passwordHash,
        role: 'customer', // Dùng chữ thường theo Enum mới
      }
    });
    
    return {
      message: 'Đăng ký thành công',
      user: { id: newUser.id, phoneNumber: newUser.phoneNumber, name: newUser.name, role: newUser.role }
    };
  }

  async login(dto: LoginDto) {
    const { phoneNumber, password } = dto;
    
    const user = await this.prisma.user.findUnique({
      where: { phoneNumber }
    });

    if (!user) {
      throw new UnauthorizedException('Sai số điện thoại hoặc mật khẩu');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Sai số điện thoại hoặc mật khẩu');
    }

    const payload = { id: user.id, phoneNumber: user.phoneNumber, role: user.role };
    return {
      message: 'Đăng nhập thành công',
      access_token: this.jwtService.sign(payload),
      role: user.role
    };
  }
}