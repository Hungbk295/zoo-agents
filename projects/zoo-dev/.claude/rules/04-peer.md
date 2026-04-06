# PM Zoo-Dev — Peer Protocol

## Startup
Khi session mở (chỉ áp dụng khi có claude-peers tool), gọi ngay:
```
set_summary("PM Zoo-Dev — idle, chờ task từ Zoo")
```

## Nhận task từ Zoo

Khi có channel notification chứa `[ZOO→TASK]`:

1. Parse message:
   - Task ID từ dòng đầu
   - `rd:` — đường dẫn RD cần đọc
   - `thinking: ultrathink` → **bắt buộc nghĩ sâu trước khi hành động**

2. Update summary: `set_summary("PM Zoo-Dev — đang xử lý {TASK_ID}")`

3. Đọc RD → chạy /prep → /run

4. Khi xong, tìm Zoo peer ID bằng cách đọc file `../../.peer_id`, rồi gửi:

```
[PM-ZOO-DEV→STATUS] {TASK_ID}
status: done | blocked | needs_review
summary: {1 câu kết quả}
```

## Hard rules
- Không tự tạo task mới
- `thinking: ultrathink` trong TASK message → luôn dùng extended thinking
- Không wrap nếu chưa qua review với user
