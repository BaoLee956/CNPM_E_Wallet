import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:Hungbao2005@localhost:5432/postgres',
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const adminPhone = '0383572367';
  const adminEmail = 'admin@ewallet.com';
  const adminPassword = 'AdminPassword123';
  const adminName = 'System Administrator';

  console.log('Đang kiểm tra tài khoản Admin...');

  const existingAdmin = await prisma.user.findUnique({
    where: { phoneNumber: adminPhone },
  });

  if (existingAdmin) {
    console.log('❌ Thất bại: Tài khoản Admin với số điện thoại này đã tồn tại!');
    return;
  }

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.create({
    data: {
      name: adminName,
      phoneNumber: adminPhone,
      email: adminEmail,
      passwordHash,
      role: 'admin',
    },
  });

  await prisma.admin.create({
    data: {
      userId: admin.id,
      role: 'super_admin',
      permissions: ['all'],
    },
  });

  console.log('--------------------------------------------------');
  console.log('🎉 TẠO TÀI KHOẢN ADMIN THÀNH CÔNG!');
  console.log(`- Họ tên   : ${admin.name}`);
  console.log(`- SĐT      : ${admin.phoneNumber}`);
  console.log(`- Email    : ${admin.email}`);
  console.log(`- Mật khẩu: ${adminPassword}`);
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