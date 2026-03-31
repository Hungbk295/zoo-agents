# Skill: rd_index

Index completed RDs into the RAG knowledge base per project.

## When to run
- After a task is marked `completed` in tasks.json
- Can also be run manually: "Zoo, index recent RDs"

## Steps

1. Find completed RDs: scan `projects/*/rds/` for RDs with `status: completed` in frontmatter.
2. For each completed RD:
   a. Parse frontmatter (project, tags, skills_used, outcome, cross_ref)
   b. Parse content (task, requirements, approach, output, revision log)
   c. Chunk into sections for indexing
   d. Index into `db/{project}.db`
   e. If cross_ref is set, also index into referenced project's db
3. Move indexed RD to `projects/{project}/rds/completed/`
4. Report: "Indexed {N} RDs. {project}: {count}"

## Query format (for skill_rd_create)
- Input: project name + keywords/description
- Output: top 3 similar RDs with approach + lessons learned

## Rules
- Only index completed RDs (not in_progress or revision)
- Preserve the original RD file — indexing is non-destructive
- Cross-references enable knowledge sharing between projects
