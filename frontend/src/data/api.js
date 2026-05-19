const BASE_URL = import.meta.env.VITE_API_URL || ''

const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token')

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({
      detail: 'Request failed',
    }))

    throw new Error(error.detail || error.message || 'Request failed')
  }

  return res.json()
}

export const api = {
  login: (email, password) =>
    request('/api/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (name, email, password) =>
    request('/api/auth/register/', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  logout: () =>
    request('/api/auth/logout/', {
      method: 'POST',
    }),

  getProducts: async (params = {}) => {
    const query = new URLSearchParams(params).toString()
    const data = await request(`/api/products/?${query}`)

    return data.map((product) => ({
      ...product,
      name: product.title,
    }))
  },

  getCart: () => request('/api/cart/'),

  addToCart: (productId, quantity = 1) =>
    request('/api/cart/add/', {
      method: 'POST',
      body: JSON.stringify({
        product_id: productId,
        quantity,
      }),
    }),

  updateCartItem: (itemId, quantity) =>
    request(`/api/cart/items/${itemId}/`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity }),
    }),

  removeFromCart: (itemId) =>
    request(`/api/cart/items/${itemId}/`, {
      method: 'DELETE',
    }),

  getWishlist: () => request('/api/wishlist/'),

  toggleWishlist: (productId) =>
    request('/api/wishlist/toggle/', {
      method: 'POST',
      body: JSON.stringify({
        product_id: productId,
      }),
    }),

  createOrder: (items, total) =>
    request('/api/orders/', {
      method: 'POST',
      body: JSON.stringify({
        items,
        total,
      }),
    }),

  getOrders: () => request('/api/orders/'),
}