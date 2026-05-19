import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Trash2, Minus, Plus, ArrowRight, Tag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import EmptyState from '../components/common/EmptyState'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart()
  const navigate = useNavigate()

  const shipping = totalPrice > 50 ? 0 : 9.99
  const tax = totalPrice * 0.08
  const orderTotal = totalPrice + shipping + tax

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-3xl mx-auto px-4">
          <EmptyState
            icon={ShoppingCart}
            title="Your cart is empty"
            description="Looks like you haven't added anything to your cart yet."
            actionLabel="Start Shopping"
            actionTo="/products"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Shopping Cart <span className="text-gray-400 font-normal text-lg">({totalItems} items)</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart items */}
          <div className="flex-1 space-y-3">
            {items.map(item => {
              const discount = item.originalPrice
                ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                : 0

              return (
                <div key={item.id} className="bg-white rounded-2xl p-4 sm:p-5 flex gap-4 shadow-sm border border-gray-100">
                  <Link to={`/products/${item.id}`} className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl bg-gray-50"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">{item.brand}</p>
                        <Link to={`/products/${item.id}`}>
                          <h3 className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-2 hover:text-orange-500 transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5 text-gray-500" />
                        </button>
                        <span className="px-3 py-1.5 text-sm font-semibold text-gray-900 min-w-[2.5rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5 text-gray-500" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-gray-900 text-sm sm:text-base">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        {discount > 0 && (
                          <p className="text-xs text-green-600 font-medium">{discount}% off</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Order summary */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-24">
              <h2 className="font-bold text-gray-900 text-lg mb-4">Order Summary</h2>

              {/* Promo code */}
              <div className="flex gap-2 mb-5 p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2 flex-1">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="bg-transparent text-sm outline-none flex-1 text-gray-700 placeholder-gray-400"
                  />
                </div>
                <button className="text-orange-500 hover:text-orange-600 text-sm font-semibold transition-colors">
                  Apply
                </button>
              </div>

              <div className="space-y-3 text-sm mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-medium text-gray-900">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : 'font-medium text-gray-900'}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
                </div>
              </div>

              {shipping === 0 && (
                <div className="text-xs text-green-600 bg-green-50 rounded-lg p-2.5 mb-4 text-center">
                  You saved on shipping!
                </div>
              )}

              <div className="flex justify-between font-bold text-gray-900 text-base pt-4 border-t border-gray-100 mb-5">
                <span>Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/products"
                className="block text-center text-sm text-orange-500 hover:text-orange-600 mt-4 font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
