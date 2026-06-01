import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { TopUpDto } from './dto/wallets.dto';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class WalletsService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  async topUp(userId: string, dto: TopUpDto) {
    const wallet = await this.prisma.wallet.findFirst({
      where: { userId },
    });

    if (!wallet) {
      throw new NotFoundException('Không tìm thấy ví. Vui lòng liên hệ hỗ trợ.');
    }

    if (!wallet.isActive) {
      throw new ForbiddenException('Ví đã bị khóa. Không thể thực hiện giao dịch.');
    }

    const [transaction, updatedWallet] = await this.prisma.$transaction([
      this.prisma.transaction.create({
        data: {
          userId,
          walletId: wallet.id,
          type: 'deposit',
          amount: dto.amount,
          fee: 0,
          currency: 'VND',
          status: 'success',
          description: `Nạp tiền ${dto.amount.toLocaleString()} VND vào ví`,
          completedAt: new Date(),
        },
      }),
      this.prisma.wallet.update({
        where: { id: wallet.id },
        data: { balance: { increment: dto.amount } },
      }),
    ]);

    return {
      message: 'Nạp tiền thành công',
      transaction: {
        id: transaction.id,
        type: transaction.type,
        amount: transaction.amount,
        status: transaction.status,
        createdAt: transaction.createdAt,
      },
      wallet: {
        id: updatedWallet.id,
        balance: updatedWallet.balance,
      },
    };
  }
}