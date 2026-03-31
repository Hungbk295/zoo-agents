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
├── CLAUDE.md                # AUTO-GENERATED (cat từ _sources/)
├── _sources/                # Source files cho generate CLAUDE.md
│   ├── _conventions.md
│   ├── _zoo_soul.md
│   ├── _zoo_rules.md
│   └── _zoo_tools.md
├── .claude/commands/        # Zoo slash commands (/start, /end, /task)
├── _skills/                 # Zoo skill definitions (rd_create, rd_index, create_project)
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
- Scan all `projects/*/tasks.json` for status overview
- Only Zoo creates/modifies tasks across projects
- PMs only modify their own project's tasks.json
