import { useEffect, useState } from 'react'
import { api } from '../data/api'
import { products } from '../data/products'

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      const data = await api.getOrders()
      setOrders(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getProductImage = (order) => {
    // 1. backend valid image
    if (
      order.image &&
      typeof order.image === 'string' &&
      (order.image.startsWith('http://') || order.image.startsWith('https://'))
    ) {
      return order.image
    }

    // 2. match static frontend products by title
    const matchedProduct = products.find(
      (p) =>
        p.name?.toLowerCase().trim() === order.title?.toLowerCase().trim()
    )

    if (matchedProduct?.image) {
      return matchedProduct.image
    }

    // 3. fallback
    return 'https://via.placeholder.com/150'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2>Loading orders...</h2>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2>No orders found</h2>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-xl p-6 flex gap-6 items-center"
            >
              <img
                src={getProductImage(order)}
                alt={order.title}
                className="w-24 h-24 object-cover rounded-lg"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = 'https://via.placeholder.com/150'
                }}
              />

              <div className="flex-1">
                <h2 className="text-xl font-semibold">{order.title}</h2>

                <p className="text-gray-600">
                  Quantity: {order.quantity}
                </p>

                <p className="text-gray-600">
                  Price: ${Number(order.price).toFixed(2)}
                </p>

                <p className="font-bold mt-2">
                  Total Order: ${Number(order.total).toFixed(2)}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {new Date(order.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}