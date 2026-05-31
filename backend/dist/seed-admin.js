"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./generated/prisma/client"); // Đường dẫn đến client của bạn
const bcrypt = __importStar(require("bcrypt"));
const adapter_pg_1 = require("@prisma/adapter-pg");
require("dotenv/config"); // Để load biến môi trường từ .env nếu có
// Khởi tạo Prisma Client kết nối tới DB
const adapter = new adapter_pg_1.PrismaPg({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/ewallet',
});
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    // THÔNG TIN ADMIN MUỐN TẠO (Bạn có thể sửa lại theo ý muốn)
    const adminPhone = '0383572367'; // Số điện thoại Admin
    const adminPassword = 'AdminPassword123'; // Mật khẩu Admin
    const adminName = 'System Administrator';
    console.log('Đang kiểm tra tài khoản Admin...');
    // 1. Kiểm tra xem tài khoản này đã tồn tại chưa
    const existingAdmin = await prisma.users.findUnique({
        where: { phone_number: adminPhone },
    });
    if (existingAdmin) {
        console.log('❌ Thất bại: Tài khoản Admin với số điện thoại này đã tồn tại trong Database!');
        return;
    }
    // 2. Băm mật khẩu bằng bcrypt
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    // 3. Tạo tài khoản Admin trong DB
    const admin = await prisma.users.create({
        data: {
            full_name: adminName,
            phone_number: adminPhone,
            password_hash: hashedPassword,
            role: 'Admin', // Gán quyền Admin
            kyc_status: 'Verified', // Admin mặc định đã xác minh KYC
            status: 'Active',
        },
    });
    console.log('--------------------------------------------------');
    console.log('🎉 TẠO TÀI KHOẢN ADMIN THÀNH CÔNG!');
    console.log(`- Họ tên: ${admin.full_name}`);
    console.log(`- SĐT (Tài khoản): ${admin.phone_number}`);
    console.log(`- Mật khẩu: ${adminPassword}`);
    console.log('--------------------------------------------------');
}
main()
    .catch((e) => {
    console.error('❌ Lỗi khi chạy seed:', e);
    process.exit(1);
})
    .finally(async () => {
    // Ngắt kết nối tới DB sau khi chạy xong
    await prisma.$disconnect();
});
