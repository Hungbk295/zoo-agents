import { STATUSES } from '../../constants'
import Column from './Column'

export default function Board({ items, repos, onDrop, onCardClick }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
      {STATUSES.map((status) => (
        <Column
          key={status}
          status={status}
          cards={items.filter((item) => item.board_status === status)}
          repos={repos}
          onDrop={onDrop}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  )
}
