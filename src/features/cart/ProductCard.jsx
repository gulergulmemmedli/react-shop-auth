import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'
import { useCart } from './CartContext.jsx'

export function ProductCard({ product }) {
  const { addItem } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  function handleAddToCart() {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    addItem(product)
  }

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">{product.price} ₼</p>
      <button onClick={handleAddToCart}>Səbətə əlavə et</button>
    </div>
  )
}