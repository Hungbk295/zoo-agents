import { Monitor, Users } from 'lucide-react'

export default function Header({ status, onOpenPm }) {
  return (
    <header className="px-5 py-4 md:px-7 bg-ctp-mantle border-b border-ctp-surface0 flex justify-between items-center gap-4 flex-wrap">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-[10px] bg-ctp-rosewater flex items-center justify-center flex-shrink-0">
          <Monitor className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-ctp-text m-0 leading-tight">open-zoo</h1>
          <p className="text-xs text-ctp-subtext0 m-0">Multi-project task board</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {status.message && (
          <span className={`text-xs font-medium transition-colors duration-200 ${status.isError ? 'text-ctp-red' : 'text-ctp-rosewater'}`}>
            {status.message}
          </span>
        )}
        <button
          onClick={onOpenPm}
          title="Project manager settings"
          className="w-9 h-9 rounded-[10px] border border-ctp-surface0 bg-white/60 flex items-center justify-center cursor-pointer hover:bg-ctp-surface0 transition-colors duration-200"
        >
          <Users className="w-[18px] h-[18px] text-ctp-overlay2" />
        </button>
      </div>
    </header>
  )
}
