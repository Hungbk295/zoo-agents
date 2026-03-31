# RES-002: Nghiên cứu tài liệu Git dạng Agent Vault

> Deliverable cho task RES-002 | PM Research | 2026-03-30

---

## 1. Nguồn tài liệu Git chất lượng

### Tier 1 — Core Resources (bắt buộc tham khảo)

| # | Nguồn | Loại | URL | Ghi chú |
|---|-------|------|-----|---------|
| 1 | **Pro Git Book** (Scott Chacon) | Book/Online | git-scm.com/book/en/v2 | Canonical reference, miễn phí, cover từ basics → internals |
| 2 | **Learn Git Branching** | Interactive | learngitbranching.js.org | Visual sandbox, best tool cho mental model về DAG |
| 3 | **Atlassian Git Tutorials** | Tutorial series | atlassian.com/git/tutorials | Structured, diagrams rõ ràng, beginner → advanced |
| 4 | **MIT Missing Semester — Git** | Lecture + Notes | missing.csail.mit.edu/2020/version-control/ | Dạy từ data model up, hiểu WHY không chỉ HOW |
| 5 | **Oh My Git!** | Game | ohmygit.org | Game-based, visualize Git graph real-time |

### Tier 2 — Supplementary

| # | Nguồn | Loại | Ghi chú |
|---|-------|------|---------|
| 6 | **GitHub Skills** (skills.github.com) | Hands-on courses | Chạy trong real GitHub repos |
| 7 | **Oh shit, git!?** (ohshitgit.com) | Recipes | Practical fixes cho common mistakes |
| 8 | **Think Like (a) Git** (think-like-a-git.net) | Mental model | Focus vào building đúng mental model |
| 9 | **Git & GitHub Bootcamp — Colt Steele** (Udemy) | Video course | 4.8★, 100k+ students |
| 10 | **freeCodeCamp Git Crash Course** (YouTube) | Video | 3M+ views, tốt cho absolute beginners |
| 11 | **GitHub Git Cheat Sheet** | PDF | One-page quick reference |
| 12 | **Git Immersion** (gitimmersion.com) | Guided tour | Step-by-step fundamentals |

### Reddit Insights
- Pattern "/tutorial mode" (71 upvotes r/cursor): user chuyển agent sang tutorial mode — agent hướng dẫn step-by-step thay vì làm hộ. Rất phù hợp Agent Vault.
- Interactive explorer pattern (54 upvotes r/ClaudeCode): navigate file tree, mỗi file annotated tự giải thích. Applicable cho lesson navigation.

---

## 2. Cấu trúc Lessons theo Level

### Level 1 — Beginner (Lesson 1-8)

| Lesson | Chủ đề | Concepts |
|--------|--------|----------|
| 1 | Version control là gì | Why VCS, snapshot vs diff |
| 2 | Setup & Config | `git init`, `git config`, `.gitignore` |
| 3 | Ba vùng của Git | Working dir, staging area (index), repository |
| 4 | Workflow cơ bản | `add`, `commit`, `status`, `diff` |
| 5 | Xem lịch sử | `log`, `show`, commit messages |
| 6 | Remotes | `clone`, `remote`, `push`, `pull`, `fetch` |
| 7 | Branching cơ bản | `branch`, `switch`/`checkout`, tại sao branch |
| 8 | Merge cơ bản | `merge`, resolve simple conflicts |

### Level 2 — Intermediate (Lesson 9-16)

| Lesson | Chủ đề | Concepts |
|--------|--------|----------|
| 9 | Git DAG mental model | Commits as graph nodes, refs as pointers |
| 10 | Merge vs Rebase | Khi nào dùng gì, tradeoffs |
| 11 | Interactive Rebase | `rebase -i`: squash, fixup, reorder |
| 12 | Stashing & Cherry-pick | `stash`, `cherry-pick` |
| 13 | Undo things | `reset` (soft/mixed/hard), `revert`, `reflog` |
| 14 | Tags & Releases | Lightweight vs annotated tags |
| 15 | Branching strategies | Git Flow, GitHub Flow, trunk-based |
| 16 | Collaboration patterns | Fork-and-PR, shared-repo, code review |

### Level 3 — Advanced (Lesson 17-22)

| Lesson | Chủ đề | Concepts |
|--------|--------|----------|
| 17 | Git internals | Blobs, trees, commits, refs, object store |
| 18 | Git hooks | pre-commit, commit-msg, pre-push |
| 19 | Rewriting history | `filter-repo`, `bisect` |
| 20 | Submodules & Worktrees | `submodule`, `worktree` |
| 21 | Large repos | Shallow clone, sparse checkout, LFS |
| 22 | Advanced workflows | `rerere`, signing commits, monorepo patterns |

