import { Module } from '@nestjs/common';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';
import { PrismaService } from '../../prisma.service';
import { NotificationsModule } from '../notifications/notifications.module'; 

@Module({
  imports: [NotificationsModule],
  controllers: [WalletsController],
  providers: [WalletsService, PrismaService],
})
export class WalletsModule {}