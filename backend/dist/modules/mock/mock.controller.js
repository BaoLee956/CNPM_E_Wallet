"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockController = void 0;
const common_1 = require("@nestjs/common");
let MockController = class MockController {
    // Giả lập cổng thanh toán ngân hàng
    bankGateway(body) {
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
};
exports.MockController = MockController;
__decorate([
    (0, common_1.Post)('bank-gateway'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MockController.prototype, "bankGateway", null);
exports.MockController = MockController = __decorate([
    (0, common_1.Controller)('api/v1/mock')
], MockController);
