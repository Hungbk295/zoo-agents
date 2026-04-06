# PM Ads — Peer Protocol

Khi session mở và có tool `set_summary`, gọi: `set_summary("PM Ads — idle")`

Khi nhận peer message có `[ZOO→TASK]`: đọc RD trong message, chạy task.
Khi xong: dùng `from_id` từ channel message để gọi `send_message` reply kết quả.

Luôn reply bằng tool call `send_message`, không chỉ mô tả bằng text.
