---
id: ZOD-001
project: zoo-dev
status: todo
created: 2026-04-02
completed:
skills_used: []
tags: [jira, mcp, integration, sync]
outcome:
cross_ref: []
---

# ZOD-001: Tích hợp MCP Jira vào Zoo — Command /jira

## Task
Nghiên cứu và xây dựng command `/jira` cho Zoo. Command này sẽ:
1. Kết nối Jira qua MCP (Atlassian Rovo) — đã có sẵn tools `mcp__claude_ai_Atlassian_Rovo__*`
2. Pull tất cả tasks từ Jira projects
3. Phân loại tasks theo routing table của Zoo (ads, research, builder, academic, clare, albus, phuonghuyen, zoo-dev)
4. Tạo task entries tương ứng trong `projects/<pm>/data.json` + RD cho mỗi task

## Requirements
- Dùng MCP tools đã có: `searchJiraIssuesUsingJql`, `getJiraIssue`, `getVisibleJiraProjects`
- Tạo `.claude/commands/jira.md` — slash command `/jira`
- Command hỗ trợ sub-actions:
  - `/jira sync` — pull từ Jira, phân loại, tạo tasks
  - `/jira status` — show mapping Jira ↔ Zoo tasks
  - `/jira push` — push status changes ngược về Jira (transition issues)
- Phân loại dựa trên routing table trong `.claude/rules/03-zoo-rules.md`
- Nếu task không match routing → hỏi user route đi đâu
- Mỗi task tạo ra phải có:
  - Entry trong `data.json` với `source.type = "jira"`, `source.ref = <jira-issue-key>`
  - RD file trong `rds/` (generate từ `_templates/rd_template.md`)
  - Status mapping: Jira "To Do" → Zoo "todo", "In Progress" → "doing", "Done" → "done"
- Deduplicate: nếu task đã tồn tại (match `source.ref`) → update thay vì tạo mới

## Skills Required
- MCP Jira tools (Atlassian Rovo)
- Zoo routing table logic
- data.json + RD generation

## Approach
_(PM ghi sau khi execute)_

## Execution Notes
_(Append working log continuously while processing. Use timestamped bullets.)_

## Done Criteria
- [ ] `/jira sync` pull được issues từ Jira
- [ ] Phân loại đúng theo routing table
- [ ] Tạo task entries trong đúng project data.json
- [ ] Tạo RD cho mỗi task mới
- [ ] Deduplicate — không tạo trùng task đã sync
- [ ] `/jira status` hiển thị mapping Jira ↔ Zoo
- [ ] `/jira push` cập nhật status ngược về Jira
- [ ] Xử lý edge case: task không match routing → hỏi user

## Output
_(Link đến deliverable, metrics, kết quả)_

## Final Summary
_(Short final handoff summary written during /wrap)_

## Revision Log
_(Zoo append khi có revision)_
