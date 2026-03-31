# PM Ads Tools

## Workflow Commands

| Command   | Description                                           |
|-----------|-------------------------------------------------------|
| `/prep`   | Read RD, clarify scope, check dependencies            |
| `/run`    | Execute task, update status to "doing"                |
| `/review` | Check output against done criteria in RD              |
| `/wrap`   | Summarize, mark done, update tasks.json + beads.json  |

## File Structure

```
projects/ads/
├── CLAUDE.md              # AUTO-GENERATED
├── _sources/              # SOUL.md, _rules.md, tools.md
├── .claude/
│   ├── commands/          # /prep, /run, /review, /wrap
│   └── skills/            # campaign-audit, budget-realloc, reporting
├── tasks.json             # task backlog
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
