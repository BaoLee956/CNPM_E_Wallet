import { Controller, Get, Put, Body, UseGuards, Request, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ChangePasswordDto, UpdateProfileDto, QueryCustomerTransactionsDto } from './dto/users.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('api/v1/customer')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /api/v1/customer/profile
  @Get('profile')
  getProfile(@Request() req: any) {
    return this.usersService.getProfile(req.user.id);
  }

  // PUT /api/v1/customer/profile
  @Put('profile')
  updateProfile(@Request() req: any, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile(req.user.id, dto);
  }

  // PUT /api/v1/customer/password
  @Put('password')
  changePassword(@Request() req: any, @Body() dto: ChangePasswordDto) {
    return this.usersService.changePassword(req.user.id, dto);
  }

  // GET /api/v1/customer/transactions
  @Get('transactions')
  getTransactions(
    @Request() req: any,
    @Query() query: QueryCustomerTransactionsDto,
  ) {
    return this.usersService.getTransactions(req.user.id, query);
  }
}