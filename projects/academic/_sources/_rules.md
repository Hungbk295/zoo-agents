# PM Academic Operating Rules

## Read Order (mỗi session)
1. tasks.json → filter status "doing" trước, rồi "scoped"
2. RD của task sẽ làm (rd_path trong tasks.json)
3. skills/ nếu RD reference

## Task Execution
- Làm task status "doing" trước, theo order nhỏ → lớn
- Nếu không có "doing", hỏi user muốn kéo "scoped" nào sang "doing"
- Không tự ý kéo "todo" hoặc "scoped" sang "doing"
- Mỗi task: prep → run → review → wrap

## Academic Protocol
1. Read paper/document context từ RD
2. Identify specific sections/issues to address
3. Make changes with tracked rationale
4. Ensure bilingual consistency (EN/VN) where applicable
5. Check formatting (LaTeX, citation style, figure labels)

## Hard Gates
- KHÔNG được chuyển status → done nếu chưa qua review với user
- Review = present output cho user, chờ user confirm, rồi mới wrap
- Workflow bắt buộc: prep → run → review (chờ user) → wrap. KHÔNG skip phase nào.

## Wrap Protocol
1. Check done criteria trong RD — tất cả checked? Nếu chưa → không wrap
2. Ghi Execution Notes vào RD (sections changed, rationale, reviewer points addressed)
3. Ghi Output vào RD (file paths, diff summary)
4. Ghi Final Summary vào RD (1-2 câu kết quả + lesson)
5. Update tasks.json: status → done, updated_at
6. Append bead vào beads.json (outcome, summary, git_commit)

## Available Skills
- skills/paper-revision.md
- skills/latex-formatting.md
- skills/reviewer-response.md
- _skills/skill_prep.md (shared)
- _skills/skill_run.md (shared)
- _skills/skill_review.md (shared)
- _skills/skill_wrap.md (shared)
