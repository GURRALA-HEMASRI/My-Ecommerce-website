import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingCart, Heart, Star, Truck, RotateCcw, ShieldCheck, Minus, Plus, ArrowLeft } from 'lucide-react'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/common/ProductCard'
import Breadcrumb from '../components/common/Breadcrumb'

export default function ProductDetailPage() {
  const { id } = useParams()

  const product = products.find((p) => String(p.id) === String(id))

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

  const { addToCart, isInCart, updateQuantity, items } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-semibold text-gray-700">Product not found</p>
        <Link to="/products" className="text-orange-500 hover:text-orange-600 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
      </div>
    )
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const wishlisted = isWishlisted(product.id)
  const cartItem = items.find((i) => i.id === product.id)

  const handleAddToCart = () => {
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity + quantity)
    } else {
      for (let i = 0; i < quantity; i++) addToCart(product)
    }
  }

  const tabs = ['description', 'features', 'reviews']

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: 'Home', to: '/' },
            { label: 'Products', to: '/products' },
            { label: product.name },
          ]}
        />

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-6 lg:p-8 bg-gray-50">
              <div className="aspect-square rounded-xl overflow-hidden bg-white mb-3">
                <img
                  src={product.images?.[selectedImage] || product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-4"
                />
              </div>

              {product.images?.length > 1 && (
                <div className="flex gap-2 justify-center">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                        selectedImage === i ? 'border-orange-500' : 'border-gray-200'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 lg:p-8">
              <p className="text-sm text-gray-500">{product.brand}</p>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.name}</h1>

              <div className="flex items-center gap-2 mt-4">
                <div className="flex">
                  {[1,2,3,4,5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(product.rating)
                          ? 'text-amber-400 fill-current'
                          : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-500">({product.reviews})</span>
              </div>

              <div className="flex items-center gap-3 mt-5">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>

                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}

                {discount > 0 && (
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                    {discount}% OFF
                  </span>
                )}
              </div>

              <p className="mt-6 text-gray-600">{product.description}</p>

              <div className="flex items-center gap-4 mt-6">
                <div className="flex items-center border rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <span className="px-4">{quantity}</span>

                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className="p-3 border rounded-xl"
                >
                  <Heart className={wishlisted ? 'fill-red-500 text-red-500' : ''} />
                </button>
              </div>

              <Link
                to="/checkout"
                className="block mt-4 text-center bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold"
              >
                Checkout Now
              </Link>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Related Products</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  )
}