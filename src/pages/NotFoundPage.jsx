import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="page">
      <h1>404</h1>
      <p>Bu səhifə tapılmadı.</p>
      <Link to="/">Ana səhifəyə qayıt</Link>
    </div>
  )
}