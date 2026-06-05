/**
 * backend/src/modules/gateway/gateway-webhook.service.ts
 *
 * Xử lý webhook từ Mock Gateway:
 *  - debit.completed  → cộng tiền vào ví (top-up hoàn tất)
 *  - credit.completed → confirm rút tiền đã vào TK ngân hàng
 */

import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { NotificationsService } from '../notifications/notifications.service';

interface WebhookPayload {
  event: 'debit.completed' | 'credit.completed';
  gatewayTransactionId: string;
  referenceId: string;
  bankCode: string;
  accountNumber: string;
  amount: number;
  status: 'success' | 'failed';
  completedAt: string;
}

@Injectable()
export class GatewayWebhookService {
  private readonly logger = new Logger(GatewayWebhookService.name);

  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService,
  ) {}

  // ─── debit.completed: tiền đã bị trừ khỏi TK ngân hàng ──────────────
  // → cộng vào ví + update transaction status → success
  async handleDebitCompleted(payload: WebhookPayload) {
    const { referenceId, gatewayTransactionId, amount, status } = payload;

    // Tìm gateway transaction record
    const gatewayTx = await this.prisma.gatewayTransaction.findUnique({
      where: { transactionId: referenceId },
    });

    if (!gatewayTx) {
      this.logger.warn(`GatewayTx not found for transactionId=${referenceId}`);
      return;
    }

    // Idempotency: đã xử lý rồi thì bỏ qua
    if (gatewayTx.status === 'success' || gatewayTx.status === 'failed') {
      this.logger.log(`Webhook already processed for ref=${referenceId}`);
      return;
    }

    if (status === 'success') {
      await this.prisma.$transaction(async (tx) => {
        // 1. Update transaction → success
        await tx.transaction.update({
          where: { id: referenceId },
          data: { status: 'success', completedAt: new Date(payload.completedAt) },
        });

        // 2. Cộng tiền vào ví
        await tx.wallet.update({
          where: { id: gatewayTx.walletId },
          data: { balance: { increment: amount } },
        });

        // 3. Update gateway transaction record
        await tx.gatewayTransaction.update({
          where: { transactionId: referenceId },
          data: {
            status: 'success',
            gatewayTxId: gatewayTransactionId,
            callbackReceivedAt: new Date(),
          },
        });
      });

      // Notify user
      this.notifications.createUserNotification({
        userId: gatewayTx.userId,
        title: 'Nạp tiền thành công',
        message: `${amount.toLocaleString('vi-VN')} VND đã được nạp vào ví từ tài khoản ${payload.bankCode}.`,
        type: 'success',
      }).catch(() => {});

      this.logger.log(`✅ Debit completed: +${amount} to wallet ${gatewayTx.walletId}`);
    } else {
      // Giao dịch thất bại
      await this.prisma.$transaction(async (tx) => {
        await tx.transaction.update({
          where: { id: referenceId },
          data: { status: 'failed', failureReason: 'Gateway reported failure' },
        });
        await tx.gatewayTransaction.update({
          where: { transactionId: referenceId },
          data: { status: 'failed', callbackReceivedAt: new Date() },
        });
      });

      this.notifications.createUserNotification({
        userId: gatewayTx.userId,
        title: 'Nạp tiền thất bại',
        message: `Giao dịch nạp ${amount.toLocaleString('vi-VN')} VND không thành công.`,
        type: 'error',
      }).catch(() => {});
    }
  }

  // ─── credit.completed: tiền đã được cộng vào TK ngân hàng ────────────
  // → transaction đã ở success từ lúc gọi gateway, chỉ cần update gatewayTx
  async handleCreditCompleted(payload: WebhookPayload) {
    const { referenceId, gatewayTransactionId, amount } = payload;

    const gatewayTx = await this.prisma.gatewayTransaction.findUnique({
      where: { transactionId: referenceId },
    });

    if (!gatewayTx || gatewayTx.status !== 'pending') return;

    await this.prisma.gatewayTransaction.update({
      where: { transactionId: referenceId },
      data: {
        status: 'success',
        gatewayTxId: gatewayTransactionId,
        callbackReceivedAt: new Date(),
      },
    });

    this.logger.log(`✅ Credit confirmed: ${amount} to ${payload.bankCode}/${payload.accountNumber}`);
  }
}