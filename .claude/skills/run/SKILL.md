---
name: run
description: "Execute task theo RD. Update status, ghi execution notes, check done criteria."
---

# Skill: run

Use when the RD is clear and you're ready to execute.

1. Update task state to execution:
   - `data.json` status → `doing`
   - `data.json` ticket snapshot:
     - `status` → `doing`
     - `phase` → `run`
     - `updated_at` → now
     - `current_focus` → câu ngắn mô tả việc đang làm
     - `last_update` → mốc tiến độ mới nhất
2. Read the RD requirements one more time.
3. Do the smallest correct version first.
4. Use the PM-specific skills listed in the RD.
5. Keep the RD as the detailed source of truth:
   - refine `Approach` when direction becomes clearer
   - append to `Execution Notes` continuously as a working log
6. Append a new `Execution Notes` line at every meaningful milestone:
   - after a decision
   - after a file edit / implementation step
   - after a verification step
   - when blocked
7. Format each execution log entry as one concise bullet with timestamp:
   - `- YYYY-MM-DD HH:mm ICT — did X / found Y / decided Z`
8. Check each done criteria as you complete it.
9. If blocked, note it in both places and stop:
   - RD: `Execution Notes` + `Revision Log`
   - `data.json`: `status=blocked`, `phase=run`, `current_focus`, `last_update`

**Rule:** Work from the RD, not from memory. The RD is the source of truth.
