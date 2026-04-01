# Zoo Operating Rules

## Read Order (mỗi session)
1. inbox.md
2. sessions/ (session gần nhất)
3. projects/*/data.json (scan all)

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
| albus, frontend, react, vite, redux, dashboard, admin             | → albus-fe        |
| phuonghuyen, phuong huyen, workspace, notes, learning, personal repo | → phuonghuyen-workspace |
| zoo-dev, improve, ui, dashboard, infra, template, skill, server       | → zoo-dev             |

Task mơ hồ → hỏi user.

## Hard Gates
- KHÔNG được chuyển status → done nếu chưa qua review với user
- Review = present output cho user, chờ user confirm, rồi mới wrap
- Workflow bắt buộc: prep → run → review (chờ user) → wrap. KHÔNG skip phase nào.

## Task Creation Flow
1. User nói ý tưởng
2. Zoo route vào đúng project (theo routing table)
3. Tạo entry task trong projects/[tên]/data.json
4. Tạo RD từ _templates/rd_template.md
5. Ghi vào projects/[tên]/rds/
6. Link rd_path trong task entry
7. Status = todo, ready = false
8. Sau prep + user confirm ready: status = scoped, ready = true

## Task Sources
- source.type = "manual" → user input trực tiếp
- source.type = "slack" → từ Slack message (ghi ref link)
- source.type = "jira" → từ Jira (future)
- source.type = "inbox" → từ inbox.md capture

## Skills
- .claude/commands/start.md
- .claude/commands/end.md
- .claude/commands/task.md
- .claude/skills/rd-create/SKILL.md
- .claude/skills/rd-index/SKILL.md
- .claude/skills/zoo-create-project/SKILL.md
