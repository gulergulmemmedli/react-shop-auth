import { createContext, useContext, useEffect, useReducer, useCallback } from 'react'
import { authReducer, initialAuthState } from './authReducer.js'
import { registerUnauthorizedHandler } from '../../api/client.js'

const AuthContext = createContext(null)

const STORAGE_KEY = 'auth_session'
// Test üçün token ömrünü qəsdən qısa saxlayırıq (2 dəqiqə) ki,
// "vaxtı bitmiş token" ssenarisini asanlıqla sınaya biləsən.
const TOKEN_TTL_MS = 2 * 60 * 1000

function saveSession(session) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEY)
}

function loadSession() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null

  try {
    const session = JSON.parse(raw)
    if (session.expiresAt && Date.now() > session.expiresAt) {
      clearSession()
      return null
    }
    return session
  } catch {
    clearSession()
    return null
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState)

  // Tətbiq ilk dəfə açılanda (səhifə yenilənəndə) localStorage-dan
  // sessiyanı bərpa etməyə çalışırıq
  useEffect(() => {
    const session = loadSession()
    if (session) {
      dispatch({ type: 'RESTORE_SESSION', payload: session })
    }
  }, [])

  // client.js-ə "token vaxtı bitəndə ya 401 gələndə nə etməli"
  // funksiyasını qeydiyyatdan keçiririk
  useEffect(() => {
    registerUnauthorizedHandler(() => {
      clearSession()
      dispatch({ type: 'LOGOUT' })
    })
  }, [])

  // Token-in vaxtı bitəndə, istifadəçi heç bir hərəkət etməsə belə,
  // avtomatik logout etmək üçün bir "timer" qururuq.
  useEffect(() => {
    if (!state.token || !state.user) return

    const session = loadSession()
    if (!session?.expiresAt) return

    const msLeft = session.expiresAt - Date.now()
    if (msLeft <= 0) {
      clearSession()
      dispatch({ type: 'LOGOUT' })
      return
    }

    const timer = setTimeout(() => {
      clearSession()
      dispatch({ type: 'LOGOUT' })
    }, msLeft)

    return () => clearTimeout(timer)
  }, [state.token, state.user])

  const login = useCallback(async (email, password) => {
    dispatch({ type: 'LOGIN_START' })

    await new Promise((resolve) => setTimeout(resolve, 600))

    if (email === 'test@shop.com' && password === 'parol123') {
      const session = {
        user: { email, name: 'Test İstifadəçi' },
        token: 'fake-jwt-' + Date.now(),
        expiresAt: Date.now() + TOKEN_TTL_MS,
      }
      saveSession(session)
      dispatch({ type: 'LOGIN_SUCCESS', payload: session })
      return { success: true }
    } else {
      const message = 'Email və ya şifrə yanlışdır'
      dispatch({ type: 'LOGIN_ERROR', payload: message })
      return { success: false, error: message }
    }
  }, [])

  const logout = useCallback(() => {
    clearSession()
    dispatch({ type: 'LOGOUT' })
  }, [])

  const value = {
    user: state.user,
    token: state.token,
    status: state.status,
    error: state.error,
    isAuthenticated: state.status === 'authenticated',
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth yalnız AuthProvider daxilində istifadə oluna bilər')
  }
  return context
}