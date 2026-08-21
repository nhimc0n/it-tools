# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## Version 2026.08.10-fiora.30

### Bug Fixes
- **fiora-number-to-words**: Sửa lỗi phân tích số tiền khi dán/nhập theo định dạng có dấu chấm phân cách hàng nghìn (ví dụ `1.500.000`) — trước đây `parseNumber` chỉ loại bỏ dấu phẩy nên gặp dấu chấm sẽ ra `NaN` và không hiển thị kết quả. Nay loại bỏ cả dấu phẩy lẫn dấu chấm trước khi parse, hỗ trợ đúng cả 2 kiểu định dạng số.

## Version 2026.08.10-fiora.29

### UI/UX Improvements
- **Currency Converter**: 
  - Điều chỉnh kích thước chữ hiển thị tỉ giá hối đoái nhỏ lại (từ `text-xl` xuống `text-lg`) để cân đối giao diện.
  - Sửa lại logic bảng tỉ giá khi ngôn ngữ là Tiếng Trung: Đảo ngược chiều tỉ giá hiển thị thành `1 CNY = xxx VND` và `1 CNY = xxx TWD` giống với mong muốn của người dùng thay vì lấy VND làm mốc.
  - Bổ sung tự động định dạng dấu phẩy phân cách hàng nghìn (thousands separator) cho các ô nhập liệu khi người dùng nhập số (Ví dụ: `10,000,000`).

## Version 2026.08.10-fiora.28

### Fix i18n Warnings
- **Yuri Tools Category**: Fix missing category name `yuri tools` in Chinese locale (`zh.yml`).

## Version 2026.08.10-fiora.27

### New Features
- **Currency Converter**: Thêm module Chuyển đổi tiền tệ (Currency Converter) trong nhánh Yuri Tools. Hỗ trợ quy đổi chéo trực tiếp giữa 4 loại tiền tệ: VNĐ, USD, NDT (CNY), Đài tệ (TWD) với thiết kế responsive đẹp mắt.
- **Live Exchange Rates**: Tự động fetch tỉ giá tiền tệ mới nhất từ API với cơ chế cache 24 giờ.
- **Dynamic Rates Board**: Bảng hiển thị tỉ giá thông minh tự thay đổi đồng tiền gốc (Base currency) dựa theo ngôn ngữ đang sử dụng (Việt -> VNĐ, Anh -> USD, Trung -> CNY). Hỗ trợ đầy đủ ngôn ngữ Anh, Việt, Trung.

## Version 2026.08.10-fiora.26

### Fix i18n Key Missing Warnings
- **fiora-vat-calculator**: Phục hồi đầy đủ các khóa dịch i18n bị thiếu (`rateLabel`, `resultTitle`, `copySlipSuccess`, `beforeTax`, `vatAmount`, `totalAmount`, `jumpToWords`, ...) trên cả 3 tệp ngôn ngữ (`vi.yml`, `en.yml`, `zh.yml`), loại bỏ hoàn toàn các cảnh báo missing key trong browser console.

## Version 2026.08.10-fiora.25

### Internationalization (i18n) Improvements
- **Language Selector**: Giới hạn danh sách chọn ngôn ngữ trên giao diện chỉ hiển thị 3 ngôn ngữ chính: Tiếng Việt (`vi`), Tiếng Anh (`en`), và Tiếng Trung (`zh`).
- **invoice-fee-calculator**: Chuyển toàn bộ văn bản cứng trong module sang hệ thống i18n (`$t`), hỗ trợ dịch chuẩn xác 100% theo Tiếng Việt, Tiếng Anh và Tiếng Trung.
- **Full Chinese Support**: Bổ sung đầy đủ bản dịch Tiếng Trung (`zh.yml`) cho cả 4 module độc quyền (Chuyển số thành chữ, Tính thuế VAT, Tính phí xuất hóa đơn & Chiết khấu, Chuyển đổi chữ Hoa - Thường).

## Version 2026.08.10-fiora.24

### UI & UX Refinements
- **text-uppercase-converter**: 
  - Loại bỏ tính năng Đảo ngược hoa/thường (Toggle Case) và thanh nút bấm thao tác nhanh.
  - Sắp xếp lại thứ tự ưu tiên kết quả: 1. Chữ in thường, 2. Viết hoa chữ đầu câu, 3. Viết hoa đầu mỗi từ, 4. Chữ IN HOA.
  - Tối ưu đa ngôn ngữ (i18n): Loại bỏ các chú thích tiếng Anh thừa trong nhãn tiếng Việt, hiển thị chuẩn xác theo ngôn ngữ người dùng lựa chọn.

