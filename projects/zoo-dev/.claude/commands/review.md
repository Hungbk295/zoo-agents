---
description: Review task output — check done criteria, present to user, wait for confirm
allowed-tools: Read, Bash(cat:*), Bash(jq:*)
---

## Review Phase

!`cat data.json | jq '.backlog[] | select(.status == "doing")'`

### Steps
1. Đọc lại **Done Criteria** trong RD
2. Check từng criterion — đã pass chưa? Mark `[x]` trong RD nếu pass
3. Nếu có criterion chưa pass → **STOP**, note lại, không proceed

### Present to user
- Liệt kê những gì đã làm
- Screenshot hoặc link demo nếu có (URL localhost, file path)
- Nêu rõ nếu có trade-off hoặc deviation khỏi RD

### Wait
**KHÔNG tự chuyển → done. KHÔNG tự wrap.**
Chờ user confirm "OK" hoặc "ship it" → rồi mới /wrap.

Nếu user request changes → note vào RD Revision Log, quay lại /run.

**Rule:** Review = trình bày output cho user, chờ user confirm. Hard gate.
