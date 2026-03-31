# Workspace Conventions

## Task Status
todo | scoped | doing | blocked | done

## Task ID Format
[PROJECT]-[NUMBER] (ví dụ: ADS-001, RES-003, BLD-007)

## RD Naming
rds/[ID]-[slug].md (ví dụ: rds/ADS-001-audit-meta-campaign.md)

## Workflow
Mỗi task đi qua: prep → run → review → wrap
Đọc _skills/skill_prep.md trước khi bắt đầu task.

## Update Protocol
Khi xong task:
1. Check done criteria trong RD
2. Ghi Execution Notes, Output, Final Summary vào RD
3. Update tasks.json: status → done, updated_at
4. Append bead vào beads.json
5. Git commit: bead + RD

Khi blocked:
- tasks.json: status → blocked
- RD: ghi Revision Notes
