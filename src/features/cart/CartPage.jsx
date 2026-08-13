import { useEffect, useState } from 'react'
import { useCart } from './CartContext.jsx'

export function CartPage() {
  const { items, totalPrice, totalCount, removeItem, updateQuantity, status, error } = useCart()

  // Stale closure-un düzgün həlli nümunəsi: dependency array-də "totalCount"
  // var, ona görə totalCount dəyişən kimi effekt təmizlənib (cleanup: clearInterval)
  // yenidən qurulur və interval içindəki funksiya HƏMİŞƏ ən son dəyəri "görür".
  // Əgər dependency array boş ([]) olsaydı, bu klassik "stale closure" bug-ı
  // yaranardı - interval həmişə ilk render zamankı totalCount-u xatırlayardı.
  const [logCount, setLogCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Səbətdəki say (güncəl):', totalCount)
      setLogCount((c) => c + 1)
    }, 3000)

    return () => clearInterval(interval)
  }, [totalCount])

  if (status === 'loading') return <p>Yüklənir...</p>

  return (
    <div className="page">
      <h1>Səbət ({totalCount})</h1>

      {error && <p className="form-error">{error}</p>}

      {items.length === 0 ? (
        <p>Səbətiniz boşdur.</p>
      ) : (
        <>
          <div className="cart-list">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>{item.price} ₼</p>
                </div>

                <div className="quantity-control">
                  <button
  onClick={() =>
    item.quantity === 1 ? removeItem(item.id) : updateQuantity(item.id, item.quantity - 1)
  }
>
  -
</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>

                <button className="remove-btn" onClick={() => removeItem(item.id)}>
                  Sil
                </button>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <strong>Cəmi: {totalPrice} ₼</strong>
          </div>
        </>
      )}
    </div>
  )
}