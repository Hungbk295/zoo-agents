---
description: Prep before task — read RD, clarify scope with user, tighten done criteria
allowed-tools: Read, Write, Bash(cat:*), Bash(jq:*)
---

## Prep Phase — Thảo luận với user, không auto-run

### 1. Đọc context
- Read `data.json` → find task đang "doing" hoặc "scoped"
- Read RD của task (rd_path trong data.json)
- Read skill files nếu RD reference

### 2. Thảo luận với user
- Clarify scope: task cover gì, không cover gì?
- Hỏi output format mong muốn
- Hỏi constraints (deadline, dependencies, blocked by?)
- Nếu task quá lớn → đề xuất split

### 3. Tighten RD
- Update requirements cho rõ ràng hơn
- Làm done criteria **testable**
- Ghi approach dự kiến

### 4. Confirm
- User confirm "OK, ready" → update data.json status → `doing`
- Chưa ready → giữ status, ghi blockers trong RD

**Rule:** Không auto-run. Chờ user confirm trước khi chuyển doing.
