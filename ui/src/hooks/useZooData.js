import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { getRepos, getAllData, getRepoData, updateRepoData, getSkills, getFile } from '../api'
import { API, boardStatus, taskRdPath, PM_ORDER } from '../constants'

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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const statusTimer = useRef(null)
  const rdCacheRef = useRef(rdCache)

  const showStatus = useCallback((message, isError = false) => {
    setStatus({ message, isError })
    if (message) {
      clearTimeout(statusTimer.current)
      statusTimer.current = setTimeout(() => setStatus({ message: '', isError: false }), 1800)
    }
  }, [])

  useEffect(() => { rdCacheRef.current = rdCache }, [rdCache])

  const repoNames = useMemo(() => PM_ORDER.filter((name) => repos[name]), [repos])

  const fetchAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [reposRes, dataRes] = await Promise.all([getRepos(), getAllData()])
      setRepos(reposRes)
      setAllData(dataRes)
      await getSkills().then(setSkillsData).catch((err) => console.error('Failed to load skills:', err))
    } catch (err) {
      setError(err.message || 'Failed to load data')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const refetchRepo = useCallback(async (repoName) => {
    try {
      const data = await getRepoData(repoName)
      setAllData((prev) => ({ ...prev, [repoName]: data }))
    } catch {
      await fetchAll()
    }
  }, [fetchAll])

  const retry = useCallback(() => {
    setError(null)
    fetchAll().catch(() => {})
  }, [fetchAll])

  useEffect(() => {
    return () => clearTimeout(statusTimer.current)
  }, [])

  // Boot
  useEffect(() => {
    fetchAll().catch(() => {})
  }, [fetchAll])

  // SSE listener
  useEffect(() => {
    const sse = new EventSource(`${API}/events`)
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

    const prev = repoData
    const updated = {
      ...repoData,
      backlog: repoData.backlog.map((item) =>
        String(item.id) === String(taskId) ? { ...item, status: newStatus } : item
      ),
    }
    setAllData((p) => ({ ...p, [repoName]: updated }))

    try {
      await updateRepoData(repoName, updated)
      showStatus('Saved')
    } catch {
      setAllData((p) => ({ ...p, [repoName]: prev }))
      showStatus('Save failed', true)
    }
  }, [allData, showStatus])

  const loadRdSections = useCallback((item) => {
    const rdPath = taskRdPath(item, repos)
    if (!rdPath) return
    const cached = rdCacheRef.current[rdPath]
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
  }, [repos])

  const filteredItems = useMemo(() => {
    const names = activeRepo === 'all' ? repoNames : [activeRepo]
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
    loading, error, retry,
  }
}
