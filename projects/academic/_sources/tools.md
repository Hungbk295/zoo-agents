# PM Academic Tools

## Workflow Commands

| Command   | Description                                           |
|-----------|-------------------------------------------------------|
| `/prep`   | Read RD, understand paper context, check requirements |
| `/run`    | Execute revision/writing, update status to "doing"    |
| `/review` | Check output against done criteria in RD              |
| `/wrap`   | Summarize, mark done, update tasks.json + beads.json  |

## File Structure

```
projects/academic/
├── CLAUDE.md              # AUTO-GENERATED
├── _sources/              # SOUL.md, _rules.md, tools.md
├── .claude/
│   ├── commands/          # /prep, /run, /review, /wrap
│   └── skills/            # paper-revision, latex-formatting, reviewer-response
├── tasks.json             # task backlog
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