## Version 2026.08.10-fiora.23

### UI & Navigation Optimization
- **Yuri Tools Category**: Đổi tên danh mục đầu trang thành **Yuri Tools**, đưa toàn bộ 4 công cụ chính (*Đổi số thành chữ*, *Tính thuế VAT*, *Tính phí xuất hóa đơn & Chiết khấu*, *Chuyển đổi chữ Hoa - Thường*) lên vị trí ưu tiên đầu tiên ở menu chính giúp người dùng dễ dàng truy cập ngay lập tức.

## Version 2026.08.10-fiora.22

### New Modules
- **text-uppercase-converter**: Bổ sung module [Chuyển đổi chữ Hoa - Thường](file:///Users/thang.dc/Documents/GitHub/it-tools/src/tools/text-uppercase-converter) hỗ trợ tiếng Việt (IN HOA, in thường, Viết Hoa Đầu Từ, Viết Hoa Đầu Câu, Toggle Case) kèm nút sao chép nhanh từng dòng.
- **invoice-fee-calculator**: Bổ sung module [Tính phí xuất hóa đơn & Chiết khấu](file:///Users/thang.dc/Documents/GitHub/it-tools/src/tools/invoice-fee-calculator) cho phép tính giá bán, giá xuất hóa đơn, tiền chênh lệch, phí xuất hóa đơn (20%), tiền thuế VAT, tổng chi phí khách chịu thêm, tổng tiền chuyển khoản và số tiền thừa bên bán cần hoàn lại cho khách.

## Version 2026.08.10-fiora.21

### Documentation Update
- **AGENT.md**: Cập nhật tệp [`AGENT.md`](file:///Users/thang.dc/Documents/GitHub/it-tools/AGENT.md) và [`.agents/AGENT.md`](file:///Users/thang.dc/Documents/GitHub/it-tools/.agents/AGENT.md) chuyển thương hiệu dự án thành **YURI TOOLS** hoạt động độc lập, làm sạch các thông tin không cần thiết.

## Version 2026.08.10-fiora.20

### Git & Docker Deployment
- **Dockerfile**: Cập nhật tệp Dockerfile tối ưu hóa quá trình cài đặt pnpm sản phẩm và bổ sung hướng dẫn push mã nguồn lên Git repository `nhimc0n/it-tools.git`.

## Version 2026.08.10-fiora.19

### Docker Build Fixes
- **Dockerfile**: Sửa lỗi `@pnpm/exe.linux-x64` trên Linux container bằng cách kích hoạt `corepack` và thêm cờ `--no-frozen-lockfile`.
- **Compose**: Loại bỏ thuộc tính `version` lỗi thời (obsolete warning) theo tiêu chuẩn Docker Compose v2.

## Version 2026.08.10-fiora.18

### Deployment Guidance
- **Dockge Remote Git Build**: Hướng dẫn cấu hình `compose.yaml` cho Dockge xây dựng trực tiếp từ GitHub repository URL (`nhimc0n/it-tools.git#main`).

## Version 2026.08.10-fiora.17

### Deployment Configuration
- **Docker Network**: Cập nhật tệp [`compose.yaml`](file:///Users/thang.dc/Documents/GitHub/it-tools/compose.yaml) và [`docker-compose.yml`](file:///Users/thang.dc/Documents/GitHub/it-tools/docker-compose.yml) tích hợp mạng Docker có sẵn `proxy_network` (external) cho Dockge & Reverse Proxy.

## Version 2026.08.10-fiora.16

### Deployment Support
- **Dockge**: Tạo tệp [`compose.yaml`](file:///Users/thang.dc/Documents/GitHub/it-tools/compose.yaml) chuẩn định dạng cho trình quản lý Dockge trên Rocky Linux host (phục vụ tại cổng `6688`).

## Version 2026.08.10-fiora.15

### UI Refinements & Features
- **fiora-vat-calculator**:
  - Thêm nút sao chép nhanh (Icon Clipboard) tại từng dòng kết quả (Giá trước thuế, Tiền thuế VAT, Tổng thanh toán).
  - Loại bỏ dấu `+` đằng trước số tiền thuế VAT cho sạch đẹp và nhất quán.
- **UI Standard**: Đưa bán kính bo tròn góc (`border-radius`) từ `rounded-lg` về `rounded` tiêu chuẩn đồng nhất với thiết kế tổng thể của `it-tools`.

## Version 2026.08.10-fiora.14

### UI Refinements
- **fiora-number-to-words**: Bỏ các chú thích phụ `(Chuẩn chính tả)` và `(Chuẩn kế toán)` trong tiêu đề các thẻ kết quả cho gọn gàng.

## Version 2026.08.10-fiora.13

### Features & UI Enhancements
- **fiora-number-to-words**:
  - Sắp xếp lại thứ tự kết quả theo chuẩn kế toán: **Tiếng Việt -> Tiếng Trung (Đại tả + Pinyin) -> Tiếng Anh**.
  - Tối ưu chiều cao ô chứa kết quả (`h-10`) bằng chuẩn chiều cao với nút bấm Sao chép (Icon Clipboard) giúp giao diện gọn gàng và cân đối.

## Version 2026.08.10-fiora.12

### Features & UI Enhancements
- **fiora-number-to-words**:
  - Chuyển đổi bố cục kết quả thành 1 hàng dọc stacked (Tiếng Việt -> Tiếng Anh -> Tiếng Trung).
  - Thêm chức năng đổi số tiền thành chữ Tiếng Anh theo chuẩn kế toán (`convertEn`).
  - Thêm dòng hiển thị Pinyin đọc tiếng Trung bên dưới kết quả (có định dạng `select-none` không copy được).
  - Thay thế chữ nút "Sao chép" thành Icon Clipboard nút bấm tối giản.

## Version 2026.08.10-fiora.11

### Features & UI Enhancements
- **accounting tools**:
  - Định dạng hiển thị dấu phẩy phân cách hàng nghìn (ví dụ `1,500,000`) tự động trong ô nhập số tiền cho 2 công cụ Đổi số thành chữ và Tính thuế VAT.
  - Thêm nút sao chép nhanh số tiền gốc không chứa dấu phẩy (ví dụ `1500000`) dạng plain text.
  - Giữ nguyên định dạng sao chép thủ công (bôi đen text) chứa dấu phẩy dạng plain text không dính style.
  - Chuẩn hóa font chữ và giao diện thẻ kết quả khớp hoàn toàn với phong cách tối giản nguyên bản của `it-tools`.

## Version 2026.08.10-fiora.10

### Bug Fixes
- **ascii-text-drawer**: Loại bỏ dấu gạch chéo cuối URL `fontPath` trong [`ascii-text-drawer.vue`](file:///Users/thang.dc/Documents/GitHub/it-tools/src/tools/ascii-text-drawer/ascii-text-drawer.vue) tránh tạo URL 400 Bad Request bị trùng dấu gạch chéo (`//3D-ASCII.flf`).

## Version 2026.08.10-fiora.9

### Bug Fixes
- **ascii-text-drawer**: Sửa dấu gạch chéo cuối URL `fontPath` trong `figlet.defaults` và xử lý bắt lỗi callback an toàn triệt tiêu lỗi `TypeError: Cannot read properties of undefined (reading 'reduce')`.

## Version 2026.08.10-fiora.8

### Bug Fixes & Web Workers
- **monaco-editor**: Tạo plugin khởi tạo Web Workers [`src/plugins/monaco.plugin.ts`](file:///Users/thang.dc/Documents/GitHub/it-tools/src/plugins/monaco.plugin.ts) và import vào [`src/main.ts`](file:///Users/thang.dc/Documents/GitHub/it-tools/src/main.ts) giúp Monaco Editor (`c-diff-editor`) chạy mượt mà trên Web Worker không làm đóng băng UI.

## Version 2026.08.10-fiora.7

### Bug Fixes
- **ascii-text-drawer**:
  - Sửa kiểu dữ liệu prop `:searchable="true"` thành kiểu boolean trong [`ascii-text-drawer.vue`](file:///Users/thang.dc/Documents/GitHub/it-tools/src/tools/ascii-text-drawer/ascii-text-drawer.vue).
  - Đổi CDN tải font Figlet từ unpkg sang jsdelivr không bị trùng dấu gạch chéo `/` và triệt tiêu lỗi CORS / 404.

## Version 2026.08.10-fiora.6

### Bug Fixes & Polyfills
- **crypto**: Tạo module polyfill Web Crypto [`src/utils/crypto-polyfill.ts`](file:///Users/thang.dc/Documents/GitHub/it-tools/src/utils/crypto-polyfill.ts) cho `crypto.randomBytes`, cấu hình alias trong [`vite.config.ts`](file:///Users/thang.dc/Documents/GitHub/it-tools/vite.config.ts) triệt tiêu lỗi `browser-external:crypto` khi sử dụng công cụ Bcrypt.

## Version 2026.08.10-fiora.5

### Bug Fixes & Polyfills
- **vite**: Cấu hình polyfill cho module `path` (`path-browserify`) trong [`vite.config.ts`](file:///Users/thang.dc/Documents/GitHub/it-tools/vite.config.ts) triệt tiêu cảnh báo `browser-external:path: Module "path" has been externalized for browser compatibility`.

## Version 2026.08.10-fiora.4

### Bug Fixes & Warnings Cleaned
- **icons**: Thay thế `@tabler/icons-vue` bằng `@vicons/tabler` trong [`Home.page.vue`](file:///Users/thang.dc/Documents/GitHub/it-tools/src/pages/Home.page.vue) triệt tiêu cảnh báo `[Vue warn]: Invalid prop: type check failed for prop "component"`.

## Version 2026.08.10-fiora.3

### Features & UI Cleanups
- **branding**: Đổi tên thương hiệu và Logo góc trên bên trái từ `IT-Tools` thành `YURI TOOLS` ([`base.layout.vue`](file:///Users/thang.dc/Documents/GitHub/it-tools/src/layouts/base.layout.vue) & [`index.html`](file:///Users/thang.dc/Documents/GitHub/it-tools/index.html)).
- **i18n & Refactoring**:
  - Loại bỏ tiền tố "Fiora" khỏi tiêu đề 2 công cụ kế toán mới (`Đổi số thành chữ` & `Tính thuế VAT`).
  - Hỗ trợ đa ngôn ngữ (Tiếng Việt, Tiếng Anh, Tiếng Trung) 100% cho giao diện của 2 công cụ kế toán mới.
  - Khai báo bổ sung tất cả 8 tệp i18n key còn thiếu (`xml-to-json`, `json-to-xml`, `markdown-to-html`, `safelink-decoder`, `email-normalizer`, `regex-tester`, `regex-memo`, `ascii-text-drawer`) trong `en.yml`, `vi.yml`, và `zh.yml` triệt tiêu toàn bộ cảnh báo Intlify.

## Version 2026.08.10-fiora.2

### Bug Fixes & Warnings Cleaned
- **i18n**: Bổ sung các locale key còn thiếu (`tools.fiora-number-to-words` & `tools.fiora-vat-calculator`) trong `en.yml`, `vi.yml`, và `zh.yml` triệt tiêu cảnh báo `[intlify] Not found key`.
- **icons**: Thay thế `@tabler/icons-vue` bằng `@vicons/tabler` trong [`NavbarButtons.vue`](file:///Users/thang.dc/Documents/GitHub/it-tools/src/components/NavbarButtons.vue) loại bỏ cảnh báo Vue prop warning `type check failed for prop "component"`.

## Version 2026.08.10-fiora.1

### Bug Fixes
- **tools-registry**: Fix `xmlFormatter` and `yamlViewer` missing imports in `src/tools/index.ts` causing `Uncaught ReferenceError`.

## Version 2026.08.10-fiora

### Fiora Accounting Features
- **new category**: `Fiora Accounting` added at the top of category list.
- **new tool**: `Fiora - Đổi số thành chữ` (`/fiora-number-to-words`) — Đổi số tiền VNĐ sang chữ Tiếng Việt chính tả và Tiếng Trung Đại Tả (大写) chống sửa đổi.
- **new tool**: `Fiora - Tính thuế VAT` (`/fiora-vat-calculator`) — Tính thuế VAT (Thuận & Ngược) với quy tắc làm tròn theo Nghị định 174/2016/NĐ-CP (Round-Half-Up).

## Version 2024.10.22-7ca5933

### Features
- **new tool**: Regex Tester (and Cheatsheet) (#1030) (f5c4ab1)
- **new tool**: Markdown to HTML (#916) (87984e2)
- **new-tool**: add email normalizer (#1243) (318fb6e)
- **new tools**: JSON to XML and XML to JSON (#1231) (f1a5489)
- **lorem-ipsum**: add button to refresh text lorem-ipsum (#1213) (e1b4f9a)
- **base64**: Base64 enhancements (#905) (30144aa)

### Bug fixes
- **favorites**: store favorites regardless of languages (#1202) (7ca5933)
- **emoji-picker**: debounced search input (#1181) (76a19d2)
- **format-transformer**: set overflow for output area width (#787) (b430bae)
- **jwt-parser**: prevent UI overflow on small screen (#1095) (dd4b7e6)

### Refactoring
- **regex-tester**: better description (7251700)

### Chores
- **sponsors**: fern sponsor banners (#1314) (f962c41)
- **readme**: updated logos (#1294) (6709498)

### Documentation
- **author**: updated author links (#1316) (1c35ac3)

## Version 2024.05.13-a0bc346

### Features
- **i18n**: added German translation (#1038) (2c2fb21)
- **new tool**: Outlook Safelink Decoder (#911) (d3b32cc)
- **new tool**: ascii art generator (#886) (fe349ad)
- **i18n**: get locales on build (#880) (dc04615)
- **i18n**: added vi tools translations (#876) (079aa21)
- **i18n**: added zh tools translations (#874) (9c6b122)
- **i18n**: added missing locale files in tools (#863) (7f5fa00)
- **i18n**: added vietnamese language (#859) (1334bff)
- **i18n**: added spanish language (#854) (85b50bb)
- **i18n**: added portuguese language (#813) (c65ffb6)
- **i18n**: added ukrainian language (#827) (693f362)
- **new-tool**: yaml formater (#779) (fc06f01)
- **new-tool**: added unicode conversion utilities (#858) (c46207f)

### Bug fixes
- **language**: English language cleanup (#1036) (221ddfa)
- **url-encoder, validation**: typo in validation of url-encoder.vue #1024 (cb5b462)
- **integer base converter**: support bigint (#872) (9eac9cb)
- **bcrypt tool**: allow salt rounds up to 100 (#987) (23f82d9)

### Refactoring
- **lint**: removed extra semi (33e5294)
- **auto-imports**: regen auto imports (1242842)
- **home**: lightened tool cards (#882) (a07806c)
- **home**: removed n-grid to prevent layout shift (#881) (10e56b3)
- **i18n**: added locales per tool (#861) (95698cb)

### Chores
- **issues**: prevent empty issues (#1078) (a0bc346)
- **issues**: removed old issue templates (#1077) (5a7b0f9)
- **node**: upgraded node version in CI workflows (b59942a)
- **version**: release 2024.05.10-33e5294 (38d5687)
- **issues**: improved issues template (2852c30)
- **issues**: improved bug issue template (#1046) (a799234)

### Documentation
- **changelog**: update changelog for 2024.05.10-33e5294 (9dfd347)

## Version 2023.12.21-5ed3693

### Features

- **i18n**: improve chinese i18n (#757) (2e56641)
- **i18n**: add tooltip and favoriteButton i18n (#756) (a1037cf)
- **i18n**: add Chinese translation base (#718) (8f99eb6)
- **new tool**: pdf signature checker (#745) (4781920)
- **new tool**: numeronym generator (#729) (e07e2ae)

### Bug fixes

- **jwt-parser**: jwt claim array support (#799) (5ed3693)
- **camera-recorder**: stop camera on navigation (#782) (80e46c9)
- **doc**: updated create new tool command in readme (#762) (7a70dbb)
- **base64-file-converter**: fix downloading of index.html content without data preambula (#750) (043e4f0)
- **docker**: rollback armv7 in docker releases (#741) (205e360)
- **eta**: corrected example (#737) (821cbea)

### Refactoring

- **about, i18n**: improved i18n dx with markdown (#753) (bd3edcb)
- **token, i18n**: complete fr translation (#752) (de1ee69)
- **uuid generator**: uuid version picker (#751) (38586ca)
- **case converter**: no split on lowercase, uppercase and mocking case (#748) (ca43a25)
- **ui**: replaced legacy n-upload with c-file-upload (#747) (7fe47b3)
- **token**: added password in token generator keywords (#746) (16ffe6b)
- **bcrypt**: fix input label align (#721) (093ff31)

### Chores

- **deps**: switched from oui to oui-data for mac address lookup (#693) (0fe9a20)
- **deps**: update unocss monorepo to ^0.57.0 (#638) (2e396d8)
- **docker**: added armv7 plateform for docker releases (#722) (fe1de8c)

## Version 2023.11.02-7d94e11

### Features

- **i18n**: language selector (#710) (e86fd96)

### Bug fixes

- **dockerfile**: revert replacement of nginx image with non-privileged one (#716) (7d94e11)
- **encryption**: alert on decryption error (#711) (02b0d0d)

### Refactoring

- **math-evaluator**: improved description (e87f4b1)
- **math-evaluator**: improved search and UX (#713) (58de897)

## Version 2023.11.01-e164afb

### Features

- **command-palette**: clear prompt on palette close (#708) (d013696)
- **command-palette**: added about page in command palette (99b1eb9)
- **new tool**: random MAC address generator (#657) (cc3425d)
- **case-converter**: added mocking case (#705) (681f7bf)
- **date-converter**: added excel date time format (#704) (f5eb7a8)
- **i18n**: token generator (#688) (02e68d3)
- **i18n**: home page (#687) (00562ed)
- **i18n**: support for i18n in .ts files (#683) (ebb4ec4)
- **i18n**: tool card (#682) (84a4a64)
- **i18n**: about page (#680) (a2b53c2)
- **i18n**: 404 page (#679) (35563b8)
- **new tool**: text to ascii converter (#669) (b2ad4f7)
- **new tool**: ULID generator (#623) (5c4d775)
- **new tool**: add wifi qr code generator (#599) (0eedce6)
- **new tool**: iban validation and parser (#591) (3a63837)
- **new tool**: text diff and comparator (#588) (81bfe57)

### Bug fixes

- **deps**: fix issue on slugify (#593) (#673) (720201a)
- **deps**: update dependency monaco-editor to ^0.43.0 (#620) (e371ef7)
- **deps**: update dependency sql-formatter to v13 (#606) (c7d4562)

### Refactoring

- **ui**: better ui demo preview menu (#664) (015c673)
- **color-converter**: improved color-converter UX (#701) (abb8335)
- **docker**: improved docker config (#700) (020e9cb)
- **c-table**: added description on c-table for accessibility (b408df8)
- **ci**: reduced timeout in e2e (#666) (88b8818)
- **ui**: new c-table ui component (#665) (ee4c853)
- **ui**: removed n-page-header component in user-agent parser (#663) (cbf58fd)
- **ui**: removed n-p components in about page (#662) (a757a51)
- **ui**: switched naive tooltip components to custom ones (#661) (025f556)
- **spelling**: minor corrections to phrasing/spelling (#596) (8a30b6b)
- **i18n**: merge tools scoped locales with global ones (#612) (233d556)
- **c-key-value-list**: got rid of table for layout (#611) (7ab9204)
- **CI**: run e2e against built app and no longer vercel (#610) (18dd140)
- **bcrypt**: fix typo (#604) (e18bae1)

### Chores

- **deps**: clean unused dependencies (#709) (e164afb)
- **deps**: update docker/setup-qemu-action action to v3 (#627) (4365226)
- **deps**: update docker/setup-buildx-action action to v3 (#626) (57ecda1)
- **deps**: update docker/login-action action to v3 (#625) (d8d7a3b)
- **deps**: update docker/build-push-action action to v5 (#624) (d36b18f)
- **deps**: update dependency node to v18.18.2 (#674) (eea9f91)
- **deps**: update dependency node to v18.18.0 (#636) (2d2dffb)
- **deps**: update actions/checkout action to v4 (#613) (4972159)
- **deps**: update dependency unplugin-icons to ^0.17.0 (#609) (f035f48)
- **deps**: update dependency @intlify/unplugin-vue-i18n to ^0.13.0 (#597) (d1dff42)
- **deps**: update dependency @antfu/eslint-config to ^0.41.0 (#585) (a9cd91c)
- **deps**: update dependency typescript to ~5.2.0 (#587) (f3e14fc)

### Doc

- **readme**: added contributors list (#622) (557b304)
- **hosting**: added cloudron in the other hosting solutions section (#589) (06c3547)

## Version 2023.08.21-6f93cba

### Features

- **copy**: support legacy copy to clipboard for older browser (#581) (6f93cba)
- **new tool**: string obfuscator (#575) (c58d6e3)

### Bug fixes

- **deps**: update dependency sql-formatter to v12 (#520) (2bcb77a)

### Chores

- **deps**: switched to fucking typescript v5 (#501) (76b2761)
- **deps**: update dependency @antfu/eslint-config to ^0.40.0 (#552) (6ff9a01)
- **deps**: update dependency prettier to v3 (#564) (a2b9b15)
- **deps**: removed @typescript-eslint/parser (#563) (144f86e)
- **deps**: removed ts-pattern (#565) (0f1f659)

## Version 2023.08.16-9bd4ad4

### Features

- **Case Converter**: Add lowercase and uppercase (#534) (7b6232a)
- **new tool**: emoji picker (#551) (93f7cf0)
- **ui**: added c-select in the ui lib (#550) (dfa1ba8)
- **new-tool**: password strength analyzer (#502) (a9c7b89)
- **new-tool**: yaml to toml (e29b258)
- **new-tool**: json to toml (ea50a3f)
- **new-tool**: toml to yaml (746e5bd)
- **new-tool**: toml to json (c7d4f11)
- **command-palette**: random tool action (ec4c533)
- **config**: allow app to run in a subfolder via BASE_URL (#461) (6304595)
- **new-tool**: percentage calculator (#456) (b9406a4)
- **new-tool**: json to csv converter (69f0bd0)
- **new tool**: xml formatter (#457) (a6bbeae)
- **chmod-calculator**: added symbolic representation (#455) (f771e7a)
- **enhancement**: use system dark mode (#458) (cf7b1f0)
- **phone-parser**: searchable country code select (d2956b6)
- **new tool**: camera screenshot and recorder (34d8e5c)
- **base64-string-converter**: switch to encode and decode url safe base64 strings (#392) (0b20f1c)

### Bug fixes

- **deps**: update dependency uuid to v9 (#566) (5e12991)
- **deps**: update dependency mathjs to v11 (#519) (7924456)
- **deps**: update dependency @vueuse/router to v10 (#516) (ea0f27c)
- **copy**: prevent shorthand copy if source is present in useCopy (#559) (86e964a)
- **c-lib**: hide component library shortcut link in non-dev (#557) (56d74d0)
- **emoji picker**: fix copy button (#556) (e5d0ba7)
- **deps**: update dependency @vueuse/head to v1 (#515) (d12dd40)
- **deps**: update dependency country-code-lookup to ^0.1.0 (#493) (8c72e69)
- **deps**: update dependency @vueuse/head to ^0.9.0 (#492) (cec9dea)
- **i18n**: fallback for demo i18n (12d9e5d)
- **typos**: fixed more typos & uppercase JSON (#475) (9526ed8)
- **about**: typos and wording (#474) (7068610)
- **mime-types**: typos (#470) (c4cec9e)
- **sonar**: took down minor sonar warning (4cbd7ac)
- **readme**: typo (105b21b)
- **ipv4-range-expander**: calculate correct for ip addresses where the first octet is lower than 128 (#405) (8c92d56)
- **ipv4-converter**: removed readonly on input (7aed9c5)

### Refactoring

- **navbar**: consistent spacing in navbar buttons (#507) (30f88fc)
- **ui**: remove n-text (#506) (72c98a3)
- **ui**: replaced some n-input to c-input (#505) (05ea545)
- **json-viewer**: input monospace font (#485) (9125dcf)
- **search**: command palette design (#463) (bcb98b3)
- **c-input-text**: force usage of props with default (1e2a35b)
- **naming**: prevent auto import conflicts for git memo (45c2474)
- **imports**: removed unnecessary imports to vue (fe61f0f)
- **ui**: removed all n-space (4d2b037)
- **ui**: replaced some n-input with c-input-text (f7fc779)

### Chores

- **deps**: update dependency vitest to ^0.34.0 (#562) (9bd4ad4)
- **deps**: update dependency node to v18.17.1 (#560) (65a9474)
- **deps**: update dependency unocss to ^0.55.0 (#561) (85cc7a8)
- **deps**: update dependency @unocss/eslint-config to ^0.55.0 (#553) (4268e25)
- **deps**: update dependency @intlify/unplugin-vue-i18n to ^0.12.0 (#526) (d1c8880)
- **deps**: update docker/login-action action to v2 (#512) (99bc84c)
- **deps**: update dependency jsdom to v22 (#499) (cd5a503)
- **deps**: update dependency @vitejs/plugin-vue-jsx to v3 (#497) (1a60236)
- **deps**: update dependency @vitejs/plugin-vue to v4 (#496) (a249421)
- **deps**: update dependency vite-plugin-pwa to ^0.16.0 (#488) (6498c9b)
- **deps**: update dependency vite to v4 (#503) (f40d7ec)
- **ci**: e2e against vercel deployement (#518) (2e28c50)
- **e2e**: execute e2e against built app (#511) (cf382b5)
- **deps**: update github/codeql-action action to v2 (#513) (0152583)
- **deps**: update node.js to v18 (#514) (38cb61d)
- **deps**: switched from vite-plugin-md to vite-plugin-vue-markdown (#510) (354aed6)
- **deps**: update dependency workbox-window to v7 (#509) (6b8682f)
- **deps**: update dependency vite-svg-loader to v4 (#508) (9e8349d)
- **deps**: update dependency typescript to ~4.9.0 (#481) (f440507)
- **deps**: update dependency vue-tsc to ^0.40.0 (#490) (b0d9a3e)
- **deps**: updated unplugin-auto-import (#504) (5c3bebf)
- **deps**: removed start-server-and-test dependency (8df7cd0)
- **deps**: update dependency c8 to v8 (#498) (6bda2ca)
- **deps**: update dependency @types/jsdom to v21 (#495) (994a1c3)
- **deps**: update node.js to v16.20.1 (#491) (05edaf4)
- **deps**: update dependency vitest to ^0.32.0 (#489) (49eacea)
- **deps**: update actions/checkout action to v3 (#494) (3f7d469)
- **deps**: update dependency unplugin-vue-components to ^0.25.0 (#484) (5f21908)
- **deps**: update dependency unplugin-auto-import to ^0.16.0 (#483) (6cb0845)
- **deps**: update dependency unocss to ^0.53.0 (#482) (38710dc)
- **deps**: update dependency @unocss/eslint-config to ^0.53.0 (#478) (282cfc4)
- **deps**: added renovate.json (#477) (363c2e4)
- **i18n**: tool scoped locales (#471) (1b038c7)
- **wysiwyg-editor**: update tiptap dependencies (732da08)
- **i18n**: setup i18n plugin config (ebfb872)
- **config**: netlify deployment support (#443) (93799af)
- **ci**: shard e2e tests (962a6d6)
- **lint**: switched to a better lint config (33c9b66)

### Refacor

- **transformers**: use monospace font for JSON and SQL text areas (#476) (ba4876d)

### Documentation

- **ide**: updated vscode extensions settings (#472) (847323c)

### Chors

- **deps**: updated vueuse dependency version (8515c24)

## Version 2023.05.14-77f2efc

### Features

- **list-converter**: a small converter who deals with column based data and do some stuff with it (#387) (83a7b3b)
- **new tool**: phone parser and normalizer (ce3150c)

### Bug fixes

- **phone-parser**: use default country code (a43c546)
- **home**: prevent weird blue border on card (3f6c8f0)

### Refactoring

- **ui**: replaced some n-input with c-input-text (77f2efc)

### Chores

- **issues**: updated new tool request issue template (edae4c6)

### Ui-lib

- **new-component**: added text input component in the c-lib (aad8d84)
- **button**: size variants (401f13f)

## Version 2023.04.23-92bd835

### Features

- **ui-lib**: demo pages for c-lib components (92bd835)
- **new-tool**: diff of two json objects (362f2fa)
- **ipv4-range-expander**: expands a given IPv4 start and end address to a valid IPv4 subnet (#366) (df989e2)
- **date converter**: auto focus main input (6d22025)

### Bug fixes

- **ts**: cleaned legacy typechecking warning (e88c1d5)
- **mac-address-lookup**: added copy handler on button click (c311e38)

### Refactoring

- **ui-lib**: prevent c-button to shrink (61ece23)
- **ui**: replaced naive ui cards with custom ones (f080933)
- **clean**: removed unused lodash import (bb32513)
- **clean**: removed useless br tags (74073f5)
- **ui**: getting ride of naive ui buttons (c45bce3)

## Version 2023.04.14-dbad773

### Features

- **new-tool**: http status codes (8355bd2)

### Refactoring

- **uuid-generator**: prevent NaN in quantity (6fb4994)

### Chores

- **release**: create a github release on new version (dbad773)
- **version**: reset CHANGELOG content to support new format (85cb0ff)

## Version 2023.04.14-f9b77b7

### Features

- **new-tool**: http status codes (8355bd2)

### Refactoring

- **uuid-generator**: prevent NaN in quantity (6fb4994)

### Chores

- **release**: create a github release on new version (f9b77b7)
- **version**: reset CHANGELOG content to support new format (85cb0ff)

## Version 2023.04.14-2f0d239

### Features

- **new-tool**: http status codes (8355bd2)

### Refactoring

- **uuid-generator**: prevent NaN in quantity (6fb4994)

### Chores

- **release**: create a github release on new version (2f0d239)
- **version**: reset CHANGELOG content to support new format (85cb0ff)

## Version 2023.04.14-474cae4

### Features

- **new-tool**: http status codes (8355bd2)

### Refactoring

- **uuid-generator**: prevent NaN in quantity (6fb4994)

### Chores

- **release**: create a github release on new version (474cae4)
- **version**: reset CHANGELOG content to support new format (85cb0ff)

## Version v2023.4.13-dce9ff9

_Diff not available_
