import { repoColor, PM_ICONS, PM_DESCRIPTIONS } from '../../constants'

export default function PmAgentList({ repoNames, activePm, onSelect, repos }) {
  return (
    <div className="flex flex-col gap-1 p-3">
      {repoNames.map((repo) => {
        const active = repo === activePm
        const color = repoColor(repo, repos)
        const Icon = PM_ICONS[repo] || PM_ICONS.builder

        return (
          <button
            key={repo}
            onClick={() => onSelect(repo)}
            className={`
              flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 text-left w-full border-0
              ${active ? 'bg-ctp-surface0/80 shadow-sm' : 'bg-transparent hover:bg-ctp-surface0/40'}
            `}
          >
            <div
              className="w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0"
              style={{ background: color }}
            >
              <Icon className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-ctp-text capitalize">{repo}</div>
              <div className="text-[10px] text-ctp-overlay1 truncate">{PM_DESCRIPTIONS[repo] || 'Project manager'}</div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
