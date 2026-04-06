---
id: ZOD-002
project: zoo-dev
status: todo
created: 2026-04-02
completed:
skills_used: []
tags: [ui, markdown, theme, task-detail]
outcome:
cross_ref: []
---

# ZOD-002: Markdown Theme cho Task Detail UI

## Task
Task detail modal trong kanban UI đang render nội dung markdown (từ RD sections) dưới dạng plain text. Cần thêm markdown renderer + theme để hiển thị đúng: headings, lists, code blocks, inline code, links, bold/italic, tables.

## Requirements
- Tích hợp markdown renderer vào React app (react-markdown hoặc marked + dangerouslySetInnerHTML)
- Tạo markdown theme/styles phù hợp với Catppuccin Latte palette đang dùng
- Áp dụng cho tất cả sections trong TaskModal: Requirements, Approach, Execution Notes, Output, Final Summary
- Styles cần cover:
  - Headings (h1-h4): font size, weight, spacing
  - Lists (ul/ol): indent, bullet style, spacing
  - Code blocks: background, font (Fira Code), border, padding
  - Inline code: background highlight, monospace font
  - Links: color, hover state
  - Tables: borders, padding, striped rows
  - Blockquotes: left border, muted color
  - Bold/italic: proper rendering
- Theme phải consistent với overall UI (Catppuccin Latte, Fira Sans/Fira Code)
- Không làm vỡ layout hiện tại của TaskModal

## Skills Required
- React (JSX components)
- CSS/Tailwind styling
- Markdown rendering library

## Approach
_(PM ghi sau khi execute)_

## Execution Notes
_(Append working log continuously while processing. Use timestamped bullets.)_

## Done Criteria
- [ ] Markdown renderer tích hợp vào TaskModal
- [ ] Headings render đúng hierarchy
- [ ] Lists (ordered + unordered) hiển thị đúng
- [ ] Code blocks có syntax highlight background
- [ ] Inline code có monospace + background
- [ ] Links clickable với đúng color
- [ ] Tables render có borders + padding
- [ ] Blockquotes styled
- [ ] Theme match Catppuccin Latte palette
- [ ] Không break layout hiện tại

## Output
_(Link đến deliverable, metrics, kết quả)_

## Final Summary
_(Short final handoff summary written during /wrap)_

## Revision Log
_(Zoo append khi có revision)_
