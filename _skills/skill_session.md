# Skill: session

Zoo uses this for daily session management: /start, /end, /update, /report.

## /start (morning)

1. Read `state/current.md` — today's priorities.
2. Read `state/goals.md` — weekly/monthly context.
3. Read the most recent session log in `sessions/`.
4. Scan `projects/*/config.yaml` and `projects/*/data.json` for task overview.
5. For each project (per-project fault isolation):
   - Pull Jira status updates (if config.jira_board is set)
   - Pull Slack thread summaries (if config.slack_channel is set, AI summarize)
   - Parse Git log (if config.git_repo is set, recent commits)
   - On failure: warn + use cached data + continue
6. Aggregate and rank:
   - Sort by: deadline (soonest first) > priority (high > medium > low) > Slack mentions
   - Cap at 20 items total across all projects
7. Render briefing:
   ```
   Good morning. Across your {N} projects:
   - {high_priority_count} high priority tasks
   - {slack_count} Slack threads need response
   - {deadline_count} deadlines this week

   TOP PRIORITIES:
   1. [{project}] {task title} — {deadline/priority}
   2. [{project}] {task title} — {deadline/priority}
   ...

   SLACK THREADS:
   - [{project}] #{channel}: "{summary}" — needs reply

   GIT ACTIVITY:
   - [{project}] {N} commits yesterday by {authors}
   ```

## /end (evening)

1. Scan `projects/*/data.json` for tasks worked on today (updated date = today).
2. Create session log in `sessions/YYYY-MM-DD.md`:
   - Done today: list tasks completed or progressed
   - Decisions: important choices made
   - Blocked: tasks that are stuck
   - Tomorrow: suggested focus for next day
3. Update `state/current.md` with tomorrow's priorities.
4. Sync completed tasks back to Jira (call skill_jira_sync /end flow).

## /update (mid-day)

1. Quick scan of data.json changes since /start.
2. Brief status: "Since morning: {N} tasks progressed, {M} completed."
3. Flag any new Slack threads or Jira updates.

## /report (weekly)

1. Read session logs for the past 7 days.
2. Aggregate per project:
   - Tasks completed count
   - Key decisions
   - Blocked items
3. Write to `reports/week-YYYY-WXX.md`.
4. Suggest focus areas for next week.

## Rules
- /start is the single entry point for the day — no other tool needed.
- Per-project fault isolation on ALL external calls.
- Priority ranking prevents information overload.
- Session logs are the memory — write them well.
