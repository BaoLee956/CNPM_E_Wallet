import { Injectable, UnauthorizedException, BadRequestException, NotFoundException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { generateUniqueAccountNumber } from '../../common/utils/account-number.util';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService
  ) { }

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
    const result = await this.prisma.$transaction(async (tx) => {
      // 1. Tạo user
      const newUser = await tx.user.create({
        data: {
          name,
          email,
          phoneNumber,
          passwordHash,
          role: 'customer',
        }
      });

      // 2. Tạo accountNumber duy nhất
      const accountNumber = await generateUniqueAccountNumber(tx);

      // 3. Tạo wallet cho user
      const wallet = await tx.wallet.create({
        data: {
          userId: newUser.id,
          balance: 0,
          currency: 'VND',
          accountNumber: accountNumber,
          isActive: true,
          dailyLimit: 50000000,        
          monthlyLimit: 500000000,     
          currentDailyUsage: 0,
          currentMonthlyUsage: 0,
        }
      });

      return { newUser, wallet };
    });

    return {
      message: 'Đăng ký thành công',
      user: {
        id: result.newUser.id,
        phoneNumber: result.newUser.phoneNumber,
        name: result.newUser.name,
        role: result.newUser.role,
      },
      wallet: {
        id: result.wallet.id,
        accountNumber: result.wallet.accountNumber,
        balance: result.wallet.balance,
      }
    };
  }

  async login(dto: LoginDto) {
    const { phoneNumber, password } = dto;

    const user = await this.prisma.user.findUnique({
      where: { phoneNumber }
    });

    if (!user) {
      throw new UnauthorizedException('Số điện thoại hoặc mật khẩu không chính xác');
    }

    if (user.deletedAt) {
      throw new UnauthorizedException('Tài khoản đã bị khóa. Vui lòng liên hệ hỗ trợ.');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Số điện thoại hoặc mật khẩu không chính xác');
    }

    const payload = { id: user.id, phoneNumber: user.phoneNumber, role: user.role };
    return {
      message: 'Đăng nhập thành công',
      access_token: this.jwtService.sign(payload),
      role: user.role
    };
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        role: true,
        wallets: {
          select: {
            id: true,
            accountNumber: true,
            balance: true,
            currency: true,
            isActive: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }

    if (user.deletedAt) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }

    return user;
  }
}