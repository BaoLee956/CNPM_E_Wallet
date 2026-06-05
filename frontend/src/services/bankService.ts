

import http from '@/lib/http';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BankInfo {
  code: string;
  name: string;
  shortName: string;
  logoUrl: string;
  color: string;
  accentColor: string;
}

export interface LinkedBank {
  id: string;
  bankCode: string;
  accountNumber: string;
  accountName: string;
  linkedAt: string;
  isDefault: boolean;
  isVerified: boolean;
}

// ─── Static bank list (không đổi) ────────────────────────────────────────────

export const SUPPORTED_BANKS: BankInfo[] = [
  { code: 'VCB',  name: 'Vietcombank',  shortName: 'VCB',  logoUrl: 'https://res.cloudinary.com/diae3v9nm/image/upload/v1780241395/logo-vietcombank_baryvw.jpg',                                    color: '#006B3E', accentColor: '#00A651' },
  { code: 'TCB',  name: 'Techcombank', shortName: 'TCB',  logoUrl: 'https://res.cloudinary.com/diae3v9nm/image/upload/v1780241395/logo-techcombank-inkythuatso-10-15-11-46_w1xarj.jpg',             color: '#E30613', accentColor: '#FF1A2B' },
  { code: 'BIDV', name: 'BIDV',         shortName: 'BIDV', logoUrl: 'https://res.cloudinary.com/diae3v9nm/image/upload/v1780241394/OIP_1_bbkv69.jpg',                                               color: '#003087', accentColor: '#0052CC' },
  { code: 'VTB',  name: 'Vietinbank',   shortName: 'VTB',  logoUrl: 'https://res.cloudinary.com/diae3v9nm/image/upload/v1780241393/OIP_2_l0chkg.jpg',                                               color: '#CF2A27', accentColor: '#E5342D' },
  { code: 'ACB',  name: 'ACB',          shortName: 'ACB',  logoUrl: 'https://res.cloudinary.com/diae3v9nm/image/upload/v1780241393/OIP_3_cfqctg.jpg',                                               color: '#004A9B', accentColor: '#0062CC' },
  { code: 'MB',   name: 'MB Bank',      shortName: 'MB',   logoUrl: 'https://res.cloudinary.com/diae3v9nm/image/upload/v1780241392/OIP_4_nlsk2y.jpg',                                               color: '#1A1A2E', accentColor: '#6C63FF' },
  { code: 'VPB',  name: 'VPBank',       shortName: 'VPB',  logoUrl: 'https://res.cloudinary.com/diae3v9nm/image/upload/v1780241392/OIP_5_yvp0iq.jpg',                                               color: '#006A4E', accentColor: '#00875A' },
  { code: 'TPB',  name: 'TPBank',       shortName: 'TPB',  logoUrl: 'https://res.cloudinary.com/diae3v9nm/image/upload/v1780241392/OIP_6_rerjol.jpg',                                               color: '#7B2D8B', accentColor: '#9B59B6' },
  { code: 'STB',  name: 'Sacombank',    shortName: 'STB',  logoUrl: 'https://res.cloudinary.com/diae3v9nm/image/upload/v1780242324/OIP_12_wj2q85.jpg',                                              color: '#0066A1', accentColor: '#0080CC' },
  { code: 'SHB',  name: 'SHBank',       shortName: 'SHB',  logoUrl: 'https://res.cloudinary.com/diae3v9nm/image/upload/v1780241392/OIP_8_fujjgl.jpg',                                               color: '#C0392B', accentColor: '#E74C3C' },
  { code: 'HDB',  name: 'HDBank',       shortName: 'HDB',  logoUrl: 'https://res.cloudinary.com/diae3v9nm/image/upload/v1780241392/OIP_9_mgaoad.jpg',                                               color: '#006DB7', accentColor: '#0082CC' },
  { code: 'MSB',  name: 'MSB',          shortName: 'MSB',  logoUrl: 'https://res.cloudinary.com/diae3v9nm/image/upload/v1780242255/OIP_11_bxk7bw.jpg',                                              color: '#003366', accentColor: '#004C99' },
];

// ─── API calls ────────────────────────────────────────────────────────────────

export const bankService = {
  getSupportedBanks(): BankInfo[] {
    return SUPPORTED_BANKS;
  },

  getBankInfo(code: string): BankInfo | undefined {
    return SUPPORTED_BANKS.find((b) => b.code === code);
  },

  // GET /api/v1/linked-banks
  async getLinkedBanks(): Promise<LinkedBank[]> {
    const { data } = await http.get<{ data: LinkedBank[] }>('/api/v1/linked-banks');
    return data.data;
  },

  // POST /api/v1/linked-banks/verify
  async verifyAccount(bankCode: string, accountNumber: string): Promise<{ accountName: string }> {
    const { data } = await http.post<{ data: { accountName: string } }>(
      '/api/v1/linked-banks/verify',
      { bankCode, accountNumber },
    );
    return data.data;
  },

  // POST /api/v1/linked-banks/send-otp
  async sendOtp(req: { bankCode: string; accountNumber: string; accountName: string }): Promise<{ maskedPhone: string }> {
    const { data } = await http.post<{ data: { maskedPhone: string } }>(
      '/api/v1/linked-banks/send-otp',
      { bankCode: req.bankCode, accountNumber: req.accountNumber },
    );
    return data.data;
  },

  // POST /api/v1/linked-banks  (verify OTP + link)
  async verifyOtpAndLink(params: {
    bankCode: string;
    accountNumber: string;
    accountName: string;
    otp: string;
  }): Promise<LinkedBank> {
    const { data } = await http.post<{ data: LinkedBank }>('/api/v1/linked-banks', params);
    return data.data;
  },

  // PATCH /api/v1/linked-banks/:id/default
  async setDefault(bankId: string): Promise<void> {
    await http.patch(`/api/v1/linked-banks/${bankId}/default`);
  },

  // DELETE /api/v1/linked-banks/:id
  async removeLinkedBank(bankId: string): Promise<void> {
    await http.delete(`/api/v1/linked-banks/${bankId}`);
  },
};