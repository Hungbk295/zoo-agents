import { useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import TaskModalBody from './TaskModalBody'

export default function TaskModal({ activeTask, repos, getTask, loadRdSections, rdCache, onClose }) {
  const task = activeTask ? getTask(activeTask.repo, activeTask.id) : null
  const item = task ? { ...task, repo: activeTask.repo } : null

  useEffect(() => {
    if (item) loadRdSections(item)
  }, [item?.repo, item?.id, item?.rd])

  return (
    <Dialog.Root open={!!activeTask} onOpenChange={(open) => { if (!open) onClose() }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />
        <Dialog.Content className="fixed inset-4 md:inset-8 lg:inset-y-8 lg:left-[15%] lg:right-[15%] z-50 bg-ctp-base rounded-2xl shadow-[0_24px_80px_rgba(24,24,27,0.12)] border border-black/[0.06] overflow-hidden flex flex-col data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95">
          {item && (
            <>
              <div className="flex items-center justify-between px-5 py-4 border-b border-ctp-surface0 bg-ctp-mantle">
                <Dialog.Title className="text-lg font-bold text-ctp-text m-0 pr-4 leading-tight">
                  {item.title}
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer hover:bg-ctp-pink/10 transition-colors duration-200">
                    <X className="w-4 h-4 text-ctp-overlay2" />
                  </button>
                </Dialog.Close>
              </div>
              <div className="flex-1 overflow-y-auto">
                <TaskModalBody item={item} repos={repos} rdCache={rdCache} />
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
