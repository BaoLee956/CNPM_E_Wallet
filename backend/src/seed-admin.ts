require('dotenv/config');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const adminPhone = '0383572367';
  const adminEmail = 'admin@ewallet.com';
  const adminPassword = 'AdminPassword123';
  const adminName = 'System Administrator';

  console.log('Dang kiem tra tai khoan Admin...');

  const existingAdmin = await prisma.user.findUnique({
    where: { phoneNumber: adminPhone },
  });

  if (existingAdmin) {
    console.log('Tai khoan Admin da ton tai - bo qua.');
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
  console.log('TAO TAI KHOAN ADMIN THANH CONG!');
  console.log('- Ho ten   : ' + admin.name);
  console.log('- SDT      : ' + admin.phoneNumber);
  console.log('- Email    : ' + admin.email);
  console.log('- Mat khau: ' + adminPassword);
  console.log('--------------------------------------------------');
}

main()
  .catch((e) => {
    console.error('Loi khi chay seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
