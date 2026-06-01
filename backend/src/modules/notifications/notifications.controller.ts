import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Param,
  Query,
  Request,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { NotificationsService } from './notifications.service';
import {
  CreateSystemNotificationDto,
  QueryNotificationsDto,
} from './dto/notifications.dto';

@Controller()
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('api/v1/customer/notifications')
  getMyNotifications(
    @Request() req: any,
    @Query() query: QueryNotificationsDto,
  ) {
    return this.notificationsService.getMyNotifications(req.user.id, query);
  }

  @Patch('api/v1/customer/notifications/read-all')
  markAllAsRead(@Request() req: any) {
    return this.notificationsService.markAllAsRead(req.user.id);
  }

  @Patch('api/v1/customer/notifications/:id/read')
  markAsRead(@Request() req: any, @Param('id') id: string) {
    return this.notificationsService.markAsRead(req.user.id, id);
  }

  @Post('api/v1/admin/notifications/system')
  createSystemNotification(
    @Request() req: any,
    @Body() dto: CreateSystemNotificationDto,
  ) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Only admin can create system notifications');
    }

    return this.notificationsService.createSystemNotification(dto);
  }
}