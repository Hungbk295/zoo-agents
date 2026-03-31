# PM Research Tools

## Workflow Commands

| Command   | Description                                           |
|-----------|-------------------------------------------------------|
| `/prep`   | Read RD, clarify research question, identify sources  |
| `/run`    | Execute research, collect and organize findings       |
| `/review` | Check output against done criteria in RD              |
| `/wrap`   | Summarize, mark done, update tasks.json + beads.json  |

## File Structure

```
projects/research/
├── CLAUDE.md              # AUTO-GENERATED
├── _sources/              # SOUL.md, _rules.md, tools.md
├── .claude/
│   ├── commands/          # /prep, /run, /review, /wrap
│   └── skills/            # web-research, synthesis, paper-review
├── tasks.json             # task backlog
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
