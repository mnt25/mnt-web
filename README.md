# MNT Web - Portfolio Cá Nhân & Dashboard

Website portfolio cá nhân hiện đại và dashboard quản trị được xây dựng với React, TypeScript, và Node.js.

## 🚀 Demo Trực Tiếp
**URL**: [https://mnt.id.vn](https://mnt.id.vn)

## ✨ Tính Năng

### Portfolio Công Khai (Public)
- **Trang chủ**: Giới thiệu bản thân và banner chính.
- **Dự án**: Hiển thị các dự án cá nhân với link Demo và Source Code.
- **Kỹ năng**: Hiển thị trực quan các kỹ năng chuyên môn.
- **Liên hệ**: Form liên hệ để gửi tin nhắn đến admin.
- **Thông báo**: Tích hợp Discord Webhook để nhận thông báo tin nhắn mới tức thì.

### Admin Dashboard (Quản trị)
- **Xác thực**: Đăng nhập bảo mật cho admin.
- **Quản lý Dự án**: Các chức năng CRUD (Thêm, Xem, Sửa, Xóa) cho dự án.
- **Hộp tin nhắn**: Xem và quản lý tin nhắn nhận được từ form liên hệ.
- **Quản lý CV**: Cập nhật đường dẫn tải CV.

## 🛠️ Công Nghệ Sử Dụng

### Frontend
- **Framework**: React 19 (Vite)
- **Ngôn ngữ**: TypeScript
- **Styling**: TailwindCSS
- **Routing**: React Router DOM 7
- **Icons**: Lucide React, React Icons
- **Hiệu ứng**: Framer Motion / Custom Reveal

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Cơ sở dữ liệu**: PostgreSQL (Neon Tech)
- **Xác thực**: JWT (JSON Web Tokens)

## 📦 Cài Đặt & Thiết Lập

### Yêu cầu tiên quyết
- Node.js (v18 trở lên)
- Cơ sở dữ liệu PostgreSQL (hoặc chuỗi kết nối Neon DB)

### 1. Clone repository
```bash
git clone https://github.com/mnt25/mnt-web.git
cd mnt-web
```

### 2. Cài đặt thư viện
```bash
npm install
```

### 3. Cấu hình môi trường
Tạo file `.env` ở thư mục gốc (tùy chọn nhưng khuyến khích):
```env
# Backend
PORT=5000
JWT_SECRET=your_secret_key
PUBLIC_NEON_URL=postgresql://user:password@host/dbname?sslmode=require
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/your_webhook_url
```

### 4. Thiết lập Database
Đảm bảo bạn đã có database PostgreSQL và tạo các bảng sau:
- `admins` (username, password)
- `projects` (title, description, image, tags, live_demo, source_code)
- `messages` (name, email, message)
- `settings` (key, value)

### 5. Chạy dự án (Local)

**Chạy Backend Server:**
```bash
node server.js
```
Server chạy tại: `http://localhost:5000`

**Chạy Frontend:**
```bash
npm run dev
```
App chạy tại: `http://localhost:5173`

## 📝 Danh Sách API

| Phương thức | Endpoint | Mô tả | Yêu cầu Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/login` | Đăng nhập Admin | Không |
| `GET` | `/api/projects` | Lấy danh sách dự án | Không |
| `POST` | `/api/projects` | Thêm dự án mới | Có |
| `PUT` | `/api/projects/:id` | Cập nhật dự án | Có |
| `DELETE` | `/api/projects/:id` | Xóa dự án | Có |
| `POST` | `/api/messages` | Gửi tin nhắn liên hệ | Không |
| `GET` | `/api/messages` | Lấy danh sách tin nhắn | Có |


Được phát triển bởi MNT.
