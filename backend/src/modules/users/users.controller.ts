import { Controller, Get, Put, Body, UseGuards, Request, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ChangePasswordDto, QueryCustomerTransactionsDto } from './dto/users.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('api/v1/customer')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  getProfile(@Request() req: any) {
    return this.usersService.getProfile(req.user.id);
  }

  @Put('password')
  changePassword(@Request() req: any, @Body() dto: ChangePasswordDto) {
    return this.usersService.changePassword(req.user.id, dto);
  }

  @Get('transactions')
  getTransactions(
  @Request() req: any,
  @Query() query: QueryCustomerTransactionsDto,
  ) {
    return this.usersService.getTransactions(req.user.id, query);
  }
}