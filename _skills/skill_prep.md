# Skill: prep

Phiên chuẩn bị trước khi thực hiện task. Đây là bước **thảo luận giữa user và PM** — không phải auto-run.

Fresh context every time (Ralph Wiggum Loop).

## Quy trình

### 1. Đọc context (PM tự làm)
- Đọc task trong `tasks.json` — id, title, priority, deadline
- Đọc RD trong `rds/` — requirements, done criteria, revision notes
- Đọc skill files nếu RD liệt kê

### 2. Thảo luận với user
- Clarify scope: task cover những gì, không cover gì?
- Hỏi về output format mong muốn (bảng, file riêng, code, doc?)
- Hỏi về constraints (deadline, dependencies, blocked by?)
- Nếu task quá lớn → đề xuất split thành sub-tasks

### 3. User bổ sung tài nguyên (optional)
User có thể:
- Attach tài liệu tham khảo, link, spec
- Chỉ định skills/tools cần dùng (ví dụ: /deep-research, /reddit-search)
- Paste thêm context, screenshot, file
- Ghi chú cách tiếp cận mong muốn

PM ghi tất cả vào RD sections tương ứng.

### 4. Tighten RD
- Update requirements cho rõ ràng hơn
- Làm done criteria **testable** — từ mơ hồ → cụ thể
- Ghi skills_used vào RD frontmatter
- Ghi approach dự kiến nếu đã rõ

### 5. Confirm & update status
- User confirm "OK, ready" → update tasks.json status → `scoped`
- Nếu chưa ready → giữ `todo`, ghi lại blockers trong RD

## Rules
- **Không auto-run** — luôn chờ user confirm trước khi chuyển scoped
- **Không carry over assumptions** — đọc mọi thứ fresh mỗi lần
- **RD là output chính** của /prep — sau bước này RD phải đủ rõ để ai đọc cũng hiểu task
