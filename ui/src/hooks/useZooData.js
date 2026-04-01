import { useState, useEffect, useCallback, useRef } from 'react'
import { getRepos, getAllData, getRepoData, updateRepoData, getSkills, getFile } from '../api'
import { boardStatus, taskRdPath, PM_ORDER } from '../constants'

function extractMarkdownSection(content, heading) {
  if (!content) return ''
  const escaped = String(heading).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pattern = new RegExp(`(?:^|\\n)##\\s+${escaped}\\s*\\n([\\s\\S]*?)(?=\\n##\\s+|$)`, 'i')
  const match = String(content).match(pattern)
  return match ? match[1].trim() : ''
}

function parseRdSections(content) {
  return {
    requirements: extractMarkdownSection(content, 'Requirements'),
    approach: extractMarkdownSection(content, 'Approach'),
    plan: extractMarkdownSection(content, 'Plan'),
    executionNotes: extractMarkdownSection(content, 'Execution Notes'),
    output: extractMarkdownSection(content, 'Output'),
    finalSummary: extractMarkdownSection(content, 'Final Summary'),
  }
}

export function useZooData() {
  const [repos, setRepos] = useState({})
  const [allData, setAllData] = useState({})
  const [skillsData, setSkillsData] = useState({})
  const [activeRepo, setActiveRepo] = useState('all')
  const [status, setStatus] = useState({ message: '', isError: false })
  const [rdCache, setRdCache] = useState({})
  const statusTimer = useRef(null)

  const showStatus = useCallback((message, isError = false) => {
    setStatus({ message, isError })
    if (message) {
      clearTimeout(statusTimer.current)
      statusTimer.current = setTimeout(() => setStatus({ message: '', isError: false }), 1800)
    }
  }, [])

  const repoNames = useCallback(() => {
    return PM_ORDER.filter((name) => repos[name])
  }, [repos])

  const fetchAll = useCallback(async () => {
    const [reposRes, dataRes] = await Promise.all([getRepos(), getAllData()])
    setRepos(reposRes)
    setAllData(dataRes)
    await getSkills().then(setSkillsData).catch(() => {})
  }, [])

  const refetchRepo = useCallback(async (repoName) => {
    try {
      const data = await getRepoData(repoName)
      setAllData((prev) => ({ ...prev, [repoName]: data }))
    } catch {
      await fetchAll()
    }
  }, [fetchAll])

  // Boot
  useEffect(() => {
    fetchAll().catch(() => showStatus('Load failed', true))
  }, [fetchAll, showStatus])

  // SSE listener
  useEffect(() => {
    const sse = new EventSource('/api/events')
    sse.onmessage = (e) => {
      const repoName = e.data?.trim()
      if (repoName) {
        refetchRepo(repoName)
        showStatus('Data synced')
      }
    }
    return () => sse.close()
  }, [refetchRepo, showStatus])

  const moveTask = useCallback(async (repoName, taskId, newStatus) => {
    const repoData = allData[repoName]
    if (!repoData) return
    const task = repoData.backlog.find((item) => String(item.id) === String(taskId))
    if (!task || boardStatus(task.status) === newStatus) return

    const updated = {
      ...repoData,
      backlog: repoData.backlog.map((item) =>
        String(item.id) === String(taskId) ? { ...item, status: newStatus } : item
      ),
    }
    setAllData((prev) => ({ ...prev, [repoName]: updated }))

    try {
      await updateRepoData(repoName, updated)
      showStatus('Saved')
    } catch {
      showStatus('Save failed', true)
    }
  }, [allData, showStatus])

  const loadRdSections = useCallback((item) => {
    const rdPath = taskRdPath(item, repos)
    if (!rdPath) return
    const cached = rdCache[rdPath]
    if (cached) return

    setRdCache((prev) => ({ ...prev, [rdPath]: { loading: true } }))
    getFile(rdPath)
      .then((data) => {
        const sections = parseRdSections(data.content || '')
        setRdCache((prev) => ({ ...prev, [rdPath]: { ...sections, loading: false, loaded: true, error: false } }))
      })
      .catch(() => {
        setRdCache((prev) => ({ ...prev, [rdPath]: { loading: false, loaded: true, error: true } }))
      })
  }, [repos, rdCache])

  const filteredItems = useCallback(() => {
    const names = activeRepo === 'all' ? repoNames() : [activeRepo]
    return names.flatMap((name) =>
      (allData[name]?.backlog || []).map((item) => ({
        ...item,
        repo: name,
        board_status: boardStatus(item.status),
      }))
    )
  }, [activeRepo, allData, repoNames])

  const getTask = useCallback((repoName, taskId) => {
    return (allData[repoName]?.backlog || []).find((item) => String(item.id) === String(taskId)) || null
  }, [allData])

  return {
    repos, allData, skillsData, activeRepo, setActiveRepo, status,
    repoNames, filteredItems, getTask, moveTask, loadRdSections, rdCache, showStatus,
  }
}
