import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Images, ChevronRight } from 'lucide-react'
import { PORTFOLIO_PROJECTS } from '../data/portfolioData'
import BeforeAfterSlider from '../components/portfolio/BeforeAfterSlider'
import { usePageMetadata } from '../hooks/usePageMetadata.jsx'

export default function Portfolio() {
  const [hoveredId, setHoveredId] = useState(null)

  usePageMetadata({
    title: 'Portfolio | FixMyHome LLC — Houston Outdoor Living Projects',
    description: 'Explore premium patio covers, outdoor kitchens, pools, fireplaces, and more — completed by FixMyHome LLC across Houston and surrounding areas.',
    url: 'https://fixmyhomellc.com/portfolio',
    image: PORTFOLIO_PROJECTS[0]?.coverImage ?? '',
  })

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      {/*
      {/* ── HERO SECTION ────────────────────────────────────────────────── */}
      <section className="mb-24 px-6 sm:px-8 lg:px-10">
        <div className="container mx-auto">
          <div className="max-w-4xl">

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-950 mb-8 uppercase italic tracking-tighter leading-tight"
            >
              Our featured<br /><span className="text-blue-600">Works</span>
            </motion.h1>


          </div>
        </div>
      </section>
      {/* ── PROJECT CATEGORIES GRID ──────────────────────────────────────── */}
      <section className="px-6 sm:px-8 lg:px-10">
        <div className="container mx-auto">

          {/* Section header */}
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14 border-b border-slate-100 pb-10">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2 block">Browse by Category</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 uppercase italic tracking-tighter">
                All Projects
              </h2>
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {PORTFOLIO_PROJECTS.length} Categories · {PORTFOLIO_PROJECTS.reduce((acc, p) => acc + p.count, 0)}+ Photos
            </div>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTFOLIO_PROJECTS.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.07 * i }}
              >
                <Link
                  to={`/portfolio/${project.id}`}
                  className="group block"
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Image container */}
                  <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-5 bg-slate-100 shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                    />

                    {/* Dark overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Accent color band at bottom */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                      style={{ backgroundColor: project.accentColor }}
                    />

                    {/* Count badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <Images size={12} className="text-slate-600" />
                      <span className="text-[10px] font-black text-slate-700 uppercase tracking-wide">{project.count}+ Photos</span>
                    </div>

                    {/* Hover CTA */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-black text-white italic leading-tight">{project.title}</h3>
                        <span
                          className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                          style={{ backgroundColor: project.accentColor }}
                        >
                          <ArrowUpRight size={22} className="text-white" />
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm mt-1 font-light">{project.subtitle}</p>
                    </div>
                  </div>

                  {/* Card info */}
                  <div className="px-2">
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="text-[10px] font-black uppercase tracking-widest"
                        style={{ color: project.accentColor }}
                      >
                        {project.category}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                        {project.count}+ Photos
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-xl font-black text-slate-950 uppercase tracking-tighter">{project.title}</h4>
                      <ChevronRight
                        size={18}
                        className="text-slate-300 group-hover:text-slate-700 group-hover:translate-x-1 transition-all duration-300"
                      />
                    </div>
                    <p className="text-sm text-slate-400 font-light mt-1 line-clamp-2">{project.subtitle}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ─────────────────────────────────────────────────── */}
      <section className="mt-40 px-6">
        <div className="container mx-auto">
          <div className="bg-slate-950 rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <img src={PORTFOLIO_PROJECTS[0]?.coverImage} alt="BG" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-8 leading-none">
                Start Your <br /><span className="text-blue-500">Legacy Today</span>
              </h2>
              <p className="text-slate-400 text-lg font-light max-w-xl mx-auto mb-12">
                Your dream home is just one click away. Visualize, quote, and build with Houston's premier construction group.
              </p>
              <Link
                to="/quote"
                className="inline-flex px-12 py-6 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-colors shadow-2xl shadow-blue-500/20"
              >
                Request Free Estimate
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
