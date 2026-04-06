---
name: wrap
description: "Close out task sau khi review passes. Finalize RD, update data.json."
---

# Skill: wrap

Use after review passes. Closes out the task.

1. Finalize the RD as the detailed record:
   - clean up `Execution Notes` only if needed, but keep the important working log
   - complete `Output`
   - complete `Final Summary`
   - confirm `Done Criteria`
2. Sync the final snapshot into `data.json` for the board:
   - `status` → `done`
   - `phase` → `wrap` or empty
   - `updated_at` → now
   - `ready` → `false`
   - `current_focus` → empty string or `wrapped`
   - `last_update` → one-line handoff update
   - `summary` → short summary derived from `Final Summary`
   - `output` → short deliverable path / output snapshot if useful
3. Note any lessons learned or decisions made in the RD, not in `data.json`.
4. If there are follow-up tasks, note them but don't create them (Zoo does that).
5. Leave the project folder clean.

**Rule:** A completed task should be fully documented — someone reading the RD later should understand what happened.

---

## Bước cuối: Notify Zoo (nếu có claude-peers)

Sau khi beads.json đã được ghi, hook sẽ tự động gửi notification về Zoo.

Nếu đang chạy trong `-mon` mode (có tool `send_message`), **bắt buộc gọi tool** thêm một lần để confirm:

```
send_message(
  to_id = <đọc từ ../../.peer_id>,
  message = "[PM-{TÊN}→STATUS] {TASK_ID}
status: done
summary: {Final Summary 1 câu}"
)
```

**QUAN TRỌNG:** Phải gọi tool thực sự — không được chỉ viết text mô tả rằng "tôi đã gửi".