---

## 3. Commands/Skills cho ôn tập

### Slash Commands

```
/start              — Onboard: diagnostic quiz → set level → giải thích system
/learn              — Bắt đầu lesson tiếp theo trong sequence
/learn [topic]      — Nhảy đến topic cụ thể
/practice           — Guided exercise cho lesson hiện tại
/review             — Spaced repetition session (kéo cards đến hạn)
/flashcard          — Hiện 1 flashcard, lật để xem đáp án
/flashcard hard     — Chỉ hiện cards đánh dấu khó
/quiz               — Quiz cho lesson hiện tại (phải pass mới advance)
/quiz [level]       — Quiz cho cả level
/recap              — Tóm tắt đã học trong session hiện tại
/recap [lesson]     — Tóm tắt lesson cụ thể
/progress           — Mastery map + stats (XP, streak, weak areas)
/hint               — Gợi ý khi practice/quiz
/explain [command]  — Giải thích sâu bất kỳ Git command nào
/next               — Advance sang lesson tiếp (nếu quiz đã pass)
```

### Flashcard Types

| Loại | Mặt trước | Mặt sau |
|------|-----------|---------|
| Command → Purpose | `git reflog` | Log tất cả reference updates. Dùng để recover lost commits. |
| Purpose → Command | "Undo last commit, giữ changes staged" | `git reset --soft HEAD~1` |
| Flag recall | `git log --???` để hiện 1 dòng/commit | `--oneline` |
| Concept | "Detached HEAD là gì?" | HEAD trỏ trực tiếp vào commit thay vì branch ref |
| Gotcha | "`reset` vs `revert` khác gì?" | Reset rewrite history (dangerous shared). Revert tạo commit mới undo (safe). |
| Cloze | `git _____ -b feature/login` | `checkout` hoặc `switch` |

### Spaced Repetition — Leitner Box System (v1)

```
Box 1: Review mỗi session     (cards mới / trả lời sai)
Box 2: Review mỗi 2 sessions
Box 3: Review mỗi 4 sessions
Box 4: Review mỗi 8 sessions
Box 5: Mastered (review monthly)

Đúng → lên 1 box
Sai  → về Box 1
```

Upgrade path: khi cần precision hơn, chuyển sang SM-2 algorithm (như Anki).

---

## 4. Quiz Format & Sample Questions

### Question Types theo Level

| Level | Remember | Understand | Apply | Analyze | Evaluate |
|-------|----------|------------|-------|---------|----------|
| Beginner | 60% | 30% | 10% | — | — |
| Intermediate | 20% | 30% | 40% | 10% | — |
| Advanced | — | 10% | 30% | 30% | 30% |

### Sample Questions

**Beginner — Remember:**
> Q: Lệnh nào để xem trạng thái working directory?
> A: `git status`

**Beginner — Understand:**
> Q: Tại sao cần `git add` trước `git commit`? Sao không commit thẳng?
> A: Staging area cho phép chọn chính xác những thay đổi nào vào commit tiếp theo (atomic commits).

**Intermediate — Apply:**
> Q: Bạn đang ở branch `main`. Tạo branch `feature/login`, switch sang đó, và tạo commit đầu tiên. Viết các lệnh.
> A: `git switch -c feature/login` → edit file → `git add .` → `git commit -m "feat: init login"`

**Intermediate — Analyze:**
> Q: Nhìn git log này. Commit nào introduce bug?
> ```
> a1b2c3d fix: validate email
> e4f5g6h feat: add login form
> i7j8k9l refactor: split utils
> ```
> Dùng lệnh gì để tìm? → `git bisect`

**Advanced — Scenario:**
> Q: Bạn force-push lên main, ghi đè work của teammate. Làm sao recover?
> A: `git reflog` trên remote hoặc teammate's local → `git reset --hard <commit>` → force-push lại.

**Advanced — Evaluate:**
> Q: Team 3 người, release mỗi 2 tuần. Nên dùng Git Flow hay trunk-based? Tại sao?
> A: (Open-ended, đánh giá reasoning)

---

## 5. Flow Agent điều hướng Learner

