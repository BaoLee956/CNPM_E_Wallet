import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { WalletsModule } from './modules/wallets/wallets.module';
import { AdminModule } from './modules/admin/admin.module';
import { MockModule } from './modules/mock/mock.module';
import { UsersModule } from './modules/users/users.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    WalletsModule,
    AdminModule,
    MockModule,
    UsersModule,
    NotificationsModule,
  ], // Sau này AuthModule sẽ được import vào đây
})
export class AppModule {}