import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/AuthContext.jsx'
import { useCart } from '../features/cart/CartContext.jsx'

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const { totalCount } = useCart()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <nav className="navbar">
      <Link to="/" className="brand">🛒 Shop</Link>

      <div className="nav-links">
        <Link to="/">Məhsullar</Link>

        {isAuthenticated && (
          <Link to="/cart" className="cart-link">
            🛒 Səbət
            {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}
          </Link>
        )}

        {isAuthenticated ? (
          <>
            <span className="nav-user">{user?.name}</span>
            <button onClick={handleLogout}>Çıxış</button>
          </>
        ) : (
          <Link to="/login">Giriş</Link>
        )}
      </div>
    </nav>
  )
}