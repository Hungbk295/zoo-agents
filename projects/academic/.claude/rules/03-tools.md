# PM Academic Tools

## Workflow Commands

| Command   | Description                                           |
|-----------|-------------------------------------------------------|
| `/prep`   | Read RD, understand paper context, check requirements |
| `/run`    | Execute revision/writing, update status to "doing"    |
| `/review` | Check output against done criteria in RD              |
| `/wrap`   | Summarize, mark done, update data.json + beads.json  |

## File Structure

```
projects/academic/
├── CLAUDE.md              # AUTO-GENERATED
├── .claude/
│   ├── rules/             # 01-soul.md, 02-rules.md, 03-tools.md
│   ├── commands/          # /prep, /run, /review, /wrap
│   └── skills/            # paper-revision, latex-formatting, reviewer-response
├── data.json             # task backlog
├── beads.json             # execution log
├── config.yaml            # project config
├── rds/                   # Research Documents
│   └── completed/
└── output/                # deliverables
```

## Academic Tools
- LaTeX compiler
- Citation management
- Statistical analysis (Python)
- Bilingual formatting
