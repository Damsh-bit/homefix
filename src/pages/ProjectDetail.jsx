import { useState, useEffect, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, X, ChevronLeft, ChevronRight, ZoomIn, Grid, Images, Play, Video } from 'lucide-react'
import { PORTFOLIO_PROJECTS } from '../data/portfolioData'
import { usePageMetadata } from '../hooks/usePageMetadata.jsx'

export default function ProjectDetail() {
  const { projectId } = useParams()
  const navigate = useNavigate()

  const project = PORTFOLIO_PROJECTS.find(p => p.id === projectId)

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [imgErrors, setImgErrors] = useState({})

  usePageMetadata({
    title: project
      ? `${project.title} | FixMyHome LLC Portfolio`
      : 'Project | FixMyHome LLC',
    description: project?.description ?? '',
    url: `https://fixmyhomellc.com/portfolio/${projectId}`,
    image: project?.coverImage ?? '',
  })

  // Handle missing project
  useEffect(() => {
    if (!project) navigate('/portfolio', { replace: true })
  }, [project, navigate])

  const openLightbox = (idx) => {
    setLightboxIndex(idx)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    document.body.style.overflow = ''
  }, [])

  const prevImage = useCallback(() => {
    setLightboxIndex(i => (i - 1 + project.images.length) % project.images.length)
  }, [project])

  const nextImage = useCallback(() => {
    setLightboxIndex(i => (i + 1) % project.images.length)
  }, [project])

  useEffect(() => {
    if (!lightboxOpen) return
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'ArrowRight') nextImage()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxOpen, closeLightbox, prevImage, nextImage])

  const handleImgError = (src) => {
    setImgErrors(prev => ({ ...prev, [src]: true }))
  }

  if (!project) return null

  const validImages = project.images.filter(src => !imgErrors[src])

  // Categorize images into rows for masonry-like layout (alternating sizes)
  const getSpanClass = (index, total) => {
    // Pattern: big, small, small, big, small, small, ...
    const pattern = index % 3
    if (pattern === 0) return 'col-span-2 row-span-2'
    return 'col-span-1 row-span-1'
  }

  return (
    <div className="bg-slate-950 min-h-screen pt-24 pb-20">
      {/* ── HEADER ────────────────────────────────────────────── */}
      <div className="px-6 sm:px-8 lg:px-12 mb-12">
        <div className="container mx-auto">
          {/* Back navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-10"
          >
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium group"
            >
              <span className="w-8 h-8 rounded-full bg-slate-800 group-hover:bg-blue-600 flex items-center justify-center transition-colors">
                <ArrowLeft size={15} />
              </span>
              Back to Portfolio
            </Link>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span
                className="inline-block text-[10px] font-black uppercase tracking-[0.4em] mb-3 px-3 py-1 rounded-full"
                style={{ color: project.accentColor, backgroundColor: project.accentColor + '20' }}
              >
                {project.category}
              </span>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none mb-3">
                {project.title}
              </h1>
              <p className="text-slate-400 font-light text-lg max-w-xl leading-relaxed">
                {project.subtitle}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 shrink-0"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full">
                <Images size={14} className="text-slate-400" />
                <span className="text-sm font-bold text-white">{validImages.length} Photos</span>
              </div>
            </motion.div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-slate-500 font-light max-w-2xl leading-relaxed border-t border-slate-800 pt-6"
          >
            {project.description}
          </motion.p>
        </div>
      </div>

      {/* ── GALLERY GRID ──────────────────────────────────────── */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3"
          >
            {project.images.map((src, idx) => (
              !imgErrors[src] && (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 * Math.min(idx, 10) }}
                  className="break-inside-avoid mb-3 group relative overflow-hidden rounded-2xl cursor-pointer bg-slate-800"
                  onClick={() => openLightbox(idx)}
                >
                  <img
                    src={src}
                    alt={`${project.title} - Photo ${idx + 1}`}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    onError={() => handleImgError(src)}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                    <span className="text-white text-xs font-bold uppercase tracking-widest">
                      Photo {idx + 1}
                    </span>
                    <span className="w-9 h-9 bg-white rounded-full flex items-center justify-center translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <ZoomIn size={16} className="text-slate-900" />
                    </span>
                  </div>
                </motion.div>
              )
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── VIDEO GALLERY (if project has videos) ─────────────── */}
      {project.videos && project.videos.length > 0 && (
        <div className="px-4 sm:px-6 lg:px-8 mt-20">
          <div className="container mx-auto">
            <div className="border-t border-slate-800 pt-16 mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-pink-500/20 text-pink-500 rounded-full flex items-center justify-center">
                  <Video size={20} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-pink-500">Project Videos</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase italic tracking-tighter leading-none mb-2">
                See It <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">In Motion</span>
              </h2>
              <p className="text-slate-500 font-light max-w-lg">Watch the transformation come to life through our project videos.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {project.videos.map((video, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative aspect-[9/16] rounded-[2.5rem] overflow-hidden bg-slate-900 border border-white/5 shadow-2xl"
                >
                  <video
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    muted
                    loop
                    playsInline
                    autoPlay
                  >
                    <source src={video.src} type={video.src.toLowerCase().endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
                  </video>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Label */}
                  <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-xl rounded-full border border-white/20">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">{video.label}</span>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center transition-all group-hover:scale-125">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-3xl rounded-full flex items-center justify-center text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play size={32} fill="currentColor" />
                    </div>
                  </div>

                  {/* Bottom label */}
                  <div className="absolute bottom-6 left-6 right-6 z-10">
                    <span className="text-white text-sm font-black uppercase tracking-wide">{video.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── OTHER PROJECTS CTA ────────────────────────────────── */}
      <div className="px-6 mt-24">
        <div className="container mx-auto">
          <div className="border-t border-slate-800 pt-16">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-8 text-center">
              Explore More Projects
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {PORTFOLIO_PROJECTS.filter(p => p.id !== project.id).map(p => (
                <Link
                  key={p.id}
                  to={`/portfolio/${p.id}`}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full text-sm font-bold uppercase tracking-wide transition-all hover:-translate-y-0.5"
                  style={{ borderBottom: `2px solid ${p.accentColor}` }}
                >
                  {p.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── LIGHTBOX ──────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 w-11 h-11 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <X size={20} className="text-white" />
            </button>

            {/* Counter */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-slate-800/80 px-4 py-1.5 rounded-full text-white text-sm font-bold z-10">
              {lightboxIndex + 1} / {project.images.length}
            </div>

            {/* Prev button */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage() }}
              className="absolute left-4 sm:left-8 w-12 h-12 bg-slate-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <ChevronLeft size={24} className="text-white" />
            </button>

            {/* Image */}
            <div className="max-w-6xl max-h-[85vh] px-20 w-full" onClick={e => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  src={project.images[lightboxIndex]}
                  alt={`${project.title} - Photo ${lightboxIndex + 1}`}
                  className="w-full h-full object-contain max-h-[85vh] rounded-2xl"
                />
              </AnimatePresence>
            </div>

            {/* Next button */}
            <button
              onClick={(e) => { e.stopPropagation(); nextImage() }}
              className="absolute right-4 sm:right-8 w-12 h-12 bg-slate-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <ChevronRight size={24} className="text-white" />
            </button>

            {/* Thumbnail strip */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 max-w-[90vw] overflow-x-auto pb-1 px-2">
              {project.images.map((src, idx) => (
                <button
                  key={src}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(idx) }}
                  className={`shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === lightboxIndex ? 'border-blue-500 scale-110' : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
