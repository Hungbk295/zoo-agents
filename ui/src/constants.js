import {
  Megaphone, Search, Wrench, GraduationCap, Code2, FolderOpen, LayoutGrid, Settings,
} from 'lucide-react'

export const API = '/api'

export const PM_ORDER = [
  'ads', 'research', 'builder', 'academic',
  'clare-htl-front', 'albus-fe', 'phuonghuyen-workspace', 'zoo-dev',
]

export const STATUSES = ['todo', 'scoped', 'doing', 'blocked', 'done']

export const STATUS_LABELS = {
  todo: 'Todo', scoped: 'Scoped', doing: 'Doing', blocked: 'Blocked', done: 'Done',
}

export const STATUS_ALIASES = { in_progress: 'doing', review: 'doing' }

export const STATUS_COLORS = {
  todo: '#b5a3ab', scoped: '#ea76cb', doing: '#dd7878', blocked: '#df8e1d', done: '#40a02b',
}

export const CTP_REPO_COLORS = {
  ads: '#dd7878', research: '#ea76cb', builder: '#dc8a78', academic: '#8839ef',
  'albus-fe': '#7af2b5', 'phuonghuyen-workspace': '#7ac5f2', 'clare-htl-front': '#f27a7a',
  'zoo-dev': '#f2e85a',
}

export const PM_ICONS = {
  ads: Megaphone,
  research: Search,
  builder: Wrench,
  academic: GraduationCap,
  'albus-fe': Code2,
  'phuonghuyen-workspace': FolderOpen,
  'clare-htl-front': LayoutGrid,
  'zoo-dev': Settings,
}

export const PM_DESCRIPTIONS = {
  ads: 'Ads & Campaigns',
  research: 'Research & Analysis',
  builder: 'Build & Automation',
  academic: 'Academic Papers',
  'clare-htl-front': 'Clare Hotel Frontend',
  'albus-fe': 'Albus Frontend',
  'phuonghuyen-workspace': 'Phuong Huyen Workspace',
  'zoo-dev': 'Zoo Self-Improvement',
}

export function boardStatus(status) {
  return STATUS_ALIASES[status] || status || 'todo'
}

export function formatStatus(status) {
  const normalized = boardStatus(status)
  return STATUS_LABELS[normalized] || String(normalized || 'Unknown')
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export function repoColor(repo, repos) {
  return CTP_REPO_COLORS[repo] || repos?.[repo]?.color || '#dc8a78'
}

export function priorityClass(priority) {
  const p = (priority || '').toLowerCase()
  if (p === 'high' || p === 'p0' || p === 'critical') return 'high'
  if (p === 'medium' || p === 'p1') return 'medium'
  return 'low'
}

export function isHighPriority(priority) {
  const p = (priority || '').toLowerCase()
  return p === 'high' || p === 'p0' || p === 'critical'
}

export function taskIdentifier(item) {
  return item.task_id || `#${item.id}`
}

export function taskRdPath(item, repos) {
  if (!item?.rd || !repos?.[item.repo]?.root) return null
  return `${repos[item.repo].root}/${item.rd}`.replace(/\/+/g, '/')
}
