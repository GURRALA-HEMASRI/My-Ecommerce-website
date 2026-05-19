import HeroSection from '../components/home/HeroSection'
import CategorySection from '../components/home/CategorySection'
import FeaturedProducts from '../components/home/FeaturedProducts'
import { Link } from 'react-router-dom'

const banners = [
  {
    title: 'Fashion Sale',
    desc: 'Up to 60% off on clothing & accessories',
    bg: 'bg-gradient-to-r from-rose-500 to-pink-600',
    to: '/products?category=fashion',
    img: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    title: 'Home & Kitchen',
    desc: 'Upgrade your living space',
    bg: 'bg-gradient-to-r from-teal-500 to-cyan-600',
    to: '/products?category=home',
    img: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
]

export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <CategorySection />

      {/* Promo banners */}
      <section className="py-4 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {banners.map(b => (
              <Link
                key={b.title}
                to={b.to}
                className={`${b.bg} rounded-2xl overflow-hidden relative flex items-center justify-between p-6 sm:p-8 hover:opacity-95 transition-opacity`}
              >
                <div className="relative z-10">
                  <h3 className="text-white text-xl sm:text-2xl font-bold mb-1">{b.title}</h3>
                  <p className="text-white/80 text-sm mb-3">{b.desc}</p>
                  <span className="inline-block bg-white text-gray-900 text-sm font-semibold px-4 py-1.5 rounded-lg">
                    Shop Now
                  </span>
                </div>
                <img
                  src={b.img}
                  alt={b.title}
                  className="w-28 h-28 sm:w-36 sm:h-36 object-cover rounded-xl opacity-90"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FeaturedProducts
        title="Best Sellers"
        filterFn={p => p.badge === 'Best Seller' || p.rating >= 4.7}
        limit={4}
      />

      <div className="bg-white py-4">
        <FeaturedProducts title="New Arrivals" filterFn={p => p.badge === 'New' || p.badge === 'New Arrival'} limit={4} />
      </div>

      <FeaturedProducts title="Top Deals" filterFn={p => p.originalPrice && ((p.originalPrice - p.price) / p.originalPrice) > 0.25} limit={4} />

      {/* Newsletter */}
      <section className="bg-gray-900 py-14 mt-8">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Stay in the Loop</h2>
          <p className="text-gray-400 mb-6">Subscribe to get exclusive deals, new arrivals, and more.</p>
          <form className="flex gap-2 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-gray-800 text-white placeholder-gray-400 px-4 py-3 rounded-xl outline-none border border-gray-700 focus:border-orange-400 transition-colors text-sm"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
