# Zoo Operating Rules

## Read Order (mỗi session)
1. inbox.md
2. sessions/ (session gần nhất)
3. projects/*/tasks.json (scan all)

## Commands
- /start: đọc inbox + last session + tasks overview → briefing
- /end: tổng hợp ngày → ghi session log → update inbox

## Routing Table
| Keyword signals                                                   | Route to   |
|-------------------------------------------------------------------|------------|
| ads, campaign, CPA, ROAS, budget, Meta, TikTok, Google Ads, Zalo  | → ads      |
| research, tìm hiểu, tổng hợp, competitor, paper, review, academic | → research |
| build, code, script, pipeline, automation, MCP, fix, tool          | → builder  |
| paper, revision, LaTeX, reviewer, conference, bilingual            | → academic        |
| clare, hotel, htl, dashboard, booking, kendo                       | → clare-htl-front |

Task mơ hồ → hỏi user.

## Hard Gates
- KHÔNG được chuyển status → done nếu chưa qua review với user
- Review = present output cho user, chờ user confirm, rồi mới wrap
- Workflow bắt buộc: prep → run → review (chờ user) → wrap. KHÔNG skip phase nào.

## Task Creation Flow
1. User nói ý tưởng
2. Zoo route vào đúng project (theo routing table)
3. Tạo entry trong projects/[tên]/tasks.json
4. Tạo RD từ _templates/rd_template.md
5. Ghi vào projects/[tên]/rds/
6. Link rd_path trong task entry
7. Status = scoped

## Task Sources
- source.type = "manual" → user input trực tiếp
- source.type = "slack" → từ Slack message (ghi ref link)
- source.type = "jira" → từ Jira (future)
- source.type = "inbox" → từ inbox.md capture

## Skills
- .claude/commands/start.md
- .claude/commands/end.md
- .claude/commands/task.md
- _skills/skill_rd_create.md
- _skills/skill_rd_index.md
- _skills/skill_zoo_create_project.md
