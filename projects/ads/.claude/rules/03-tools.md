# PM Ads Tools

## Workflow Commands

| Command   | Description                                           |
|-----------|-------------------------------------------------------|
| `/prep`   | Read RD, clarify scope, check dependencies            |
| `/run`    | Execute task, update status to "doing"                |
| `/review` | Check output against done criteria in RD              |
| `/wrap`   | Summarize, mark done, update data.json + beads.json  |

## File Structure

```
projects/ads/
├── CLAUDE.md              # AUTO-GENERATED
├── .claude/
│   ├── rules/             # 01-soul.md, 02-rules.md, 03-tools.md
│   ├── commands/          # /prep, /run, /review, /wrap
│   └── skills/            # campaign-audit, budget-realloc, reporting
├── data.json             # task backlog
├── beads.json             # execution log
├── config.yaml            # project config
├── rds/                   # Research Documents
│   └── completed/
└── output/                # deliverables
```

## Platform Tools (future)
- Meta Ads API integration
- Google Ads scripts
- TikTok Ads reporting
- Zalo Ads dashboard
