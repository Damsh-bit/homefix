import { useState, useRef } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Project data with before/after images
const PROJECTS = [
  {
    id: 1,
    title: "Modern Patio Transformation",
    beforeImg: "/assets/patio-before-sample.jpg",
    afterImg: "/assets/patio-after-sample.jpg",
    description: "Complete backyard renovation with custom pergola"
  },
  {
    id: 2,
    title: "Premium Wood Columns",
    beforeImg: "/assets/materials/stone-columns.jpg",
    afterImg: "/assets/materials/wood-posts.jpg",
    description: "Stone columns before, wood posts after showcasing a polished upgrade"
  },
  {
    id: 3,
    title: "Elegant Hip Roof Design",
    beforeImg: "/assets/materials/gable-roof.jpg",
    afterImg: "/assets/materials/hip-roof.jpg",
    description: "Gable roof before, hip roof after for an elegant exterior makeover"
  }
]

export default function BeforeAfterSlider({
  aspect = "aspect-[16/9]"
}) {
  const [currentProject, setCurrentProject] = useState(0)
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef(null)

  const currentProjectData = PROJECTS[currentProject]

  const handleMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX || (e.touches && e.touches[0].clientX)
    const position = ((x - rect.left) / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, position)))
  }

  const handleMouseDown = () => {
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', () => window.removeEventListener('mousemove', handleMove))
  }

  const handleTouchStart = () => {
    window.addEventListener('touchmove', handleMove)
    window.addEventListener('touchend', () => window.removeEventListener('touchmove', handleMove))
  }

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % PROJECTS.length)
    setSliderPosition(50) // Reset slider position
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length)
    setSliderPosition(50) // Reset slider position
  }

  const goToProject = (index) => {
    setCurrentProject(index)
    setSliderPosition(50) // Reset slider position
  }

  return (
    <div className="relative">
      {/* Main Slider Container */}
      <div
        ref={containerRef}
        className={`relative w-full overflow-hidden rounded-[2.5rem] select-none cursor-ew-resize shadow-2xl border-4 border-white/10 ${aspect}`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full"
          >
            {/* After Image (Background) */}
            <img
              src={currentProjectData.afterImg}
              alt="After"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Before Image (Foreground with Clip) */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src={currentProjectData.beforeImg}
                alt="Before"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Slider Bar */}
            <div
              className="absolute top-0 bottom-0 z-30 w-1 bg-white cursor-ew-resize group"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center gap-1.5 border-[6px] border-blue-600/20 group-hover:scale-110 transition-transform">
                 <div className="w-1 h-4 bg-blue-600 rounded-full" />
                 <div className="w-1 h-4 bg-blue-600 rounded-full" />
              </div>
            </div>

            {/* Labels */}
            <div className="absolute bottom-6 left-6 z-20 px-4 py-2 bg-slate-950/60 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/10">
              Before Transformation
            </div>
            <div className="absolute bottom-6 right-6 z-20 px-4 py-2 bg-blue-600/80 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/10">
              After Architecture
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevProject}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-xl flex items-center justify-center hover:bg-white transition-colors border border-white/20"
      >
        <ChevronLeft size={20} className="text-slate-700" />
      </button>
      <button
        onClick={nextProject}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-xl flex items-center justify-center hover:bg-white transition-colors border border-white/20"
      >
        <ChevronRight size={20} className="text-slate-700" />
      </button>

      {/* Project Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {PROJECTS.map((_, index) => (
          <button
            key={index}
            onClick={() => goToProject(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentProject
                ? 'bg-blue-600 scale-125'
                : 'bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>

      {/* Project Info */}
      <div className="mt-4 text-center">
        <h3 className="text-lg font-bold text-slate-900 mb-1">
          {currentProjectData.title}
        </h3>
        <p className="text-sm text-slate-600">
          {currentProjectData.description}
        </p>
      </div>
    </div>
  )
}
