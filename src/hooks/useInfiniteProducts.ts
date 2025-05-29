import { useEffect, useRef, useState } from 'react'
import { Product, ProductResponse } from '@/types/product'
import axios from 'axios'

const LIMIT = 10

export function useInfiniteProducts(disabled = false) {
  const [products, setProducts] = useState<Product[]>([])
  const [skip, setSkip] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null) // 🆕

  const loaderRef = useRef<HTMLDivElement | null>(null)
  const hasFetchedOnce = useRef(false)

  const fetchProducts = async () => {
    setLoading(true)
    setError(null) // clear previous errors

    axios
      .get(`https://dummyjson.com/products`, {
        params: { limit: LIMIT, skip: skip },
      })
      .then((response) => {
        // throw Error()
        const data: ProductResponse = response.data
        setProducts((prev) => [...prev, ...data.products])
        setSkip((prev) => prev + LIMIT)
        setHasMore(data.products.length === LIMIT)
        hasFetchedOnce.current = true
      })
      .catch((error) => {
        setError(
          error.message ||
            'Something went wrong while fetching products. Please refresh or try again later'
        )
        console.error('Fetch Error:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    if (disabled || !hasFetchedOnce.current || loading) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && hasMore && !loading) {
          fetchProducts()
        }
      },
      { threshold: 1 }
    )

    const current = loaderRef.current
    if (current) observer.observe(current)

    return () => {
      if (current) observer.unobserve(current)
    }
  }, [loading, hasMore, disabled])

  return { products, loading, hasMore, loaderRef, error } // 🆕 return error
}
