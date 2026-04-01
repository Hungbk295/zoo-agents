import { FileText } from 'lucide-react'
import { repoColor, priorityClass } from '../../constants'

const PRIORITY_STYLES = {
  high: 'bg-ctp-red/10 text-ctp-red border-ctp-red/20',
  medium: 'bg-ctp-yellow/10 text-ctp-yellow border-ctp-yellow/20',
  low: 'bg-ctp-surface0/60 text-ctp-overlay2 border-ctp-surface0',
}

export default function Card({ item, repos, onClick }) {
  const color = repoColor(item.repo, repos)
  const preview = item.last_update || item.current_focus || item.summary || item.notes || ''
  const pClass = priorityClass(item.priority)

  function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', JSON.stringify({ id: item.id, repo: item.repo }))
    e.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() } }}
      tabIndex={0}
      role="button"
      aria-label={`Open details for ${item.title}`}
      className="bg-white rounded-xl border border-black/[0.06] shadow-[0_2px_8px_rgba(24,24,27,0.04)] cursor-pointer hover:shadow-[0_4px_16px_rgba(24,24,27,0.08)] hover:border-black/[0.1] transition-all duration-200 overflow-hidden group"
    >
      <div className="h-[3px] rounded-t-xl" style={{ background: color }} />
      <div className="p-3 flex flex-col gap-2">
        <div className="flex items-start gap-2">
          <span className="text-[13px] font-semibold text-ctp-text leading-snug flex-1">{item.title}</span>
          {item.ready && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-ctp-green/10 text-ctp-green border border-ctp-green/20 whitespace-nowrap">
              Ready
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
            style={{ background: color }}
          >
            {item.repo.toUpperCase()}
          </span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${PRIORITY_STYLES[pClass]}`}>
            {item.priority}
          </span>
        </div>

        {preview && (
          <p className="text-[11px] text-ctp-overlay1 leading-relaxed line-clamp-2 m-0">{preview}</p>
        )}

        {item.rd && (
          <div className="flex items-center gap-1 text-[10px] text-ctp-overlay2 mt-0.5">
            <FileText className="w-3 h-3" />
            <span className="truncate">{item.rd}</span>
          </div>
        )}
      </div>
    </div>
  )
}
