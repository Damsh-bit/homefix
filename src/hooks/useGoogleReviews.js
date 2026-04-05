import { useState, useEffect } from 'react'
import manualReviews from '../data/reviewsData.json'

/**
 * Custom hook to fetch and merge Google Reviews.
 * @param {string} placeId - Google Place ID
 * @param {string} apiKey - Google API Key
 */
export function useGoogleReviews(placeId, apiKey) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState({ rating: 4.9, count: 0 })

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        
        let apiReviews = []
        
        // Caching logic: check localStorage (added v3 to invalidate old cache)
        const cachedData = localStorage.getItem(`reviews_v3_${placeId}`)
        if (cachedData) {
          const { timestamp, data } = JSON.parse(cachedData)
          const isExpired = Date.now() - timestamp > 1000 * 60 * 60 * 24 // 24 hours
          if (!isExpired) {
            setReviews(data)
            setStats({ 
              rating: data.reduce((acc, r) => acc + r.rating, 0) / data.length || 4.9,
              count: data.length 
            })
            setLoading(false)
            return
          }
        }

        if (apiKey && placeId) {
          // ...
        }

        const merged = [...apiReviews, ...manualReviews].reduce((acc, curr) => {
          if (!acc.find(item => item.id === curr.id || item.author_name === curr.author_name)) {
            acc.push(curr)
          }
          return acc
        }, [])

        // Store in cache
        localStorage.setItem(`reviews_v3_${placeId}`, JSON.stringify({
          timestamp: Date.now(),
          data: merged
        }))

        setReviews(merged)
        setStats({ 
          rating: merged.reduce((acc, r) => acc + r.rating, 0) / merged.length || 4.9,
          count: merged.length 
        })
      } catch (err) {
        console.error("Error fetching reviews:", err)
        setError("Could not load reviews. Showing cached data.")
        setReviews(manualReviews)
        setStats({ rating: 4.8, count: manualReviews.length })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [placeId, apiKey])

  return { reviews, loading, error, stats }
}
