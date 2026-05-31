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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefundDto = exports.QueryTransactionsDto = exports.UpdateUserStatusDto = exports.QueryUsersDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
// DTO cho query tìm kiếm danh sách Users
class QueryUsersDto {
    search;
    page = 1;
    limit = 10;
}
exports.QueryUsersDto = QueryUsersDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryUsersDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], QueryUsersDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], QueryUsersDto.prototype, "limit", void 0);
// DTO cho cập nhật trạng thái User (dùng action thay vì status)
class UpdateUserStatusDto {
    action;
    reason;
}
exports.UpdateUserStatusDto = UpdateUserStatusDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(['lock', 'unlock'], { message: 'action phải là lock hoặc unlock' }),
    __metadata("design:type", String)
], UpdateUserStatusDto.prototype, "action", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Lý do không được để trống' }),
    __metadata("design:type", String)
], UpdateUserStatusDto.prototype, "reason", void 0);
// DTO cho query danh sách Transactions
class QueryTransactionsDto {
    status;
    type;
    page = 1;
    limit = 10;
}
exports.QueryTransactionsDto = QueryTransactionsDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['pending', 'success', 'failed', 'cancelled', ''], {
        message: 'Trạng thái không hợp lệ',
    }),
    __metadata("design:type", String)
], QueryTransactionsDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['deposit', 'withdraw', 'transfer', 'payment', 'refund', ''], {
        message: 'Loại giao dịch không hợp lệ',
    }),
    __metadata("design:type", String)
], QueryTransactionsDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], QueryTransactionsDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], QueryTransactionsDto.prototype, "limit", void 0);
// DTO cho Refund
class RefundDto {
    reason;
}
exports.RefundDto = RefundDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Lý do hoàn tiền không được để trống' }),
    __metadata("design:type", String)
], RefundDto.prototype, "reason", void 0);
