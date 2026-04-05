import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  Zap, DollarSign, Star, PhoneCall, User, Mail,
  Home as HomeIcon, MessageSquare, ClipboardCheck,
  ShieldCheck, Key, Award, Handshake, ArrowRight,
  Play, CheckCircle2, ChevronRight
} from 'lucide-react'
import GoogleReviews from '../components/reviews/GoogleReviews'
import BeforeAfterSlider from '../components/portfolio/BeforeAfterSlider'
import ViralVideos from '../components/home/ViralVideos'
import QuoterForm from '../components/quoter/QuoterForm'

// ─── Reusable Components ──────────────────────────────────────────────────

function AnimatedCounter({ target, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    let start = 0
    const duration = 2000
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.ceil(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isVisible, target])

  return (
    <span ref={ref} className="font-black tabular-nums text-white">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

function SectionTitle({ subtitle, title, description, light = false }) {
  return (
    <div className="mb-16">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-4"
      >
        <div className="h-px w-8 bg-blue-600" />
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">
          {subtitle}
        </span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`text-4xl md:text-6xl font-black mb-6 uppercase italic tracking-tighter leading-none ${light ? 'text-white' : 'text-slate-900'}`}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={`max-w-2xl text-lg font-light leading-relaxed ${light ? 'text-slate-400' : 'text-slate-500'}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────

const HERO_IMAGES = [
  '/assets/materials/gable-roof.jpg',
  '/assets/materials/hip-roof.jpg',
  '/assets/materials/pavers.jpg',
  '/assets/materials/pool.jpg',
  '/assets/materials/outdoor-sink.jpg'
]

export default function Home() {
  const [imageIndex, setImageIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setImageIndex(prev => (prev + 1) % HERO_IMAGES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-white">
      {/* ── HERO SECTION ────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden bg-slate-950">
        {/* Background Carousel */}
        <div className="absolute inset-0 z-0 bg-slate-950">
          <AnimatePresence mode="wait">
            <motion.div
              key={imageIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={HERO_IMAGES[imageIndex]}
                alt="Background"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
          {/* Subtle gradients to ensure text visibility while keeping images bright */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/20 to-transparent" />
        </div>

        <div className="container mx-auto px-5 md:px-6 relative z-10 pt-28 md:pt-20 pb-12 md:pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-center">

            {/* Left Content Column */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="h-px w-12 bg-blue-500" />
                <span className="text-[11px] font-black uppercase tracking-[0.5em] text-blue-400">
                  Houston's #1 Outdoor Living Contractor · Licensed & Insured
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-4"
              >
                Where Houston <br /> Families Come{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300 italic font-serif">
                  Outdoors
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-base sm:text-lg md:text-2xl text-slate-300 font-light max-w-xl mb-10 md:mb-12 leading-relaxed"
              >
                <span className="block text-lg sm:text-xl md:text-3xl font-semibold text-white mb-4 md:mb-6">Premium patios, pergolas & concrete overlays</span>
                We design and build luxury outdoor living spaces that become the heart of your home. Custom-built to match your house, your style, and your budget — serving Houston, Cypress, Katy, and surrounding areas.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/quote"
                  className="group relative px-10 py-5 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-xs flex items-center gap-3 overflow-hidden transition-all hover:bg-blue-700 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)]"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative">Get a Free Quote</span>
                  <ChevronRight className="relative group-hover:translate-x-1 transition-transform" size={16} />
                </Link>
                <a
                  href="#portfolio"
                  className="px-10 py-5 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-full font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-white/10 transition-all"
                >
                  See Our Work
                </a>
              </motion.div>
            </div>

            {/* Right Information Column (Grid Style) */}
            <div className="lg:col-span-4 hidden lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { label: 'Quality', val: 'A+', icon: <Award className="text-blue-500" /> },
                  { label: 'Licensed', val: 'TX Cert', icon: <ShieldCheck className="text-blue-500" /> },
                  { label: 'Reviews', val: '4.8 ⭐', icon: <Star className="text-blue-500" /> },
                  { label: 'Warranty', val: '5 Yrs', icon: <Key className="text-blue-500" /> }
                ].map((box, i) => (
                  <div key={i} className="aspect-square bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 flex flex-col justify-between hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                      {box.icon}
                    </div>
                    <div>
                      <div className="text-lg font-black text-white leading-none mb-1">{box.val}</div>
                      <div className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-400">{box.label}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/10"
          >
            {[
              { isStatic: false, prefix: '$', target: 20, suffix: 'M+', label: 'Projects Completed' },
              { isStatic: false, prefix: '', target: 300, suffix: '+', label: 'Happy Homeowners' },
              { isStatic: false, prefix: '', target: 5, suffix: '+', label: 'Years of Excellence' },
              { isStatic: true, value: 'A+', label: 'BBB Accredited' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
                  {stat.isStatic ? stat.value : <AnimatedCounter target={stat.target} prefix={stat.prefix} suffix={stat.suffix} />}
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-blue-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── AI VISUALIZER SECTION ────────────────────────────────────────── */}
      <section className="py-24 md:py-40 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-20">
            <div className="flex-1">
              <SectionTitle
                subtitle="Future Construction"
                title={<>Visualize Before <br /> You <span className="text-blue-600">Build</span></>}
                description="Our AI-powered visualization tool transforms a photo of your existing space into a hyper-realistic render of the final project in minutes."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                {[
                  { icon: <Zap className="text-blue-600" />, title: 'Design in Minutes', desc: 'Instant preview of materials, structures, and styles.' },
                  { icon: <DollarSign className="text-blue-600" />, title: 'Accurate Quoting', desc: 'Budget estimations based on the exact visual design.' }
                ].map((feat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100"
                  >
                    <div className="mb-4">{feat.icon}</div>
                    <h4 className="font-black uppercase text-xs tracking-widest mb-2">{feat.title}</h4>
                    <p className="text-slate-500 text-sm font-light leading-relaxed">{feat.desc}</p>
                  </motion.div>
                ))}
              </div>

              <Link
                to="/quote"
                className="inline-flex px-10 py-5 bg-slate-900 text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-colors shadow-2xl shadow-slate-200"
              >
                Try Free Visualizer
              </Link>
            </div>

            <div className="flex-1">
              <div className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] aspect-[4/5] bg-slate-100">
                <BeforeAfterSlider
                  beforeImg="/assets/patio-before-sample.jpg"
                  afterImg="/assets/patio-after-sample.jpg"
                  aspect="aspect-[4/5]"
                />
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="  bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 max-w-[480px]  lg:block z-20"
              >
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-sm font-light italic text-slate-600 leading-relaxed mb-4">
                  "The AI preview was identical to the final construction. No surprises!"
                </p>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">— Satisfied Client</span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED WORKS (PORTFOLIO PREVIEW) ────────────────────────── */}
      <section className="py-24 md:py-40 bg-slate-950" id="portfolio">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="flex-1">
              <SectionTitle
                light
                subtitle="Curated Portfolio"
                title={<>Our Featured <span className="text-blue-500">Masterpieces</span></>}
                description="A glimpse into our architectural legacy. Precision engineering meets breathtaking aesthetics in every build."
              />
            </div>
            <Link
              to="/portfolio"
              className="px-10 py-5 bg-white border border-white/10 text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all flex items-center gap-3 mb-16"
            >
              Explore Full Gallery <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { src: '/assets/materials/gable-roof.jpg', label: 'Patio Covers', cat: 'Outdoor Living' },
              { src: '/assets/materials/pool.jpg', label: 'Pools', cat: 'Oasis' },
              { src: '/assets/materials/pergola.jpg', label: 'Shade Structures', cat: 'Architecture' },
              { src: '/assets/materials/bbq-station.jpg', label: 'Outdoor Kitchens', cat: 'Culinary Space' },
              { src: '/assets/materials/fireplace.jpg', label: 'Fire Features', cat: 'Ambiance' },
              { src: '/assets/materials/hip-roof.jpg', label: 'Roofing', cat: 'Structural' }
            ].map((work, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[3/2] rounded-[1.5rem] overflow-hidden border border-white/5 shadow-2xl"
              >
                <img
                  src={work.src}
                  alt={work.label}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-6 flex flex-col justify-end">
                  <h4 className="text-2xl font-bold text-white leading-tight">{work.label}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIRAL TRANSFORMATIONS (SOCIAL FEED) ─────────────────────── */}
      <ViralVideos />

      {/* ── GOOGLE REVIEWS INTEGRATION ──────────────────────────────────── */}
      <GoogleReviews />

      {/* ── SERVICES / TRUST ────────────────────────────────────────────── */}
      <section className="py-24 md:py-40 bg-white">
        <div className="container mx-auto px-6">
          <SectionTitle
            subtitle="Why Choose Us"
            title={<>Quality Without <span className="text-blue-600">Compromise</span></>}
            description="We deliver excellence through a meticulous process and premium materials."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <ClipboardCheck size={32} />, title: 'Full Management', desc: 'From initial design to final permits, we take care of everything.' },
              { icon: <ShieldCheck size={32} />, title: 'You Are Protected', desc: 'Licensed, bonded, and insured contractors. Your investment is safe.' },
              { icon: <Key size={32} />, title: 'Turnkey Solutions', desc: 'Projects ready to enjoy. No hidden delays or surprises.' },
              { icon: <Award size={32} />, title: 'Our Guarantee', desc: '100% satisfaction guaranteed. We stand behind our quality.' }
            ].map((svc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all"
              >
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
                  {svc.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">{svc.title}</h4>
                <p className="text-slate-500 font-light text-sm leading-relaxed">{svc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTER WIZARD INTEGRATION ───────────────────────────────────── */}
      <section className="py-24 md:py-40 bg-slate-50" id="quote">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="h-px w-12 bg-blue-600 mx-auto mb-6" />
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 text-slate-950">
              Interactive <span className="text-blue-600">Estimate</span>
            </h2>
            <p className="text-slate-500 font-light text-lg">Calculate your project value in real-time with our transparent wizard.</p>
          </div>
          <div className="bg-white p-6 md:p-12 rounded-[3.5rem] shadow-2xl shadow-slate-200 border border-slate-100">
            <QuoterForm isEmbedded />
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div>
              <img
                src="/assets/fixmyhome-logo-black.png"
                alt="FixMyHome"
                className="h-10 w-auto mb-2"
              />
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Houston Construction Group</p>
            </div>

            <div className="flex gap-12">
              {[
                { name: 'Instagram', url: 'https://www.instagram.com/fixmyhomellc/' },

              ].map(s => (
                <a key={s.name} href={s.url} target={s.url !== '#' ? "_blank" : undefined} rel={s.url !== '#' ? "noopener noreferrer" : undefined} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors uppercase">{s.name}</a>
              ))}
            </div>

            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">© 2026 FixMyHome LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
