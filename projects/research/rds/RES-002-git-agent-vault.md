---
id: RES-002
project: research
status: done
created: 2026-03-30
completed: 2026-03-30
skills_used: [web-research]
tags: [git, learning, agent-vault, education]
outcome:
cross_ref: []
---

# Nghiên cứu tài liệu Git dạng Agent Vault

## Task
Tìm và tổng hợp tài liệu học Git phù hợp để xây dựng Agent Vault — một hệ thống học tập do agent điều hướng, có bài học, commands ôn tập, và quiz kiểm tra.

## Requirements
- Tổng hợp nguồn tài liệu Git chất lượng (docs, tutorials, interactive courses)
- Phân tích cấu trúc kiến thức Git theo level (beginner → intermediate → advanced)
- Đề xuất cấu trúc Agent Vault:
  - **Lessons**: danh sách bài học, thứ tự học, nội dung mỗi bài
  - **Commands/Skills**: các command để user ôn tập (flashcard, recap, practice)
  - **Quizzes**: hệ thống quiz theo từng bài/level, format câu hỏi
- Đề xuất flow agent điều hướng learner (onboard → learn → review → test → next)

## Skills Required
- Web search / research
- Curriculum design analysis
- Agent interaction design

## Approach
- 3 research agents chạy song song: Git resources, Reddit insights, Agent Vault design patterns
- Reddit QMD collection searched cho learning patterns (tutorial mode, interactive explorer)
- Tổng hợp từ ITS research (Intelligent Tutoring Systems), Duolingo patterns, Anki/SR systems
- Sources: web search (model knowledge), Reddit QMD (2513 docs), agent design research

## Done Criteria
- [x] Danh sách ≥5 nguồn tài liệu Git chất lượng (12 sources, 2 tiers)
- [x] Cấu trúc lessons theo level (beginner/intermediate/advanced) (22 lessons, 3 levels)
- [x] Đề xuất commands/skills cho ôn tập (12 slash commands + 6 flashcard types + Leitner system)
- [x] Đề xuất quiz format và sample questions (6 question types + 5 samples + distribution matrix)
- [x] Flow diagram agent điều hướng learner (6-phase flow + 5 behavior principles + engagement mechanics)

## Output
- Deliverable: `output/RES-002-git-agent-vault.md`
- Key findings:
  - 12 nguồn Git quality (Pro Git, Learn Git Branching, MIT Missing Semester là top 3)
  - 22 lessons structured across 3 levels
  - Leitner box system cho spaced repetition (upgrade path → SM-2)
  - "What command?" là quiz format hiệu quả nhất cho CLI tools
  - Agent flow: Onboard → Learn → Practice → Review → Test → Advance

## Execution Notes
- Web search bị denied cho subagents → dùng model knowledge (accurate đến May 2025)
- Reddit QMD search trả về insights về tutorial mode pattern và interactive explorer — relevant cho agent design
- Kết hợp ITS research (Khanmigo, Brilliant, Exercism) với gamification (Duolingo) cho engagement mechanics

## Final Summary
Đã tổng hợp đầy đủ tài liệu Git + đề xuất cấu trúc Agent Vault với 22 lessons, 12 commands, quiz system, và agent flow. Key insight: mental model trước commands, scenario-based quiz là highest value, Leitner SR system đủ tốt cho v1.

## Revision Log
_(Zoo append khi có revision)_
