import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-20 text-center">
      <div className="text-8xl font-bold text-orange-500 mb-4">404</div>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Page not found</h1>
      <p className="text-gray-500 mb-8 max-w-sm">
        Sorry, we couldn't find the page you're looking for. It may have been moved or deleted.
      </p>
      <div className="flex gap-3 flex-wrap justify-center">
        <Link
          to="/"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
        >
          Go Home
        </Link>
        <Link
          to="/products"
          className="border border-gray-200 text-gray-700 hover:bg-white px-6 py-3 rounded-xl font-semibold transition-colors"
        >
          Browse Products
        </Link>
      </div>
    </div>
  )
}
