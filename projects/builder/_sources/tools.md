# PM Builder Tools

## Workflow Commands

| Command   | Description                                           |
|-----------|-------------------------------------------------------|
| `/prep`   | Read RD, understand requirements, check dependencies  |
| `/run`    | Build, code, test — update status to "doing"          |
| `/review` | Check output against done criteria in RD              |
| `/wrap`   | Summarize, mark done, update tasks.json + beads.json  |

## File Structure

```
projects/builder/
├── CLAUDE.md              # AUTO-GENERATED
├── _sources/              # SOUL.md, _rules.md, tools.md
├── .claude/
│   ├── commands/          # /prep, /run, /review, /wrap
│   └── skills/            # script-automation, pipeline-build, testing
├── tasks.json             # task backlog
├── beads.json             # execution log
├── config.yaml            # project config
├── rds/                   # Research Documents
│   └── completed/
└── output/                # deliverables
```

## Build Tools
- Python, TypeScript, Shell
- MCP SDK (FastMCP, @modelcontextprotocol/sdk)
- Claude Code CLI
- Git
