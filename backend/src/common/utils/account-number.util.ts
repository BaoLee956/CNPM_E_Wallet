import { PrismaService } from '../../prisma.service';

type AccountNumberClient = Pick<PrismaService, 'wallet'>;

/**
 * Sinh số tài khoản duy nhất cho ví.
 * Format: 890 + 9 chữ số ngẫu nhiên (tổng 12 số)
 * Nếu trùng, thử lại tối đa 5 lần, sau đó fallback dùng timestamp.
 */
export async function generateUniqueAccountNumber(prisma: AccountNumberClient): Promise<string> {
  const prefix = '890';
  const maxAttempts = 5;
  let attempts = 0;

  while (attempts < maxAttempts) {
    const randomPart = Math.floor(Math.random() * 1_000_000_000)
      .toString()
      .padStart(9, '0');
    const accountNumber = prefix + randomPart;

    const existing = await prisma.wallet.findUnique({
      where: { accountNumber },
      select: { id: true }, // chỉ cần kiểm tra tồn tại
    });

    if (!existing) {
      return accountNumber;
    }
    attempts++;
  }

  // Fallback: dùng timestamp (milliseconds) lấy 9 số cuối
  const timestampPart = Date.now().toString().slice(-9);
  const fallbackNumber = prefix + timestampPart;

  // Kiểm tra lần cuối, nếu vẫn trùng thì throw lỗi (rất hiếm)
  const existingFallback = await prisma.wallet.findUnique({
    where: { accountNumber: fallbackNumber },
  });
  if (existingFallback) {
    throw new Error('Không thể sinh accountNumber duy nhất sau nhiều lần thử');
  }
  return fallbackNumber;
}