```
┌─────────────────────────────────────────────────┐
│                   /start                         │
│  ┌───────────┐                                   │
│  │ ONBOARD   │  Diagnostic quiz (5 câu)          │
│  │           │  → Xếp level (1/2/3)              │
│  │           │  → Quick win exercise              │
│  │           │  → Giới thiệu commands             │
│  └─────┬─────┘                                   │
│        ▼                                         │
│  ┌───────────┐  /learn                           │
│  │  LEARN    │  Intro → Explain → Demo → Try It  │
│  │           │  (3-5 phút/lesson)                │
│  └─────┬─────┘                                   │
│        ▼                                         │
│  ┌───────────┐  /practice                        │
│  │ PRACTICE  │  Guided exercises + /hint          │
│  │           │  Agent watch → feedback ngay       │
│  └─────┬─────┘                                   │
│        ▼                                         │
│  ┌───────────┐  /review, /flashcard              │
│  │  REVIEW   │  Spaced repetition (Leitner)      │
│  │           │  10-15 cards/session               │
│  │           │  70% due + 20% weak + 10% random  │
│  └─────┬─────┘                                   │
│        ▼                                         │
│  ┌───────────┐  /quiz                            │
│  │   TEST    │  Pass threshold: 80%              │
│  │           │  Mix question types                │
│  └─────┬─────┘                                   │
│        │                                         │
│   Pass?│                                         │
│   ┌────┴────┐                                    │
│   │Yes      │No → quay lại LEARN (ôn lại)        │
│   ▼         │                                    │
│  ┌───────────┐  /next                            │
│  │ ADVANCE   │  Congrats + Summary               │
│  │           │  → Generate flashcards từ lesson   │
│  │           │  → Unlock next lesson              │
│  │           │  → Update /progress                │
│  └───────────┘                                   │
│                                                  │
│  Bất kỳ lúc nào:                                 │
│    /progress  — mastery map + stats              │
│    /recap     — tóm tắt session                  │
│    /explain   — deep-dive command                │
└─────────────────────────────────────────────────┘
```

### Agent Behavior Principles

1. **Scaffolded Withdrawal**: Beginner → agent giải thích nhiều, gợi ý proactive. Advanced → agent chỉ respond khi được hỏi hoặc khi có lỗi.
2. **Socratic Prompting**: Hỏi "Bạn nghĩ gì sẽ xảy ra?" trước khi reveal đáp án.
3. **Error-Driven Learning**: Cho phép sai trong sandbox, agent detect + explain + fix.
4. **Hint Escalation**: Hint 1 mơ hồ → Hint 2 cụ thể → Hint 3 cho đáp án.
5. **Tone**: Encouraging, never condescending. "Good try! Đây là những gì xảy ra..." không phải "Sai."

### Engagement Mechanics (steal from Duolingo)

- **Streak**: "Bạn đã luyện Git 5 ngày liên tiếp!"
- **XP**: Mỗi lesson/quiz/review cho XP
- **Mastery map**: Visual progress — topics xanh (mastered), vàng (learning), xám (locked)
- **Quick sessions**: Mỗi session 5-10 phút, không overwhelm

### Lesson Template

```
LESSON: [ID] [Title]
LEVEL: [1-3]
PREREQS: [lesson IDs]
DURATION: ~[X] phút

1. INTRO      — Tại sao cần biết (1 paragraph)
2. EXPLAIN    — Core concept + analogy
3. DEMO       — Agent show command + output
4. TRY IT     — Learner chạy command (guided)
5. CHALLENGE  — Exercise khó hơn (ít guidance)
6. SUMMARY    — Key takeaways → auto-generate flashcards

FLASHCARDS: [card templates]
QUIZ_POOL: [question templates]
```

---

## 6. Key Insights & Recommendations

1. **Mental model trước commands.** Dạy 3 vùng (working/staging/repo) và DAG trước khi drill lệnh. Learners fail vì memorize commands mà không hiểu model.

2. **"What command?" là format quiz hiệu quả nhất** cho CLI tools — trực tiếp mirror real usage. Multiple choice chỉ cho beginners.

3. **Scenario-based questions là highest-value content.** Invest nhiều vào viết "Oh no" scenarios, workflow scenarios, detective scenarios.

4. **Bắt đầu Leitner, upgrade SM-2 sau.** Đơn giản implement, vẫn hiệu quả. SR là critical differentiator so với tutorial thường.

5. **Agent personality quyết định retention.** Khanmigo thành công nhờ Socratic + encouraging. Agent Vault cần tone tương tự.

6. **Mỗi lesson ≤5 phút.** Micro-lessons theo cognitive load theory. Một concept/lesson. Không nhồi nhét.
