# BeeskyBase

Nền tảng API AI với giao diện tiếng Việt, Studio theo chức năng, tài liệu API và thanh toán MB Bank qua SePay.

- Web: https://api.beeskybase.com
- Tài liệu: https://api.beeskybase.com/docs
- Giới thiệu: https://api.beeskybase.com/about

## Phát triển local

Cần Docker Desktop. Tạo `.env.local-dev` (không commit) gồm `LOCAL_DB_PASSWORD` và `LOCAL_SESSION_SECRET` với các giá trị ngẫu nhiên riêng. Chạy `./start-local.ps1`; giao diện ở http://localhost:5173, backend ở http://localhost:3030. Dừng bằng `./stop-local.ps1`.

Kênh nhà cung cấp, API key, giá bán, tài khoản quản trị và cấu hình SePay được quản lý trong cơ sở dữ liệu qua trang quản trị. Repo không chứa dữ liệu VPS hoặc thông tin đăng nhập. Khi cài mới, cần thiết lập các cấu hình này riêng.

## Kiểm tra và đóng gói

Trong `web/`: `bun install --frozen-lockfile`, `bun check -b`, `bun run test`, `bun run build`.
Đóng gói từ mã nguồn bằng `docker build -t beeskybase:local .`. Cấu hình biến môi trường và cơ sở dữ liệu theo tài liệu triển khai của dự án.

## Mã nguồn và giấy phép

Phát triển từ New API (QuantumNous), giữ giấy phép AGPL-3.0 cùng các ghi nhận tác giả trong LICENSE, NOTICE và THIRD-PARTY-LICENSES.md. Xem README.md cho tài liệu nền tảng gốc.
