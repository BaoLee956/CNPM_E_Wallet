import { Controller, Get, Post, Patch, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import {
  TopUpDto,
  WithdrawDto,
  TransferDto,
  PaymentDto,
  UpdateWalletLimitsDto,
} from './dto/wallets.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('api/v1/wallets')
@UseGuards(JwtAuthGuard)
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get('me')
  getMyWallet(@Request() req: any) {
    return this.walletsService.getMyWallet(req.user.id);
  }

  // QUAN TRỌNG: route có :id phải đặt SAU route cụ thể (me/transactions)
  // để tránh NestJS match nhầm "transactions" vào :id
  @Get('me/transactions')
  async getTransactions(
    @Request() req: any,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('type') type?: string,
    @Query('search') search?: string,
  ) {
    const result = await this.walletsService.getTransactions(
      req.user.id,
      page ? +page : 1,
      limit ? +limit : 10,
      type,
      search,
    );
    return { message: 'Lấy danh sách giao dịch thành công', data: result.data, total: result.total };
  }

  @Get('lookup')
  lookupRecipient(
    @Request() req: any,
    @Query('accountNumber') accountNumber: string,
  ) {
    return this.walletsService.lookupRecipient(req.user.id, accountNumber);
  }

  @Get('me/transactions/:id')
  getTransaction(@Request() req: any, @Param('id') id: string) {
    return this.walletsService.getTransaction(req.user.id, id);
  }

  @Post('top-up')
  topUp(@Request() req: any, @Body() dto: TopUpDto) {
    return this.walletsService.topUp(req.user.id, dto);
  }

  @Post('withdraw')
  withdraw(@Request() req: any, @Body() dto: WithdrawDto) {
    return this.walletsService.withdraw(req.user.id, dto);
  }

  @Post('transfer')
  transfer(@Request() req: any, @Body() dto: TransferDto) {
    return this.walletsService.transfer(req.user.id, dto);
  }

  @Post('payment')
  payment(@Request() req: any, @Body() dto: PaymentDto) {
    return this.walletsService.payment(req.user.id, dto);
  }

  @Patch('limits')
  updateLimits(@Request() req: any, @Body() dto: UpdateWalletLimitsDto) {
    return this.walletsService.updateLimits(req.user.id, dto);
  }
}