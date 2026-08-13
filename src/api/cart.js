import { apiFetch } from './client.js'

export function fetchCart() {
  return apiFetch('/cart')
}

export function addCartItem(item) {
  return apiFetch('/cart', {
    method: 'POST',
    body: JSON.stringify(item),
  })
}

export function removeCartItem(id) {
  return apiFetch(`/cart/${id}`, { method: 'DELETE' })
}

export function updateCartItemQuantity(id, quantity) {
  return apiFetch(`/cart/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ quantity }),
  })
}