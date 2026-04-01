---
name: zoo-create-project
description: "Zoo tạo project mới trong workspace. Scaffold files, register routing/UI/aliases."
---

# Skill: zoo-create-project

Zoo uses this to create a new project in the workspace.
Execute checklist: `.claude/skills/zoo-create-project/CHECKLIST.md`
**Path convention**: rules → `.claude/rules/`, commands → `.claude/commands/`, skills → `.claude/skills/`

## When to Use
- User yêu cầu tạo project mới
- Keyword signals không match project nào hiện có trong routing table

## Flow Overview

```
Ask type (scratch/git)
  ├─ Git: clone → detect branch → checkout → read README
  └─ Scratch: ask info
       ↓
Generate Zoo files (from README or template)
       ↓
Register project (routing + server + UI + aliases)
       ↓
Verify (curl API + checklist)
       ↓
Confirm to user
```

**Nguyên tắc**: Chạy xuyên suốt. Chỉ dừng hỏi user khi thiếu thông tin bắt buộc. Không chờ user nhắc từng bước.

---

## Step 0: Hỏi loại project

> "Tạo project từ **scratch** hay **git repo**?"

Nếu user đưa git URL luôn → skip hỏi, vào thẳng Path A.

---

## Path A: Từ Git Repo

### A1. Clone repo
```bash
git clone <url> projects/<slug>
```
- slug = tên repo (hoặc user chỉ định)
- Check slug unique: `ls projects/` trước

### A2. Detect & checkout branch có code
Repo có thể có default branch trống (master empty). Phải check:
```bash
cd projects/<slug>
git log --oneline -1  # nếu empty → tìm branch khác
git branch -a         # list all remote branches
```
Ưu tiên checkout: `develop` > `main` > `master` > branch đầu tiên có commit.

### A3. Đọc README + package.json/config files
- Đọc `README.md` (hoặc `README`, `readme.md`)
- Đọc `package.json` / `requirements.txt` / `go.mod` / `Cargo.toml` (nếu có) → extract tech stack
- Nếu **không có README**: fallback sang template mặc định (giống Path B step B3)

### A4. Extract thông tin từ README
Từ README + config files, xác định:
- **display_name**: tên project
- **pm_name**: "PM " + tên ngắn
- **scope**: mô tả từ README
- **tech_stack**: languages, frameworks, tools
- **git_flow**: branching strategy (nếu có)
- **dev_commands**: install, start, build, test
- **routing_keywords**: sinh từ project name + tech stack

### A5. Tạo Zoo files
→ Chuyển sang Step Generate.

---

## Path B: Từ Scratch

### B1. Hỏi thông tin (1 lần duy nhất)
Hỏi gộp:
> "Cho tôi: tên project (slug), mô tả ngắn, và scope."

Từ đó tự sinh: display_name, pm_name, routing_keywords. Không hỏi thêm.

### B2. Scaffold
```bash
./scripts/new-project.sh <slug> "<display_name>" "<pm_name>" "<scope>"
```

### B3. Tạo Zoo files
→ Chuyển sang Step Generate (dùng template mặc định).

---

## Step Generate: Tạo Zoo files

Tạo trong `projects/<slug>/`. **KHÔNG ghi đè file có sẵn** (từ git clone).

### Files cần tạo:

| File | Location | Source | Ghi đè? |
|------|----------|--------|---------|
| CLAUDE.md | `projects/<slug>/` | Static team instructions | Có |
| 01-soul.md | `projects/<slug>/.claude/rules/` | Sinh từ README hoặc template | Không |
| 02-rules.md | `projects/<slug>/.claude/rules/` | Sinh từ README hoặc template | Không |
| 03-tools.md | `projects/<slug>/.claude/rules/` | Sinh từ README hoặc template | Không |
| config.yaml | `projects/<slug>/` | Sinh với git_repo nếu có | Không |
| data.json | `projects/<slug>/` | `{"backlog":[], "archive":[]}` | Không |
| beads.json | `projects/<slug>/` | `[]` | Không |
| prep.md | `projects/<slug>/.claude/commands/` | Copy từ PM template | Không |
| run.md | `projects/<slug>/.claude/commands/` | Copy từ PM template | Không |
| review.md | `projects/<slug>/.claude/commands/` | Copy từ PM template | Không |
| wrap.md | `projects/<slug>/.claude/commands/` | Copy từ PM template | Không |

### Folders cần tạo (nếu chưa có):
```bash
mkdir -p projects/<slug>/.claude/rules
mkdir -p projects/<slug>/.claude/commands
mkdir -p projects/<slug>/.claude/skills
mkdir -p projects/<slug>/rds/completed
mkdir -p projects/<slug>/output
```

### Nội dung sinh từ README (Path A):
- **.claude/rules/01-soul.md**: identity + tone + scope lấy từ project description. Tech stack context.
- **.claude/rules/02-rules.md**: tech conventions (stack, node version, package manager, linter), git flow, Hard Gates, wrap protocol.
- **.claude/rules/03-tools.md**: dev commands từ README (install, start, build), workflow commands (/prep /run /review /wrap), file structure.
- **CLAUDE.md**: Static brief instructions pointing to `.claude/rules/`.
- **config.yaml**: điền `git_repo`, `git_branch`.
- **.claude/commands/**: copy prep.md, run.md, review.md, wrap.md từ existing PM.

### Nội dung template mặc định (Path B / no README):
Xem `CHECKLIST.md` cho template đầy đủ.

---

## Step Register: Đăng ký project vào hệ thống

Tất cả steps dưới đây chạy **tự động, không hỏi user**.

### R1. Routing table
Thêm row vào `.claude/rules/03-zoo-rules.md` → Routing Table:
```
| <routing_keywords> | → <slug> |
```

### R2. Server — REPOS dict
Thêm entry vào `ui/server.py` → `REPOS`.

### R3-R6. UI updates
Thêm vào `ui/index.html`: PM_ORDER, CTP_REPO_COLORS, PM_ICONS, PM_DESCRIPTIONS.

### R7. Shell aliases
Thêm 2 alias vào `scripts/aliases.sh`:
```bash
alias pm-<shortname>='cd "$ZOO_ROOT/projects/<slug>" && claude'
alias pm-<shortname>-codex='cd "$ZOO_ROOT/projects/<slug>" && codex --dangerously-bypass-approvals-and-sandbox'
```

---

## Step Verify: Kiểm tra
Chạy qua checklist trong `CHECKLIST.md` → đảm bảo không miss.

## Rules
- Chạy xuyên suốt từ đầu đến cuối. Chỉ dừng khi thiếu input bắt buộc.
- Slug phải unique — check trước khi tạo.
- KHÔNG ghi đè file có sẵn trong repo.
- Routing keywords không được trùng project khác.
- Luôn verify bằng curl sau khi register.
