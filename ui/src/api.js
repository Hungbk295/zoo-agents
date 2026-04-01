import { API } from './constants'

export async function getRepos() {
  const res = await fetch(`${API}/repos`)
  return res.json()
}

export async function getAllData() {
  const res = await fetch(`${API}/data`)
  return res.json()
}

export async function getRepoData(repoName) {
  const res = await fetch(`${API}/data/${repoName}`)
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
  return res.json()
}

export async function getFile(path) {
  const res = await fetch(`${API}/file?path=${encodeURIComponent(path)}`)
  return res.json()
}
