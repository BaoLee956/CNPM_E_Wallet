/**
 * index.ts — Mock Gateway entry point
 * Chạy: npx ts-node-dev src/index.ts
 */

import express from 'express';
import cors from 'cors';
import router from './routes';
import { readDB } from './database';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'mock-gateway', time: new Date().toISOString() });
});

// Tất cả routes đều có prefix /gateway
app.use('/gateway', router);

// Khởi tạo DB (seed nếu chưa có)
readDB();
console.log('📦 Database initialized');

app.listen(PORT, () => {
  console.log(`\n🏦 Mock Gateway running on http://localhost:${PORT}`);
  console.log(`   Health:   GET  http://localhost:${PORT}/health`);
  console.log(`   Verify:   POST http://localhost:${PORT}/gateway/verify-account`);
  console.log(`   OTP:      POST http://localhost:${PORT}/gateway/send-otp`);
  console.log(`   Debit:    POST http://localhost:${PORT}/gateway/debit`);
  console.log(`   Credit:   POST http://localhost:${PORT}/gateway/credit`);
  console.log('\n📋 Seed accounts (bankCode/accountNumber):');
  console.log('   VCB/0123456789 — NGUYEN VAN A — 50,000,000 VND');
  console.log('   TCB/1234567890 — LE VAN C     — 35,000,000 VND');
  console.log('   BIDV/2345678901 — PHAM THI D  — 15,000,000 VND');
  console.log('   (và nhiều tài khoản khác trong db.json)\n');
});