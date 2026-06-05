import { Module } from '@nestjs/common';
import { LinkedBanksController } from './linked-banks.controller';
import { LinkedBanksService } from './linked-banks.service';
import { PrismaService } from '../../prisma.service';
import { GatewayModule } from '../gateway/gateway.module';

@Module({
  imports: [GatewayModule],
  controllers: [LinkedBanksController],
  providers: [LinkedBanksService, PrismaService],
  exports: [LinkedBanksService],
})
export class LinkedBanksModule {}