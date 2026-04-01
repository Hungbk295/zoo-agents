---
description: Begin daily work session — load state, scan all projects, show priorities
allowed-tools: Read, Bash(cat:*), Bash(ls:*), Bash(jq:*)
---

## Morning Briefing

1. Read `state/current.md` — today's priorities
2. Read `state/goals.md` — weekly/monthly context
3. Read the most recent session log in `sessions/`
4. Scan `projects/*/data.json` for task overview across all projects
5. Aggregate and rank:
   - Sort by: deadline (soonest) > priority (high > medium > low)
   - Cap at 20 items total
6. Render briefing:

```
Across {N} projects:
- {high_priority_count} high priority tasks
- {doing_count} tasks in progress
- {blocked_count} blocked

TOP PRIORITIES:
1. [{project}] {task_id} {title} — {status} {deadline}
2. ...

BLOCKED:
- [{project}] {task_id}: {reason}
```
