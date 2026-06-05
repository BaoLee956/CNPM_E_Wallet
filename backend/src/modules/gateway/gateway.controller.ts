/**
 * backend/src/modules/gateway/gateway.controller.ts
 *
 * Nhận webhook từ Mock Gateway.
 * Gateway POST về đây sau khi xử lý debit/credit xong.
 *
 * POST /api/v1/gateway/webhook
 */

import { Controller, Post, Body, Headers, UnauthorizedException, Logger } from '@nestjs/common';
import { GatewayWebhookService } from './gateway-webhook.service';

interface WebhookPayload {
  event: 'debit.completed' | 'credit.completed';
  gatewayTransactionId: string;
  referenceId: string;   // Transaction ID bên E-Wallet
  bankCode: string;
  accountNumber: string;
  amount: number;
  status: 'success' | 'failed';
  completedAt: string;
}

@Controller('api/v1/gateway')
export class GatewayController {
  private readonly logger = new Logger(GatewayController.name);

  constructor(private readonly webhookService: GatewayWebhookService) {}

  @Post('webhook')
  async handleWebhook(
    @Body() payload: WebhookPayload,
    @Headers('x-gateway-source') source: string,
  ) {
    // Basic source check (production nên dùng HMAC signature)
    if (source !== 'mock-gateway') {
      throw new UnauthorizedException('Invalid webhook source');
    }

    this.logger.log(`Webhook received: ${payload.event} | ref=${payload.referenceId}`);

    if (payload.event === 'debit.completed') {
      await this.webhookService.handleDebitCompleted(payload);
    } else if (payload.event === 'credit.completed') {
      await this.webhookService.handleCreditCompleted(payload);
    }

    return { received: true };
  }
}