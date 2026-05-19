import { Link } from 'react-router-dom'
import { categories } from '../../data/products'

export default function CategorySection() {
  const displayCats = categories.filter(c => c.id !== 'all')

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {displayCats.map(cat => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="flex flex-col items-center gap-2 p-3 sm:p-4 bg-white rounded-2xl border border-gray-100 hover:border-orange-300 hover:shadow-md transition-all group"
            >
              <span className="text-2xl sm:text-3xl">{cat.icon}</span>
              <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-orange-500 transition-colors text-center">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
