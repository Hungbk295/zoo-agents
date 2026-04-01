---
description: List all PMs in the zoo — alias, project path, role summary
allowed-tools: Read, Bash(cat:*), Bash(ls:*), Bash(grep:*), Bash(head:*), Bash(basename:*)
---

# PM List

Liệt kê tất cả PM agents trong zoo workspace.

## Quy trình

### 1. Đọc aliases
- Đọc `scripts/aliases.sh`
- Parse tất cả alias có pattern `pm-*` — lấy alias name và project path

### 2. Đọc thông tin từng PM
Với mỗi project tìm được:
- Đọc `.claude/rules/*soul*` (nếu có) — lấy Identity + Tone
- Nếu không có soul file → đọc `CLAUDE.md` — lấy dòng mô tả đầu tiên

### 3. Render bảng

Format output:

```
## PM Team

| # | Alias | Project | Role |
|---|-------|---------|------|
| 1 | pm-ads | projects/ads | PM Ads — Performance Marketing. Data-driven, nói bằng số. |
| 2 | pm-research | projects/research | PM Research — Research & Synthesis. Thorough, structured. |
| ... | ... | ... | ... |

Total: N PMs
```

Rules:
- Chỉ list PM agents (alias `pm-*`), không list `zoo` alias
- Role = tóm tắt 1 dòng từ Identity section trong soul file
- Nếu project không có soul hay CLAUDE.md mô tả rõ → ghi "(no description)"
