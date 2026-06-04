import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayController } from './gateway.controller';
import { GatewayWebhookService } from './gateway-webhook.service';
import { PrismaService } from '../../prisma.service';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [NotificationsModule],
  controllers: [GatewayController],
  providers: [GatewayService, GatewayWebhookService, PrismaService],
  exports: [GatewayService],
})
export class GatewayModule {}