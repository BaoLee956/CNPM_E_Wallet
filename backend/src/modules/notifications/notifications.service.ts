import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import {
  CreateSystemNotificationDto,
  QueryNotificationsDto,
} from './dto/notifications.dto';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class NotificationsService {
  constructor(
    private prisma: PrismaService, 
    private notificationsGateway: NotificationsGateway,
  ) {}

  async createUserNotification(data: {
    userId: string;
    title: string;
    message: string;
    type?: 'info' | 'success' | 'warning' | 'error';
    link?: string;
    metadata?: any;
  }) {
    const notification = await this.prisma.notification.create({
      data: {
        userId: data.userId,
        title: data.title,
        message: data.message,
        type: data.type || 'info',
        link: data.link,
        metadata: data.metadata,
      },
    });

    this.notificationsGateway.emitNotificationToUser(data.userId, notification);

    return notification;
  }
  
  async getMyNotifications(userId: string, query: QueryNotificationsDto) {
    const { type, isRead, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where: any = { userId };

    if (type) {
      where.type = type;
    }

    if (isRead === 'true') {
      where.isRead = true;
    }

    if (isRead === 'false') {
      where.isRead = false;
    }

    const [notifications, total, unreadCount] = await Promise.all([
      this.prisma.notification.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          message: true,
          type: true,
          isRead: true,
          readAt: true,
          link: true,
          metadata: true,
          createdAt: true,
        },
      }),
      this.prisma.notification.count({ where }),
      this.prisma.notification.count({
        where: {
          userId,
          isRead: false,
        },
      }),
    ]);

    return {
      message: 'Get notifications successfully',
      data: notifications,
      unreadCount,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async markAsRead(userId: string, notificationId: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    if (notification.userId !== userId) {
      throw new ForbiddenException('You cannot access this notification');
    }

    const updatedNotification = await this.prisma.notification.update({
      where: { id: notificationId },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

    return {
      message: 'Mark notification as read successfully',
      data: updatedNotification,
    };
  }

  async markAllAsRead(userId: string) {
    const result = await this.prisma.notification.updateMany({
      where: {
        userId,
        isRead: false,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

    return {
      message: 'Mark all notifications as read successfully',
      updatedCount: result.count,
    };
  }

  async createSystemNotification(dto: CreateSystemNotificationDto) {
    const users = await this.prisma.user.findMany({
      where: {
        role: 'customer',
        deletedAt: null,
      },
      select: { id: true },
    });

    if (users.length === 0) {
      return {
        message: 'No customer found',
        createdCount: 0,
      };
    }

    const result = await this.prisma.notification.createMany({
      data: users.map((user) => ({
        userId: user.id,
        title: dto.title,
        message: dto.message,
        type: dto.type as any,
        link: dto.link,
        metadata: {
          category: 'system',
        },
      })),
    });

    return {
      message: 'Create system notifications successfully',
      createdCount: result.count,
    };
  }
}