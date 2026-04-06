import { API } from './constants'

export async function getRepos() {
  const res = await fetch(`${API}/repos`)
  if (!res.ok) throw new Error('Failed to fetch repos')
  return res.json()
}

export async function getAllData() {
  const res = await fetch(`${API}/data`)
  if (!res.ok) throw new Error('Failed to fetch all data')
  return res.json()
}

export async function getRepoData(repoName) {
  const res = await fetch(`${API}/data/${repoName}`)
  if (!res.ok) throw new Error(`Failed to fetch data for ${repoName}`)
  return res.json()
}

export async function updateRepoData(repoName, data) {
  const res = await fetch(`${API}/data/${repoName}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('save failed')
  return res.json()
}

export async function getSkills() {
  const res = await fetch(`${API}/skills`)
  if (!res.ok) throw new Error('Failed to fetch skills')
  return res.json()
}

export async function getFile(path) {
  if (path.includes('..')) throw new Error('Invalid file path')
  const res = await fetch(`${API}/file?path=${encodeURIComponent(path)}`)
  if (!res.ok) throw new Error('Failed to fetch file')
  return res.json()
}
