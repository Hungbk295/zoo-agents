---
description: Execute task — work from RD, update status, check done criteria as you go
allowed-tools: Read, Write, Bash(*)
---

## Run Phase

1. Update data.json status → `doing`
2. Read RD requirements one more time
3. Do the smallest correct version first
4. Check file scope — only modify allowed files (ui/, scripts/, _templates/, .claude/skills/, docs/)
5. Document approach in RD "Approach" section as you work
6. Test changes locally (curl API, refresh UI, run script)
7. Check each done criteria as you complete it
8. If blocked → note it, stop, update status → `blocked`

**Rule:** Work from the RD, not from memory. RD is source of truth.
**Rule:** Test before marking done — changes affect entire workspace.
