---
id: ZOD-003
project: zoo-dev
status: todo
created: 2026-04-02
completed:
skills_used: []
tags: [ui, layout, sidebar, task-detail]
outcome:
cross_ref: [ZOD-002]
---

# ZOD-003: Task Detail Sidebar Layout (Jira-style)

## Task
Chuyển task detail modal từ layout 1 cột sang layout 2 cột giống Jira issue view:
- **Main content (trái):** RD sections (Requirements, Approach, Execution Notes, Plan, Output, Final Summary), Notes, snapshot cards
- **Sidebar (phải):** metadata fields (Task ID, Status, Priority, Owner, Phase, Ready, Updated, Source, Tags), References (RD link)

## Requirements
- Layout 2 cột responsive:
  - Desktop (lg+): main content ~65-70%, sidebar ~30-35%
  - Tablet (md): main content ~60%, sidebar ~40%
  - Mobile: stack vertical — sidebar collapse lên trên hoặc xuống dưới
- Sidebar sticky (scroll cùng viewport, không scroll cùng main content)
- Sidebar chứa:
  - Status badge (có màu theo STATUS_COLORS)
  - Priority badge
  - Ready indicator
  - Task ID
  - Owner
  - Phase
  - Updated date
  - Source type
  - Tags (render dạng chips)
  - References section (RD link clickable)
- Main content chứa:
  - Notes (nếu có)
  - Current Focus / Latest Update snapshots
  - RD sections: Requirements, Approach, Plan, Execution Notes, Output, Final Summary
- Giữ nguyên SectionCard và MetaCard components (refactor nếu cần)
- Giữ nguyên Dialog structure (Radix UI Dialog)

## Current Components
- `TaskModal.jsx` — Dialog wrapper, Radix UI
- `TaskModalBody.jsx` — body content, MetaCard grid + SectionCard sections
- MetaCard: `label + value` pair, hiện render dạng grid 2 cột
- SectionCard: `label + content` với variant styles

## Skills Required
- React (JSX)
- Tailwind CSS (responsive layout)
- Radix UI Dialog

## Approach
_(PM ghi sau khi execute)_

## Execution Notes
_(Append working log continuously while processing. Use timestamped bullets.)_

## Done Criteria
- [ ] Layout 2 cột trên desktop
- [ ] Sidebar chứa tất cả metadata fields
- [ ] Sidebar sticky khi scroll main content
- [ ] Main content chứa Notes + RD sections
- [ ] Tags render dạng chips trong sidebar
- [ ] Status/Priority badges có màu
- [ ] Responsive: stack vertical trên mobile
- [ ] Không break existing functionality (open/close, drag-drop, RD loading)
- [ ] Giữ nguyên Catppuccin Latte theme

## Output
_(Link đến deliverable, metrics, kết quả)_

## Final Summary
_(Short final handoff summary written during /wrap)_

## Revision Log
_(Zoo append khi có revision)_
