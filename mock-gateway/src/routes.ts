/**
 * routes.ts
 * Tất cả endpoints của Mock Gateway.
 *
 * ENDPOINTS:
 *  POST /gateway/verify-account   — xác minh STK + tên chủ TK
 *  POST /gateway/send-otp         — gửi OTP (mock: luôn 123456)
 *  POST /gateway/verify-otp       — xác minh OTP khi liên kết ngân hàng
 *  POST /gateway/debit            — trừ tiền TK ngân hàng (nạp tiền vào ví)
 *  POST /gateway/credit           — cộng tiền TK ngân hàng (rút tiền từ ví)
 *  GET  /gateway/transaction/:id  — kiểm tra trạng thái giao dịch
 *  GET  /gateway/account-balance  — xem số dư TK (debug)
 */

import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import {
  readDB, writeDB,
  findAccount, updateAccount, addTransaction, updateTransaction,
  GatewayTransaction,
} from './database';

const router = Router();

// ─── Webhook delivery (async, fire & forget) ──────────────────────────────────
/**
 * Sau `delayMs` ms, POST webhook về callbackUrl với payload.
 * Retry 1 lần nếu fail.
 */
async function deliverWebhook(
  gatewayTxId: string,
  callbackUrl: string,
  payload: object,
  delayMs = 2000
): Promise<void> {
  await new Promise((r) => setTimeout(r, delayMs));

  const db = readDB();
  try {
    await axios.post(callbackUrl, payload, {
      timeout: 5000,
      headers: { 'Content-Type': 'application/json', 'X-Gateway-Source': 'mock-gateway' },
    });
    updateTransaction(db, gatewayTxId, {
      callbackSentAt: new Date().toISOString(),
      callbackStatus: 'sent',
    });
    console.log(`[Webhook] ✅ Delivered to ${callbackUrl}`);
  } catch (err: any) {
    // Retry once after 3s
    await new Promise((r) => setTimeout(r, 3000));
    try {
      await axios.post(callbackUrl, payload, { timeout: 5000 });
      updateTransaction(db, gatewayTxId, { callbackSentAt: new Date().toISOString(), callbackStatus: 'sent' });
      console.log(`[Webhook] ✅ Delivered on retry to ${callbackUrl}`);
    } catch {
      updateTransaction(db, gatewayTxId, { callbackStatus: 'failed' });
      console.error(`[Webhook] ❌ Failed to deliver to ${callbackUrl}`);
    }
  }
  writeDB(db);
}

// ─── POST /gateway/verify-account ────────────────────────────────────────────
router.post('/verify-account', (req: Request, res: Response) => {
  const { bankCode, accountNumber } = req.body as { bankCode: string; accountNumber: string };

  if (!bankCode || !accountNumber) {
    return res.status(400).json({ success: false, error: 'bankCode và accountNumber là bắt buộc' });
  }

  const db = readDB();
  const account = findAccount(db, bankCode, accountNumber);

  if (!account) {
    return res.status(404).json({ success: false, error: 'Không tìm thấy tài khoản ngân hàng này' });
  }

  return res.json({
    success: true,
    data: {
      bankCode: account.bankCode,
      accountNumber: account.accountNumber,
      accountName: account.accountName,
    },
  });
});

// ─── POST /gateway/send-otp ───────────────────────────────────────────────────
router.post('/send-otp', (req: Request, res: Response) => {
  const { bankCode, accountNumber } = req.body as { bankCode: string; accountNumber: string };

  if (!bankCode || !accountNumber) {
    return res.status(400).json({ success: false, error: 'Thiếu thông tin' });
  }

  const db = readDB();
  const account = findAccount(db, bankCode, accountNumber);

  if (!account) {
    return res.status(404).json({ success: false, error: 'Tài khoản không tồn tại' });
  }

  // Xoá OTP cũ, tạo OTP mới
  db.otpRecords = db.otpRecords.filter(
    (o) => !(o.bankCode === bankCode && o.accountNumber === accountNumber)
  );
  db.otpRecords.push({
    bankCode,
    accountNumber,
    code: '123456',   // mock: luôn là 123456
    expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 phút
    used: false,
  });
  writeDB(db);

  console.log(`[OTP] Sent 123456 to ${account.maskedPhone} for ${bankCode}/${accountNumber}`);

  return res.json({
    success: true,
    data: { maskedPhone: account.maskedPhone },
  });
});

// ─── POST /gateway/verify-otp ────────────────────────────────────────────────
router.post('/verify-otp', (req: Request, res: Response) => {
  const { bankCode, accountNumber, otp } = req.body as {
    bankCode: string; accountNumber: string; otp: string;
  };

  const db = readDB();
  const record = db.otpRecords.find(
    (o) => o.bankCode === bankCode && o.accountNumber === accountNumber
  );

  if (!record) {
    return res.status(400).json({ success: false, error: 'Chưa gửi OTP cho tài khoản này' });
  }
  if (record.used) {
    return res.status(400).json({ success: false, error: 'OTP đã được sử dụng' });
  }
  if (new Date(record.expiresAt) < new Date()) {
    return res.status(400).json({ success: false, error: 'OTP đã hết hạn' });
  }
  if (record.code !== otp) {
    return res.status(400).json({ success: false, error: 'Mã OTP không đúng' });
  }

  // Mark OTP as used
  record.used = true;
  writeDB(db);

  return res.json({ success: true, data: { verified: true } });
});

