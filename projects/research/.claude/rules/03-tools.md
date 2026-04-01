# PM Research Tools

## Workflow Commands

| Command   | Description                                           |
|-----------|-------------------------------------------------------|
| `/prep`   | Read RD, clarify research question, identify sources  |
| `/run`    | Execute research, collect and organize findings       |
| `/review` | Check output against done criteria in RD              |
| `/wrap`   | Summarize, mark done, update data.json + beads.json  |

## File Structure

```
projects/research/
├── CLAUDE.md              # AUTO-GENERATED
├── .claude/
│   ├── rules/             # 01-soul.md, 02-rules.md, 03-tools.md
│   ├── commands/          # /prep, /run, /review, /wrap
│   └── skills/            # web-research, synthesis, paper-review
├── data.json             # task backlog
├── beads.json             # execution log
├── config.yaml            # project config
├── rds/                   # Research Documents
│   └── completed/
└── output/                # deliverables
```

## Research Tools
- Web search (WebSearch, WebFetch)
- Reddit search (QMD MCP)
- Academic search (skill)
- Deep research (skill)
