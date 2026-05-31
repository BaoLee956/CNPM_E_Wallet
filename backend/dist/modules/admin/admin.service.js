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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
let AdminService = class AdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    // 1. TRA CỨU DANH SÁCH CUSTOMER
    async getUsers(query) {
        const { search, page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;
        const where = { role: 'customer' };
        if (search) {
            where.OR = [
                { phoneNumber: { contains: search } },
                { name: { contains: search, mode: 'insensitive' } },
            ];
        }
        const [users, total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    name: true,
                    phoneNumber: true,
                    email: true,
                    role: true,
                    deletedAt: true,
                    createdAt: true,
                    wallets: {
                        select: { isActive: true, balance: true },
                    },
                },
            }),
            this.prisma.user.count({ where }),
        ]);
        return {
            message: 'Lấy danh sách thành công',
            data: users,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    // 2. KHÓA / MỞ KHÓA TÀI KHOẢN
    async updateUserStatus(userId, dto) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user)
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        if (user.role === 'admin') {
            throw new common_1.BadRequestException('Không thể thay đổi trạng thái tài khoản Admin');
        }
        // dto.action = 'lock' hoặc 'unlock'
        const isLocking = dto.action === 'lock';
        // Cập nhật user: dùng deletedAt để đánh dấu bị khóa
        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: { deletedAt: isLocking ? new Date() : null },
        });
        // Cập nhật ví tương ứng
        await this.prisma.wallet.updateMany({
            where: { userId: userId },
            data: { isActive: !isLocking },
        });
        return {
            message: isLocking ? 'Khóa tài khoản thành công' : 'Mở khóa tài khoản thành công',
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
                phoneNumber: updatedUser.phoneNumber,
                isLocked: !!updatedUser.deletedAt,
                reason: dto.reason,
            },
        };
    }
    // 3. TRA SOÁT DANH SÁCH GIAO DỊCH
    async getTransactions(query) {
        const { status, type, page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;
        const where = {};
        if (status)
            where.status = status;
        if (type)
            where.type = type;
        const [transactions, total] = await Promise.all([
            this.prisma.transaction.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: { select: { name: true, phoneNumber: true } },
                    wallet: { select: { accountNumber: true } },
                },
            }),
            this.prisma.transaction.count({ where }),
        ]);
        return {
            message: 'Lấy danh sách giao dịch thành công',
            data: transactions,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    // 4. HOÀN TIỀN (REFUND)
    async refundTransaction(transactionId, adminId, dto) {
        const originalTx = await this.prisma.transaction.findUnique({
            where: { id: transactionId },
        });
        if (!originalTx)
            throw new common_1.NotFoundException('Không tìm thấy giao dịch');
        if (originalTx.status !== 'success') {
            throw new common_1.BadRequestException(`Chỉ hoàn tiền được giao dịch đã thành công. Trạng thái hiện tại: ${originalTx.status}`);
        }
        const refundAmount = originalTx.amount + (originalTx.fee || 0);
        const [refundTx, , updatedWallet] = await this.prisma.$transaction([
            // Tạo giao dịch hoàn tiền mới
            this.prisma.transaction.create({
                data: {
                    userId: originalTx.userId,
                    walletId: originalTx.walletId,
                    type: 'refund',
                    amount: refundAmount,
                    fee: 0,
                    currency: originalTx.currency,
                    status: 'success',
                    description: `Hoàn tiền cho giao dịch ${originalTx.id}. Lý do: ${dto.reason}`,
                    referenceId: originalTx.id,
                    completedAt: new Date(),
                },
            }),
            // Đánh dấu giao dịch gốc là đã refund
            this.prisma.transaction.update({
                where: { id: transactionId },
                data: {
                    status: 'failed',
                    failureReason: `Hoàn tiền bởi Admin (${adminId}). Lý do: ${dto.reason}`,
                },
            }),
            // Cộng tiền lại vào ví
            this.prisma.wallet.update({
                where: { id: originalTx.walletId },
                data: { balance: { increment: refundAmount } },
            }),
        ]);
        return {
            message: 'Hoàn tiền thành công',
            refundTransaction: {
                id: refundTx.id,
                amount: refundTx.amount,
                status: refundTx.status,
            },
            wallet: {
                id: updatedWallet.id,
                newBalance: updatedWallet.balance,
            },
        };
    }
    // 5. BÁO CÁO THỐNG KÊ
    async getStatistics() {
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const [totalUsers, newUsersToday, newUsersThisMonth, totalTransactions, transactionsToday, revenueResult, revenueTodayResult, pendingTransactions,] = await Promise.all([
            this.prisma.user.count({ where: { role: 'customer' } }),
            this.prisma.user.count({ where: { role: 'customer', createdAt: { gte: startOfToday } } }),
            this.prisma.user.count({ where: { role: 'customer', createdAt: { gte: startOfMonth } } }),
            this.prisma.transaction.count(),
            this.prisma.transaction.count({ where: { createdAt: { gte: startOfToday } } }),
            this.prisma.transaction.aggregate({
                _sum: { amount: true, fee: true },
                where: { status: 'success' },
            }),
            this.prisma.transaction.aggregate({
                _sum: { amount: true, fee: true },
                where: { status: 'success', createdAt: { gte: startOfToday } },
            }),
            this.prisma.transaction.count({ where: { status: 'pending' } }),
        ]);
        return {
            message: 'Lấy thống kê thành công',
            data: {
                users: {
                    total: totalUsers,
                    newToday: newUsersToday,
                    newThisMonth: newUsersThisMonth,
                },
                transactions: {
                    total: totalTransactions,
                    today: transactionsToday,
                    pending: pendingTransactions,
                },
                revenue: {
                    totalAmount: revenueResult._sum.amount || 0,
                    totalFee: revenueResult._sum.fee || 0,
                    todayAmount: revenueTodayResult._sum.amount || 0,
                    todayFee: revenueTodayResult._sum.fee || 0,
                },
            },
        };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
