import { createContext, useContext, useEffect, useReducer, useCallback } from 'react'
import { cartReducer, initialCartState } from './cartReducer.js'
import { fetchCart, addCartItem, removeCartItem, updateCartItemQuantity } from '../../api/cart.js'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState)

  // Tətbiq açılanda səbəti serverdən çəkirik
  useEffect(() => {
    dispatch({ type: 'LOADING' })
    fetchCart()
      .then((items) => dispatch({ type: 'SET_CART', payload: items }))
      .catch(() => dispatch({ type: 'ERROR', payload: 'Səbət yüklənə bilmədi' }))
  }, [])

  // Optimistic add: UI-ı DƏRHAL yeniləyirik, server sorğusu arxa planda gedir
  const addItem = useCallback(async (product) => {
    const snapshot = state.items // rollback üçün cari vəziyyəti yadda saxlayırıq

    const optimisticItem = {
      id: `temp-${Date.now()}`, // server hələ real id verməyib
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    }

    dispatch({ type: 'ADD_ITEM_OPTIMISTIC', payload: optimisticItem })

    try {
      const saved = await addCartItem(optimisticItem)
      // Server-in verdiyi əsl id ilə əvəz edirik
      dispatch({ type: 'SET_CART', payload: [...snapshot.filter(i => i.productId !== product.id), saved] })
    } catch {
      dispatch({ type: 'ROLLBACK', payload: snapshot })
    }
  }, [state.items])

  const removeItem = useCallback(async (id) => {
    const snapshot = state.items
    dispatch({ type: 'REMOVE_ITEM_OPTIMISTIC', payload: { id } })

    try {
      await removeCartItem(id)
    } catch {
      dispatch({ type: 'ROLLBACK', payload: snapshot })
    }
  }, [state.items])

  const updateQuantity = useCallback(async (id, quantity) => {
    if (quantity < 1) return
    const snapshot = state.items
    dispatch({ type: 'UPDATE_QUANTITY_OPTIMISTIC', payload: { id, quantity } })

    try {
      await updateCartItemQuantity(id, quantity)
    } catch {
      dispatch({ type: 'ROLLBACK', payload: snapshot })
    }
  }, [state.items])

  const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

  const value = {
    items: state.items,
    status: state.status,
    error: state.error,
    totalPrice,
    totalCount,
    addItem,
    removeItem,
    updateQuantity,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart yalnız CartProvider daxilində istifadə oluna bilər')
  }
  return context
}