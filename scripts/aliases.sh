#!/bin/bash
# Zoo Workspace Aliases
# Source this file: source ~/Documents/Sth/Taphoa/nhanvien/zoo/scripts/aliases.sh
# Or add to ~/.zshrc: source ~/Documents/Sth/Taphoa/nhanvien/zoo/scripts/aliases.sh
#
# Rules are auto-loaded from .claude/rules/ — no need to generate CLAUDE.md

ZOO_ROOT="$HOME/Documents/Sth/Taphoa/nhanvien/zoo"

# Zoo — Orchestrator (ở root)
alias zoo='cd "$ZOO_ROOT" && claude --dangerously-skip-permissions'
alias zoo-codex='cd "$ZOO_ROOT" && codex --dangerously-bypass-approvals-and-sandbox'

# PM Ads — Performance Marketing
alias pm-ads='cd "$ZOO_ROOT/projects/ads" && claude --dangerously-skip-permissions'
alias pm-ads-codex='cd "$ZOO_ROOT/projects/ads" && codex --dangerously-bypass-approvals-and-sandbox'

# PM Research — Research & Synthesis
alias pm-research='cd "$ZOO_ROOT/projects/research" && claude --dangerously-skip-permissions'
alias pm-research-codex='cd "$ZOO_ROOT/projects/research" && codex --dangerously-bypass-approvals-and-sandbox'

# PM Builder — Code & Automation
alias pm-builder='cd "$ZOO_ROOT/projects/builder" && claude --dangerously-skip-permissions'
alias pm-builder-codex='cd "$ZOO_ROOT/projects/builder" && codex --dangerously-bypass-approvals-and-sandbox'

# PM Academic — Academic Writing
alias pm-academic='cd "$ZOO_ROOT/projects/academic" && claude --dangerously-skip-permissions'
alias pm-academic-codex='cd "$ZOO_ROOT/projects/academic" && codex --dangerously-bypass-approvals-and-sandbox'

# PM Clare — Clare Hotel Frontend
alias pm-clare='cd "$ZOO_ROOT/projects/clare-htl-front" && claude --dangerously-skip-permissions'
alias pm-clare-codex='cd "$ZOO_ROOT/projects/clare-htl-front" && codex --dangerously-bypass-approvals-and-sandbox'

# PM Albus — Albus Frontend
alias pm-albus='cd "$ZOO_ROOT/projects/albus-fe" && claude --dangerously-skip-permissions'
alias pm-albus-codex='cd "$ZOO_ROOT/projects/albus-fe" && codex --dangerously-bypass-approvals-and-sandbox'

# PM Phuong Huyen — Workspace
alias pm-phuonghuyen='cd "$ZOO_ROOT/projects/phuonghuyen-workspace" && claude --dangerously-skip-permissions'
alias pm-phuonghuyen-codex='cd "$ZOO_ROOT/projects/phuonghuyen-workspace" && codex --dangerously-bypass-approvals-and-sandbox'

# PM Zoo-Dev — Self-Improvement Agent
alias pm-zoodev='cd "$ZOO_ROOT/projects/zoo-dev" && claude --dangerously-skip-permissions'
alias pm-zoodev-codex='cd "$ZOO_ROOT/projects/zoo-dev" && codex --dangerously-bypass-approvals-and-sandbox'
