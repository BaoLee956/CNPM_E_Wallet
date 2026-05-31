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
exports.WalletsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
let WalletsService = class WalletsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async topUp(userId, dto) {
        const wallet = await this.prisma.wallet.findFirst({
            where: { userId },
        });
        if (!wallet) {
            throw new common_1.NotFoundException('Không tìm thấy ví. Vui lòng liên hệ hỗ trợ.');
        }
        if (!wallet.isActive) {
            throw new common_1.ForbiddenException('Ví đã bị khóa. Không thể thực hiện giao dịch.');
        }
        const [transaction, updatedWallet] = await this.prisma.$transaction([
            this.prisma.transaction.create({
                data: {
                    userId,
                    walletId: wallet.id,
                    type: 'deposit',
                    amount: dto.amount,
                    fee: 0,
                    currency: 'VND',
                    status: 'success',
                    description: `Nạp tiền ${dto.amount.toLocaleString()} VND vào ví`,
                    completedAt: new Date(),
                },
            }),
            this.prisma.wallet.update({
                where: { id: wallet.id },
                data: { balance: { increment: dto.amount } },
            }),
        ]);
        return {
            message: 'Nạp tiền thành công',
            transaction: {
                id: transaction.id,
                type: transaction.type,
                amount: transaction.amount,
                status: transaction.status,
                createdAt: transaction.createdAt,
            },
            wallet: {
                id: updatedWallet.id,
                balance: updatedWallet.balance,
            },
        };
    }
};
exports.WalletsService = WalletsService;
exports.WalletsService = WalletsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WalletsService);
