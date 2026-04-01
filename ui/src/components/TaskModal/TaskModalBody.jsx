import { FileText } from 'lucide-react'
import { taskIdentifier, formatStatus, isHighPriority, taskRdPath } from '../../constants'

function MetaCard({ label, value }) {
  if (!value) return null
  return (
    <div className="flex items-baseline gap-1.5 bg-white/70 border border-black/[0.07] rounded-xl px-3 py-2">
      <span className="text-[10px] font-bold uppercase tracking-wider text-ctp-overlay2 whitespace-nowrap">{label}:</span>
      <span className="text-[11px] font-mono text-ctp-subtext0 leading-snug break-words min-w-0">{value}</span>
    </div>
  )
}

function SectionCard({ label, content, loading, error, variant }) {
  const isEmpty = !loading && !error && !content
  const body = loading ? `Loading ${label.toLowerCase()} from RD...`
    : error ? `Unable to load ${label.toLowerCase()} from RD.`
    : content || `No ${label.toLowerCase()} captured yet.`

  const variants = {
    requirements: 'border-ctp-pink/20 bg-gradient-to-b from-ctp-pink/[0.04] to-white/80',
    approach: 'border-ctp-sapphire/20 bg-gradient-to-b from-ctp-sapphire/[0.04] to-white/80',
    plan: 'border-ctp-sky/20 bg-gradient-to-b from-ctp-sky/[0.04] to-white/80',
    snapshot: 'border-black/[0.08] bg-gradient-to-b from-black/[0.025] to-white/80',
    default: 'border-black/[0.07] bg-white/70',
  }

  const labelColors = {
    requirements: 'text-ctp-pink',
    approach: 'text-ctp-sapphire',
    plan: 'text-ctp-sapphire',
    snapshot: 'text-ctp-subtext0',
    default: 'text-ctp-overlay2',
  }

  return (
    <div className={`rounded-xl border p-3 shadow-[0_10px_26px_rgba(24,24,27,0.04)] ${variants[variant] || variants.default}`}>
      <div className={`text-[11px] font-semibold mb-1.5 ${labelColors[variant] || labelColors.default}`}>{label}</div>
      <div className={`text-[13px] leading-relaxed whitespace-pre-wrap break-words ${(loading || isEmpty) ? 'text-ctp-subtext0 italic' : 'text-zinc-800'}`}>
        {body}
      </div>
    </div>
  )
}

export default function TaskModalBody({ item, repos, rdCache }) {
  const rdPath = taskRdPath(item, repos)
  const rd = rdPath ? rdCache[rdPath] : null
  const highPri = isHighPriority(item.priority)

  return (
    <div className="p-4 md:p-5 flex flex-col gap-3">
      {/* Meta grid */}
      <div className="grid grid-cols-2 gap-2">
        <MetaCard label="Task ID" value={taskIdentifier(item)} />
        <MetaCard label="Owner" value={item.owner} />
        <MetaCard label="Status" value={formatStatus(item.status)} />
        <MetaCard label="Phase" value={item.phase} />
        <MetaCard label="Ready" value={item.ready ? 'Yes' : 'No'} />
        <MetaCard label="Priority" value={item.priority} />
        <MetaCard label="Updated" value={item.updated_at} />
        <MetaCard label="Source" value={item.source?.type} />
      </div>

      {/* Snapshot cards */}
      {item.current_focus && <SectionCard label="Current Focus" content={item.current_focus} variant="snapshot" />}
      {(item.summary || item.last_update) && <SectionCard label="Latest Update" content={item.summary || item.last_update} variant="snapshot" />}
      {item.output && <SectionCard label="Output Snapshot" content={item.output} variant="snapshot" />}

      {/* Notes */}
      {item.notes && (
        <div className={`rounded-xl border p-3 shadow-[0_10px_26px_rgba(24,24,27,0.04)] ${
          highPri
            ? 'border-ctp-maroon/20 bg-gradient-to-b from-ctp-maroon/[0.06] to-white/80 shadow-[0_14px_30px_rgba(230,69,83,0.08)]'
            : 'border-black/[0.07] bg-white/70'
        }`}>
          <div className={`text-[11px] font-semibold mb-1.5 ${highPri ? 'text-ctp-maroon' : 'text-ctp-overlay2'}`}>Notes</div>
          <p className={`whitespace-pre-wrap break-words m-0 leading-relaxed ${highPri ? 'text-sm text-zinc-900' : 'text-[13px] text-zinc-800'}`}>
            {item.notes}
          </p>
        </div>
      )}

      {/* RD Sections */}
      {rdPath && (
        <>
          <SectionCard label="Requirements" content={rd?.requirements} loading={rd?.loading} error={rd?.error} variant="requirements" />
          <SectionCard label="Approach" content={rd?.approach} loading={rd?.loading} error={rd?.error} variant="approach" />
          <SectionCard label="Execution Notes" content={rd?.executionNotes} loading={rd?.loading} error={rd?.error} variant="default" />
          <SectionCard label="Plan" content={rd?.plan} loading={rd?.loading} error={rd?.error} variant="plan" />
          <SectionCard label="Output" content={rd?.output} loading={rd?.loading} error={rd?.error} variant="default" />
          <SectionCard label="Final Summary" content={rd?.finalSummary} loading={rd?.loading} error={rd?.error} variant="default" />
        </>
      )}

      {/* References */}
      {(item.rd || rdPath) && (
        <div className="rounded-xl border border-black/[0.07] bg-white/70 p-3 shadow-[0_10px_26px_rgba(24,24,27,0.04)]">
          <div className="text-[11px] font-semibold mb-1.5 text-ctp-overlay2">References</div>
          {item.rd && (
            <div className="flex items-center gap-2.5 py-2">
              <span className="text-[11px] font-semibold text-ctp-subtext0 w-16 flex-shrink-0">RD</span>
              {rdPath ? (
                <a
                  href={`cursor://file/${encodeURI(rdPath)}`}
                  className="text-xs font-mono text-pink-500 hover:text-pink-700 no-underline font-semibold transition-colors duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.rd}
                </a>
              ) : (
                <span className="text-xs font-mono text-ctp-subtext0">{item.rd}</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
