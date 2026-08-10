# AGENT.md — IT-Tools (Fiora Accounting Integration)

> **Tên dự án:** IT-Tools (Forked by Fiora Việt Nam)
> **Đường dẫn mã nguồn:** `/Users/thang.dc/Documents/GitHub/it-tools`
>
> File này định nghĩa phạm vi, kiến trúc, và quy tắc làm việc cho AI Agent (Antigravity / Claude Code)
> khi phát triển và bảo trì hệ thống `it-tools` tích hợp các module tài chính kế toán của Fiora Việt Nam.

---

## 0. Quy tắc Người Dùng (User Rules - Bắt buộc tuân thủ)

1. **Luôn sử dụng Tiếng Việt** để trả lời và giải thích với người dùng (Yuri).
2. **Tự động cập nhật phiên bản:** Số phiên bản (Version) phải tự động được cập nhật sau mỗi bản build/fix và hiển thị rõ ràng trên app/changelog để tiện theo dõi (`2026.08.10-fiora`).
3. **Tự động cập nhật Changelog:** Luôn tự động ghi nhận mọi thay đổi vào tệp `CHANGELOG.md` của dự án.

---

## 1. Bối cảnh & Quyết định Kiến trúc

- **Chủ sở hữu:** Yuri (thang.dc@huali-group.com) — Fiora Việt Nam.
- **Mục tiêu:** Sáp nhập bộ công cụ kế toán/báo giá Fiora (Đổi số thành chữ song ngữ Việt-Trung & Tính thuế VAT NĐ 174) trực tiếp vào kho lưu trữ mở **`it-tools`** (đã Fork trên GitHub).
- **Kiến trúc Kỹ thuật (Client-Side PWA):**
  - Chuyển đổi 100% logic xử lý từ Rust sang **TypeScript thuần (Client-side)**.
  - Sử dụng **Vue 3**, **Naive UI**, **UnoCSS**, và **Vitest**.
  - **Bảo mật tuyệt đối:** Mọi tính toán thực hiện ngay trên trình duyệt (Edge Computing), không gửi bất kỳ dữ liệu tiền tệ/hóa đơn nào qua mạng. Hoạt động mượt mà cả khi ngắt kết nối Internet (Offline PWA).
  - **Docker Compose siêu nhẹ:** Đóng gói bằng `Dockerfile` (Nginx + static `dist/`), không cần container Backend Rust hay SQLite.

---

## 2. Cấu trúc Các Module Đã Tích Hợp

### 2.1. Danh mục "Fiora Accounting"
- Đã đăng ký ở vị trí **ĐẦU TIÊN** trong `src/tools/index.ts`.
- Hỗ trợ ghim công cụ lên vị trí cao nhất (Favorite Tools) ở trang chủ bằng biểu tượng Trái tim.

### 2.2. Module 1: Đổi Số Thành Chữ (`/fiora-number-to-words`)
- **Thư mục:** `src/tools/fiora-number-to-words/`
- **Tệp tin:**
  - `fiora-number-to-words.service.ts`: Logic quy đổi chữ Tiếng Việt chính tả và Tiếng Trung Đại Tả (`大写`).
  - `fiora-number-to-words.service.test.ts`: Bài kiểm thử tự động (Vitest).
  - `fiora-number-to-words.vue`: Giao diện Vue 3 + Naive UI.
  - `index.ts`: Đăng ký Tool metadata.
- **Quy tắc đọc số:**
  - **Tiếng Việt:** Phân nhóm 3 chữ số (nghìn - triệu - tỷ), xử lý ngoại lệ chính tả ("mười/mươi", "mốt/lăm/lẻ/tư"). Hạn mức tối đa 1.000 tỷ VNĐ.
  - **Tiếng Trung (Đại tả 大写):** Phân nhóm 4 chữ số (万 - 亿 - 万亿), dùng bộ chữ 壹贰叁肆伍陆柒捌玖拾佰仟, xử lý chèn 零 chống gian lận sửa số.

### 2.3. Module 2: Tính Thuế VAT (`/fiora-vat-calculator`)
- **Thư mục:** `src/tools/fiora-vat-calculator/`
- **Tệp tin:**
  - `fiora-vat-calculator.service.ts`: Logic tính toán thuế VAT và làm tròn.
  - `fiora-vat-calculator.service.test.ts`: Bài kiểm thử tự động (Vitest).
  - `fiora-vat-calculator.vue`: Giao diện Vue 3 + Naive UI.
  - `index.ts`: Đăng ký Tool metadata.
- **Quy tắc làm tròn (Nghị định 174/2016/NĐ-CP):**
  - Áp dụng **Round-Half-Up** đến hàng đơn vị (đồng).
  - Hỗ trợ 2 chế độ: **Tính Xuôi** (nhập giá chưa thuế) & **Tính Ngược** (nhập giá đã có thuế).
  - Giữ nguyên độ chính xác của thuế suất (không làm tròn % đầu vào).
  - Tích hợp nút chuyển kết quả tổng sau thuế sang công cụ Đổi số thành chữ.

---

## 3. Lệnh Thao Tác & Kiểm Thử

- **Chạy môi trường phát triển (Dev):**
  ```bash
  npx pnpm dev
  ```
- **Chạy Kiểm thử Đơn vị (Unit Tests):**
  ```bash
  npx vitest run src/tools/fiora-number-to-words/fiora-number-to-words.service.test.ts src/tools/fiora-vat-calculator/fiora-vat-calculator.service.test.ts
  ```
- **Đóng gói sản phẩm (Production Build):**
  ```bash
  npx pnpm build
  ```

---

## 4. Hướng dẫn Phát triển & Bảo trì Tiếp theo

- Khi nâng cấp hoặc bổ sung công cụ mới cho `it-tools`, agent luôn tuân thủ cấu trúc chuẩn của `it-tools`:
  1. Tạo thư mục tool trong `src/tools/<tool-name>/`.
  2. Viết `index.ts`, `<tool-name>.service.ts`, `<tool-name>.service.test.ts`, và `<tool-name>.vue`.
  3. Đăng ký tool vào `src/tools/index.ts`.
  4. Đảm bảo chạy `npx vitest run` và `npx pnpm build` vượt qua 100% không có lỗi.
  5. Cập nhật số phiên bản và `CHANGELOG.md`.
