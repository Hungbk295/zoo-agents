# Skill: rd_create

Zoo uses this to create a new RD for a task.

## Steps

1. Read `_templates/rd_template.md` for the structure.
2. Read the task description from Jira or user input.
3. Determine which project this belongs to (use routing table).
4. Generate a unique RD id: `RD-{NNN}` where NNN is the next number in the project's rds/ folder.
5. Query RAG database (`db/{project}.db`) for similar past tasks — if found, reference their approach and lessons learned.
6. Fill in the RD:
   - Task: clear, one-sentence description
   - Requirements: specific, actionable items
   - Skills Required: list PM-specific skills that apply
   - Done Criteria: testable checkboxes
7. Write the RD to `projects/{project}/rds/RD-{NNN}-{slug}.md`.
8. Update `projects/{project}/tasks.json`:
   - Add new task entry with rd_path pointing to the RD
   - Set status → `scoped`
9. Confirm: "RD created: {rd_path}. Task is scoped and ready for PM."

## Rules
- Every task MUST have an RD before a PM touches it.
- RDs should be specific enough that the PM can execute without asking questions.
- Reference similar past RDs when available (RAG query).
