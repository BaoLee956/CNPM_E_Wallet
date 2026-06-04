/**
 * database.ts
 * JSON-file persistence layer cho Mock Gateway.
 * Tất cả data được lưu tại data/db.json — tự động seed nếu file chưa tồn tại.
 */

import fs from 'fs';
import path from 'path';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BankAccount {
  id: string;            // e.g. "VCB_0123456789"
  bankCode: string;      // "VCB", "TCB", ...
  accountNumber: string;
  accountName: string;
  balance: number;       // VND
  phone: string;         // để gửi OTP
  maskedPhone: string;   // "****5678"
}

export type GatewayTxStatus = 'pending' | 'success' | 'failed';
export type GatewayTxType = 'debit' | 'credit';

export interface GatewayTransaction {
  id: string;
  type: GatewayTxType;
  bankCode: string;
  accountNumber: string;
  amount: number;
  status: GatewayTxStatus;
  referenceId: string;       // ID giao dịch bên E-Wallet gửi sang
  callbackUrl: string;       // Webhook URL để gọi về
  callbackSentAt?: string;
  callbackStatus?: 'sent' | 'failed';
  createdAt: string;
  completedAt?: string;
}

export interface OtpRecord {
  bankCode: string;
  accountNumber: string;
  code: string;         // always "123456" trong mock
  expiresAt: string;    // ISO string
  used: boolean;
}

export interface GatewayDB {
  accounts: BankAccount[];
  transactions: GatewayTransaction[];
  otpRecords: OtpRecord[];
}

// ─── Seed data ────────────────────────────────────────────────────────────────

const SEED_ACCOUNTS: BankAccount[] = [
  // VCB
  { id: 'VCB_0123456789', bankCode: 'VCB', accountNumber: '0123456789', accountName: 'NGUYEN VAN A', balance: 50_000_000, phone: '0901234578', maskedPhone: '****4578' },
  { id: 'VCB_0987654321', bankCode: 'VCB', accountNumber: '0987654321', accountName: 'TRAN THI B', balance: 20_000_000, phone: '0912345679', maskedPhone: '****5679' },
  // TCB
  { id: 'TCB_1234567890', bankCode: 'TCB', accountNumber: '1234567890', accountName: 'LE VAN C', balance: 35_000_000, phone: '0923456780', maskedPhone: '****6780' },
  // BIDV
  { id: 'BIDV_2345678901', bankCode: 'BIDV', accountNumber: '2345678901', accountName: 'PHAM THI D', balance: 15_000_000, phone: '0934567891', maskedPhone: '****7891' },
  // VTB
  { id: 'VTB_3456789012', bankCode: 'VTB', accountNumber: '3456789012', accountName: 'HOANG VAN E', balance: 80_000_000, phone: '0945678902', maskedPhone: '****8902' },
  // ACB
  { id: 'ACB_4567890123', bankCode: 'ACB', accountNumber: '4567890123', accountName: 'VU THI F', balance: 25_000_000, phone: '0956789013', maskedPhone: '****9013' },
  // MB
  { id: 'MB_5678901234', bankCode: 'MB', accountNumber: '5678901234', accountName: 'DO VAN G', balance: 10_000_000, phone: '0967890124', maskedPhone: '****0124' },
  // VPB
  { id: 'VPB_6789012345', bankCode: 'VPB', accountNumber: '6789012345', accountName: 'NGO THI H', balance: 45_000_000, phone: '0978901235', maskedPhone: '****1235' },
  // TPB
  { id: 'TPB_7890123456', bankCode: 'TPB', accountNumber: '7890123456', accountName: 'BUI VAN I', balance: 30_000_000, phone: '0989012346', maskedPhone: '****2346' },
];

// ─── File I/O ─────────────────────────────────────────────────────────────────

const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_PATH = path.join(DATA_DIR, 'db.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function readDB(): GatewayDB {
  ensureDataDir();
  if (!fs.existsSync(DB_PATH)) {
    const initial: GatewayDB = {
      accounts: SEED_ACCOUNTS,
      transactions: [],
      otpRecords: [],
    };
    writeDB(initial);
    return initial;
  }
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw) as GatewayDB;
}

export function writeDB(db: GatewayDB): void {
  ensureDataDir();
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function findAccount(db: GatewayDB, bankCode: string, accountNumber: string): BankAccount | undefined {
  return db.accounts.find(
    (a) => a.bankCode === bankCode && a.accountNumber === accountNumber
  );
}

export function updateAccount(db: GatewayDB, id: string, patch: Partial<BankAccount>): void {
  const idx = db.accounts.findIndex((a) => a.id === id);
  if (idx !== -1) {
    db.accounts[idx] = { ...db.accounts[idx], ...patch };
  }
}

export function addTransaction(db: GatewayDB, tx: GatewayTransaction): void {
  db.transactions.push(tx);
}

export function updateTransaction(db: GatewayDB, id: string, patch: Partial<GatewayTransaction>): void {
  const idx = db.transactions.findIndex((t) => t.id === id);
  if (idx !== -1) {
    db.transactions[idx] = { ...db.transactions[idx], ...patch };
  }
}