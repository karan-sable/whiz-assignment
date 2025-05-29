'use client'

import { useInfiniteProducts } from '@/hooks/useInfiniteProducts'
import ProductCard from './ProductCard'
import SearchBar from './SearchBar'
import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

export default function ProductList() {
  const [filter, setFilter] = useState('')
  const [debouncedFilter] = useDebounce(filter, 500)
  const [showTopBtn, setShowTopBtn] = useState(false)

  const isFiltering = debouncedFilter.trim().length > 0
  const { products, loading, hasMore, loaderRef, error } =
    useInfiniteProducts(isFiltering)

  useEffect(() => {
    const onScroll = () => {
      setShowTopBtn(window.scrollY > 300)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Filter products
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(debouncedFilter.toLowerCase())
  )

  return (
    <div className='p-6 max-w-5xl mx-auto relative'>
      {/* Search Bar */}
      <SearchBar filter={filter} setFilter={setFilter} />

      {!!error && (
        <p className='text-center text-red-600 bg-red-100 px-4 py-2 rounded mt-4 shadow'>
          ⚠️ {error}
        </p>
      )}
      {/* Product Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8'>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {isFiltering && !loading && filteredProducts.length === 0 && (
        <p className='text-center text-gray-600 mt-8'>
          {` No products found matching "`}
          <span className='font-semibold'>{debouncedFilter}</span>
          {`".`}
        </p>
      )}

      {/* Loader trigger */}
      <div ref={loaderRef} className='h-10 mt-6 grid place-items-center'>
        <p
          className={`text-center text-blue-500 ${
            loading ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-200`}
        >
          Loading...
        </p>
      </div>

      {/* Loading or end state */}
      {!hasMore && !loading && (
        <p className='text-center text-gray-500 mt-2'>
          {`No more ${!!filter ? 'filtered' : ''} products to load.`}
        </p>
      )}

      {/* Back to Top Button */}
      {showTopBtn && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className='fixed bottom-5 right-5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg transition cursor-pointer'
        >
          ↑ Top
        </button>
      )}
    </div>
  )
}
