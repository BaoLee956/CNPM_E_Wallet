import { Controller, Post, Body } from '@nestjs/common';

@Controller('api/v1/mock')
export class MockController {
  // Giả lập cổng thanh toán ngân hàng
  @Post('bank-gateway')
  bankGateway(@Body() body: any) {
    // Luôn trả về thành công để frontend/backend test mà không cần VNPay thật
    return {
      status: 'success',
      code: '00',
      message: 'Giao dịch thành công',
      data: {
        transactionId: `MOCK_${Date.now()}`,
        amount: body.amount || 0,
        bankCode: body.bankCode || 'MOCK_BANK',
        accountNumber: body.accountNumber || '****1234',
        timestamp: new Date().toISOString(),
      },
    };
  }
}