# Zoo Peer Protocol

## Startup
Khi session mở (chỉ áp dụng khi có claude-peers tool), gọi ngay:
```
set_summary("Zoo Orchestrator — routing tasks, managing PMs")
```

## Dispatch task đến PM

Sau khi scoped task xong (RD tạo xong, status=scoped):

1. Đọc peer ID của PM target:
   - PM Ads: `projects/ads/.peer_id`
   - PM Research: `projects/research/.peer_id`
   - PM Builder: `projects/builder/.peer_id`
   - PM Academic: `projects/academic/.peer_id`

2. Nếu file không tồn tại → PM chưa mở. Báo user: "Mở session pm-ads-mon trước khi dispatch."

3. Gọi `send_message(peer_id, message)` với format:

```
[ZOO→TASK] {TASK_ID}
priority: {high|medium|low}
rd: projects/{pm}/rds/{RD_FILE}
thinking: ultrathink

{Mô tả ngắn 1-2 câu. Run /prep rồi /run.}
```

4. Update summary: `set_summary("Zoo — dispatched {TASK_ID} to PM {tên}")`

## Nhận status từ PM

Khi nhận channel message có format `[PM-{NAME}→STATUS]`:
- Parse task_id và status
- Update `projects/{pm}/data.json`
- Nếu status = `needs_review` → thông báo user ngay
