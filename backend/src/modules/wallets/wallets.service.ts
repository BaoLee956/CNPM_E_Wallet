import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { GatewayService } from '../gateway/gateway.service';
import { LinkedBanksService } from '../linked-banks/linked-banks.service';
import {
  TopUpDto,
  WithdrawDto,
  TransferDto,
  PaymentDto,
  UpdateWalletLimitsDto,
} from './dto/wallets.dto';

const WALLET_CALLBACK_BASE = process.env.APP_URL || 'http://localhost:3002';

@Injectable()
export class WalletsService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
    private gateway: GatewayService,
    private linkedBanksService: LinkedBanksService,
  ) {}
 
  // ─── Helper: lấy ví và kiểm tra hợp lệ ──────────────────────────────
  private async getActiveWallet(userId: string) {
    const wallet = await this.prisma.wallet.findFirst({ where: { userId } });
    if (!wallet) throw new NotFoundException('Không tìm thấy ví. Vui lòng liên hệ hỗ trợ.');
    if (!wallet.isActive) throw new ForbiddenException('Ví đã bị khóa. Không thể thực hiện giao dịch.');
    return wallet;
  }
 
  // ─── Helper: kiểm tra giới hạn giao dịch ─────────────────────────────
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
 
  // ─── GET /api/v1/wallets/me ──────────────────────────────────────────
  async getMyWallet(userId: string) {
    const wallet = await this.prisma.wallet.findFirst({
      where: { userId },
      select: {
        id: true, accountNumber: true, balance: true, currency: true,
        isActive: true, dailyLimit: true, monthlyLimit: true,
        currentDailyUsage: true, currentMonthlyUsage: true,
        createdAt: true, updatedAt: true,
      },
    });
    if (!wallet) throw new NotFoundException('Không tìm thấy ví của bạn');
    return { message: 'Lấy thông tin ví thành công', data: wallet };
  }
 
  // ─── GET transaction by ID (dùng cho FE polling) ─────────────────────
  async getTransaction(userId: string, transactionId: string) {
    const tx = await this.prisma.transaction.findFirst({
      where: { id: transactionId, userId },
    });
    if (!tx) throw new NotFoundException('Không tìm thấy giao dịch');
    return { message: 'OK', data: tx };
  }

    async lookupRecipient(requesterId: string, accountNumber: string) {
    if (!accountNumber || accountNumber.trim().length < 6) {
      throw new BadRequestException('Số tài khoản không hợp lệ');
    }
 
    const wallet = await this.prisma.wallet.findUnique({
      where: { accountNumber: accountNumber.trim() },
      select: {
        accountNumber: true,
        isActive: true,
        userId: true,
        user: { select: { name: true } },
      },
    });
 
    if (!wallet) {
      throw new NotFoundException('Không tìm thấy tài khoản');
    }
    if (!wallet.isActive) {
      throw new BadRequestException('Tài khoản này đã bị khóa');
    }
    if (wallet.userId === requesterId) {
      throw new BadRequestException('Không thể tra cứu tài khoản của chính mình');
    }
 
    return {
      message: 'Tra cứu thành công',
      data: {
        accountNumber: wallet.accountNumber,
        // Mask tên để bảo vệ privacy: "Nguyễn Văn A" → "Nguyễn V*** A"
        name: this.maskName(wallet.user.name),
      },
    };
  }
 
  // Mask tên: giữ họ đầy đủ + chữ đầu tên đệm + tên cuối
  // "Nguyễn Văn An" → "Nguyễn V*** An"
  private maskName(fullName: string): string {
    const parts = fullName.trim().split(' ');
    if (parts.length === 1) return parts[0]; // Chỉ 1 từ thì giữ nguyên
    if (parts.length === 2) return `${parts[0]} ${parts[1][0]}***`;
 
    const first = parts[0];
    const last = parts[parts.length - 1];
    const middle = parts
      .slice(1, -1)
      .map((p) => `${p[0]}***`)
      .join(' ');
    return `${first} ${middle} ${last}`;
  }
 
  // ─── POST /api/v1/wallets/top-up ────────────────────────────────────
  async topUp(userId: string, dto: TopUpDto) {
    const wallet = await this.getActiveWallet(userId);
 
    // ── Gateway flow: nạp tiền từ TK ngân hàng ──────────────────────
    if (dto.linkedBankId) {
      const linkedBank = await this.linkedBanksService.getLinkedBankById(userId, dto.linkedBankId);
      const description = dto.description ?? `Nạp tiền từ ${linkedBank.bankCode} *${linkedBank.accountNumber.slice(-4)}`;
 
      // Tạo transaction ở trạng thái PENDING trước
      const transaction = await this.prisma.transaction.create({
        data: {
          userId,
          walletId: wallet.id,
          type: 'deposit',
          status: 'pending',   // ← pending, chờ webhook
          amount: dto.amount,
          fee: 0,
          currency: 'VND',
          description,
        },
      });
 
      // Tạo gateway transaction record để đối soát
      await this.prisma.gatewayTransaction.create({
        data: {
          userId,
          walletId: wallet.id,
          transactionId: transaction.id,
          type: 'debit',
          bankCode: linkedBank.bankCode,
          accountNumber: linkedBank.accountNumber,
          amount: dto.amount,
          status: 'pending',
          gatewayRef: transaction.id,
        },
      });
 
      // Gọi gateway (non-blocking: gateway sẽ webhook về sau ~2s)
      try {
        await this.gateway.debit({
          bankCode: linkedBank.bankCode,
          accountNumber: linkedBank.accountNumber,
          amount: dto.amount,
          referenceId: transaction.id,
          callbackUrl: `${WALLET_CALLBACK_BASE}/api/v1/gateway/webhook`,
        });
      } catch (err) {
        // Nếu gateway từ chối ngay (VD: số dư không đủ) → fail transaction
        await this.prisma.transaction.update({
          where: { id: transaction.id },
          data: { status: 'failed', failureReason: (err as Error).message },
        });
        throw err;
      }
 
      return {
        message: 'Yêu cầu nạp tiền đã được gửi. Vui lòng đợi xác nhận.',
        data: {
          transactionId: transaction.id,
          status: 'pending',
          amount: dto.amount,
          bankCode: linkedBank.bankCode,
          accountNumber: linkedBank.accountNumber,
        },
      };
    }
 
    // ── Instant flow (giữ nguyên hành vi cũ) ────────────────────────
    const method = (dto.method ?? 'bank_transfer') as any;
    const description = dto.description ?? `Nạp tiền vào ví`;
 
    const result = await this.prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.create({
        data: { userId, walletId: wallet.id, type: 'deposit', status: 'success', amount: dto.amount, fee: 0, currency: 'VND', description, completedAt: new Date() },
      });
      await tx.topUp.create({
        data: { userId, walletId: wallet.id, amount: dto.amount, method, status: 'success', transactionId: transaction.id, completedAt: new Date() },
      });
      const updatedWallet = await tx.wallet.update({
        where: { id: wallet.id },
        data: { balance: { increment: dto.amount } },
      });
      return { transaction, updatedWallet };
    });
 
    this.notificationsService.createUserNotification({
      userId, title: 'Nạp tiền thành công',
      message: `Bạn đã nạp ${dto.amount.toLocaleString('vi-VN')} VND vào ví.`,
      type: 'success',
    }).catch(() => {});
 
    return {
      message: 'Nạp tiền thành công',
      data: {
        transactionId: result.transaction.id,
        status: 'success',
        amount: dto.amount,
        wallet: { id: result.updatedWallet.id, balance: result.updatedWallet.balance },
      },
    };
  }
 
  // ─── POST /api/v1/wallets/withdraw ──────────────────────────────────
  async withdraw(userId: string, dto: WithdrawDto) {
    const wallet = await this.getActiveWallet(userId);
    if (wallet.balance < dto.amount) {
      throw new BadRequestException('Số dư không đủ để thực hiện giao dịch');
    }
    this.checkLimits(wallet, dto.amount);
 
    // ── Gateway flow: rút tiền ra TK ngân hàng ──────────────────────
    if (dto.linkedBankId) {
      const linkedBank = await this.linkedBanksService.getLinkedBankById(userId, dto.linkedBankId);
      const description = dto.description ?? `Rút tiền về ${linkedBank.bankCode} *${linkedBank.accountNumber.slice(-4)}`;
 
      const result = await this.prisma.$transaction(async (tx) => {
        // Tạo transaction → success ngay (tiền đã rời ví)
        // Webhook chỉ confirm phía ngân hàng đã nhận
        const transaction = await tx.transaction.create({
          data: {
            userId, walletId: wallet.id,
            type: 'withdraw', status: 'success',
            amount: dto.amount, fee: 0, currency: 'VND',
            description, completedAt: new Date(),
          },
        });
 
        // Trừ tiền ví ngay
        const updatedWallet = await tx.wallet.update({
          where: { id: wallet.id },
          data: {
            balance: { decrement: dto.amount },
            currentDailyUsage: { increment: dto.amount },
            currentMonthlyUsage: { increment: dto.amount },
          },
        });
 
        // Tạo gateway record
        await tx.gatewayTransaction.create({
          data: {
            userId, walletId: wallet.id,
            transactionId: transaction.id,
            type: 'credit',
            bankCode: linkedBank.bankCode,
            accountNumber: linkedBank.accountNumber,
            amount: dto.amount,
            status: 'pending',
          },
        });
 
        return { transaction, updatedWallet };
      });
 
      // Gọi gateway credit (async, không chờ)
      this.gateway.credit({
        bankCode: linkedBank.bankCode,
        accountNumber: linkedBank.accountNumber,
        amount: dto.amount,
        referenceId: result.transaction.id,
        callbackUrl: `${WALLET_CALLBACK_BASE}/api/v1/gateway/webhook`,
      }).catch((err) => {
        // Log lỗi, có thể cần retry queue ở production
        console.error(`Gateway credit failed for tx ${result.transaction.id}:`, err.message);
      });
 
      this.notificationsService.createUserNotification({
        userId, title: 'Rút tiền đang xử lý',
        message: `${dto.amount.toLocaleString('vi-VN')} VND đang được chuyển về ${linkedBank.bankCode}.`,
        type: 'info',
      }).catch(() => {});
 
      return {
        message: 'Rút tiền thành công. Tiền sẽ về tài khoản ngân hàng trong vài phút.',
        data: {
          transactionId: result.transaction.id,
          status: 'success',
          amount: dto.amount,
          bankCode: linkedBank.bankCode,
          wallet: { id: result.updatedWallet.id, balance: result.updatedWallet.balance },
        },
      };
    }
 
    // ── Instant withdraw (giữ nguyên) ────────────────────────────────
    const description = dto.description ?? `Rút tiền khỏi ví`;
    const result = await this.prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.create({
        data: { userId, walletId: wallet.id, type: 'withdraw', status: 'success', amount: dto.amount, fee: 0, currency: 'VND', description, completedAt: new Date() },
      });
      const updatedWallet = await tx.wallet.update({
        where: { id: wallet.id },
        data: { balance: { decrement: dto.amount }, currentDailyUsage: { increment: dto.amount }, currentMonthlyUsage: { increment: dto.amount } },
      });
      return { transaction, updatedWallet };
    });
 
    this.notificationsService.createUserNotification({
      userId, title: 'Rút tiền thành công',
      message: `Bạn đã rút ${dto.amount.toLocaleString('vi-VN')} VND khỏi ví.`,
      type: 'info',
    }).catch(() => {});
 
    return {
      message: 'Rút tiền thành công',
      data: {
        transactionId: result.transaction.id,
        status: 'success',
        amount: dto.amount,
        wallet: { id: result.updatedWallet.id, balance: result.updatedWallet.balance },
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


  async getTransactions(
    userId: string,
    page: number = 1,
    limit: number = 10,
    type?: string,
    search?: string,
  ) {
    const wallet = await this.getActiveWallet(userId);
    const skip = (page - 1) * limit;

    const where: any = { walletId: wallet.id };

    if (type && type !== 'all') {
      if (type === 'send') {
        where.type = 'transfer';
        where.fromWalletId = wallet.id;
      } else if (type === 'receive') {
        where.type = 'transfer';
        where.toWalletId = wallet.id;
      } else if (type === 'topup') {
        where.type = 'deposit';
      } else if (type === 'payment') {
        where.type = 'payment';
      } else if (type === 'withdraw') {   
        where.type = 'withdraw';
      }
    }

    if (search && search.trim()) {
      where.OR = [
        { description: { contains: search, mode: 'insensitive' } },
        { referenceCode: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [transactions, total] = await this.prisma.$transaction([
      this.prisma.transaction.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        // KHÔNG include fromWallet/toWallet vì không có relation
      }),
      this.prisma.transaction.count({ where }),
    ]);

    // Lấy danh sách các walletId liên quan (fromWalletId, toWalletId)
    const walletIds = new Set<string>();
    for (const tx of transactions) {
      if (tx.fromWalletId) walletIds.add(tx.fromWalletId);
      if (tx.toWalletId) walletIds.add(tx.toWalletId);
    }

    // Query một lần tất cả wallets để lấy accountNumber
    const wallets = await this.prisma.wallet.findMany({
      where: { id: { in: Array.from(walletIds) } },
      select: { id: true, accountNumber: true },
    });
    const walletMap = new Map(wallets.map(w => [w.id, w.accountNumber]));

    // Gắn accountNumber vào từng transaction
    const enriched = transactions.map(tx => ({
      ...tx,
      fromWalletAccountNumber: tx.fromWalletId ? walletMap.get(tx.fromWalletId) || null : null,
      toWalletAccountNumber: tx.toWalletId ? walletMap.get(tx.toWalletId) || null : null,
    }));

    return { data: enriched, total };
  }
}