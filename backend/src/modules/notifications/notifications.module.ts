import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { PrismaService } from '../../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { NotificationsGateway } from './notifications.gateway';

@Module({
    imports: [JwtModule.register({
        secret: process.env.JWT_SECRET || 'default_secret',
        signOptions: { expiresIn: '7d' },
    }),],
  controllers: [NotificationsController],
  providers: [NotificationsService, PrismaService, NotificationsGateway],
  exports: [NotificationsService, NotificationsGateway],
})
export class NotificationsModule {}