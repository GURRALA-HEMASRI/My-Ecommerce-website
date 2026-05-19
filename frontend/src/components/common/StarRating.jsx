import { Star } from 'lucide-react'

export default function StarRating({ rating, reviews, size = 'sm' }) {
  const iconSize = size === 'lg' ? 'w-5 h-5' : 'w-3.5 h-3.5'
  const textSize = size === 'lg' ? 'text-sm' : 'text-xs'

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`${iconSize} ${
              star <= Math.round(rating)
                ? 'text-amber-400 fill-current'
                : 'text-gray-200 fill-current'
            }`}
          />
        ))}
      </div>
      <span className={`${textSize} text-gray-500`}>
        {rating}
        {reviews !== undefined && ` (${reviews.toLocaleString()})`}
      </span>
    </div>
  )
}
