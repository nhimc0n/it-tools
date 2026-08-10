# AGENT.md — YURI TOOLS

> **Tên dự án:** YURI TOOLS (Hệ thống bộ công cụ lập trình viên & tiện ích đa năng)
> **Đường dẫn mã nguồn:** `/Users/thang.dc/Documents/GitHub/it-tools`
>
> File này định nghĩa phạm vi, kiến trúc, và quy tắc làm việc cho AI Agent (Antigravity / Claude Code)
> khi phát triển và bảo trì hệ thống **YURI TOOLS** hoạt động độc lập.

---

## 0. Quy tắc Người Dùng (User Rules - Bắt buộc tuân thủ)

1. **Luôn sử dụng Tiếng Việt** để trả lời và giải thích với người dùng (Yuri).
2. **Tự động cập nhật phiên bản:** Số phiên bản (Version) phải tự động được cập nhật sau mỗi bản build/fix và hiển thị rõ ràng trên app/changelog để tiện theo dõi (`2026.08.10-fiora.xx`).
3. **Tự động cập nhật Changelog:** Luôn tự động ghi nhận mọi thay đổi vào tệp `CHANGELOG.md` của dự án.

---

## 1. Bối cảnh & Quyết định Kiến trúc

- **Chủ sở hữu:** Yuri (`nhimc0n`).
- **Mục tiêu:** Xây dựng và duy trì bộ công cụ web tiện ích đa năng độc lập **YURI TOOLS** tích hợp các công cụ lập trình, chuyển đổi dữ liệu và tính toán tài chính.
- **Kiến trúc Kỹ thuật (Client-Side PWA):**
  - Sử dụng **Vue 3**, **TypeScript**, **Naive UI**, **UnoCSS**, và **Vitest**.
  - **Bảo mật tuyệt đối:** Mọi tính toán thực hiện trực tiếp trên trình duyệt (Edge Computing), không gửi dữ liệu qua server trung gian. Hoạt động mượt mà cả khi ngắt kết nối Internet (Offline PWA).
  - **Đóng gói Docker & Dockge:** Đóng gói bằng `Dockerfile` (Node 20 Alpine + Nginx Alpine), sẵn sàng triển khai trên Rocky Linux host (hoặc các trình quản lý container như Dockge, Portainer).

---

## 2. Cấu trúc Các Module Tiện Ích Tích Hợp

### 2.1. Danh mục Công cụ Tiện ích & Tài chính
- Đã đăng ký ở vị trí ưu tiên trong `src/tools/index.ts`.
- Hỗ trợ ghim công cụ lên vị trí yêu thích ở trang chủ bằng biểu tượng Trái tim.

### 2.2. Module 1: Đổi Số Thành Chữ (`/fiora-number-to-words`)
- **Thư mục:** `src/tools/fiora-number-to-words/`
- **Tệp tin:** `fiora-number-to-words.service.ts`, `fiora-number-to-words.service.test.ts`, `fiora-number-to-words.vue`, `index.ts`.
- **Chức năng & Quy tắc:**
  - Quy đổi số tiền tự động thành chữ theo 3 ngôn ngữ xếp dọc: **Tiếng Việt**, **Tiếng Trung (Đại tả 大写 + Pinyin)**, **Tiếng Anh (Chuẩn kế toán)**.
  - Tự động định dạng dấu phẩy phân cách số tiền trong ô nhập.
  - Chiều cao ô kết quả cân đối 100% với nút bấm Sao chép quick-copy (Icon Clipboard).

### 2.3. Module 2: Tính Thuế VAT (`/fiora-vat-calculator`)
- **Thư mục:** `src/tools/fiora-vat-calculator/`
- **Tệp tin:** `fiora-vat-calculator.service.ts`, `fiora-vat-calculator.service.test.ts`, `fiora-vat-calculator.vue`, `index.ts`.
- **Chức năng & Quy tắc:**
  - Hỗ trợ **Tính Xuôi** (nhập giá chưa thuế) & **Tính Ngược** (nhập giá đã có thuế).
  - Áp dụng quy tắc làm tròn **Round-Half-Up theo Nghị định 174/2016/NĐ-CP**.
  - Tích hợp nút Sao chép (Icon Clipboard) tại từng dòng kết quả (Giá trước thuế, Tiền thuế VAT, Tổng thanh toán).

---

## 3. Lệnh Thao Tác & Triển Khai

- **Chạy môi trường phát triển (Dev):** `npx pnpm dev`
- **Chạy Kiểm thử Đơn vị (Unit Tests):** `npx pnpm test:unit -- --run`
- **Đóng gói sản phẩm (Production Build):** `npx pnpm build`
- **Triển khai Docker Compose (Port 6688 / Dockge):**
  ```bash
  docker compose up -d --build
  ```

---

## 4. Hướng dẫn Phát triển & Bảo trì Tiếp theo

- Khi bổ sung công cụ mới vào **YURI TOOLS**, agent luôn tuân thủ cấu trúc chuẩn:
  1. Tạo thư mục tool trong `src/tools/<tool-name>/`.
  2. Viết `index.ts`, `<tool-name>.service.ts`, `<tool-name>.service.test.ts`, và `<tool-name>.vue`.
  3. Đăng ký tool vào `src/tools/index.ts`.
  4. Đảm bảo chạy `npx pnpm test:unit -- --run` và `npx pnpm build` vượt qua 100% không có lỗi.
  5. Tự động nâng phiên bản và cập nhật `CHANGELOG.md`.
