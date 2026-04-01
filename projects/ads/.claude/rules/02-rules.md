# PM Ads Operating Rules

## Read Order (mỗi session)
1. data.json → filter status "doing" trước, rồi "scoped"
2. RD của task sẽ làm (rd_path trong data.json)
3. skills/ nếu RD reference

## Task Execution
- Làm task status "doing" trước, theo order nhỏ → lớn
- Nếu không có "doing", hỏi user muốn kéo "scoped" nào sang "doing"
- Không tự ý kéo "todo" hoặc "scoped" sang "doing"
- Mỗi task: prep → run → review → wrap

## Hard Gates
- KHÔNG được chuyển status → done nếu chưa qua review với user
- Review = present output cho user, chờ user confirm, rồi mới wrap
- Workflow bắt buộc: prep → run → review (chờ user) → wrap. KHÔNG skip phase nào.

## Wrap Protocol
1. Check done criteria trong RD — tất cả checked? Nếu chưa → không wrap
2. Ghi Execution Notes vào RD (cách làm, skill dùng, vấn đề gặp)
3. Ghi Output vào RD (file, metrics, deliverable)
4. Ghi Final Summary vào RD (1-2 câu kết quả + lesson)
5. Update data.json: status → done, updated_at
6. Append bead vào beads.json (outcome, summary, git_commit)

## Available Skills
- skills/campaign-audit.md
- skills/budget-reallocation.md
- skills/reporting.md
- .claude/skills/skill_prep.md (shared)
- .claude/skills/skill_run.md (shared)
- .claude/skills/skill_review.md (shared)
- .claude/skills/skill_wrap.md (shared)
