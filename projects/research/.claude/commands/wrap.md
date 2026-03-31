---
description: Wrap completed task — update RD, tasks.json, beads.json, git commit
allowed-tools: Read, Write, Bash(jq:*), Bash(git add:*), Bash(git commit:*), Bash(date:*)
---

## Wrap Phase

!`cat tasks.json | jq '.tasks[] | select(.status == "doing")'`

### Steps
1. Check done criteria trong RD — tất cả checked? Nếu chưa → STOP
2. Ghi **Execution Notes** vào RD (cách làm, skill dùng, vấn đề gặp)
3. Ghi **Output** vào RD (file, metrics, deliverable)
4. Ghi **Final Summary** vào RD (1-2 câu kết quả + lesson)
5. Update tasks.json: status → `done`, updated_at → today
6. Append bead vào beads.json:
   ```json
   {"task_id": "", "outcome": "done", "summary": "", "git_commit": "", "timestamp": ""}
   ```
7. Git commit: beads.json + RD

**Rule:** Task phải fully documented. Ai đọc RD sau cũng hiểu what happened.
