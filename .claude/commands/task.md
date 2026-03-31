---
description: Create a new task — route to correct PM, create RD, update tasks.json
allowed-tools: Read, Write, Bash(cat:*), Bash(jq:*)
---

## Task Creation Flow

User input: $ARGUMENTS

1. Route vào đúng project theo Routing Table trong CLAUDE.md
2. Read `_templates/rd_template.md`
3. Generate task ID: [PROJECT]-[NNN] (next number in project's tasks.json)
4. Fill RD:
   - Task: clear one-sentence description
   - Requirements: specific, actionable
   - Done Criteria: testable checkboxes
5. Write RD to `projects/{project}/rds/{ID}-{slug}.md`
6. Update `projects/{project}/tasks.json`: add entry, status = scoped, link rd_path
7. Confirm: "Task {ID} created → {project}. RD: {rd_path}"

## Rules
- Mỗi task PHẢI có RD trước khi PM nhận
- Hỏi user nếu task mơ hồ, không đoán
- Không tự execute — chỉ tạo và route
