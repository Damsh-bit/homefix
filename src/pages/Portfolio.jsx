import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowUpRight, Filter, ChevronRight, Play, 
  MapPin, Calendar, Layers, Star 
} from 'lucide-react'
import BeforeAfterSlider from '../components/portfolio/BeforeAfterSlider'
import { usePageMetadata } from '../hooks/usePageMetadata.jsx'

const CATEGORIES = ['All', 'Patio Covers', 'Renovations', 'Custom Pools', 'Outdoor Kitchens']

const PROJECTS = [
  {
    id: 1,
    title: 'Modern Gable Transformation',
    category: 'Patio Covers',
    location: 'Sugar Land, TX',
    image: '/assets/materials/gable-roof.jpg',
    year: '2023',
    feat: 'Cedar-Wrapped Columns'
  },
  {
    id: 2,
    title: 'Luxury Resort Pool & Deck',
    category: 'Custom Pools',
    location: 'The Woodlands, TX',
    image: '/assets/materials/pool2.jpg',
    year: '2024',
    feat: 'Travertine Flooring'
  },
  {
    id: 3,
    title: 'Gourmet Outdoor Living',
    category: 'Outdoor Kitchens',
    location: 'Memorial, TX',
    image: '/assets/materials/bbq-station.jpg',
    year: '2023',
    feat: 'Custom BBQ Station'
  },
  {
    id: 4,
    title: 'Contemporary Lean-to Extension',
    category: 'Patio Covers',
    location: 'Katy, TX',
    image: '/assets/materials/lean-to.jpg',
    year: '2024',
    feat: 'Floating Design'
  },
  {
    id: 5,
    title: 'Artisan Stone Fireplace',
    category: 'Renovations',
    location: 'Cypress, TX',
    image: '/assets/materials/fireplace.jpg',
    year: '2022',
    feat: 'Natural Stone Masonry'
  },
  {
    id: 6,
    title: 'Minimalist Stamped Poolside',
    category: 'Custom Pools',
    location: 'Pearland, TX',
    image: '/assets/materials/pool.jpg', 
    year: '2023',
    feat: 'Anti-Slip Finish'
  }
]

export default function Portfolio() {
  const [filter, setFilter] = useState('All')

  const filteredProjects = PROJECTS.filter(p => filter === 'All' || p.category === filter)

  usePageMetadata({
    title: 'Portfolio | FixMyHome LLC — Houston Outdoor Living Projects',
    description: 'Explore premium patio covers, outdoor kitchens, and custom pool transformations completed by FixMyHome LLC across Houston and surrounding areas.',
    url: 'https://fixmyhomellc.com/portfolio',
    image: '/assets/materials/pool.jpg'
  })

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      {/* ── HERO SECTION ────────────────────────────────────────────────── */}
      <section className="mb-24 px-6 sm:px-8 lg:px-10">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6"
            >
              <div className="h-px w-10 bg-blue-600" />
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">
                Our Architecture
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-950 mb-8 uppercase italic tracking-tighter leading-tight"
            >
              Masterpieces <br /><span className="text-blue-600">In Houston</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-slate-500 font-light max-w-2xl leading-relaxed italic"
            >
              A curated collection of visionary transformations. Every line, stone, and beam reflects our commitment to architectural excellence.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER SHOWCASE ──────────────────────────────────────── */}
      <section className="mb-32 px-6">
        <div className="container mx-auto">
           <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                <div className="mb-10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2 block">Real Transformations</span>
                  <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-950 italic mb-6">
                    See The <br /><span className="text-blue-600">Architectural Shift</span>
                  </h2>
                  <p className="text-slate-500 font-light leading-relaxed mb-8">
                    Drag the slider to compare the original state with our final execution. We don't just build; we reimagine the entire outdoor experience with precision engineering and high-end materials.
                  </p>
                  
                  <div className="space-y-4">
                     {[
                       { label: 'Project', val: 'Luxury Gable Extension' },
                       { label: 'Scope', val: 'New Roof, Flooring & Columns' },
                       { label: 'Design', val: 'Modern Resilience System' }
                     ].map((inf, i) => (
                       <div key={i} className="flex items-center gap-6 py-4 border-b border-slate-100">
                          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 w-20">{inf.label}</span>
                          <span className="font-bold text-slate-900">{inf.val}</span>
                       </div>
                     ))}
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/2 w-full">
                 <BeforeAfterSlider 
                   beforeImg="/assets/patio-before-sample.jpg"
                   afterImg="/assets/patio-after-sample.jpg"
                 />
              </div>
           </div>
        </div>
      </section>

      {/* ── FILTERABLE GALLERY ──────────────────────────────────────────── */}
      <section className="px-6 relative">
        <div className="container mx-auto">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-8 mb-16 border-b border-slate-100 pb-10">
             <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      filter === cat 
                        ? 'bg-slate-950 text-white shadow-2xl shadow-slate-300 -translate-y-1' 
                        : 'bg-white text-slate-400 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
             </div>
             <div className="flex items-center gap-3 text-slate-400">
                <Filter size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">{filteredProjects.length} Projects Listed</span>
             </div>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden mb-6 bg-slate-100 shadow-xl group-hover:shadow-2xl transition-all border border-slate-100">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-10">
                       <span className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <ArrowUpRight size={24} />
                       </span>
                       <h3 className="text-2xl font-black text-white italic leading-none">{project.title}</h3>
                    </div>
                  </div>
                  
                  <div className="px-4">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">{project.category}</span>
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{project.year}</span>
                    </div>
                    <h4 className="text-xl font-black text-slate-950 uppercase tracking-tighter mb-1">{project.title}</h4>
                    <div className="flex items-center gap-2 text-slate-400">
                       <MapPin size={12} />
                       <span className="text-xs font-light">{project.location}</span>
                       <span className="mx-2 text-slate-200">/</span>
                       <Star size={12} className="text-yellow-400" fill="currentColor" />
                       <span className="text-xs font-light italic">{project.feat}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ─────────────────────────────────────────────────── */}
      <section className="mt-40 px-6">
         <div className="container mx-auto">
            <div className="bg-slate-950 rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full opacity-10">
                 <img src="/assets/materials/gable-roof.jpg" alt="BG" className="w-full h-full object-cover" />
               </div>
               <div className="relative z-10">
                 <h2 className="text-4xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-8 leading-none">
                    Start Your <br /><span className="text-blue-500">Legacy Today</span>
                 </h2>
                 <p className="text-slate-400 text-lg font-light max-w-xl mx-auto mb-12">
                   Your dream home is just one click away. Visualize, quote, and build with Houston's premier construction group.
                 </p>
                 <Link to="/quote" className="inline-flex px-12 py-6 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-colors shadow-2xl shadow-blue-500/20">
                    Request Free Estimate
                 </Link>
               </div>
            </div>
         </div>
      </section>
    </div>
  )
}
