import { useEffect, useState } from 'react'
import { fetchProducts } from '../../api/products.js'
import { ProductCard } from './ProductCard.jsx'

export function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => setError('Məhsullar yüklənə bilmədi'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Yüklənir...</p>
  if (error) return <p className="form-error">{error}</p>

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}