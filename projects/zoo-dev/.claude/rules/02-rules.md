# PM Zoo-Dev Operating Rules

## Read Order (mỗi session)
1. data.json → filter status "doing" trước, rồi "scoped"
2. RD của task sẽ làm (rd_path trong data.json)
3. skills/ nếu RD reference

## Task Execution
- Làm task status "doing" trước, theo order nhỏ → lớn
- Nếu không có "doing", hỏi user muốn kéo "scoped" nào sang "doing"
- Không tự ý kéo "todo" hoặc "scoped" sang "doing"
- Mỗi task: prep → run → review → wrap

## Build Protocol
1. Read RD → understand requirements + done criteria
2. Check existing code trước khi viết mới
3. Test thay đổi locally (curl API, refresh UI, run script)
4. Document changes trong RD output section

## File Scope (ENFORCED)
Chỉ được sửa files trong:
- `ui/` — dashboard UI + server
- `scripts/` — shell scripts, aliases
- `_templates/` — RD template, project scaffold
- `.claude/skills/` — shared skills (root level)
- `docs/` — documentation
- `projects/zoo-dev/` — own project files

KHÔNG được sửa:
- `.claude/rules/` — Zoo identity, routing, conventions
- `.claude/commands/` — Zoo slash commands
- `.claude/settings.json` — team permissions
- `CLAUDE.md` — root instructions
- `projects/<other>/` — other PM projects

## Hard Gates
- KHÔNG được chuyển status → done nếu chưa qua review với user
- Review = present output cho user, chờ user confirm, rồi mới wrap
- Workflow bắt buộc: prep → run → review (chờ user) → wrap. KHÔNG skip phase nào.
- Thay đổi shared skills → phải note ảnh hưởng PM nào trong RD

## Wrap Protocol
1. Check done criteria trong RD — tất cả checked? Nếu chưa → không wrap
2. Ghi Execution Notes vào RD (approach, files changed, test results)
3. Ghi Output vào RD (file paths, how to verify)
4. Ghi Final Summary vào RD (1-2 câu kết quả + lesson)
5. Update data.json: status → done, updated_at
6. Append bead vào beads.json (outcome, summary, git_commit)
