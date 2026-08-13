import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext.jsx'

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    // "replace" vacibdir: brauzerin tarixçəsində login səhifəsi
    // qorunan səhifənin yerini alır, beləliklə "geri" düyməsi ilə
    // qorunan səhifəyə qayıtmaq mümkün olmur.
    // "state: { from: location }" isə login-dən sonra istifadəçini
    // əvvəl getmək istədiyi səhifəyə geri yönləndirmək üçündür.
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}