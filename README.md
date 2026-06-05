<div align="center">
  <img src="https://img.icons8.com/clouds/200/000000/wallet.png" alt="E-Wallet Logo" width="120" />

  # E-Wallet System (Hệ thống Ví Điện Tử)
  *Dự án Hệ thống Ví điện tử quản lý tài chính cá nhân và giao dịch trực tuyến toàn diện.*

  <!-- Badges -->
  <p>
    <img alt="Next.js" src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white"/>
    <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
    <img alt="NestJS" src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white"/>
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
    <img alt="Prisma" src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white"/>
    <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
    <img alt="Express.js" src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white"/>
  </p>
</div>

---

## 1. Tổng quan Dự án
**E-Wallet** là một giải pháp ví điện tử hiện đại, cung cấp nền tảng quản lý tài chính cá nhân an toàn và tiện lợi. Hệ thống cho phép người dùng (Khách hàng) thực hiện các giao dịch nạp, rút, chuyển tiền nhanh chóng, đồng thời hỗ trợ liên kết với hệ thống ngân hàng đối tác. Bên cạnh đó, E-Wallet tích hợp một cổng quản trị (Admin Portal) độc lập giúp Ban quản trị giám sát lưu lượng giao dịch, quản lý người dùng và xử lý các sự cố giao dịch kịp thời.

## 2. Công nghệ sử dụng (Tech Stack)

Hệ thống được phát triển theo kiến trúc hiện đại, phân tách rõ ràng giữa các phân hệ:

* **Frontend (Customer & Admin):** Next.js (React Framework), Tailwind CSS.
* **Backend (Core Wallet):** NestJS, TypeScript, Prisma ORM.
* **Database:** PostgreSQL (Lưu trữ và vận hành trên nền tảng Cloud **Neon.tech**).
* **Dịch vụ Giả lập (Mock Gateway):** Express.js (Sử dụng `db.json` để giả lập dữ liệu API từ các ngân hàng đối tác).

## 3. Các tính năng cốt lõi (Functional Requirements)

### Phân hệ Khách hàng (Customer Profile)
* **Xác thực:** Đăng ký và Đăng nhập tài khoản.
* **Liên kết Ngân hàng:** Hỗ trợ liên kết tài khoản ngân hàng nội địa và quốc tế (Bao gồm hệ thống xác thực OTP 3D Secure giả lập).
* **Cash-in (Nạp tiền):** Nạp tiền từ thẻ/ngân hàng liên kết vào số dư ví.
* **Cash-out (Rút tiền):** Rút tiền mặt từ ví về tài khoản ngân hàng.
* **P2P Transfer (Chuyển tiền):** Chuyển tiền nội bộ siêu tốc qua Số điện thoại.
* **Tra cứu:** Xem số dư khả dụng và biến động số dư (Lịch sử giao dịch).

### Phân hệ Quản trị viên (Admin Portal)
* **Báo cáo thống kê (Dashboard):** Xem biểu đồ doanh thu, số lượng người dùng mới, và lưu lượng giao dịch theo thời gian.
* **Quản lý người dùng:** Tra cứu danh sách người dùng, xem chi tiết và thực hiện Khóa / Mở khóa tài khoản khi có dấu hiệu vi phạm.
* **Quản lý giao dịch:** Theo dõi các giao dịch Pending/Timeout, thực hiện tra soát và **Refund (Hoàn tiền)** cho khách hàng nếu giao dịch lỗi.

## 4. Cấu trúc thư mục (Directory Structure)

```bash
CNPM_E_Wallet
 ┣ frontend        # Chứa mã nguồn UI/UX cho Khách hàng & Admin (Next.js)
 ┣ backend         # Chứa API Core Server của Ví điện tử (NestJS)
 ┣ mock-gateway    # API giả lập hệ thống core banking của Ngân hàng đối tác (Express.js)
 ┗ README.md       # Tài liệu dự án
```

## 5. Hướng dẫn Cài đặt & Khởi chạy (Local Development)

### Yêu cầu (Prerequisites)
Đảm bảo máy tính của bạn đã cài đặt sẵn:
* [Node.js](https://nodejs.org/) (Khuyến nghị phiên bản LTS >= 18.x)
* [npm](https://www.npmjs.com/) hoặc [yarn](https://yarnpkg.com/)
* Database PostgreSQL (Hoặc sử dụng chuỗi kết nối Cloud NeonDB sẵn có trong dự án)

### Cài đặt & Cấu hình Database
1. **Clone repository và cài đặt Dependencies:**
Tiến hành cài đặt thư viện cho cả 3 thư mục `frontend`, `backend` và `mock-gateway`.
```bash
# Cài đặt cho Backend
cd backend
npm install

# Cài đặt cho Frontend
cd ../frontend
npm install

# Cài đặt cho Mock Gateway
cd ../mock-gateway
npm install
```

2. **Thiết lập Database (Prisma):**
Di chuyển vào thư mục `backend` và chạy lệnh đồng bộ schema Prisma với cơ sở dữ liệu.
```bash
cd backend
npx prisma db push
```

3. **Seed dữ liệu mẫu (Khởi tạo tài khoản Test):**
Bạn cần chạy 2 script seed để tạo dữ liệu cho hệ thống hoạt động:
```bash
# Khởi tạo tài khoản Admin
npm run seed:cjs

# Khởi tạo tài khoản Khách hàng mẫu (Nếu cấu hình script là seed-customer)
npx ts-node src/seed-customer.ts
```

### Khởi chạy các dịch vụ (Running Services)
Dự án yêu cầu khởi chạy đồng thời 3 dịch vụ ở các terminal khác nhau:

* **Mock Gateway** (Port 3001):
  ```bash
  cd mock-gateway
  npm run dev
  ```
* **Backend Server** (Port 3002):
  ```bash
  cd backend
  npm run dev
  ```
* **Frontend Application** (Port 3000):
  ```bash
  cd frontend
  npm run dev
  ```

## 6. Tài khoản Test mặc định (Test Credentials)

Sau khi hệ thống khởi chạy thành công, bạn có thể truy cập `http://localhost:3000` và sử dụng các tài khoản sau để kiểm thử:

| Phân quyền | Số điện thoại | Mật khẩu | Ghi chú |
| :--- | :--- | :--- | :--- |
| **Khách hàng (Customer)** | `0901234567` | `Password123` | Dùng để test Nạp, Rút, Chuyển tiền |
| **Quản trị viên (Admin)** | `0867674359` | `Password123` | Truy cập Admin Dashboard quản lý hệ thống |

---
