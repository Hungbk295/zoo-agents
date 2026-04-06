import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import PmAgentList from './PmAgentList'
import PmSkillsPanel from './PmSkillsPanel'

export default function PmModal({ open, onClose, repoNames, repos, skillsData }) {
  const [activePm, setActivePm] = useState(repoNames[0] || null)

  useEffect(() => {
    if (repoNames.length > 0 && !repoNames.includes(activePm)) {
      setActivePm(repoNames[0])
    }
  }, [repoNames, activePm])

  return (
    <Dialog.Root open={open} onOpenChange={(o) => { if (!o) onClose() }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-50" />
        <Dialog.Content className="fixed inset-4 md:inset-8 lg:inset-y-8 lg:left-[10%] lg:right-[10%] z-50 bg-ctp-base rounded-2xl shadow-[0_24px_80px_rgba(24,24,27,0.12)] border border-black/[0.06] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-ctp-surface0 bg-ctp-mantle">
            <Dialog.Title className="text-lg font-bold text-ctp-text m-0">Project managers</Dialog.Title>
            <Dialog.Close asChild>
              <button aria-label="Close" className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer hover:bg-ctp-pink/10 transition-colors duration-200">
                <X className="w-4 h-4 text-ctp-overlay2" />
              </button>
            </Dialog.Close>
          </div>

          {/* Body: 2-column */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-[220px_1fr] overflow-hidden">
            <div className="border-r border-ctp-surface0 overflow-y-auto md:border-b-0 border-b">
              <PmAgentList
                repoNames={repoNames}
                activePm={activePm}
                onSelect={setActivePm}
                repos={repos}
              />
            </div>
            <div className="overflow-y-auto">
              <PmSkillsPanel
                repo={activePm}
                repos={repos}
                skillsData={skillsData}
              />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
