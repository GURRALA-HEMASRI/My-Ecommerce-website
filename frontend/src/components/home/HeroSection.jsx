import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react'

const slides = [
  {
    title: 'Next-Gen Electronics',
    subtitle: 'Discover the latest gadgets',
    cta: 'Shop Electronics',
    to: '/products?category=electronics',
    bg: 'from-gray-900 to-gray-700',
    image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Up to 40% OFF',
  },
]

const features = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
  { icon: RotateCcw, title: 'Easy Returns', desc: '30-day return policy' },
  { icon: ShieldCheck, title: 'Secure Payment', desc: '100% protected' },
]

export default function HeroSection() {
  return (
    <section>
      {/* Main hero */}
      <div className="relative overflow-hidden bg-gray-900 min-h-[420px] sm:min-h-[500px] flex items-center">
        <img
          src={slides[0].image}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-lg">
            <span className="inline-block bg-orange-500 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
              {slides[0].badge}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {slides[0].title}
            </h1>
            <p className="text-gray-300 text-lg mb-8">{slides[0].subtitle}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                to={slides[0].to}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all active:scale-95"
              >
                {slides[0].cta} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all border border-white/20"
              >
                Browse All
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feature strips */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 divide-x divide-gray-100">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center justify-center gap-3 py-4 px-2 sm:px-6">
                <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-orange-500" />
                </div>
                <div className="hidden sm:block">
                  <p className="font-semibold text-gray-800 text-sm">{title}</p>
                  <p className="text-gray-500 text-xs">{desc}</p>
                </div>
                <p className="text-xs font-medium text-gray-700 sm:hidden">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
