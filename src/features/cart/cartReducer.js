export const initialCartState = {
  items: [], // { id, productId, name, price, image, quantity }
  status: 'idle', // 'idle' | 'loading' | 'error'
  error: null,
}

export function cartReducer(state, action) {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, items: action.payload, status: 'idle', error: null }

    case 'LOADING':
      return { ...state, status: 'loading' }

    case 'ERROR':
      return { ...state, status: 'error', error: action.payload }

    case 'ADD_ITEM_OPTIMISTIC': {
      // Məhsul artıq səbətdədirsə, miqdarını artırırıq; yoxdursa yeni sətir əlavə edirik
      const existing = state.items.find((item) => item.productId === action.payload.productId)
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.productId === action.payload.productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }
      }
      return { ...state, items: [...state.items, action.payload] }
    }

    case 'REMOVE_ITEM_OPTIMISTIC':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      }

    case 'UPDATE_QUANTITY_OPTIMISTIC':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      }

    // Server sorğusu uğursuz olsa, əvvəlki vəziyyətə "geri qaytarırıq" (rollback)
    case 'ROLLBACK':
      return { ...state, items: action.payload, error: 'Əməliyyat uğursuz oldu, geri qaytarıldı' }

    default:
      return state
  }
}