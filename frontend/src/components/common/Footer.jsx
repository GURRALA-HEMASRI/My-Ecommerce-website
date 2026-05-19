import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'

const socialLinks = [
  { label: 'f', title: 'Facebook' },
  { label: 'X', title: 'Twitter' },
  { label: 'in', title: 'Instagram' },
  { label: '▶', title: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-white font-bold text-xl">ShopEase</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Your one-stop destination for premium products at unbeatable prices.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ label, title }) => (
                <a key={title} href="#" title={title} className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors text-xs font-bold">
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Home', to: '/' },
                { label: 'All Products', to: '/products' },
                { label: 'My Cart', to: '/cart' },
                { label: 'Wishlist', to: '/wishlist' },
                { label: 'My Account', to: '/login' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-orange-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              {['Electronics', 'Fashion', 'Home & Kitchen', 'Sports', 'Books', 'Beauty'].map(cat => (
                <li key={cat}>
                  <Link
                    to={`/products?category=${cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                    className="hover:text-orange-400 transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                <span>123 Commerce St, San Francisco, CA 94102</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>support@shopease.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p>&copy; 2026 ShopEase. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
