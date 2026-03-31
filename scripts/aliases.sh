#!/bin/bash
# Zoo Workspace Aliases
# Source this file: source ~/Documents/Sth/Taphoa/nhanvien/zoo/scripts/aliases.sh
# Or add to ~/.zshrc: source ~/Documents/Sth/Taphoa/nhanvien/zoo/scripts/aliases.sh

ZOO_ROOT="$HOME/Documents/Sth/Taphoa/nhanvien/zoo"

# Zoo — Orchestrator (ở root)
alias zoo='cd "$ZOO_ROOT" && \
  cat _sources/_conventions.md _sources/_zoo_soul.md _sources/_zoo_rules.md _sources/_zoo_tools.md | tee AGENTS.md > CLAUDE.md && \
  claude'

alias zoo-codex='cd "$ZOO_ROOT" && \
  cat _sources/_conventions.md _sources/_zoo_soul.md _sources/_zoo_rules.md _sources/_zoo_tools.md | tee AGENTS.md > CLAUDE.md && \
  codex --dangerously-bypass-approvals-and-sandbox'

# PM Ads — Performance Marketing
alias pm-ads='cd "$ZOO_ROOT" && \
  cat _sources/_conventions.md | tee AGENTS.md > CLAUDE.md && \
  cd projects/ads && \
  cat ../../_sources/_conventions.md _sources/_rules.md _sources/SOUL.md _sources/tools.md | tee AGENTS.md > CLAUDE.md && \
  claude'

alias pm-ads-codex='cd "$ZOO_ROOT" && \
  cat _sources/_conventions.md | tee AGENTS.md > CLAUDE.md && \
  cd projects/ads && \
  cat ../../_sources/_conventions.md _sources/_rules.md _sources/SOUL.md _sources/tools.md | tee AGENTS.md > CLAUDE.md && \
  codex --dangerously-bypass-approvals-and-sandbox'

# PM Research — Research & Synthesis
alias pm-research='cd "$ZOO_ROOT" && \
  cat _sources/_conventions.md | tee AGENTS.md > CLAUDE.md && \
  cd projects/research && \
  cat ../../_sources/_conventions.md _sources/_rules.md _sources/SOUL.md _sources/tools.md | tee AGENTS.md > CLAUDE.md && \
  claude'

alias pm-research-codex='cd "$ZOO_ROOT" && \
  cat _sources/_conventions.md | tee AGENTS.md > CLAUDE.md && \
  cd projects/research && \
  cat ../../_sources/_conventions.md _sources/_rules.md _sources/SOUL.md _sources/tools.md | tee AGENTS.md > CLAUDE.md && \
  codex --dangerously-bypass-approvals-and-sandbox'

# PM Builder — Code & Automation
alias pm-builder='cd "$ZOO_ROOT" && \
  cat _sources/_conventions.md | tee AGENTS.md > CLAUDE.md && \
  cd projects/builder && \
  cat ../../_sources/_conventions.md _sources/_rules.md _sources/SOUL.md _sources/tools.md | tee AGENTS.md > CLAUDE.md && \
  claude'

alias pm-builder-codex='cd "$ZOO_ROOT" && \
  cat _sources/_conventions.md | tee AGENTS.md > CLAUDE.md && \
  cd projects/builder && \
  cat ../../_sources/_conventions.md _sources/_rules.md _sources/SOUL.md _sources/tools.md | tee AGENTS.md > CLAUDE.md && \
  codex --dangerously-bypass-approvals-and-sandbox'

# PM Academic — Academic Writing
alias pm-academic='cd "$ZOO_ROOT" && \
  cat _sources/_conventions.md | tee AGENTS.md > CLAUDE.md && \
  cd projects/academic && \
  cat ../../_sources/_conventions.md _sources/_rules.md _sources/SOUL.md _sources/tools.md | tee AGENTS.md > CLAUDE.md && \
  claude'

alias pm-academic-codex='cd "$ZOO_ROOT" && \
  cat _sources/_conventions.md | tee AGENTS.md > CLAUDE.md && \
  cd projects/academic && \
  cat ../../_sources/_conventions.md _sources/_rules.md _sources/SOUL.md _sources/tools.md | tee AGENTS.md > CLAUDE.md && \
  codex --dangerously-bypass-approvals-and-sandbox'

# PM Clare — Clare Hotel Frontend
alias pm-clare='cd "$ZOO_ROOT" && \
  cat _sources/_conventions.md | tee AGENTS.md > CLAUDE.md && \
  cd projects/clare-htl-front && \
  cat ../../_sources/_conventions.md _sources/_rules.md _sources/SOUL.md _sources/tools.md | tee AGENTS.md > CLAUDE.md && \
  claude'

alias pm-clare-codex='cd "$ZOO_ROOT" && \
  cat _sources/_conventions.md | tee AGENTS.md > CLAUDE.md && \
  cd projects/clare-htl-front && \
  cat ../../_sources/_conventions.md _sources/_rules.md _sources/SOUL.md _sources/tools.md | tee AGENTS.md > CLAUDE.md && \
  codex --dangerously-bypass-approvals-and-sandbox'
