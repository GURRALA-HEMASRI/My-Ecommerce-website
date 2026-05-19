import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import EmptyState from '../components/common/EmptyState'
import StarRating from '../components/common/StarRating'

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist()
  const { addToCart, isInCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-3xl mx-auto px-4">
          <EmptyState
            icon={Heart}
            title="Your wishlist is empty"
            description="Save items you love to your wishlist and shop them later."
            actionLabel="Browse Products"
            actionTo="/products"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            My Wishlist <span className="text-gray-400 font-normal text-lg">({items.length})</span>
          </h1>
          <Link to="/products" className="text-orange-500 hover:text-orange-600 text-sm font-medium">
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map(item => {
            const discount = item.originalPrice
              ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
              : 0
            const inCart = isInCart(item.id)

            return (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
                <div className="relative overflow-hidden bg-gray-50">
                  <Link to={`/products/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  {discount > 0 && (
                    <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                      -{discount}%
                    </span>
                  )}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{item.brand}</p>
                  <Link to={`/products/${item.id}`}>
                    <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 hover:text-orange-500 transition-colors mb-2">
                      {item.name}
                    </h3>
                  </Link>
                  <StarRating rating={item.rating} reviews={item.reviews} />
                  <div className="flex items-center gap-2 my-3">
                    <span className="font-bold text-gray-900">${item.price.toFixed(2)}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">${item.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      inCart
                        ? 'bg-green-50 text-green-600 border border-green-200'
                        : 'bg-orange-500 hover:bg-orange-600 text-white active:scale-95'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {inCart ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
