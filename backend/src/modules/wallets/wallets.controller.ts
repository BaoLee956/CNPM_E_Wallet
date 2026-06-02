import { Controller, Get, Post, Patch, Body, UseGuards, Request } from '@nestjs/common';
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

  // GET /api/v1/wallets/me
  @Get('me')
  getMyWallet(@Request() req: any) {
    return this.walletsService.getMyWallet(req.user.id);
  }

  // POST /api/v1/wallets/top-up
  @Post('top-up')
  topUp(@Request() req: any, @Body() dto: TopUpDto) {
    return this.walletsService.topUp(req.user.id, dto);
  }

  // POST /api/v1/wallets/withdraw
  @Post('withdraw')
  withdraw(@Request() req: any, @Body() dto: WithdrawDto) {
    return this.walletsService.withdraw(req.user.id, dto);
  }

  // POST /api/v1/wallets/transfer
  @Post('transfer')
  transfer(@Request() req: any, @Body() dto: TransferDto) {
    return this.walletsService.transfer(req.user.id, dto);
  }

  // POST /api/v1/wallets/payment
  @Post('payment')
  payment(@Request() req: any, @Body() dto: PaymentDto) {
    return this.walletsService.payment(req.user.id, dto);
  }

  // PATCH /api/v1/wallets/limits
  @Patch('limits')
  updateLimits(@Request() req: any, @Body() dto: UpdateWalletLimitsDto) {
    return this.walletsService.updateLimits(req.user.id, dto);
  }
}