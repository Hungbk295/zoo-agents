# Execute Checklist: zoo-create-project

Chạy qua checklist này sau khi tạo project. Mỗi item phải checked.

## Pre-flight
- [ ] Slug unique (không trùng trong `projects/`)
- [ ] Nếu git: clone thành công
- [ ] Nếu git: checkout đúng branch có code (không phải branch trống)

## Zoo Files
- [ ] `projects/<slug>/CLAUDE.md` — Static instructions
- [ ] `projects/<slug>/.claude/rules/01-soul.md` — identity, tone, scope, boundaries
- [ ] `projects/<slug>/.claude/rules/02-rules.md` — read order, task execution, Hard Gates, wrap protocol
- [ ] `projects/<slug>/.claude/rules/03-tools.md` — workflow commands, dev commands (nếu có), file structure
- [ ] `projects/<slug>/config.yaml` — project slug, pm_name, git_repo (nếu có)
- [ ] `projects/<slug>/data.json` — `{"backlog":[], "archive":[]}`
- [ ] `projects/<slug>/beads.json` — `[]`

## Commands
- [ ] `projects/<slug>/.claude/commands/prep.md`
- [ ] `projects/<slug>/.claude/commands/run.md`
- [ ] `projects/<slug>/.claude/commands/review.md`
- [ ] `projects/<slug>/.claude/commands/wrap.md`

## Folders
- [ ] `.claude/rules/` exists
- [ ] `.claude/commands/` exists
- [ ] `.claude/skills/` exists
- [ ] `rds/` exists
- [ ] `rds/completed/` exists
- [ ] `output/` exists

## Permissions
- [ ] `.claude/settings.local.json` — deny `/projects/**`, allow chỉ `/projects/<slug>/**`

## Registration — `.claude/rules/03-zoo-rules.md`
- [ ] Routing table có row mới với keywords → slug

## Registration — `ui/server.py`
- [ ] `REPOS` dict có entry mới với path, root, skills_dir, color

## Registration — `ui/index.html`
- [ ] `PM_ORDER` array có slug
- [ ] `CTP_REPO_COLORS` object có slug → color
- [ ] `PM_ICONS` object có slug → SVG icon
- [ ] `PM_DESCRIPTIONS` object có slug → display name

## Registration — `scripts/aliases.sh`
- [ ] Có alias `pm-<shortname>`
- [ ] Có alias `pm-<shortname>-codex`

## Verify
- [ ] `curl localhost:8765/api/repos` trả về slug
- [ ] `curl localhost:8765/api/data/<slug>` trả về data
- [ ] UI hiển thị project sau refresh

---

## Default Templates (cho scratch hoặc git repo không có README)

### .claude/rules/01-soul.md
```markdown
# <PM_NAME> — <DISPLAY_NAME>

## Identity
Tôi là <PM_NAME>. Chuyên về <SCOPE>.
Tôi nhận task đã scoped từ Zoo, execute, report kết quả.

## Tone
Structured. Clear. Action-oriented.

## Scope
<SCOPE>

## Boundaries
- Không tạo task mới
- Không sửa task của project khác
```

### .claude/rules/02-rules.md
```markdown
# <PM_NAME> Operating Rules

## Read Order (mỗi session)
1. data.json → filter status "doing" trước, rồi "scoped"
2. RD của task (rd_path trong data.json)
3. .claude/skills/ nếu RD reference

## Task Execution
- Làm task status "doing" trước
- Nếu không có "doing", hỏi user muốn kéo "scoped" nào sang "doing"
- Không tự ý kéo "todo" hoặc "scoped" sang "doing"
- Mỗi task: prep → run → review → wrap

## Hard Gates
- KHÔNG được chuyển status → done nếu chưa qua review với user
- Review = present output cho user, chờ user confirm, rồi mới wrap
- Workflow bắt buộc: prep → run → review (chờ user) → wrap. KHÔNG skip phase nào.

## Wrap Protocol
1. Check done criteria trong RD
2. Ghi Execution Notes, Output, Final Summary vào RD
3. Update data.json: status → done, updated_at
4. Append bead vào beads.json
```

### .claude/rules/03-tools.md
```markdown
# <PM_NAME> Tools

## Workflow Commands
| Command | Description |
|---------|-------------|
| /prep   | Read RD, clarify, check dependencies |
| /run    | Execute task, update status |
| /review | Check output against done criteria |
| /wrap   | Summarize, mark done, update data.json + beads.json |

## File Structure
projects/<slug>/
├── CLAUDE.md              # Static instructions
├── .claude/
│   ├── rules/             # 01-soul.md, 02-rules.md, 03-tools.md
│   ├── commands/          # /prep, /run, /review, /wrap
│   └── skills/            # PM-specific auto-trigger skills
├── config.yaml, data.json, beads.json
├── rds/ + rds/completed/
└── output/
```

### config.yaml
```yaml
project: "<slug>"
pm_name: "<PM_NAME>"
jira_board: ""
jira_project_key: ""
slack_channel: ""
slack_summarize: true
git_repo: "<git_url or empty>"
git_branch: "<branch or empty>"
briefing_max_items: 5
priority_weight: 1.0
```

### data.json
```json
{
  "backlog": [],
  "archive": []
}
```

### beads.json
```json
[]
```

---

## SVG Icons (chọn theo scope)

### Generic (fallback)
```
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" /></svg>
```

### Code / Frontend
```
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>
```

### Marketing / Ads
```
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46" /></svg>
```

### Research / Academic
```
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>
```

## Color Palette (chưa dùng)
- `#f27a7a` — coral red
- `#7ac5f2` — sky blue
- `#f2c87a` — warm yellow
- `#7af2b5` — mint green
- `#c47af2` — light purple
- `#f2a07a` — peach
- `#7af2e0` — teal
