---
description: End daily session — summarize progress, write session log, update priorities
allowed-tools: Read, Write, Bash(cat:*), Bash(ls:*), Bash(jq:*), Bash(date:*)
---

## End of Day

1. Scan `projects/*/tasks.json` for tasks worked on today (updated_at = today)
2. Create session log in `sessions/YYYY-MM-DD.md`:
   - Done today: tasks completed or progressed
   - Decisions: important choices made
   - Blocked: tasks that are stuck
   - Tomorrow: suggested focus for next day
3. Update `state/current.md` with tomorrow's priorities
4. Brief summary to user
