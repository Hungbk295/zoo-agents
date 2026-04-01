# Zoo Tools & Commands

## Available Commands

| Command   | Description                                      |
|-----------|--------------------------------------------------|
| `/start`  | Begin session — load state, show priorities      |
| `/end`    | End session — summarize, update state            |
| `/daily`  | Generate daily briefing from all PMs             |
| `/report` | Cross-project status report                      |
| `/update` | Sync state from external sources                 |

## Structure

```
zoo/
├── CLAUDE.md                # Static team instructions
├── .claude/
│   ├── settings.json        # Team permissions (committed)
│   ├── settings.local.json  # Personal permissions (gitignored)
│   ├── commands/            # Zoo slash commands (/start, /end, /task)
│   ├── rules/               # Auto-loaded instructions (conventions, soul, rules, tools)
│   └── skills/              # Skills (prep, run, review, wrap, rd-create, etc.)
├── _templates/              # RD template, project scaffold
├── projects/
│   ├── ads/                 # PM Ads
│   ├── research/            # PM Research
│   ├── builder/             # PM Builder
│   └── academic/            # PM Academic
├── sessions/                # session logs
├── state/                   # current priorities, goals
└── scripts/                 # automation scripts
```

## Cross-Project Operations
- Scan all `projects/*/data.json` for status overview
- Only Zoo creates/modifies tasks across projects
- PMs only modify their own project's data.json
