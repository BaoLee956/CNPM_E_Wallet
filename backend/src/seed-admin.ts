require('dotenv/config');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const adminPhone = '0867674359';
  const adminEmail = 'admin@ewallet.com';
  const adminPassword = '123456';
  const adminName = 'Đức Thịnh';

  console.log('Dang dong bo tai khoan Admin...');

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const existingAdminProfile = await prisma.admin.findFirst({
    where: { deletedAt: null },
    include: { user: true },
  });

  let admin;

  if (existingAdminProfile?.user) {
    admin = await prisma.user.update({
      where: { id: existingAdminProfile.user.id },
      data: {
        name: adminName,
        phoneNumber: adminPhone,
        email: adminEmail,
        passwordHash,
        role: 'admin',
        deletedAt: null,
      },
    });

    await prisma.admin.update({
      where: { userId: admin.id },
      data: {
        role: 'super_admin',
        permissions: ['all'],
        deletedAt: null,
      },
    });

    console.log('Da cap nhat tai khoan Admin hien co.');
  } else {
    const existingUserByPhone = await prisma.user.findUnique({
      where: { phoneNumber: adminPhone },
    });

    if (existingUserByPhone) {
      admin = await prisma.user.update({
        where: { id: existingUserByPhone.id },
        data: {
          name: adminName,
          email: adminEmail,
          passwordHash,
          role: 'admin',
          deletedAt: null,
        },
      });
    } else {
      admin = await prisma.user.create({
        data: {
          name: adminName,
          phoneNumber: adminPhone,
          email: adminEmail,
          passwordHash,
          role: 'admin',
        },
      });
    }

    await prisma.admin.upsert({
      where: { userId: admin.id },
      update: {
        role: 'super_admin',
        permissions: ['all'],
        deletedAt: null,
      },
      create: {
        userId: admin.id,
        role: 'super_admin',
        permissions: ['all'],
      },
    });

    console.log('Da tao hoac dong bo tai khoan Admin.');
  }

  console.log('--------------------------------------------------');
  console.log('TAI KHOAN ADMIN SAN SANG!');
  console.log('- Ho ten   : ' + admin.name);
  console.log('- SDT      : ' + admin.phoneNumber);
  console.log('- Email    : ' + admin.email);
  console.log('- Mat khau : ' + adminPassword);
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
