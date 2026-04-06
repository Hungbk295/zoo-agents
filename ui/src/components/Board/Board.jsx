import { useMemo } from 'react'
import { STATUSES } from '../../constants'
import Column from './Column'

export default function Board({ items, repos, onDrop, onCardClick }) {
  const grouped = useMemo(() => {
    const map = {}
    for (const s of STATUSES) map[s] = []
    for (const item of items) (map[item.board_status] || (map[item.board_status] = [])).push(item)
    return map
  }, [items])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
      {STATUSES.map((status) => (
        <Column
          key={status}
          status={status}
          cards={grouped[status]}
          repos={repos}
          onDrop={onDrop}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  )
}
