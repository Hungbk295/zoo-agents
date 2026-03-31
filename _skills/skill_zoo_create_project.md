# Skill: zoo-create-project

Zoo uses this to create a new project in the workspace.
Execute checklist: `_skills/exec_zoo_create_project.md`
**Path convention**: source files → `_sources/`, commands → `.claude/commands/`, skills → `.claude/skills/`

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
Register project (routing + server + UI)
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
| CLAUDE.md | `projects/<slug>/` | AUTO-GENERATED (cat từ _sources/) | Có (generated) |
| SOUL.md | `projects/<slug>/_sources/` | Sinh từ README hoặc template | Không |
| _rules.md | `projects/<slug>/_sources/` | Sinh từ README hoặc template | Không |
| tools.md | `projects/<slug>/_sources/` | Sinh từ README hoặc template | Không |
| AGENTS.md | `projects/<slug>/` | Luôn `@CLAUDE.md` | Không |
| config.yaml | `projects/<slug>/` | Sinh với git_repo nếu có | Không |
| tasks.json | `projects/<slug>/` | `{"tasks":[]}` | Không |
| beads.json | `projects/<slug>/` | `[]` | Không |
| prep.md | `projects/<slug>/.claude/commands/` | Copy từ PM template | Không |
| run.md | `projects/<slug>/.claude/commands/` | Copy từ PM template | Không |
| review.md | `projects/<slug>/.claude/commands/` | Copy từ PM template | Không |
| wrap.md | `projects/<slug>/.claude/commands/` | Copy từ PM template | Không |

### Folders cần tạo (nếu chưa có):
```bash
mkdir -p projects/<slug>/_sources
mkdir -p projects/<slug>/.claude/commands
mkdir -p projects/<slug>/.claude/skills
mkdir -p projects/<slug>/rds/completed
mkdir -p projects/<slug>/output
```

### Nội dung sinh từ README (Path A):
- **_sources/SOUL.md**: identity + tone + scope lấy từ project description. Tech stack context.
- **_sources/_rules.md**: tech conventions (stack, node version, package manager, linter), git flow, Hard Gates, wrap protocol.
- **_sources/tools.md**: dev commands từ README (install, start, build), workflow commands (/prep /run /review /wrap), file structure.
- **CLAUDE.md**: AUTO-GENERATED = `cat ../../_sources/_conventions.md _sources/_rules.md _sources/SOUL.md _sources/tools.md`
- **config.yaml**: điền `git_repo`, `git_branch`.
- **.claude/commands/**: copy prep.md, run.md, review.md, wrap.md từ existing PM.

### Nội dung template mặc định (Path B / no README):
Xem `exec_zoo_create_project.md` cho template đầy đủ.

---

## Step Register: Đăng ký project vào hệ thống

Tất cả steps dưới đây chạy **tự động, không hỏi user**.

### R1. Routing table
Thêm row vào `_sources/_zoo_rules.md` → Routing Table:
```
| <routing_keywords> | → <slug> |
```

### R2. Server — REPOS dict
Thêm entry vào `ui/server.py` → `REPOS`:
```python
"<slug>": {
    "path": BASE_DIR / "projects" / "<slug>" / "data.json",
    "root": BASE_DIR / "projects" / "<slug>",
    "skills_dir": BASE_DIR / "projects" / "<slug>" / "skills",
    "color": "<unique color>",
},
```
Color palette chưa dùng: `#f27a7a`, `#7ac5f2`, `#f2c87a`, `#7af2b5`, `#c47af2`

### R3. UI — PM_ORDER
Thêm `"<slug>"` vào array `PM_ORDER` trong `ui/index.html`.

### R4. UI — CTP_REPO_COLORS
Thêm entry vào `CTP_REPO_COLORS` trong `ui/index.html`:
```javascript
"<slug>": "<color>"
```

### R5. UI — PM_ICONS
Thêm SVG icon vào `PM_ICONS` trong `ui/index.html`.
Chọn icon phù hợp scope (code → terminal icon, research → search icon, etc.)
Fallback: dùng generic folder icon.

### R6. UI — PM_DESCRIPTIONS
Thêm entry vào `PM_DESCRIPTIONS` trong `ui/index.html`:
```javascript
"<slug>": "<display_name>"
```

---

## Step Verify: Kiểm tra

### V1. Curl test
```bash
curl -s http://localhost:8765/api/repos | grep <slug>
curl -s http://localhost:8765/api/data/<slug>
```

### V2. Checklist (từ exec file)
Chạy qua checklist trong `exec_zoo_create_project.md` → đảm bảo không miss.

### V3. Confirm
> "Project `<slug>` created. Routing registered. UI updated. Verified OK."

---

## Rules
- Chạy xuyên suốt từ đầu đến cuối. Chỉ dừng khi thiếu input bắt buộc.
- Slug phải unique — check trước khi tạo.
- KHÔNG ghi đè file có sẵn trong repo.
- Routing keywords không được trùng project khác.
- Luôn verify bằng curl sau khi register.
- Nếu server không chạy → skip verify, nhắc user start server.
