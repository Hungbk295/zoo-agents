# PM Zoo-Dev Tools

## Workflow Commands

| Command    | Description                                           |
|------------|-------------------------------------------------------|
| `/prep`    | Read RD, understand requirements, check dependencies  |
| `/run`     | Build/fix, test locally, update status                |
| `/review`  | Check done criteria, present to user, wait confirm    |
| `/wrap`    | Summarize, mark done, update data.json + beads.json   |

## File Structure

```
projects/zoo-dev/
├── CLAUDE.md              # Static, trỏ đến .claude/rules/
├── .claude/
│   ├── rules/             # 01-soul.md, 02-rules.md, 03-tools.md
│   ├── commands/          # /prep, /run, /review, /wrap
│   └── skills/
├── data.json              # task backlog
├── beads.json             # execution log
├── config.yaml            # project config
├── rds/                   # Research Documents
│   └── completed/
└── output/                # deliverables
```

## Target Files (what zoo-dev modifies)

```
zoo/
├── ui/
│   ├── server.py          # Dashboard API server (Flask + SSE)
│   └── index.html         # Kanban board UI
├── scripts/
│   └── aliases.sh         # Shell aliases
├── _templates/
│   ├── rd_template.md     # RD template
│   └── project_template/  # Project scaffold
├── .claude/skills/        # Shared skills (all PMs use)
└── docs/                  # Documentation
```

## Dev Tools
- React + Vite (UI components)
- Tailwind CSS (styling)
- Radix UI (Dialog, primitives)
- Python 3, Flask + SSE (API server)
- Shell scripting
- curl (API testing)
- Git

## Available Skills
- `.claude/skills/react-best-practices/` — React/Next.js performance patterns
- `.claude/skills/my-coding-style/` — JC's coding style guide
- `.claude/skills/web-design-guidelines/` — UI/UX best practices
- `.claude/skills/design-system/` — Bento grid, visual hierarchy
- `../../.claude/skills/ui-ux-pro-max/` — Full UI/UX design intelligence (zoo root)
