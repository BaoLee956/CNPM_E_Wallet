// services/bankService.ts

export interface BankInfo {
  code: string;
  name: string;
  shortName: string;
  logoUrl: string; // emoji or icon key
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

export interface BankLinkData {
  bankCode: string;
  accountNumber: string;
  accountName: string;
  otp?: string;
}

export interface OtpRequest {
  bankCode: string;
  accountNumber: string;
  accountName: string;
}

export const SUPPORTED_BANKS: BankInfo[] = [
  { code: "VCB",  name: "Vietcombank",         shortName: "VCB",   logoUrl: "https://res.cloudinary.com/diae3v9nm/image/upload/v1780241395/logo-vietcombank_baryvw.jpg", color: "#006B3E", accentColor: "#00A651" },
  { code: "TCB",  name: "Techcombank",          shortName: "TCB",   logoUrl: "https://res.cloudinary.com/diae3v9nm/image/upload/v1780241395/logo-techcombank-inkythuatso-10-15-11-46_w1xarj.jpg", color: "#E30613", accentColor: "#FF1A2B" },
  { code: "BIDV", name: "BIDV",                 shortName: "BIDV",  logoUrl: "https://res.cloudinary.com/diae3v9nm/image/upload/v1780241394/OIP_1_bbkv69.jpg", color: "#003087", accentColor: "#0052CC" },
  { code: "VTB",  name: "Vietinbank",           shortName: "VTB",   logoUrl: "https://res.cloudinary.com/diae3v9nm/image/upload/v1780241393/OIP_2_l0chkg.jpg", color: "#CF2A27", accentColor: "#E5342D" },
  { code: "ACB",  name: "ACB",                  shortName: "ACB",   logoUrl: "https://res.cloudinary.com/diae3v9nm/image/upload/v1780241393/OIP_3_cfqctg.jpg", color: "#004A9B", accentColor: "#0062CC" },
  { code: "MB",   name: "MB Bank",              shortName: "MB",    logoUrl: "https://res.cloudinary.com/diae3v9nm/image/upload/v1780241392/OIP_4_nlsk2y.jpg", color: "#1A1A2E", accentColor: "#6C63FF" },
  { code: "VPB",  name: "VPBank",               shortName: "VPB",   logoUrl: "https://res.cloudinary.com/diae3v9nm/image/upload/v1780241392/OIP_5_yvp0iq.jpg", color: "#006A4E", accentColor: "#00875A" },
  { code: "TPB",  name: "TPBank",               shortName: "TPB",   logoUrl: "https://res.cloudinary.com/diae3v9nm/image/upload/v1780241392/OIP_6_rerjol.jpg", color: "#7B2D8B", accentColor: "#9B59B6" },
  { code: "STB",  name: "Sacombank",            shortName: "STB",   logoUrl: "https://res.cloudinary.com/diae3v9nm/image/upload/v1780242324/OIP_12_wj2q85.jpg", color: "#0066A1", accentColor: "#0080CC" },
  { code: "SHB",  name: "SHBank",               shortName: "SHB",   logoUrl: "https://res.cloudinary.com/diae3v9nm/image/upload/v1780241392/OIP_8_fujjgl.jpg", color: "#C0392B", accentColor: "#E74C3C" },
  { code: "HDB",  name: "HDBank",               shortName: "HDB",   logoUrl: "https://res.cloudinary.com/diae3v9nm/image/upload/v1780241392/OIP_9_mgaoad.jpg", color: "#006DB7", accentColor: "#0082CC" },
  { code: "MSB",  name: "MSB",                  shortName: "MSB",   logoUrl: "https://res.cloudinary.com/diae3v9nm/image/upload/v1780242255/OIP_11_bxk7bw.jpg", color: "#003366", accentColor: "#004C99" },
];

const LINKED_BANKS_KEY = "ewallet_linked_banks";
const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

function loadLinkedBanks(): LinkedBank[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LINKED_BANKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveLinkedBanks(banks: LinkedBank[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LINKED_BANKS_KEY, JSON.stringify(banks));
}

export const bankService = {
  getSupportedBanks(): BankInfo[] {
    return SUPPORTED_BANKS;
  },

  getBankInfo(code: string): BankInfo | undefined {
    return SUPPORTED_BANKS.find(b => b.code === code);
  },

  async getLinkedBanks(): Promise<LinkedBank[]> {
    await delay(400);
    return loadLinkedBanks();
  },

  // Step 1: Verify account number → return masked account name
  async verifyAccount(bankCode: string, accountNumber: string): Promise<{ accountName: string }> {
    await delay(1200);
    // Mock: số tài khoản hợp lệ nếu có đúng 9-16 chữ số
    const clean = accountNumber.replace(/\s/g, "");
    if (!/^\d{9,16}$/.test(clean)) {
      throw new Error("Số tài khoản không hợp lệ");
    }
    // Mock trả về tên tài khoản giả
    const mockNames: Record<string, string> = {
      VCB: "NGUYEN VAN A", TCB: "TRAN THI B", BIDV: "LE VAN C",
      VTB: "PHAM THI D", ACB: "HOANG VAN E", MB: "VU THI F",
      VPB: "DO VAN G", TPB: "NGO THI H", STB: "BUI VAN I",
      SHB: "DANG THI K", HDB: "NGUYEN VAN L", MSB: "TRAN VAN M",
    };
    return { accountName: mockNames[bankCode] || "NGUYEN VAN X" };
  },

  // Step 2: Send OTP (mock)
  async sendOtp(req: OtpRequest): Promise<{ maskedPhone: string }> {
    await delay(800);
    return { maskedPhone: "****5678" };
  },

  // Step 3: Verify OTP & link bank
  async verifyOtpAndLink(data: BankLinkData): Promise<LinkedBank> {
    await delay(1000);
    if (data.otp !== "123456") {
      throw new Error("Mã OTP không đúng. Thử lại với 123456");
    }
    const existing = loadLinkedBanks();
    // Check duplicate
    const dup = existing.find(b => b.bankCode === data.bankCode && b.accountNumber === data.accountNumber);
    if (dup) throw new Error("Tài khoản này đã được liên kết");

    const newBank: LinkedBank = {
      id: `bank_${Date.now()}`,
      bankCode: data.bankCode,
      accountNumber: data.accountNumber,
      accountName: data.accountName,
      linkedAt: new Date().toISOString(),
      isDefault: existing.length === 0, // first one is default
      isVerified: true,
    };
    saveLinkedBanks([...existing, newBank]);
    return newBank;
  },

  async setDefault(bankId: string): Promise<void> {
    await delay(300);
    const banks = loadLinkedBanks();
    const updated = banks.map(b => ({ ...b, isDefault: b.id === bankId }));
    saveLinkedBanks(updated);
  },

  async removeLinkedBank(bankId: string): Promise<void> {
    await delay(500);
    const banks = loadLinkedBanks();
    const filtered = banks.filter(b => b.id !== bankId);
    // Re-assign default if needed
    if (filtered.length > 0 && !filtered.some(b => b.isDefault)) {
      filtered[0].isDefault = true;
    }
    saveLinkedBanks(filtered);
  },
};