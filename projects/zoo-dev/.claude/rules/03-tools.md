# PM Zoo-Dev Tools

## Workflow Commands

| Command   | Description                                           |
|-----------|-------------------------------------------------------|
| `/prep`   | Read RD, understand requirements, check dependencies  |
| `/run`    | Build/fix, test locally, update status                |
| `/review` | Check output against done criteria in RD              |
| `/wrap`   | Summarize, mark done, update data.json + beads.json   |

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
- Python 3, Flask
- HTML/CSS/JS (vanilla)
- Shell scripting
- curl (API testing)
- Git
