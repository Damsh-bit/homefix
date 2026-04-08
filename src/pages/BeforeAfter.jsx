import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ChevronDown } from 'lucide-react'
import { usePageMetadata } from '../hooks/usePageMetadata.jsx'

// Complete gallery of before-after images
const BEFORE_AFTER_IMAGES = [
  { src: '/assets/before-after/Beige Minimalist Beauty Before After Collage Instagram Post.webp', label: 'Premium Patio Cover' },
  { src: '/assets/before-after/Beige Minimalist Beauty Before After Collage Instagram Post-7.webp', label: 'Patio Transformation' },
  { src: '/assets/before-after/Beige Minimalist Beauty Before After Collage Instagram Post-8.webp', label: 'Outdoor Living Space' },
  { src: '/assets/before-after/Beige Minimalist Beauty Before After Collage Instagram Post-9.webp', label: 'Backyard Renovation' },
  { src: '/assets/before-after/Beige Minimalist Beauty Before After Collage Instagram Post-10.webp', label: 'Modern Design' },
  { src: '/assets/before-after/Beige Minimalist Beauty Before After Collage Instagram Post-11.webp', label: 'Complete Makeover' },
  { src: '/assets/before-after/Beige Minimalist Beauty Before After Collage Instagram Post-12.webp', label: 'Luxury Patio' },
  { src: '/assets/before-after/Beige Minimalist Beauty Before After Collage Instagram Post-13.webp', label: 'Pergola Installation' },
  { src: '/assets/before-after/Beige Minimalist Beauty Before After Collage Instagram Post-14.webp', label: 'Entertaining Space' },
  { src: '/assets/before-after/Beige Minimalist Beauty Before After Collage Instagram Post-15.webp', label: 'Outdoor Kitchen' },
  { src: '/assets/before-after/Beige Minimalist Beauty Before After Collage Instagram Post-16.webp', label: 'Fire Pit Area' },
  { src: '/assets/before-after/Beige Minimalist Beauty Before After Collage Instagram Post-17.webp', label: 'Pool Integration' },
  { src: '/assets/before-after/Beige Minimalist Beauty Before After Collage Instagram Post-18.webp', label: 'Residential Oasis' },
  { src: '/assets/before-after/Beige Minimalist Beauty Before After Collage Instagram Post-19.webp', label: 'Shade Structures' },
  { src: '/assets/before-after/Beige Minimalist Beauty Before After Collage Instagram Post-20.webp', label: 'Roofing Project' },
  { src: '/assets/before-after/Beige Minimalist Beauty Before After Collage Instagram Post-21.webp', label: 'Lighting Design' },
  { src: '/assets/before-after/Beige Minimalist Beauty Before After Collage Instagram Post-22.webp', label: 'Family Gathering Space' },
  { src: '/assets/before-after/Beige Minimalist Beauty Before After Collage Instagram Post-23.webp', label: 'Resort Style' },
  { src: '/assets/before-after/Beige Minimalist Beauty Before After Collage Instagram Post-24.webp', label: 'Contemporary Patio' },
  { src: '/assets/before-after/Beige Minimalist Beauty Before After Collage Instagram Post-25.webp', label: 'Backyard Entertainment' },
  { src: '/assets/before-after/Beige Minimalist Beauty Before After Collage Instagram Post-26.webp', label: 'Premium Finishes' },
  { src: '/assets/before-after/Beige Minimalist Beauty Before After Collage Instagram Post-27.webp', label: 'Structural Excellence' },
  { src: '/assets/before-after/Beige Minimalist Beauty Before After Collage Instagram Post-28.webp', label: 'Elevated Living' },
  { src: '/assets/before-after/Beige Minimalist Beauty Before After Collage Instagram Post-29.webp', label: 'Luxury Outdoor' },
  { src: '/assets/before-after/Beige Minimalist Beauty Before After Collage Instagram Post-30.webp', label: 'Home Oasis' },
  { src: '/assets/before-after/Beige Minimalist Beauty Before After Collage Instagram Post-31.webp', label: 'Custom Design' },
  { src: '/assets/before-after/Beige Minimalist Beauty Before After Collage Instagram Post-32.webp', label: 'Professional Build' },
  { src: '/assets/before-after/Beige Minimalist Beauty Before After Collage Instagram Post-33.webp', label: 'Dream Realized' },
  { src: '/assets/before-after/Beige Minimalist Beauty Before After Collage Instagram Post-34.webp', label: 'Outdoor Paradise' },
  { src: '/assets/before-after/Beige Minimalist Beauty Before After Collage Instagram Post-35.webp', label: 'Transformation Magic' },
  { src: '/assets/before-after/Beige Minimalist Beauty Before After Collage Instagram Post-36.webp', label: 'Premium Quality' },
  { src: '/assets/before-after/Beige Minimalist Beauty Before After Collage Instagram Post-37.webp', label: 'Houston Excellence' }
]

export default function BeforeAfter() {
  const [selectedImage, setSelectedImage] = useState(null)

  usePageMetadata({
    title: 'Before & After Gallery | FixMyHome LLC',
    description: 'Explore our complete gallery of before and after transformations from real Houston patio, pergola, and outdoor living projects.',
    url: 'https://fixmyhomellc.com/before-after',
    image: '/assets/before-after/Beige Minimalist Beauty Before After Collage Instagram Post-7.webp'
  })

  return (
    <div className="bg-white">
      {/* ── HERO SECTION ────────────────────────────────────────────────── */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] p-6 md:p-20 flex items-center justify-center bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-slate-950 to-slate-950" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-8 bg-blue-500" />
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-blue-400">
                Complete Portfolio
              </span>
              <div className="h-px w-8 bg-blue-500" />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight mb-6">
              Before & After <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">
                Transformations
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto">
              Discover the complete gallery of real Houston homes that have been transformed by FixMyHome. From concept to completion, see the quality and attention to detail in every project.
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <ChevronDown size={32} className="text-blue-400" />
        </motion.div>
      </section>

      {/* ── GALLERY GRID ────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {BEFORE_AFTER_IMAGES.map((image, index) => (
              <motion.img
                key={index}
                src={image.src}
                alt={image.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 6) * 0.05 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedImage(index)}
                className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer"
                loading="lazy"
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── LIGHTBOX MODAL ──────────────────────────────────────────────── */}
      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-5xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={BEFORE_AFTER_IMAGES[selectedImage].src}
              alt={BEFORE_AFTER_IMAGES[selectedImage].label}
              className="w-full h-auto rounded-[2rem] shadow-2xl"
            />
            <div className="mt-6 text-center">
              <p className="text-white text-xl font-bold mb-4">
                {BEFORE_AFTER_IMAGES[selectedImage].label}
              </p>
              <p className="text-slate-400 text-sm mb-6">
                Project {selectedImage + 1} of {BEFORE_AFTER_IMAGES.length}
              </p>
              <button
                onClick={() => setSelectedImage(null)}
                className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold uppercase tracking-wider hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ── CTA SECTION ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-black text-slate-950 mb-6 uppercase italic tracking-tight">
              Ready to Transform Your Space?
            </h2>
            <p className="text-slate-600 font-light text-lg mb-10">
              Start your own transformation journey. Get a free quote and let's bring your dream outdoor space to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/quote"
                className="group relative px-10 py-5 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 overflow-hidden transition-all hover:bg-blue-700 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)]"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative">Get Free Quote</span>
              </Link>
              <Link
                to="/"
                className="px-10 py-5 bg-white border-2 border-slate-900 text-slate-900 rounded-full font-black uppercase tracking-widest text-xs hover:bg-slate-900 hover:text-white transition-all"
              >
                Back Home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
