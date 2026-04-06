import { memo } from 'react'
import { LayoutGrid } from 'lucide-react'
import { repoColor, PM_ICONS } from '../constants'

const FilterBar = memo(function FilterBar({ repoNames, activeRepo, onFilter, repos }) {
  const names = ['all', ...repoNames]

  return (
    <div className="flex flex-wrap gap-2 mb-5">
      {names.map((name) => {
        const active = name === activeRepo
        const Icon = name === 'all' ? LayoutGrid : (PM_ICONS[name] || LayoutGrid)
        const color = name === 'all' ? null : repoColor(name, repos)

        return (
          <button
            key={name}
            onClick={() => onFilter(name)}
            aria-pressed={active}
            className={`
              inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
              border cursor-pointer transition-all duration-200 select-none
              ${active
                ? 'bg-ctp-text text-white border-ctp-text shadow-sm'
                : 'bg-white/70 text-ctp-subtext0 border-ctp-surface0 hover:border-ctp-surface2 hover:bg-white'
              }
            `}
          >
            {name === 'all' ? (
              <Icon className="w-4 h-4" />
            ) : (
              <span
                className="inline-flex w-[18px] h-[18px] rounded-md items-center justify-center flex-shrink-0"
                style={{ background: active ? 'rgba(255,255,255,0.25)' : color }}
              >
                <Icon className="w-3 h-3 text-white" />
              </span>
            )}
            <span>{name === 'all' ? 'All' : name.toUpperCase()}</span>
          </button>
        )
      })}
    </div>
  )
})

export default FilterBar
