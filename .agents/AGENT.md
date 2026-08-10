# AGENT.md — IT-Tools (Fiora Accounting Integration)

> **Tên dự án:** IT-Tools (Forked by Fiora Việt Nam)
> **Đường dẫn mã nguồn:** `/Users/thang.dc/Documents/GitHub/it-tools`

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
- **Tệp tin:** `fiora-number-to-words.service.ts`, `fiora-number-to-words.service.test.ts`, `fiora-number-to-words.vue`, `index.ts`.
- **Quy tắc:**
  - **Tiếng Việt:** Phân nhóm 3 chữ số (nghìn - triệu - tỷ), xử lý "mười/mươi", "mốt/lăm/lẻ/tư". Hạn mức tối đa 1.000 tỷ VNĐ.
  - **Tiếng Trung (Đại tả 大写):** Phân nhóm 4 chữ số (万 - 亿 - 万亿), dùng bộ chữ 壹贰叁肆伍陆柒捌玖拾佰仟, xử lý chèn 零.

### 2.3. Module 2: Tính Thuế VAT (`/fiora-vat-calculator`)
- **Thư mục:** `src/tools/fiora-vat-calculator/`
- **Tệp tin:** `fiora-vat-calculator.service.ts`, `fiora-vat-calculator.service.test.ts`, `fiora-vat-calculator.vue`, `index.ts`.
- **Quy tắc:**
  - Áp dụng **Round-Half-Up theo Nghị định 174/2016/NĐ-CP** đến hàng đơn vị (đồng).
  - Hỗ trợ **Tính Xuôi** (nhập giá chưa thuế) & **Tính Ngược** (nhập giá đã có thuế).

---

## 3. Lệnh Thao Tác

- Dev: `npx pnpm dev`
- Test: `npx vitest run`
- Build: `npx pnpm build`
