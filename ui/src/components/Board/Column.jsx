import { useState } from 'react'
import { STATUS_LABELS, STATUS_COLORS } from '../../constants'
import Card from './Card'

export default function Column({ status, cards, repos, onDrop, onCardClick }) {
  const [dragOver, setDragOver] = useState(false)
  const dotColor = STATUS_COLORS[status] || '#9ca0b0'

  function handleDragOver(e) {
    e.preventDefault()
    setDragOver(true)
  }

  function handleDragLeave() {
    setDragOver(false)
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragOver(false)
    try {
      const data = JSON.parse(e.dataTransfer.getData('text/plain'))
      onDrop(data.repo, data.id, status)
    } catch {}
  }

  return (
    <section
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        min-h-[200px] rounded-2xl p-3 transition-colors duration-150
        ${dragOver ? 'bg-ctp-pink/5 ring-2 ring-ctp-pink/20' : 'bg-transparent'}
      `}
    >
      <div className="flex items-center gap-2 mb-3 px-1">
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: dotColor }} />
        <h2 className="text-xs font-bold text-ctp-subtext0 tracking-wide uppercase m-0">
          {STATUS_LABELS[status]}
        </h2>
        <span className="text-[10px] font-semibold text-ctp-overlay0 bg-ctp-surface0/60 px-1.5 py-0.5 rounded-full">
          {cards.length}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {cards.length > 0
          ? cards.map((item) => (
              <Card
                key={`${item.repo}-${item.id}`}
                item={item}
                repos={repos}
                onClick={() => onCardClick(item.repo, item.id)}
              />
            ))
          : <div className="text-xs text-ctp-overlay0 text-center py-6 italic">No tasks yet</div>
        }
      </div>
    </section>
  )
}