// ─── POST /gateway/debit ─────────────────────────────────────────────────────
// Trừ tiền TK ngân hàng → nạp vào ví (top-up flow)
router.post('/debit', (req: Request, res: Response) => {
  const { bankCode, accountNumber, amount, referenceId, callbackUrl } = req.body as {
    bankCode: string;
    accountNumber: string;
    amount: number;
    referenceId: string;   // Transaction ID bên E-Wallet
    callbackUrl: string;
  };

  if (!bankCode || !accountNumber || !amount || !referenceId || !callbackUrl) {
    return res.status(400).json({ success: false, error: 'Thiếu thông tin bắt buộc' });
  }
  if (amount <= 0) {
    return res.status(400).json({ success: false, error: 'Số tiền không hợp lệ' });
  }

  const db = readDB();
  const account = findAccount(db, bankCode, accountNumber);

  if (!account) {
    return res.status(404).json({ success: false, error: 'Tài khoản không tồn tại' });
  }
  if (account.balance < amount) {
    return res.status(400).json({
      success: false,
      error: `Số dư tài khoản ngân hàng không đủ. Hiện có: ${account.balance.toLocaleString('vi-VN')} VND`,
    });
  }

  // Tạo gateway transaction ở trạng thái pending
  const gatewayTxId = uuidv4();
  const gatewayTx: GatewayTransaction = {
    id: gatewayTxId,
    type: 'debit',
    bankCode,
    accountNumber,
    amount,
    status: 'pending',
    referenceId,
    callbackUrl,
    createdAt: new Date().toISOString(),
  };

  addTransaction(db, gatewayTx);

  // Trừ tiền ngay (simulate hold)
  updateAccount(db, account.id, { balance: account.balance - amount });
  writeDB(db);

  console.log(`[Debit] ${amount.toLocaleString()} VND from ${bankCode}/${accountNumber}, refId=${referenceId}`);

  // Async: cập nhật completed + gửi webhook sau 2s
  setTimeout(async () => {
    const db2 = readDB();
    updateTransaction(db2, gatewayTxId, {
      status: 'success',
      completedAt: new Date().toISOString(),
    });
    writeDB(db2);

    // Gửi webhook về E-Wallet
    deliverWebhook(gatewayTxId, callbackUrl, {
      event: 'debit.completed',
      gatewayTransactionId: gatewayTxId,
      referenceId,
      bankCode,
      accountNumber,
      amount,
      status: 'success',
      completedAt: new Date().toISOString(),
    });
  }, 0);

  return res.json({
    success: true,
    data: {
      gatewayTransactionId: gatewayTxId,
      status: 'pending',
      message: 'Giao dịch đang xử lý, kết quả sẽ được gửi qua webhook',
    },
  });
});

// ─── POST /gateway/credit ─────────────────────────────────────────────────────
// Cộng tiền vào TK ngân hàng → rút từ ví (withdraw flow)
router.post('/credit', (req: Request, res: Response) => {
  const { bankCode, accountNumber, amount, referenceId, callbackUrl } = req.body as {
    bankCode: string;
    accountNumber: string;
    amount: number;
    referenceId: string;
    callbackUrl: string;
  };

  if (!bankCode || !accountNumber || !amount || !referenceId || !callbackUrl) {
    return res.status(400).json({ success: false, error: 'Thiếu thông tin bắt buộc' });
  }

  const db = readDB();
  const account = findAccount(db, bankCode, accountNumber);

  if (!account) {
    return res.status(404).json({ success: false, error: 'Tài khoản không tồn tại' });
  }

  const gatewayTxId = uuidv4();
  const gatewayTx: GatewayTransaction = {
    id: gatewayTxId,
    type: 'credit',
    bankCode,
    accountNumber,
    amount,
    status: 'pending',
    referenceId,
    callbackUrl,
    createdAt: new Date().toISOString(),
  };

  addTransaction(db, gatewayTx);
  writeDB(db);

  console.log(`[Credit] ${amount.toLocaleString()} VND to ${bankCode}/${accountNumber}, refId=${referenceId}`);

  setTimeout(async () => {
    const db2 = readDB();
    // Cộng tiền sau khi "xử lý"
    const acc = findAccount(db2, bankCode, accountNumber);
    if (acc) {
      updateAccount(db2, acc.id, { balance: acc.balance + amount });
    }
    updateTransaction(db2, gatewayTxId, {
      status: 'success',
      completedAt: new Date().toISOString(),
    });
    writeDB(db2);

    deliverWebhook(gatewayTxId, callbackUrl, {
      event: 'credit.completed',
      gatewayTransactionId: gatewayTxId,
      referenceId,
      bankCode,
      accountNumber,
      amount,
      status: 'success',
      completedAt: new Date().toISOString(),
    });
  }, 0);

  return res.json({
    success: true,
    data: {
      gatewayTransactionId: gatewayTxId,
      status: 'pending',
      message: 'Giao dịch đang xử lý, kết quả sẽ được gửi qua webhook',
    },
  });
});

// ─── GET /gateway/transaction/:id ────────────────────────────────────────────
router.get('/transaction/:id', (req: Request, res: Response) => {
  const db = readDB();
  const tx = db.transactions.find((t) => t.id === req.params.id);
  if (!tx) {
    return res.status(404).json({ success: false, error: 'Không tìm thấy giao dịch' });
  }
  return res.json({ success: true, data: tx });
});

// ─── GET /gateway/account-balance ────────────────────────────────────────────
// Debug endpoint: kiểm tra số dư TK
router.get('/account-balance', (req: Request, res: Response) => {
  const { bankCode, accountNumber } = req.query as { bankCode: string; accountNumber: string };
  const db = readDB();
  const account = findAccount(db, bankCode, accountNumber);
  if (!account) {
    return res.status(404).json({ success: false, error: 'Không tìm thấy tài khoản' });
  }
  return res.json({
    success: true,
    data: {
      bankCode: account.bankCode,
      accountNumber: account.accountNumber,
      accountName: account.accountName,
      balance: account.balance,
    },
  });
});

export default router;