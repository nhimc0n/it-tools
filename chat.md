# CHAT.md — Tóm Tắt Phiên Làm Việc (Session Summary)

> **Ngày thực hiện:** 10/08/2026
> **Dự án đích:** `IT-Tools` (Forked by Fiora Việt Nam)
> **Đường dẫn:** `/Users/thang.dc/Documents/GitHub/it-tools`

---

## 1. Bối cảnh & Mục tiêu

- Phiên làm việc ban đầu xuất phát từ ứng dụng **Fiora Tools** (gồm 2 công cụ: Đổi số thành chữ song ngữ Việt-Trung & Tính thuế VAT NĐ 174).
- Người dùng (Yuri) muốn sáp nhập 2 công cụ của Fiora Tools vào mã nguồn của ứng dụng mở **`it-tools`**.
- Đã thực hiện phân tích kiến trúc, bảo mật, tính khả thi và quyết định **Fork repo `it-tools` trên GitHub** về đường dẫn `/Users/thang.dc/Documents/GitHub/it-tools` để phát triển và bảo trì lâu dài (giúp dễ dàng bấm "Sync Fork" nhận cập nhật từ tác giả gốc mà không bị mất tính năng riêng).

---

## 2. Kết Quả Kỹ Thuật Đã Triển Khai 100%

### 2.1. Chuyển đổi Kiến trúc (Rust API → Client-side TypeScript)
- Chuyển đổi 100% logic xử lý từ Rust sang **TypeScript thuần (Client-side PWA)**.
- **Bảo mật tuyệt đối:** Mọi tính toán diễn ra ngay trên RAM của trình duyệt, hoạt động offline hoàn toàn.
- **Docker Compose siêu nhẹ:** Đóng gói tĩnh bằng Nginx (`dist/`), không cần container Rust hay SQLite server.

### 2.2. Module 1: Fiora - Đổi số thành chữ (`/fiora-number-to-words`)
- **Tệp tin:** `src/tools/fiora-number-to-words/`
- **Logic:**
  - Tiếng Việt: Quy đổi chuẩn chính tả (mười/mươi, mốt/lăm/lẻ/tư). Hạn mức tối đa 1.000 tỷ VNĐ.
  - Tiếng Trung (Đại tả 大写): Quy đổi chuẩn chống sửa số (壹贰叁肆伍陆柒捌玖拾佰仟), phân nhóm 4 chữ số (万 - 亿 - 万亿), chèn 零 chính xác.
- **UI:** Vue 3 + Naive UI, tích hợp các nút chọn nhanh (`1M`, `10M`, `50M`, `100M`, `1B`).

### 2.3. Module 2: Fiora - Tính thuế VAT (`/fiora-vat-calculator`)
- **Tệp tin:** `src/tools/fiora-vat-calculator/`
- **Logic:**
  - Hỗ trợ **Tính Xuôi** (nhập trước thuế) và **Tính Ngược** (nhập đã thuế).
  - Làm tròn chuẩn **Nghị định 174/2016/NĐ-CP (Round-Half-Up)** đến hàng đơn vị (đồng).
- **UI:** Vue 3 + Naive UI, dải nút chọn thuế suất (`0%`, `5%`, `8%`, `10%`, custom), phiếu kết quả và nút chuyển nhanh sang Đổi chữ.

### 2.4. Đăng ký Danh mục & Kiểm thử
- Đã thêm danh mục **`Fiora Accounting`** ở vị trí ĐẦU TIÊN của `src/tools/index.ts`.
- Hỗ trợ ghim công cụ lên mục Yêu thích (Favorite) ở trang chủ bằng nút Trái tim.
- **Unit tests (Vitest):** `7/7` passed (`src/tools/fiora*/*.service.test.ts`).
- **Production Build:** `npx pnpm build` thành công trong 42.51s, sinh file PWA `sw.js`.
- **Versioning & Changelog:** Cập nhật bản `2026.08.10-fiora` vào `package.json` và `CHANGELOG.md`.

---

## 3. Hướng Dẫn Cho Các Phiên Chat Sau

1. **Thư mục dự án hoạt động:** Mọi thao tác phát triển tiếp theo sẽ thực hiện tại repo `/Users/thang.dc/Documents/GitHub/it-tools`.
2. **Quy tắc làm việc:**
   - Trả lời bằng Tiếng Việt.
   - Khi chỉnh sửa/bổ sung tính năng, chạy `npx vitest run` và `npx pnpm build` để đảm bảo không lỗi.
   - Cập nhật số phiên bản và `CHANGELOG.md`.
3. **Đọc thêm tài liệu:** Tham khảo chi tiết kiến trúc và quy tắc tại tệp [AGENT.md](file:///Users/thang.dc/Documents/GitHub/it-tools/AGENT.md).
