import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import "dotenv/config";

// Chỉ cần khởi tạo PrismaClient mặc định, nó sẽ tự đọc DATABASE_URL trong file .env
const prisma = new PrismaClient();

async function main() {
  const customerPhone = '0901234567';
  const customerEmail = 'customer@gmail.com';
  const customerPassword = 'Password123';
  const customerName = 'Khách Hàng Test';

  console.log('Đang kiểm tra tài khoản Customer...');

  const existingCustomer = await prisma.user.findUnique({
    where: { phoneNumber: customerPhone },
  });

  if (existingCustomer) {
    console.log('❌ Thất bại: Tài khoản Customer với SĐT này đã tồn tại!');
    return;
  }

  const passwordHash = await bcrypt.hash(customerPassword, 10);

  // Tạo User và tự động tạo luôn Ví (Wallet)
  const customer = await prisma.user.create({
    data: {
      name: customerName,
      phoneNumber: customerPhone,
      email: customerEmail,
      passwordHash,
      role: 'customer',
      wallets: { 
        create: {
          balance: 500000,
          currency: 'VND',
          accountNumber: customerPhone, 
        }
      }
    },
  });

  console.log('--------------------------------------------------');
  console.log('🎉 TẠO TÀI KHOẢN KHÁCH HÀNG THÀNH CÔNG!');
  console.log(`- Họ tên   : ${customer.name}`);
  console.log(`- SĐT      : ${customer.phoneNumber}`);
  console.log(`- Email    : ${customer.email}`);
  console.log(`- Mật khẩu: ${customerPassword}`);
  console.log('--------------------------------------------------');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi chạy seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });