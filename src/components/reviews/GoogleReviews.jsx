import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useGoogleReviews } from '../../hooks/useGoogleReviews'

const PILLS = ['team', 'service', 'products', 'support', 'information', 'app', 'issue', 'business', 'staff', 'site']

function ImageSlider({ images, onImageClick }) {
  const [idx, setIdx] = useState(0)
  const visible = 4
  const canPrev = idx > 0
  const canNext = idx + visible < images.length

  return (
    <div className="mt-auto relative group">
      <div className="grid grid-cols-4 gap-1.5 py-1">
        {images.slice(idx, idx + visible).map((imgSrc, imgIndex) => (
          <img
            key={idx + imgIndex}
            src={imgSrc}
            alt={`Review image ${idx + imgIndex + 1}`}
            className="w-full aspect-square object-cover rounded-lg shadow-sm border border-slate-100 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => onImageClick(imgSrc)}
          />
        ))}
      </div>

      {images.length > visible && (
        <div className="flex justify-end gap-1 mt-1">
          <button
            onClick={() => setIdx(i => i - 1)}
            disabled={!canPrev}
            className="p-1 rounded-full bg-slate-100 hover:bg-slate-200 disabled:opacity-30 transition-all"
          >
            <ChevronLeft size={14} className="text-slate-600" />
          </button>
          <button
            onClick={() => setIdx(i => i + 1)}
            disabled={!canNext}
            className="p-1 rounded-full bg-slate-100 hover:bg-slate-200 disabled:opacity-30 transition-all"
          >
            <ChevronRight size={14} className="text-slate-600" />
          </button>
        </div>
      )}
    </div>
  )
}

export default function GoogleReviews({ placeId = "homefix_id", apiKey = "" }) {
  const { reviews, loading, stats } = useGoogleReviews(placeId, apiKey)
  const [filter, setFilter] = useState('all')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState(null)

  if (loading) return <div className="py-20 text-center text-slate-400 font-black uppercase tracking-widest">Loading Reviews...</div>

  const displayedReviews = reviews.slice(0, 6)
  const displayCount = Math.max(1, displayedReviews.length - 2)

  const next = () => setCurrentIndex(prev => (prev + 1) % displayCount)
  const prev = () => setCurrentIndex(prev => (prev - 1 + displayCount) % displayCount)

  return (
    <section className="py-24 bg-white font-sans text-slate-900" id="reviews">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-center  mb-12 text-center md:text-center">
          <h2 className="text-4xl font-black tracking-tight flex-1">Customer reviews on Google</h2>
          <div className="h-14 w-px bg-slate-200 hidden md:block" />

        </div>

        {/* Rating Summary */}
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="flex gap-1 text-amber-500 mb-2">
            {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" stroke="none" />)}
          </div>
          <p className="text-slate-600 font-medium text-lg">
            <span className="font-bold">{stats.rating.toFixed(1)}</span> rating of 12 reviews
          </p>
        </div>



        {/* Reviews Carousel/Grid Wrapper */}
        <div className="relative overflow-visible">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {displayedReviews.map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-slate-200 rounded-[2rem] p-8 flex flex-col h-full shadow-sm hover:shadow-xl transition-all relative"
                >
                  <div className="flex items-center gap-4 mb-6">

                    <div className="flex-1">
                      <h4 className="font-black text-slate-900 text-sm tracking-tight">{r.author_name}</h4>
                      <p className="text-slate-400 text-xs font-medium">{r.relative_time_description}</p>
                    </div>
                    <div className="text-blue-500 drop-shadow-sm">
                      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-6 text-amber-500">
                    {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" stroke="none" />)}
                  </div>

                  <p className="text-slate-600 font-medium leading-relaxed mb-6 flex-1">
                    "{r.text}"
                  </p>

                  {r.images && r.images.length > 0 && (
                    <ImageSlider images={r.images} onImageClick={setSelectedImage} />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}

        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 cursor-pointer"
            >
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                className="absolute top-6 right-6 text-white hover:text-slate-300 transition-colors bg-white/10 rounded-full p-2"
              >
                <X size={28} />
              </button>
              <motion.img
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                src={selectedImage}
                alt="Enlarged review"
                className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl cursor-default"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
