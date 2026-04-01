import { useState } from 'react'
import { useZooData } from './hooks/useZooData'
import Header from './components/Header'
import FilterBar from './components/FilterBar'
import Board from './components/Board/Board'
import TaskModal from './components/TaskModal/TaskModal'
import PmModal from './components/PmModal/PmModal'

export default function App() {
  const {
    repos, skillsData, activeRepo, setActiveRepo, status,
    repoNames, filteredItems, getTask, moveTask, loadRdSections, rdCache,
  } = useZooData()

  const [activeTask, setActiveTask] = useState(null)
  const [pmOpen, setPmOpen] = useState(false)

  const names = repoNames()
  const items = filteredItems()

  return (
    <div className="min-h-screen bg-ctp-base">
      <Header
        status={status}
        onOpenPm={() => setPmOpen(true)}
      />

      <div className="px-5 py-5 md:px-7 md:py-6">
        <FilterBar
          repoNames={names}
          activeRepo={activeRepo}
          onFilter={setActiveRepo}
          repos={repos}
        />
        <Board
          items={items}
          repos={repos}
          onDrop={moveTask}
          onCardClick={(repo, id) => setActiveTask({ repo, id })}
        />
      </div>

      <TaskModal
        activeTask={activeTask}
        repos={repos}
        getTask={getTask}
        loadRdSections={loadRdSections}
        rdCache={rdCache}
        onClose={() => setActiveTask(null)}
      />

      <PmModal
        open={pmOpen}
        onClose={() => setPmOpen(false)}
        repoNames={names}
        repos={repos}
        skillsData={skillsData}
      />
    </div>
  )
}
