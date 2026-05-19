import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ProductCard from '../common/ProductCard'
import { api } from '../../data/api'

export default function FeaturedProducts({ title = 'Featured Products', filterFn, limit = 4 }) {

  const [products, setProducts] = useState([])

  useEffect(() => {
    api.getProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.log(err))
  }, [])

  const list = filterFn ? products.filter(filterFn) : products
  const displayed = list.slice(0, limit)

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>

          <Link
            to="/products"
            className="flex items-center gap-1 text-orange-500 hover:text-orange-600 font-semibold text-sm transition-colors"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayed.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}





// import { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { ArrowRight } from 'lucide-react'
// import ProductCard from '../common/ProductCard'
// // import { products } from '../../data/products'
// import { api } from '../../data/api'

// export default function FeaturedProducts({ title = 'Featured Products', filterFn, limit = 4 }) {
//   const list = filterFn ? products.filter(filterFn) : products
//   const displayed = list.slice(0, limit)
//   const [products, setProducts] = useState([])

//   useEffect(() => {
//     api.getProducts()
//       .then((data) => setProducts(data))
//       .catch((err) => console.log(err))
//   }, [])

//   return (
//     <section className="py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
//           <Link
//             to="/products"
//             className="flex items-center gap-1 text-orange-500 hover:text-orange-600 font-semibold text-sm transition-colors"
//           >
//             View All <ArrowRight className="w-4 h-4" />
//           </Link>
//         </div>
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//           {displayed.map(p => (
//             <ProductCard key={p.id} product={p} />
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }
