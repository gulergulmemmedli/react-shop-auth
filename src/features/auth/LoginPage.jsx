import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext.jsx'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validationErrors, setValidationErrors] = useState({})

  const { login, status, error } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // İstifadəçi login səhifəsinə qorunan bir səhifədən yönləndirilibsə,
  // uğurlu login-dən sonra elə oraya qaytarırıq. Əks halda ana səhifəyə.
  const from = location.state?.from?.pathname || '/'

  function validate() {
    const errors = {}

    if (!email.trim()) {
      errors.email = 'Email tələb olunur'
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = 'Email formatı düzgün deyil'
    }

    if (!password) {
      errors.password = 'Şifrə tələb olunur'
    } else if (password.length < 6) {
      errors.password = 'Şifrə minimum 6 simvol olmalıdır'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!validate()) return

    const result = await login(email, password)
    if (result.success) {
      navigate(from, { replace: true })
    }
  }

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-form">
        <h1>Giriş</h1>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {validationErrors.email && (
            <span className="field-error">{validationErrors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Şifrə</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {validationErrors.password && (
            <span className="field-error">{validationErrors.password}</span>
          )}
        </div>

        {error && <p className="form-error">{error}</p>}

        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Yoxlanılır...' : 'Daxil ol'}
        </button>

        <p className="hint">
          Test üçün: <code>test@shop.com</code> / <code>parol123</code>
        </p>
      </form>
    </div>
  )
}