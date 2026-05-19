import { createContext, useContext, useReducer, useEffect } from 'react'

const WishlistContext = createContext(null)

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_WISHLIST': {
      const exists = state.items.find(i => i.id === action.payload.id)
      if (exists) {
        return { ...state, items: state.items.filter(i => i.id !== action.payload.id) }
      }
      return { ...state, items: [...state.items, action.payload] }
    }
    case 'REMOVE_FROM_WISHLIST':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) }
    default:
      return state
  }
}

const loadWishlist = () => {
  try {
    const saved = localStorage.getItem('wishlist')
    return saved ? JSON.parse(saved) : { items: [] }
  } catch {
    return { items: [] }
  }
}

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(wishlistReducer, null, loadWishlist)

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state))
  }, [state])

  const toggleWishlist = (product) => dispatch({ type: 'TOGGLE_WISHLIST', payload: product })
  const removeFromWishlist = (id) => dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id })
  const isWishlisted = (id) => state.items.some(i => i.id === id)

  return (
    <WishlistContext.Provider value={{
      items: state.items,
      toggleWishlist,
      removeFromWishlist,
      isWishlisted,
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
