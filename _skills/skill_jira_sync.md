# Skill: jira_sync

Zoo uses this to sync tasks between Jira and local data.json files.

## /daily flow

1. Read `projects/*/config.yaml` to get jira_board per project.
2. For each project with a jira_board configured:
   a. **Per-project fault isolation**: wrap in try/catch
      - If Jira pull fails → warning, use cached data.json, continue to next project
      - If Jira pull succeeds → proceed
   b. Pull tasks from Jira API (via MCP or REST)
   c. Compare with local data.json:
      - New tasks in Jira → add to data.json with status `backlog`
      - Status changed in Jira → update data.json
      - Tasks in data.json not in Jira → keep (locally created)
   d. Report: "{project}: {N} new, {M} updated"
3. Summary: "Sync complete. Ads: 3 new. Research: 1 updated."

## /end sync (push back to Jira)

1. For each project, find tasks where status changed locally:
   - `completed` locally → update Jira status to Done
   - `in_progress` locally → update Jira status to In Progress
2. Report what was synced back.

## Error handling
- Auth expired → "⚠ Jira auth expired for {project}. Run setup to refresh."
- Network timeout → "⚠ {project} Jira unreachable. Using cached data."
- Board not found → "⚠ {project} board '{board}' not found. Check config.yaml."

## Rules
- Jira is ALWAYS the master for task creation.
- data.json is a local cache — never delete tasks that exist in Jira.
- Per-project isolation: one project failing must NOT block other projects.
