async function handleResponse(response) {
  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new Error(data.message || `Request failed with status ${response.status}`)
  }
  return response.json()
}

export async function signup(data) {
  const response = await fetch('/api/user/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse(response)
}

export async function login(data) {
  const response = await fetch('/api/user/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse(response)
}

export async function getMe() {
  const response = await fetch('/api/user/me')
  return handleResponse(response)
}

export async function logout() {
  const response = await fetch('/api/user/logout', { method: 'POST' })
  return handleResponse(response)
}
