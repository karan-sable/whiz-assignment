import { useEffect, useState } from 'react'
import { Product } from '@/types/product'
import Image from 'next/image'

export default function ProductCard({ product }: { product: Product }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true)
    }, 10) // Delay ensures transition triggers after first paint
    return () => clearTimeout(timeout)
  }, [])

  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2)

  return (
    <div
      className={`border border-blue-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-opacity duration-700 ease-in-out flex flex-col gap-2 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Thumbnail */}
      <div className='relative w-full h-48 bg-gray-100 rounded overflow-hidden'>
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className='object-cover'
        />
      </div>

      {/* Title and Brand */}
      <div>
        <h2 className='font-semibold text-lg'>{product.title}</h2>
        {!!product.brand && (
          <p className='text-sm text-gray-500'>by {product.brand}</p>
        )}
      </div>

      {/* Rating */}
      <div className='text-sm text-yellow-600'>
        ⭐ {product.rating.toFixed(1)} / 5
      </div>

      {/* Price & Discount */}
      <div className='text-md'>
        <span className='font-bold text-green-600'>${discountedPrice}</span>{' '}
        <span className='line-through text-gray-400'>${product.price}</span>{' '}
        <span className='text-sm text-red-500'>
          ({product.discountPercentage}% off)
        </span>
      </div>

      {/* Availability */}
      <p className='text-sm text-gray-600'>
        <strong>Status:</strong> {product.availabilityStatus} |{' '}
        <strong>In stock:</strong> {product.stock}
      </p>

      {/* Tags */}
      <div className='flex flex-wrap gap-2 mt-1'>
        {product.tags.map((tag) => (
          <span
            key={tag}
            className='text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded'
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Dimensions */}
      <p className='text-sm text-gray-500 mt-2'>
        <strong>Dimensions:</strong> {product.dimensions.width}
        {`"W × `}
        {product.dimensions.height}
        {`"H × `}
        {product.dimensions.depth}
        {`"D`}
      </p>

      {/* Description */}
      <p className='text-gray-600 text-sm mt-2 line-clamp-3'>
        {product.description}
      </p>

      {/* Reviews Summary */}
      {product.reviews.length > 0 && (
        <div className='mt-3 text-sm'>
          <p className='font-semibold'>Recent Review:</p>
          <blockquote className='italic text-gray-700'>
            “{product.reviews[0].comment}”
          </blockquote>
          <p className='text-gray-500 text-xs'>
            – {product.reviews[0].reviewerName}
          </p>
        </div>
      )}
    </div>
  )
}
