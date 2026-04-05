import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

export default function BeforeAfterSlider({ 
  beforeImg = "/assets/patio-before-sample.jpg", 
  afterImg = "/assets/patio-after-sample.jpg",
  aspect = "aspect-[16/9]"
}) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef(null)

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

  return (
    <div 
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-[2.5rem] select-none cursor-ew-resize shadow-2xl border-4 border-white/10 ${aspect}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* After Image (Background) */}
      <img 
        src={afterImg} 
        alt="After" 
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Before Image (Foreground with Clip) */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img 
          src={beforeImg} 
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
    </div>
  )
}
