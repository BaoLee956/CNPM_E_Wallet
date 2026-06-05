/**
 * backend/src/modules/linked-banks/linked-banks.service.ts
 *
 * Quản lý tài khoản ngân hàng đã liên kết.
 * Flow liên kết: verify-account → send-otp → link (verify-otp + lưu DB)
 */

import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { GatewayService } from '../gateway/gateway.service';
import { LinkBankDto, SendOtpDto, VerifyAccountDto } from './dto/linked-banks.dto';

@Injectable()
export class LinkedBanksService {
  constructor(
    private prisma: PrismaService,
    private gateway: GatewayService,
  ) {}

  // ─── GET: Danh sách ngân hàng đã liên kết ──────────────────────────────
  async getLinkedBanks(userId: string) {
    const banks = await this.prisma.linkedBank.findMany({
      where: { userId, deletedAt: null },
      orderBy: [{ isDefault: 'desc' }, { linkedAt: 'asc' }],
    });
    return { message: 'Lấy danh sách ngân hàng thành công', data: banks };
  }

  // ─── STEP 1: Xác minh số tài khoản ────────────────────────────────────
  async verifyAccount(userId: string, dto: VerifyAccountDto) {
    // Kiểm tra đã liên kết chưa
    const existing = await this.prisma.linkedBank.findFirst({
      where: {
        userId,
        bankCode: dto.bankCode,
        accountNumber: dto.accountNumber,
        deletedAt: null,
      },
    });
    if (existing) {
      throw new ConflictException('Tài khoản ngân hàng này đã được liên kết');
    }

    // Gọi gateway verify
    const result = await this.gateway.verifyAccount(dto.bankCode, dto.accountNumber);
    return {
      message: 'Xác minh tài khoản thành công',
      data: result,
    };
  }

  // ─── STEP 2: Gửi OTP ──────────────────────────────────────────────────
  async sendOtp(userId: string, dto: SendOtpDto) {
    const result = await this.gateway.sendOtp(dto.bankCode, dto.accountNumber);
    return {
      message: 'OTP đã được gửi',
      data: result, // { maskedPhone }
    };
  }

  // ─── STEP 3: Xác minh OTP + Liên kết ngân hàng ────────────────────────
  async linkBank(userId: string, dto: LinkBankDto) {
    // 1. Verify OTP qua gateway
    await this.gateway.verifyOtp(dto.bankCode, dto.accountNumber, dto.otp);

    // 2. Kiểm tra duplicate lần cuối (race condition)
    const existing = await this.prisma.linkedBank.findFirst({
      where: {
        userId,
        bankCode: dto.bankCode,
        accountNumber: dto.accountNumber,
        deletedAt: null,
      },
    });
    if (existing) {
      throw new ConflictException('Tài khoản ngân hàng này đã được liên kết');
    }

    // 3. Nếu chưa có ngân hàng nào → set làm default
    const existingCount = await this.prisma.linkedBank.count({
      where: { userId, deletedAt: null },
    });
    const isDefault = existingCount === 0;

    // 4. Lưu vào DB
    const linkedBank = await this.prisma.linkedBank.create({
      data: {
        userId,
        bankCode: dto.bankCode,
        accountNumber: dto.accountNumber,
        accountName: dto.accountName,
        isDefault,
        isVerified: true,
      },
    });

    return {
      message: 'Liên kết ngân hàng thành công',
      data: linkedBank,
    };
  }

  // ─── Đặt làm mặc định ─────────────────────────────────────────────────
  async setDefault(userId: string, bankId: string) {
    const bank = await this.prisma.linkedBank.findFirst({
      where: { id: bankId, userId, deletedAt: null },
    });
    if (!bank) throw new NotFoundException('Không tìm thấy ngân hàng liên kết');

    // Dùng transaction để atomic update
    await this.prisma.$transaction([
      // Bỏ default tất cả
      this.prisma.linkedBank.updateMany({
        where: { userId, deletedAt: null },
        data: { isDefault: false },
      }),
      // Set default cho bank được chọn
      this.prisma.linkedBank.update({
        where: { id: bankId },
        data: { isDefault: true },
      }),
    ]);

    return { message: 'Đặt ngân hàng mặc định thành công' };
  }

  // ─── Bỏ liên kết (soft delete) ────────────────────────────────────────
  async unlinkBank(userId: string, bankId: string) {
    const bank = await this.prisma.linkedBank.findFirst({
      where: { id: bankId, userId, deletedAt: null },
    });
    if (!bank) throw new NotFoundException('Không tìm thấy ngân hàng liên kết');

    await this.prisma.linkedBank.update({
      where: { id: bankId },
      data: { deletedAt: new Date(), isDefault: false },
    });

    // Nếu xoá ngân hàng default → tự động set ngân hàng đầu tiên còn lại làm default
    if (bank.isDefault) {
      const next = await this.prisma.linkedBank.findFirst({
        where: { userId, deletedAt: null },
        orderBy: { linkedAt: 'asc' },
      });
      if (next) {
        await this.prisma.linkedBank.update({
          where: { id: next.id },
          data: { isDefault: true },
        });
      }
    }

    return { message: 'Đã bỏ liên kết ngân hàng' };
  }

  // ─── Helper: lấy linked bank theo ID (dùng cho wallet service) ─────────
  async getLinkedBankById(userId: string, linkedBankId: string) {
    const bank = await this.prisma.linkedBank.findFirst({
      where: { id: linkedBankId, userId, deletedAt: null },
    });
    if (!bank) throw new NotFoundException('Không tìm thấy ngân hàng liên kết');
    return bank;
  }
}