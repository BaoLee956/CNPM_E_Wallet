import { Controller, Post, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { TopUpDto } from './dto/wallets.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('api/v1/wallets')
@UseGuards(JwtAuthGuard) // Tất cả API trong controller này đều cần đăng nhập
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  // Nạp tiền (Customer tự nạp cho mình)
  @Post('top-up')
  topUp(@Request() req: any, @Body() dto: TopUpDto) {
    return this.walletsService.topUp(req.user.id, dto);
  }
}