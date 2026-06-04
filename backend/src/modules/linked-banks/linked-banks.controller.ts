/**
 * backend/src/modules/linked-banks/linked-banks.controller.ts
 *
 * REST API cho quản lý ngân hàng liên kết.
 *
 * GET    /api/v1/linked-banks            — danh sách
 * POST   /api/v1/linked-banks/verify     — step 1: verify STK
 * POST   /api/v1/linked-banks/send-otp   — step 2: gửi OTP
 * POST   /api/v1/linked-banks            — step 3: liên kết (verify OTP + lưu)
 * PATCH  /api/v1/linked-banks/:id/default — đặt mặc định
 * DELETE /api/v1/linked-banks/:id        — bỏ liên kết
 */

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LinkedBanksService } from './linked-banks.service';
import { LinkBankDto, SendOtpDto, VerifyAccountDto } from './dto/linked-banks.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('api/v1/linked-banks')
@UseGuards(JwtAuthGuard)
export class LinkedBanksController {
  constructor(private readonly linkedBanksService: LinkedBanksService) {}

  @Get()
  getLinkedBanks(@Request() req: any) {
    return this.linkedBanksService.getLinkedBanks(req.user.id);
  }

  @Post('verify')
  verifyAccount(@Request() req: any, @Body() dto: VerifyAccountDto) {
    return this.linkedBanksService.verifyAccount(req.user.id, dto);
  }

  @Post('send-otp')
  sendOtp(@Request() req: any, @Body() dto: SendOtpDto) {
    return this.linkedBanksService.sendOtp(req.user.id, dto);
  }

  @Post()
  linkBank(@Request() req: any, @Body() dto: LinkBankDto) {
    return this.linkedBanksService.linkBank(req.user.id, dto);
  }

  @Patch(':id/default')
  setDefault(@Request() req: any, @Param('id') id: string) {
    return this.linkedBanksService.setDefault(req.user.id, id);
  }

  @Delete(':id')
  unlinkBank(@Request() req: any, @Param('id') id: string) {
    return this.linkedBanksService.unlinkBank(req.user.id, id);
  }
}