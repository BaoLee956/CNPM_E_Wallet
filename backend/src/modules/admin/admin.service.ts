import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import {
  QueryUsersDto,
  UpdateUserStatusDto,
  QueryTransactionsDto,
  RefundDto,
  QueryStatisticsDto,
} from './dto/admin.dto';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  private async createAuditLog(data: {
    adminId: string;
    action: string;
    reason?: string;
    targetUserId?: string;
    transactionId?: string;
    details?: Record<string, unknown>;
  }) {
    await this.prisma.adminAuditLog.create({
      data: {
        adminId: data.adminId,
        action: data.action,
        reason: data.reason,
        targetUserId: data.targetUserId,
        transactionId: data.transactionId,
        details: data.details,
      },
    });
  }

  private getDateRange(query: QueryStatisticsDto) {
    const now = new Date();
    const end = new Date(now);
    end.setHours(23, 59, 59, 999);

    if (query.range === 'custom') {
      if (!query.startDate || !query.endDate) {
        throw new BadRequestException('Vui lòng cung cấp startDate và endDate cho khoảng thời gian tùy chỉnh');
      }

      const start = new Date(query.startDate);
      const customEnd = new Date(query.endDate);
      start.setHours(0, 0, 0, 0);
      customEnd.setHours(23, 59, 59, 999);

      if (start > customEnd) {
        throw new BadRequestException('startDate không được lớn hơn endDate');
      }

      return { start, end: customEnd };
    }

    const start = new Date(now);
    switch (query.range) {
      case '7d':
        start.setDate(now.getDate() - 6);
        break;
      case '30d':
        start.setDate(now.getDate() - 29);
        break;
      case 'today':
      default:
        break;
    }
    start.setHours(0, 0, 0, 0);

    return { start, end };
  }

  // 1. TRA CỨU DANH SÁCH CUSTOMER
  async getUsers(query: QueryUsersDto) {
    const { search, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where: any = { role: 'customer' };

    if (search) {
      where.OR = [
        { id: { contains: search, mode: 'insensitive' } },
        { phoneNumber: { contains: search } },
        { email: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          phoneNumber: true,
          email: true,
          role: true,
          deletedAt: true,
          createdAt: true,
          wallets: {
            select: { isActive: true, balance: true },
          },
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      message: 'Lấy danh sách thành công',
      data: users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // 2. CHI TIẾT 1 CUSTOMER
  async getUserDetail(userId: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
        role: 'customer',
      },
      select: {
        id: true,
        name: true,
        phoneNumber: true,
        email: true,
        role: true,
        deletedAt: true,
        createdAt: true,
        lastLoginAt: true,
        isEmailVerified: true,
        isPhoneVerified: true,
        twoFactorEnabled: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }

    const [wallets, linkedBanks, transactions, notifications] = await Promise.all([
      this.prisma.wallet.findMany({
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
        },
        orderBy: { createdAt: 'asc' },
      }),
      this.prisma.linkedBank.findMany({
        where: { userId, deletedAt: null },
        select: {
          id: true,
          bankCode: true,
          accountNumber: true,
          accountName: true,
          isDefault: true,
          isVerified: true,
          linkedAt: true,
        },
        orderBy: { linkedAt: 'desc' },
      }),
      this.prisma.transaction.findMany({
        where: { userId },
        take: 10,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          type: true,
          status: true,
          amount: true,
          fee: true,
          currency: true,
          description: true,
          failureReason: true,
          createdAt: true,
          completedAt: true,
        },
      }),
      this.prisma.notification.findMany({
        where: { userId },
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          message: true,
          type: true,
          isRead: true,
          createdAt: true,
        },
      }),
    ]);

    return {
      message: 'Lấy chi tiết người dùng thành công',
      data: {
        ...user,
        wallets,
        linkedBanks,
        transactions,
        notifications,
      },
    };
  }

  // 3. KHÓA / MỞ KHÓA TÀI KHOẢN
  async updateUserStatus(userId: string, adminId: string, dto: UpdateUserStatusDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException('Không tìm thấy người dùng');
    if (user.role === 'admin') {
      throw new BadRequestException('Không thể thay đổi trạng thái tài khoản Admin');
    }

    const isLocking = dto.action === 'lock';

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { deletedAt: isLocking ? new Date() : null },
    });

    await this.prisma.wallet.updateMany({
      where: { userId },
      data: { isActive: !isLocking },
    });

    await this.createAuditLog({
      adminId,
      action: isLocking ? 'lock_user' : 'unlock_user',
      reason: dto.reason,
      targetUserId: userId,
      details: {
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
    });

    await this.notificationsService.createUserNotification({
      userId,
      title: isLocking ? 'Tài khoản đã bị khóa' : 'Tài khoản đã được mở khóa',
      message: isLocking
        ? `Tài khoản của bạn đã bị khóa bởi quản trị viên. Lý do: ${dto.reason}`
        : `Tài khoản của bạn đã được mở khóa bởi quản trị viên. Lý do: ${dto.reason}`,
      type: isLocking ? 'warning' : 'success',
      metadata: {
        action: dto.action,
        reason: dto.reason,
      },
    });

    return {
      message: isLocking ? 'Khóa tài khoản thành công' : 'Mở khóa tài khoản thành công',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        phoneNumber: updatedUser.phoneNumber,
        isLocked: !!updatedUser.deletedAt,
        reason: dto.reason,
      },
    };
  }

  // 4. TRA SOÁT DANH SÁCH GIAO DỊCH
  async getTransactions(query: QueryTransactionsDto) {
    const { search, status, type, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (type) {
      where.type = type;
    }

    if (search) {
      where.AND = [
        ...(where.AND || []),
        {
          OR: [
            { id: { contains: search, mode: 'insensitive' } },
            { referenceCode: { contains: search, mode: 'insensitive' } },
            { userId: { contains: search, mode: 'insensitive' } },
            { user: { name: { contains: search, mode: 'insensitive' } } },
            { user: { phoneNumber: { contains: search } } },
          ],
        },
      ];
    }

    const [transactions, total] = await Promise.all([
      this.prisma.transaction.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { name: true, phoneNumber: true } },
          wallet: { select: { accountNumber: true } },
        },
      }),
      this.prisma.transaction.count({ where }),
    ]);

    return {
      message: 'Lấy danh sách giao dịch thành công',
      data: transactions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // 5. ĐÁNH DẤU GIAO DỊCH ĐÃ XỬ LÝ
  async resolveTransaction(transactionId: string, adminId: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id: transactionId },
    });

    if (!transaction) {
      throw new NotFoundException('Không tìm thấy giao dịch');
    }

    if (transaction.status === 'success') {
      return {
        message: 'Giao dịch đã ở trạng thái thành công',
        transaction,
      };
    }

    const resolvedTransaction = await this.prisma.transaction.update({
      where: { id: transactionId },
      data: {
        status: 'success',
        failureReason: transaction.failureReason
          ? `${transaction.failureReason} | Đã được admin ${adminId} xử lý thủ công`
          : `Đã được admin ${adminId} xử lý thủ công`,
        completedAt: new Date(),
      },
    });

    await this.createAuditLog({
      adminId,
      action: 'resolve_transaction',
      transactionId,
      details: {
        previousStatus: transaction.status,
      },
    });

    return {
      message: 'Đánh dấu giao dịch thành công',
      transaction: resolvedTransaction,
    };
  }

  // 6. HOÀN TIỀN (REFUND)
  async refundTransaction(transactionId: string, adminId: string, dto: RefundDto) {
    const originalTx = await this.prisma.transaction.findUnique({
      where: { id: transactionId },
    });

    if (!originalTx) throw new NotFoundException('Không tìm thấy giao dịch');

    if (!['failed', 'success', 'pending'].includes(originalTx.status)) {
      throw new BadRequestException(
        `Không thể hoàn tiền cho giao dịch ở trạng thái hiện tại: ${originalTx.status}`,
      );
    }

    if (originalTx.status === 'refunded') {
      throw new BadRequestException('Giao dịch này đã được hoàn tiền trước đó');
    }

    const refundAmount = originalTx.amount + (originalTx.fee || 0);

    const [refundTx, updatedOriginal, updatedWallet] = await this.prisma.$transaction([
      this.prisma.transaction.create({
        data: {
          userId: originalTx.userId,
          walletId: originalTx.walletId,
          type: 'refund',
          amount: refundAmount,
          fee: 0,
          currency: originalTx.currency,
          status: 'success',
          description: `Hoàn tiền cho giao dịch ${originalTx.id}. Lý do: ${dto.reason}`,
          referenceId: originalTx.id,
          senderName: originalTx.senderName,
          recipientName: originalTx.recipientName,
          fromWalletId: originalTx.fromWalletId,
          toWalletId: originalTx.toWalletId,
          completedAt: new Date(),
          metadata: {
            refundedByAdminId: adminId,
            reason: dto.reason,
          },
        },
      }),
      this.prisma.transaction.update({
        where: { id: transactionId },
        data: {
          status: 'refunded',
          refundedAt: new Date(),
          failureReason: originalTx.failureReason
            ? `${originalTx.failureReason} | Hoàn tiền bởi Admin (${adminId}). Lý do: ${dto.reason}`
            : `Hoàn tiền bởi Admin (${adminId}). Lý do: ${dto.reason}`,
          metadata: {
            refundedByAdminId: adminId,
            refundReason: dto.reason,
          },
        },
      }),
      this.prisma.wallet.update({
        where: { id: originalTx.walletId },
        data: { balance: { increment: refundAmount } },
      }),
    ]);

    await this.createAuditLog({
      adminId,
      action: 'refund_transaction',
      reason: dto.reason,
      targetUserId: originalTx.userId,
      transactionId,
      details: {
        refundAmount,
        refundTransactionId: refundTx.id,
      },
    });

    await this.notificationsService.createUserNotification({
      userId: originalTx.userId,
      title: 'Hoàn tiền thành công',
      message: `Ví của bạn vừa được hoàn ${refundAmount.toLocaleString('vi-VN')} VND cho giao dịch ${originalTx.id}. Lý do: ${dto.reason}`,
      type: 'success',
      metadata: {
        transactionId: originalTx.id,
        refundTransactionId: refundTx.id,
        amount: refundAmount,
        reason: dto.reason,
        newBalance: updatedWallet.balance,
      },
    });

    return {
      message: 'Hoàn tiền thành công',
      originalTransaction: {
        id: updatedOriginal.id,
        status: updatedOriginal.status,
      },
      refundTransaction: {
        id: refundTx.id,
        amount: refundTx.amount,
        status: refundTx.status,
      },
      wallet: {
        id: updatedWallet.id,
        newBalance: updatedWallet.balance,
      },
    };
  }

  // 7. BÁO CÁO THỐNG KÊ
  async getStatistics(query: QueryStatisticsDto) {
    const { start, end } = this.getDateRange(query);
    const previousStart = new Date(start);
    const previousEnd = new Date(end);
    const durationMs = end.getTime() - start.getTime() + 1;
    previousStart.setTime(start.getTime() - durationMs);
    previousEnd.setTime(end.getTime() - durationMs);

    const [
      newUsersCurrent,
      newUsersPrevious,
      depositCurrent,
      withdrawCurrent,
      feeCurrent,
      txCurrent,
      txValueCurrent,
      successCurrent,
      failedCurrent,
      recentTransactions,
      allCustomers,
      activeCustomers,
      lockedCustomers,
    ] = await Promise.all([
      this.prisma.user.count({
        where: { role: 'customer', createdAt: { gte: start, lte: end } },
      }),
      this.prisma.user.count({
        where: { role: 'customer', createdAt: { gte: previousStart, lte: previousEnd } },
      }),
      this.prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { type: 'deposit', status: 'success', createdAt: { gte: start, lte: end } },
      }),
      this.prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { type: 'withdraw', status: 'success', createdAt: { gte: start, lte: end } },
      }),
      this.prisma.transaction.aggregate({
        _sum: { fee: true },
        where: { status: 'success', createdAt: { gte: start, lte: end } },
      }),
      this.prisma.transaction.count({
        where: { createdAt: { gte: start, lte: end } },
      }),
      this.prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { createdAt: { gte: start, lte: end } },
      }),
      this.prisma.transaction.count({
        where: { status: 'success', createdAt: { gte: start, lte: end } },
      }),
      this.prisma.transaction.count({
        where: { status: 'failed', createdAt: { gte: start, lte: end } },
      }),
      this.prisma.transaction.findMany({
        where: { createdAt: { gte: start, lte: end } },
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { name: true, phoneNumber: true } },
          wallet: { select: { accountNumber: true } },
        },
      }),
      this.prisma.user.count({ where: { role: 'customer' } }),
      this.prisma.user.count({ where: { role: 'customer', deletedAt: null } }),
      this.prisma.user.count({ where: { role: 'customer', NOT: { deletedAt: null } } }),
    ]);

    const dailySeries: Array<{
      date: string;
      revenue: number;
      withdraw: number;
      fee: number;
      newUsers: number;
      transactionCount: number;
      transactionValue: number;
      successCount: number;
      failedCount: number;
    }> = [];

    const cursor = new Date(start);
    while (cursor <= end) {
      const dayStart = new Date(cursor);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(cursor);
      dayEnd.setHours(23, 59, 59, 999);

      const [dayDeposit, dayWithdraw, dayFee, dayUsers, dayTxCount, dayTxValue, daySuccess, dayFailed] = await Promise.all([
        this.prisma.transaction.aggregate({
          _sum: { amount: true },
          where: { type: 'deposit', status: 'success', createdAt: { gte: dayStart, lte: dayEnd } },
        }),
        this.prisma.transaction.aggregate({
          _sum: { amount: true },
          where: { type: 'withdraw', status: 'success', createdAt: { gte: dayStart, lte: dayEnd } },
        }),
        this.prisma.transaction.aggregate({
          _sum: { fee: true },
          where: { status: 'success', createdAt: { gte: dayStart, lte: dayEnd } },
        }),
        this.prisma.user.count({
          where: { role: 'customer', createdAt: { gte: dayStart, lte: dayEnd } },
        }),
        this.prisma.transaction.count({
          where: { createdAt: { gte: dayStart, lte: dayEnd } },
        }),
        this.prisma.transaction.aggregate({
          _sum: { amount: true },
          where: { createdAt: { gte: dayStart, lte: dayEnd } },
        }),
        this.prisma.transaction.count({
          where: { status: 'success', createdAt: { gte: dayStart, lte: dayEnd } },
        }),
        this.prisma.transaction.count({
          where: { status: 'failed', createdAt: { gte: dayStart, lte: dayEnd } },
        }),
      ]);

      dailySeries.push({
        date: dayStart.toISOString(),
        revenue: dayDeposit._sum.amount || 0,
        withdraw: dayWithdraw._sum.amount || 0,
        fee: dayFee._sum.fee || 0,
        newUsers: dayUsers,
        transactionCount: dayTxCount,
        transactionValue: dayTxValue._sum.amount || 0,
        successCount: daySuccess,
        failedCount: dayFailed,
      });

      cursor.setDate(cursor.getDate() + 1);
    }

    return {
      message: 'Lấy thống kê thành công',
      data: {
        range: {
          type: query.range || 'today',
          startDate: start.toISOString(),
          endDate: end.toISOString(),
        },
        users: {
          total: allCustomers,
          active: activeCustomers,
          locked: lockedCustomers,
          newCurrent: newUsersCurrent,
          newPrevious: newUsersPrevious,
        },
        revenue: {
          totalDeposit: depositCurrent._sum.amount || 0,
          totalWithdraw: withdrawCurrent._sum.amount || 0,
          totalFee: feeCurrent._sum.fee || 0,
        },
        transactions: {
          totalCount: txCurrent,
          totalValue: txValueCurrent._sum.amount || 0,
          successCount: successCurrent,
          failedCount: failedCurrent,
          successRate: txCurrent > 0 ? Number(((successCurrent / txCurrent) * 100).toFixed(2)) : 0,
          failedRate: txCurrent > 0 ? Number(((failedCurrent / txCurrent) * 100).toFixed(2)) : 0,
        },
        dailySeries,
        recentTransactions,
      },
    };
  }
}
