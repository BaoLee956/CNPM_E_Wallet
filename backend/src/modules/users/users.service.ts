import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma.service';
import { ChangePasswordDto, QueryCustomerTransactionsDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // GET /api/v1/customer/profile
  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        avatar: true,
        role: true,
        isEmailVerified: true,
        isPhoneVerified: true,
        twoFactorEnabled: true,
        lastLoginAt: true,
        createdAt: true,
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

    if (!user) throw new NotFoundException('Không tìm thấy người dùng');

    return {
      message: 'Lấy thông tin thành công',
      data: user,
    };
  }

  // PUT /api/v1/customer/password
  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException('Không tìm thấy người dùng');

    const isMatch = await bcrypt.compare(dto.oldPassword, user.passwordHash);
    if (!isMatch) {
      throw new BadRequestException('Mật khẩu cũ không đúng');
    }

    if (dto.oldPassword === dto.newPassword) {
      throw new BadRequestException('Mật khẩu mới phải khác mật khẩu cũ');
    }

    const newPasswordHash = await bcrypt.hash(dto.newPassword, 10);

    await this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash: newPasswordHash },
    });

    return { message: 'Đổi mật khẩu thành công' };
  }

  // GET /api/v1/customer/transactions
  async getTransactions(userId: string, query: QueryCustomerTransactionsDto) {
    const { type, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where: any = { userId };

    if (type) {
      where.type = type;
    }

    const [transactions, total] = await Promise.all([
      this.prisma.transaction.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          type: true,
          status: true,
          amount: true,
          fee: true,
          currency: true,
          description: true,
          recipientName: true,
          senderName: true,
          referenceCode: true,
          createdAt: true,
          completedAt: true,
        },
      }),
      this.prisma.transaction.count({ where }),
    ]);

    return {
      message: 'Lấy lịch sử giao dịch thành công',
      data: transactions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}