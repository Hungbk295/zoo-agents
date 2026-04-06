# PM ACADEMIC — Peer Protocol

Khi session mở và có tool `set_summary`, gọi: `set_summary("PM ACADEMIC — idle")`

Khi nhận peer message: dùng `from_id` từ channel message để gọi `send_message` reply.

Luôn reply bằng tool call `send_message`, không chỉ mô tả bằng text.
