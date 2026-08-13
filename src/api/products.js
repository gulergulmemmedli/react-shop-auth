import { apiFetch } from './client.js'

export function fetchProducts() {
  return apiFetch('/products')
}