import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import {
  TopUpDto,
  WithdrawDto,
  TransferDto,
  PaymentDto,
  UpdateWalletLimitsDto,
} from './dto/wallets.dto';

@Injectable()
export class WalletsService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  // ─── Helper: lấy ví và kiểm tra hợp lệ ────────────────────────────────
  private async getActiveWallet(userId: string) {
    const wallet = await this.prisma.wallet.findFirst({ where: { userId } });
    if (!wallet) throw new NotFoundException('Không tìm thấy ví. Vui lòng liên hệ hỗ trợ.');
    if (!wallet.isActive) throw new ForbiddenException('Ví đã bị khóa. Không thể thực hiện giao dịch.');
    return wallet;
  }

  // ─── Helper: kiểm tra giới hạn giao dịch ──────────────────────────────
  private checkLimits(
    wallet: { dailyLimit: number | null; monthlyLimit: number | null; currentDailyUsage: number | null; currentMonthlyUsage: number | null },
    amount: number,
  ) {
    const dailyUsage = wallet.currentDailyUsage ?? 0;
    const monthlyUsage = wallet.currentMonthlyUsage ?? 0;

    if (wallet.dailyLimit && dailyUsage + amount > wallet.dailyLimit) {
      throw new BadRequestException(
        `Vượt hạn mức giao dịch trong ngày. Còn lại: ${(wallet.dailyLimit - dailyUsage).toLocaleString()} VND`,
      );
    }
    if (wallet.monthlyLimit && monthlyUsage + amount > wallet.monthlyLimit) {
      throw new BadRequestException(
        `Vượt hạn mức giao dịch trong tháng. Còn lại: ${(wallet.monthlyLimit - monthlyUsage).toLocaleString()} VND`,
      );
    }
  }

  // ─── GET /api/v1/wallets/me ────────────────────────────────────────────
  async getMyWallet(userId: string) {
    const wallet = await this.prisma.wallet.findFirst({
      where: { userId },
      select: {
        id: true,
        accountNumber: true,
        balance: true,
        currency: true,
        isActive: true,
        dailyLimit: true,
        monthlyLimit: true,
        currentDailyUsage: true,
        currentMonthlyUsage: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!wallet) throw new NotFoundException('Không tìm thấy ví của bạn');
    return { message: 'Lấy thông tin ví thành công', data: wallet };
  }

  // ─── POST /api/v1/wallets/top-up ──────────────────────────────────────
  // Tạo record trong bảng `top_ups` + `transactions` (Prisma transaction)
  async topUp(userId: string, dto: TopUpDto) {
    const wallet = await this.getActiveWallet(userId);
    const method = (dto.method ?? 'bank_transfer') as any;
    const description = dto.description ?? `Nạp tiền vào ví`;

    const result = await this.prisma.$transaction(async (tx) => {
      // 1. Tạo Transaction record trước để lấy id
      const transaction = await tx.transaction.create({
        data: {
          userId,
          walletId: wallet.id,
          type: 'deposit',
          status: 'success',
          amount: dto.amount,
          fee: 0,
          currency: 'VND',
          description,
          completedAt: new Date(),
        },
      });

      // 2. Tạo TopUp record, liên kết transactionId
      const topUp = await tx.topUp.create({
        data: {
          userId,
          walletId: wallet.id,
          amount: dto.amount,
          method,
          status: 'success',
          transactionId: transaction.id,
          completedAt: new Date(),
        },
      });

      // 3. Cộng tiền vào ví
      const updatedWallet = await tx.wallet.update({
        where: { id: wallet.id },
        data: { balance: { increment: dto.amount } },
      });

      return { transaction, topUp, updatedWallet };
    });

    // Push notification (ngoài transaction để không block)
    this.notificationsService.createUserNotification({
      userId,
      title: 'Nạp tiền thành công',
      message: `Bạn đã nạp ${dto.amount.toLocaleString('vi-VN')} VND vào ví.`,
      type: 'success',
    }).catch(() => {});

    return {
      message: 'Nạp tiền thành công',
      data: {
        transaction: {
          id: result.transaction.id,
          type: result.transaction.type,
          amount: result.transaction.amount,
          status: result.transaction.status,
          createdAt: result.transaction.createdAt,
        },
        wallet: {
          id: result.updatedWallet.id,
          balance: result.updatedWallet.balance,
        },
      },
    };
  }

  // ─── POST /api/v1/wallets/withdraw ────────────────────────────────────
  // Rút tiền: chỉ cần bảng `transactions` (không có bảng riêng cho withdraw)
  async withdraw(userId: string, dto: WithdrawDto) {
    const wallet = await this.getActiveWallet(userId);

    if (wallet.balance < dto.amount) {
      throw new BadRequestException('Số dư không đủ để thực hiện giao dịch');
    }
    this.checkLimits(wallet, dto.amount);

    const description = dto.description ?? `Rút tiền khỏi ví`;

    const result = await this.prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.create({
        data: {
          userId,
          walletId: wallet.id,
          type: 'withdraw',
          status: 'success',
          amount: dto.amount,
          fee: 0,
          currency: 'VND',
          description,
          completedAt: new Date(),
        },
      });

      const updatedWallet = await tx.wallet.update({
        where: { id: wallet.id },
        data: {
          balance: { decrement: dto.amount },
          currentDailyUsage: { increment: dto.amount },
          currentMonthlyUsage: { increment: dto.amount },
        },
      });

      return { transaction, updatedWallet };
    });

    this.notificationsService.createUserNotification({
      userId,
      title: 'Rút tiền thành công',
      message: `Bạn đã rút ${dto.amount.toLocaleString('vi-VN')} VND khỏi ví.`,
      type: 'info',
    }).catch(() => {});

    return {
      message: 'Rút tiền thành công',
      data: {
        transaction: {
          id: result.transaction.id,
          type: result.transaction.type,
          amount: result.transaction.amount,
          status: result.transaction.status,
          createdAt: result.transaction.createdAt,
        },
        wallet: {
          id: result.updatedWallet.id,
          balance: result.updatedWallet.balance,
        },
      },
    };
  }

  // ─── POST /api/v1/wallets/transfer ────────────────────────────────────
  // Chuyển tiền: tạo 2 Transaction (debit + credit) + 1 Transfer record
  async transfer(userId: string, dto: TransferDto) {
    const fromWallet = await this.getActiveWallet(userId);

    if (fromWallet.balance < dto.amount) {
      throw new BadRequestException('Số dư không đủ để thực hiện giao dịch');
    }
    this.checkLimits(fromWallet, dto.amount);

    // Tìm ví người nhận qua accountNumber
    const toWallet = await this.prisma.wallet.findUnique({
      where: { accountNumber: dto.toAccountNumber },
      include: { user: { select: { id: true, name: true } } },
    });

    if (!toWallet) throw new NotFoundException('Không tìm thấy tài khoản người nhận');
    if (!toWallet.isActive) throw new BadRequestException('Tài khoản người nhận đã bị khóa');
    if (toWallet.userId === userId) throw new BadRequestException('Không thể chuyển tiền cho chính mình');

    const fromUser = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { name: true },
    });

    const description = dto.description ?? `Chuyển tiền tới ${toWallet.user.name}`;
    const now = new Date();

    const result = await this.prisma.$transaction(async (tx) => {
      // 1. Transaction ghi nợ bên gửi (withdraw)
      const debitTx = await tx.transaction.create({
        data: {
          userId,
          walletId: fromWallet.id,
          fromWalletId: fromWallet.id,
          toWalletId: toWallet.id,
          type: 'transfer',
          status: 'success',
          amount: dto.amount,
          fee: 0,
          currency: 'VND',
          description,
          recipientName: toWallet.user.name,
          completedAt: now,
        },
      });

      // 2. Transaction ghi có bên nhận (deposit)
      const creditTx = await tx.transaction.create({
        data: {
          userId: toWallet.userId,
          walletId: toWallet.id,
          fromWalletId: fromWallet.id,
          toWalletId: toWallet.id,
          type: 'transfer',
          status: 'success',
          amount: dto.amount,
          fee: 0,
          currency: 'VND',
          description,
          senderName: fromUser?.name ?? 'Không xác định',
          completedAt: now,
        },
      });

      // 3. Transfer record liên kết 2 transaction
      const transfer = await tx.transfer.create({
        data: {
          fromUserId: userId,
          toUserId: toWallet.userId,
          fromWalletId: fromWallet.id,
          toWalletId: toWallet.id,
          amount: dto.amount,
          fee: 0,
          status: 'success',
          transactionId: debitTx.id,
          counterpartTransactionId: creditTx.id,
          completedAt: now,
        },
      });

      // 4. Trừ tiền bên gửi
      const updatedFromWallet = await tx.wallet.update({
        where: { id: fromWallet.id },
        data: {
          balance: { decrement: dto.amount },
          currentDailyUsage: { increment: dto.amount },
          currentMonthlyUsage: { increment: dto.amount },
        },
      });

      // 5. Cộng tiền bên nhận
      await tx.wallet.update({
        where: { id: toWallet.id },
        data: { balance: { increment: dto.amount } },
      });

      return { debitTx, creditTx, transfer, updatedFromWallet };
    });

    // Notify cả 2 phía
    this.notificationsService.createUserNotification({
      userId,
      title: 'Chuyển tiền thành công',
      message: `Bạn đã chuyển ${dto.amount.toLocaleString('vi-VN')} VND tới ${toWallet.user.name}.`,
      type: 'success',
    }).catch(() => {});

    this.notificationsService.createUserNotification({
      userId: toWallet.userId,
      title: 'Nhận tiền thành công',
      message: `Bạn nhận được ${dto.amount.toLocaleString('vi-VN')} VND từ ${fromUser?.name ?? 'Người dùng'}.`,
      type: 'success',
    }).catch(() => {});

    return {
      message: 'Chuyển tiền thành công',
      data: {
        transferId: result.transfer.id,
        amount: dto.amount,
        recipient: {
          name: toWallet.user.name,
          accountNumber: dto.toAccountNumber,
        },
        transaction: {
          id: result.debitTx.id,
          status: result.debitTx.status,
          createdAt: result.debitTx.createdAt,
        },
        wallet: {
          id: result.updatedFromWallet.id,
          balance: result.updatedFromWallet.balance,
        },
      },
    };
  }

  // ─── POST /api/v1/wallets/payment ─────────────────────────────────────
  // Thanh toán: tạo record trong bảng `payments` + `transactions`
  async payment(userId: string, dto: PaymentDto) {
    const wallet = await this.getActiveWallet(userId);

    if (wallet.balance < dto.amount) {
      throw new BadRequestException('Số dư không đủ để thực hiện thanh toán');
    }
    this.checkLimits(wallet, dto.amount);

    const description = dto.description ?? `Thanh toán ${dto.type}`;
    const now = new Date();

    const result = await this.prisma.$transaction(async (tx) => {
      // 1. Transaction record
      const transaction = await tx.transaction.create({
        data: {
          userId,
          walletId: wallet.id,
          type: 'payment',
          status: 'success',
          amount: dto.amount,
          fee: 0,
          currency: 'VND',
          description,
          completedAt: now,
        },
      });

      // 2. Payment record liên kết transactionId
      const payment = await tx.payment.create({
        data: {
          userId,
          walletId: wallet.id,
          amount: dto.amount,
          fee: 0,
          type: dto.type as any,
          merchantId: dto.merchantId,
          billCode: dto.billCode,
          description,
          status: 'success',
          transactionId: transaction.id,
          completedAt: now,
        },
      });

      // 3. Trừ tiền ví
      const updatedWallet = await tx.wallet.update({
        where: { id: wallet.id },
        data: {
          balance: { decrement: dto.amount },
          currentDailyUsage: { increment: dto.amount },
          currentMonthlyUsage: { increment: dto.amount },
        },
      });

      return { transaction, payment, updatedWallet };
    });

    this.notificationsService.createUserNotification({
      userId,
      title: 'Thanh toán thành công',
      message: `Bạn đã thanh toán ${dto.amount.toLocaleString('vi-VN')} VND.`,
      type: 'success',
    }).catch(() => {});

    return {
      message: 'Thanh toán thành công',
      data: {
        paymentId: result.payment.id,
        transaction: {
          id: result.transaction.id,
          type: result.transaction.type,
          amount: result.transaction.amount,
          status: result.transaction.status,
          createdAt: result.transaction.createdAt,
        },
        wallet: {
          id: result.updatedWallet.id,
          balance: result.updatedWallet.balance,
        },
      },
    };
  }

  // ─── PATCH /api/v1/wallets/limits ─────────────────────────────────────
  async updateLimits(userId: string, dto: UpdateWalletLimitsDto) {
    const wallet = await this.getActiveWallet(userId);

    if (dto.dailyLimit === undefined && dto.monthlyLimit === undefined) {
      throw new BadRequestException('Cần cung cấp ít nhất một giới hạn để cập nhật');
    }

    // dailyLimit phải nhỏ hơn monthlyLimit nếu cả 2 cùng được set
    const newDailyLimit = dto.dailyLimit ?? wallet.dailyLimit;
    const newMonthlyLimit = dto.monthlyLimit ?? wallet.monthlyLimit;
    if (newDailyLimit && newMonthlyLimit && newDailyLimit > newMonthlyLimit) {
      throw new BadRequestException('Hạn mức ngày không thể lớn hơn hạn mức tháng');
    }

    const updatedWallet = await this.prisma.wallet.update({
      where: { id: wallet.id },
      data: {
        ...(dto.dailyLimit !== undefined && { dailyLimit: dto.dailyLimit }),
        ...(dto.monthlyLimit !== undefined && { monthlyLimit: dto.monthlyLimit }),
      },
      select: {
        id: true,
        dailyLimit: true,
        monthlyLimit: true,
        currentDailyUsage: true,
        currentMonthlyUsage: true,
      },
    });

    return {
      message: 'Cập nhật hạn mức thành công',
      data: updatedWallet,
    };
  }
}