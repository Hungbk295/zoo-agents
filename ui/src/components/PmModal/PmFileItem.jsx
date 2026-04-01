import { useState } from 'react'
import { FileText, ExternalLink, ChevronRight } from 'lucide-react'
import { getFile } from '../../api'

export default function PmFileItem({ path, name }) {
  const [expanded, setExpanded] = useState(false)
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(false)
  const cursorLink = `cursor://file/${encodeURI(path)}`

  async function toggle() {
    const next = !expanded
    setExpanded(next)
    if (next && content === null) {
      setLoading(true)
      try {
        const data = await getFile(path)
        setContent(data.content || '')
      } catch {
        setContent('failed to load')
      }
      setLoading(false)
    }
  }

  return (
    <div className="border border-ctp-surface0 rounded-lg overflow-hidden">
      <div
        onClick={toggle}
        className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-ctp-surface0/40 transition-colors duration-150"
      >
        <span className="flex items-center gap-2 text-xs text-ctp-text font-medium min-w-0">
          <ChevronRight className={`w-3 h-3 text-ctp-overlay1 transition-transform duration-150 flex-shrink-0 ${expanded ? 'rotate-90' : ''}`} />
          <FileText className="w-3.5 h-3.5 text-ctp-overlay2 flex-shrink-0" />
          <span className="truncate">{name}</span>
        </span>
        <a
          href={cursorLink}
          onClick={(e) => e.stopPropagation()}
          className="text-[10px] font-semibold text-ctp-pink hover:text-ctp-flamingo no-underline flex items-center gap-0.5 flex-shrink-0"
        >
          Open <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>
      {expanded && (
        <div className="border-t border-ctp-surface0 bg-ctp-base/50">
          <pre className="text-[11px] font-mono text-ctp-subtext0 leading-relaxed p-3 m-0 overflow-x-auto whitespace-pre-wrap break-words max-h-[300px] overflow-y-auto">
            {loading ? 'loading...' : content}
          </pre>
        </div>
      )}
    </div>
  )
}
