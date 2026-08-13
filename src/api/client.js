const BASE_URL = 'http://localhost:4000'

// Bu funksiyanı auth sistemi ilə "bağlamaq" üçün istifadə edirik -
// AuthContext özünü burda qeydiyyatdan keçirir ki, client.js
// birbaşa React hook-larına ehtiyac duymadan logout çağıra bilsin.
let onUnauthorized = () => {}

export function registerUnauthorizedHandler(handler) {
  onUnauthorized = handler
}

export async function apiFetch(path, options = {}) {
  const session = JSON.parse(localStorage.getItem('auth_session') || 'null')

  // Token vaxtı bitibmi, sorğu göndərmədən ƏVVƏL yoxlayırıq -
  // bu, real 401 cavabını simulyasiya edir, çünki json-server
  // özü token yoxlaması etmir (sadə mock API-dir)
  const isExpired = session?.expiresAt && Date.now() > session.expiresAt

  if (isExpired) {
    onUnauthorized()
    throw new Error('UNAUTHORIZED')
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (response.status === 401) {
    onUnauthorized()
    throw new Error('UNAUTHORIZED')
  }

  if (!response.ok) {
    throw new Error(`API xətası: ${response.status}`)
  }

  // 204 No Content kimi hallarda body olmaya bilər
  const text = await response.text()
  return text ? JSON.parse(text) : null
}