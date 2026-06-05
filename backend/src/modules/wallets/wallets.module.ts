import { Module } from '@nestjs/common';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';
import { PrismaService } from '../../prisma.service';
import { NotificationsModule } from '../notifications/notifications.module';
import { GatewayModule } from '../gateway/gateway.module';
import { LinkedBanksModule } from '../linked-banks/linked-banks.module';

@Module({
  imports: [NotificationsModule, GatewayModule, LinkedBanksModule],
  controllers: [WalletsController],
  providers: [WalletsService, PrismaService],
})
export class WalletsModule {}