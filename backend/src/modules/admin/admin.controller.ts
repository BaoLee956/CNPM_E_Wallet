import {
  Controller, Get, Put, Post, Param, Body,
  Query, UseGuards, Request, ForbiddenException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import {
  QueryUsersDto, UpdateUserStatusDto,
  QueryTransactionsDto, RefundDto, QueryStatisticsDto, ChangePasswordDto,
} from './dto/admin.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('api/v1/admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  private checkAdmin(req: any) {
    if (req.user.role !== 'admin') { // <-- chữ thường
      throw new ForbiddenException('Chỉ Admin mới có quyền truy cập');
    }
  }

  @Get('users')
  getUsers(@Request() req: any, @Query() query: QueryUsersDto) {
    this.checkAdmin(req);
    return this.adminService.getUsers(query);
  }

  @Get('users/:id')
  getUserDetail(@Request() req: any, @Param('id') id: string) {
    this.checkAdmin(req);
    return this.adminService.getUserDetail(id);
  }

  @Put('users/:id/status')
  updateUserStatus(@Request() req: any, @Param('id') id: string, @Body() dto: UpdateUserStatusDto) {
    this.checkAdmin(req);
    return this.adminService.updateUserStatus(id, req.user.id, dto);
  }

  @Get('transactions')
  getTransactions(@Request() req: any, @Query() query: QueryTransactionsDto) {
    this.checkAdmin(req);
    return this.adminService.getTransactions(query);
  }

  @Post('transactions/:id/resolve')
  resolveTransaction(@Request() req: any, @Param('id') id: string) {
    this.checkAdmin(req);
    return this.adminService.resolveTransaction(id, req.user.id);
  }

  @Post('transactions/:id/refund')
  refundTransaction(@Request() req: any, @Param('id') id: string, @Body() dto: RefundDto) {
    this.checkAdmin(req);
    return this.adminService.refundTransaction(id, req.user.id, dto);
  }

  @Get('reports/statistics')
  getStatistics(@Request() req: any, @Query() query: QueryStatisticsDto) {
    this.checkAdmin(req);
    return this.adminService.getStatistics(query);
  }

  @Put('change-password')
  changePassword(@Request() req: any, @Body() dto: ChangePasswordDto) {
    this.checkAdmin(req);
    return this.adminService.changePassword(req.user.id, dto);
  }
}