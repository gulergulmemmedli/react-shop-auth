export const initialAuthState = {
  user: null,
  token: null,
  status: 'idle', // 'idle' | 'loading' | 'authenticated' | 'error'
  error: null,
}

export function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, status: 'loading', error: null }

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        status: 'authenticated',
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      }

    case 'LOGIN_ERROR':
      return {
        ...state,
        status: 'error',
        error: action.payload,
        user: null,
        token: null,
      }

    case 'RESTORE_SESSION':
      return {
        ...state,
        status: 'authenticated',
        user: action.payload.user,
        token: action.payload.token,
      }

    case 'LOGOUT':
      // Bütün auth vəziyyətini tam sıfırlayırıq - "geri" düyməsi ilə
      // qorunan səhifəyə qayıtmaq mümkün olmasın deyə vacibdir
      return { ...initialAuthState, status: 'idle' }

    default:
      return state
  }
}