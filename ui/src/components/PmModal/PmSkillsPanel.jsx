import { repoColor, PM_ICONS } from '../../constants'
import PmFileItem from './PmFileItem'

export default function PmSkillsPanel({ repo, repos, skillsData }) {
  if (!repo) return null

  const color = repoColor(repo, repos)
  const Icon = PM_ICONS[repo] || PM_ICONS.builder
  const repoRoot = repos[repo]?.root || ''
  const repoSkills = skillsData[repo] || []
  const sharedSkills = skillsData.shared || []
  const agentsPath = `${repoRoot}/AGENTS.md`

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-[14px] flex items-center justify-center flex-shrink-0"
          style={{ background: color }}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className="text-sm font-bold text-ctp-text capitalize">{repo}</div>
          <div className="text-[11px] text-ctp-overlay1 font-mono">
            {repoRoot.replace(/.*\/projects\//, 'projects/')}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div>
        <div className="text-[10px] font-bold text-ctp-overlay2 uppercase tracking-wider mb-2">Instructions</div>
        <PmFileItem path={agentsPath} name="AGENTS.md" />
      </div>

      {/* Project skills */}
      <div>
        <div className="text-[10px] font-bold text-ctp-overlay2 uppercase tracking-wider mb-2">Project skills</div>
        {repoSkills.length > 0 ? (
          <div className="flex flex-col gap-1.5">
            {repoSkills.map((skill) => (
              <PmFileItem key={skill.path} path={skill.path} name={skill.file} />
            ))}
          </div>
        ) : (
          <div className="text-xs text-ctp-overlay0 italic py-2">No project skills yet.</div>
        )}
      </div>

      {/* Shared skills */}
      <div>
        <div className="text-[10px] font-bold text-ctp-overlay2 uppercase tracking-wider mb-2">Shared meta skills</div>
        {sharedSkills.length > 0 ? (
          <div className="flex flex-col gap-1.5">
            {sharedSkills.map((skill) => (
              <PmFileItem key={skill.path} path={skill.path} name={skill.file} />
            ))}
          </div>
        ) : (
          <div className="text-xs text-ctp-overlay0 italic py-2">No shared skills yet.</div>
        )}
      </div>
    </div>
  )
}
