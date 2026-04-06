import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import {
  Zap, DollarSign, Star, PhoneCall, User, Mail,
  Home as HomeIcon, MessageSquare, ClipboardCheck,
  ShieldCheck, Key, Award, Handshake, ArrowRight,
  Play, CheckCircle2, ChevronLeft, ChevronRight
} from 'lucide-react'
import GoogleReviews from '../components/reviews/GoogleReviews'
import BeforeAfterSlider from '../components/portfolio/BeforeAfterSlider'
import ViralVideos from '../components/home/ViralVideos'
import QuoterForm from '../components/quoter/QuoterForm'
import { supabase } from '../integrations/supabase/client.js'
import { getSessionId } from '../utils/analytics.js'
import { useToast } from '../hooks/use-toast.js'
import { usePageMetadata } from '../hooks/usePageMetadata.jsx'

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

const HERO_IMAGE_DESKTOP = '/assets/Team.PNG'
const HERO_IMAGE_MOBILE = '/assets/Team_mobile.PNG'

const TEAM_MEMBERS = [
  { name: 'Miguel Isaguirre', role: 'Founder & CEO', img: '/assets/miguel-isaguirre.webp' },
  { name: 'Lirisse N. Salazar', role: 'Chief Operating Officer', img: '/assets/lirisse-salazar.webp' },
  { name: 'Arnoldo Guerra', role: 'Project Director', img: '/assets/arnoldo-guerra.webp' },
  { name: 'Manuel Salazar', role: 'Lead Builder', img: '/assets/manuel-salazar.webp' },
  { name: 'Carlos Martinez', role: 'Project Supervisor', img: '/assets/carlos-martinez-isaguirre.webp' },
  { name: 'Nemesi Isaguirre', role: 'Marketing Director', img: '/assets/nemesi-isaguirre.webp' }
]

const CONTACT_IMAGES = [
  { src: '/assets/Contact/1.jpg', alt: 'Family enjoying a completed patio project', label: 'Family Patio Success' },
  { src: '/assets/Contact/2.jpg', alt: 'Outdoor living area with custom lighting', label: 'Custom Outdoor Living' },
  { src: '/assets/Contact/3.jpg', alt: 'High-end patio installation at night', label: 'Premium Lighting & Design' },
  { src: '/assets/Contact/4.jpg', alt: 'Modern backyard renovation in Houston', label: 'Modern Backyard Renovation' }
]

const HERO_STATS = [
  { label: 'Quality', val: 'A+', icon: <Award className="text-blue-500" /> },
  { label: 'Licensed', val: 'TX Cert', icon: <ShieldCheck className="text-blue-500" /> },
  { label: 'Reviews', val: '4.8 ⭐', icon: <Star className="text-blue-500" /> },
  { label: 'Warranty', val: '5 Yrs', icon: <Key className="text-blue-500" /> }
]

const DEFAULT_CONTACT_FORM = {
  name: '',
  phone: '',
  email: '',
  projectType: '',
  message: ''
}

export default function Home() {
  const [teamSlide, setTeamSlide] = useState(0)
  const [contactSlide, setContactSlide] = useState(0)
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: '',
    message: ''
  })
  const [contactSaved, setContactSaved] = useState(false)
  const [contactIsSubmitting, setContactIsSubmitting] = useState(false)
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [contactSubmitMessage, setContactSubmitMessage] = useState('')
  const contactFirstRender = useRef(true)
  const { toast } = useToast()

  usePageMetadata({
    title: 'FixMyHome LLC | Houston Outdoor Living Experts',
    description: 'Luxury patios, pergolas, outdoor kitchens, and home renovation services in Houston, Cypress, Katy, and surrounding areas.',
    url: 'https://fixmyhomellc.com/',
    image: '/assets/materials/gable-roof.jpg'
  })

  useEffect(() => {
    const savedForm = localStorage.getItem('home_contact_form_draft')
    if (savedForm) {
      try {
        const parsed = JSON.parse(savedForm)
        setContactForm({
          ...DEFAULT_CONTACT_FORM,
          ...parsed
        })
      } catch (error) {
        console.warn('Could not parse saved contact draft', error)
      }
    }
  }, [])

  useEffect(() => {
    if (contactFirstRender.current) {
      contactFirstRender.current = false
      return
    }

    localStorage.setItem('home_contact_form_draft', JSON.stringify(contactForm))
    setContactSaved(true)
    const timeout = setTimeout(() => setContactSaved(false), 1800)
    return () => clearTimeout(timeout)
  }, [contactForm])

  useEffect(() => {
    const sliderTimer = setInterval(() => {
      setContactSlide((prev) => (prev + 1) % CONTACT_IMAGES.length)
    }, 5000)
    return () => clearInterval(sliderTimer)
  }, [])

  useEffect(() => {
    const teamTimer = setInterval(() => {
      setTeamSlide((prev) => (prev + 1) % TEAM_MEMBERS.length)
    }, 4000)
    return () => clearInterval(teamTimer)
  }, [])

  const handleContactFieldChange = (field) => (event) => {
    setContactForm(prev => ({ ...prev, [field]: event.target.value }))
  }

  const handleContactFormKeyDown = (event) => {
    if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') {
      event.preventDefault()
    }
  }

  const handleContactSubmit = async (event) => {
    event.preventDefault()
    setContactIsSubmitting(true)
    setContactSubmitted(false)
    setContactSubmitMessage('')

    try {
      const response = await supabase.functions.invoke('submit-patio-lead', {
        body: {
          roofType: '',
          flooring: '',
          columns: '',
          kitchenFeatures: [],
          extraFeatures: [],
          area: 300,
          sessionId: getSessionId(),
          contact_name: contactForm.name,
          contact_phone: contactForm.phone,
          contact_preference: 'call',
          phone_verification: null,
          project_type: contactForm.projectType,
          project_message: contactForm.message,
          contact_email: contactForm.email
        }
      })

      if (response.error) {
        throw response.error
      }

      setContactSubmitted(true)
      setContactSubmitMessage('Formulario enviado con éxito. Nos contactaremos en breve.')
      toast({ title: 'Formulario enviado', description: 'Gracias, recibimos tu solicitud.', duration: 5000 })
      setContactForm({ name: '', phone: '', email: '', projectType: '', message: '' })
      localStorage.removeItem('home_contact_form_draft')
      setContactSaved(false)
    } catch (error) {
      console.error('Contact form submission error:', error)
      setContactSubmitMessage('No se pudo enviar el formulario. Por favor intenta de nuevo.')
      toast({ title: 'Error al enviar', description: 'Hubo un problema al enviar el formulario.', variant: 'destructive' })
    } finally {
      setContactIsSubmitting(false)
    }
  }

  const nextContactSlide = () => setContactSlide((prev) => (prev + 1) % CONTACT_IMAGES.length)
  const prevContactSlide = () => setContactSlide((prev) => (prev - 1 + CONTACT_IMAGES.length) % CONTACT_IMAGES.length)

  const nextTeamSlide = () => setTeamSlide((prev) => (prev + 1) % TEAM_MEMBERS.length)
  const prevTeamSlide = () => setTeamSlide((prev) => (prev - 1 + TEAM_MEMBERS.length) % TEAM_MEMBERS.length)

  return (
    <div className="bg-white">
      {/* ── HERO SECTION ────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] md:min-h-screen p-6 md:p-20 flex items-center overflow-hidden bg-slate-950">
        {/* Background Carousel */}
        <div className="absolute inset-0 z-0 bg-slate-950">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <picture>
                <source srcSet={HERO_IMAGE_MOBILE} media="(max-width: 767px)" />
                <img
                  src={HERO_IMAGE_DESKTOP}
                  alt="Team"
                  className="w-full h-full object-cover object-bottom"
                />
              </picture>
            </motion.div>
          </AnimatePresence>
          {/* Subtle gradients to ensure text visibility while keeping images bright */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-950/60 to-transparent md:bg-gradient-to-t md:from-slate-950/90 md:via-slate-950/10 md:to-transparent" />
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
                className="text-xs sm:text-sm md:text-base text-slate-300 font-light max-w-xl mb-4 leading-relaxed"
              >
                <span className="block text-sm sm:text-base md:text-lg font-semibold text-white mb-2">Premium patios, pergolas & concrete overlays</span>
                We design and build luxury outdoor living spaces that become the heart of your home. Custom-built to match your house, your style, and your budget — serving Houston, Cypress, Katy, and surrounding areas.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap items-center gap-2 max-w-full mb-6"
              >
                {HERO_STATS.map((box, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[11px] sm:text-xs transition-all hover:bg-white/15">
                    <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-blue-500/10">
                      {box.icon}
                    </div>
                    <div className="leading-tight">
                      <div className="font-black text-white">{box.val}</div>
                      <div className="text-[8px] font-black uppercase tracking-[0.2em] text-blue-400">{box.label}</div>
                    </div>
                  </div>
                ))}
              </motion.div>

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

      {/* ── MEET THE TEAM ────────────────────────────────────────────────── */}
      <section className="py-12 md:py-20 bg-white">
        {/* Header - Centered */}
        <div className="container mx-auto px-6 max-w-4xl mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-8 bg-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">
                Leadership
              </span>
              <div className="h-px w-8 bg-blue-600" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase italic tracking-tighter text-slate-900">
              Meet The Team
            </h2>
            <p className="text-lg font-light leading-relaxed text-slate-500">
              The visionaries, builders, and strategists behind every project. Our talented leadership team drives FixMyHome's excellence and innovation.
            </p>
          </motion.div>
        </div>

        {/* Fullwidth Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <div className="relative w-full">
            <div className="flex gap-4 px-12 md:px-20 justify-center items-center py-4 overflow-x-auto">
              {[0, 1, 2, 3, 4].map((offset) => {
                const memberIndex = (teamSlide + offset) % TEAM_MEMBERS.length
                const member = TEAM_MEMBERS[memberIndex]
                
                return (
                  <motion.div
                    key={`${memberIndex}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: offset * 0.05 }}
                    className="flex-shrink-0 w-[180px] h-[250px] rounded-xl overflow-hidden group"
                  >
                    <div className="relative w-full h-full shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                      <img
                        src={member.img}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent p-4 flex flex-col justify-end">
                        <h4 className="text-sm font-bold text-white leading-tight">{member.name}</h4>
                        <p className="text-xs text-blue-300 font-semibold">{member.role}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Left Navigation Button */}
            <button
              onClick={prevTeamSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Right Navigation Button */}
            <button
              onClick={nextTeamSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="flex gap-2 justify-center mt-4">
            {TEAM_MEMBERS.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${i === teamSlide ? 'bg-blue-600 scale-150' : 'bg-slate-300'}`}
              />
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <Link
            to="/team"
            className="inline-flex px-10 py-4 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl items-center gap-3"
          >
            Meet The Full Team <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>

      {/* ── AI VISUALIZER SECTION ────────────────────────────────────────── */}
      <section className="py-12 md:py-20 bg-white overflow-hidden">
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
              <div className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] aspect-[4/5] bg-slate-100 touch-pan-y">
                <BeforeAfterSlider
                  aspect="aspect-[4/5]"
                />
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="  bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 max-w-[480px] lg:block z-20"
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
              className="px-10 py-5 bg-white border border-white/10 text-dark rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-black/50 hover:text-white transition-all flex items-center gap-3 mb-16"
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


      {/* ── CONTACT ───────────────────────────────────── */}
      <section id="contact" className="py-20 md:py-32 bg-slate-900 relative overflow-hidden">
  <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 skew-x-12 translate-x-1/2 z-0"></div>

  <div className="container mx-auto px-4 md:px-6 relative z-10">
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

      {/* Left Column */}
      <div className="lg:w-1/2 order-1 w-full text-center lg:text-left">
        <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6 justify-center lg:justify-start">
          <div className="h-[1.5px] md:h-[2px] w-8 md:w-12 bg-accent-blue"></div>
          <span className="uppercase tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-[10px] font-bold text-accent-blue">
            Your Trusted Partner
          </span>
        </div>

        <h2 className="text-3xl md:text-6xl font-black text-white mb-8 tracking-tighter italic uppercase leading-[1.1] md:leading-none">
          Building <span className="text-blue-500">Relationships</span>, <br /> One Home at a Time
        </h2>

        {/* Contact Gallery */}
        <div className="relative mb-8">
          <div className="relative rounded-[30px] overflow-hidden shadow-2xl h-[320px] md:h-[430px] bg-slate-800 border border-white/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={contactSlide}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <img
                  src={CONTACT_IMAGES[contactSlide].src}
                  alt={CONTACT_IMAGES[contactSlide].alt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute left-6 top-6 z-20 bg-slate-950/70 backdrop-blur-sm px-4 py-3 rounded-full border border-white/10 text-white text-xs uppercase tracking-[0.24em] font-bold">
              {CONTACT_IMAGES[contactSlide].label}
            </div>

            <button
              type="button"
              onClick={prevContactSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-slate-950/70 p-3 text-white shadow-lg border border-white/10 hover:bg-slate-900 transition"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={nextContactSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-slate-950/70 p-3 text-white shadow-lg border border-white/10 hover:bg-slate-900 transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="mt-4 flex justify-center gap-2">
            {CONTACT_IMAGES.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setContactSlide(index)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${index === contactSlide ? 'bg-blue-500' : 'bg-slate-500/50 hover:bg-slate-400'}`}
              />
            ))}
          </div>
        </div>

        {/* Phone CTA */}
        <div className="flex items-center gap-4 md:gap-6 p-6 md:p-8 bg-blue-600 rounded-3xl text-white max-w-md mx-auto lg:mx-0 shadow-xl shadow-blue-600/20">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-white/10 backdrop-blur-sm text-white rounded-full flex items-center justify-center shrink-0">
            <i data-lucide="phone-call" size="28"></i>
          </div>
          <div className="text-left">
            <span className="block text-white/70 text-[10px] uppercase font-bold tracking-widest">
              Call us Today
            </span>
            <span className="text-xl md:text-2xl font-bold tracking-tight">+1 (832) 744-5283</span>
          </div>
        </div>
      </div>

      {/* Right Column — Contact Form */}
      <div className="lg:w-1/2 order-2 w-full pt-10 md:pt-0">
        <div className="bg-white p-8 md:p-14 rounded-[40px] md:rounded-[50px] shadow-2xl border border-slate-100">
          <h3 className="text-2xl md:text-3xl font-black mb-2 text-slate-950 italic uppercase tracking-tighter text-center md:text-left">
            Let's Build Together
          </h3>
          <p className="text-slate-500 text-sm md:text-base mb-10 text-center md:text-left font-light">
            Tell us about your dream project. We respond within 24 hours.
          </p>

          <form onSubmit={handleContactSubmit} onKeyDown={handleContactFormKeyDown} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <i data-lucide="user" className="absolute left-5 top-5 text-slate-400" size="18"></i>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={contactForm.name}
                  onChange={handleContactFieldChange('name')}
                  className="w-full bg-slate-50 border border-slate-100 p-5 pl-14 rounded-2xl outline-none focus:ring-2 focus:ring-blue-200 transition-all font-medium text-sm"
                />
              </div>
              <div className="relative">
                <i data-lucide="phone" className="absolute left-5 top-5 text-slate-400" size="18"></i>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={contactForm.phone}
                  onChange={handleContactFieldChange('phone')}
                  className="w-full bg-slate-50 border border-slate-100 p-5 pl-14 rounded-2xl outline-none focus:ring-2 focus:ring-blue-200 transition-all font-medium text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <i data-lucide="mail" className="absolute left-5 top-5 text-slate-400" size="18"></i>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={contactForm.email}
                  onChange={handleContactFieldChange('email')}
                  className="w-full bg-slate-50 border border-slate-100 p-5 pl-14 rounded-2xl outline-none focus:ring-2 focus:ring-blue-200 transition-all font-medium text-sm"
                />
              </div>
              <div className="relative">
                <i data-lucide="home" className="absolute left-5 top-5 text-slate-400" size="18"></i>
                <select
                  value={contactForm.projectType}
                  onChange={handleContactFieldChange('projectType')}
                  className="w-full bg-slate-50 border border-slate-100 p-5 pl-14 rounded-2xl outline-none focus:ring-2 focus:ring-blue-200 transition-all font-medium text-sm text-slate-500 appearance-none"
                >
                <option value="" disabled>
                  Project Type
                </option>
                <option value="Luxury Patio Cover">Luxury Patio Cover</option>
                <option value="Home Renovation">Home Renovation</option>
                <option value="New Construction">New Construction</option>
              </select>
            </div>
          </div>

            <div className="relative">
              <i data-lucide="message-square" className="absolute left-5 top-5 text-slate-400" size="18"></i>
              <textarea
                placeholder="Describe your dream project..."
                rows="5"
                value={contactForm.message}
                onChange={handleContactFieldChange('message')}
                className="w-full bg-slate-50 border border-slate-100 p-5 pl-14 rounded-2xl outline-none focus:ring-2 focus:ring-blue-200 transition-all font-medium text-sm"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={contactIsSubmitting || !contactForm.name?.trim() || !contactForm.phone?.trim()}
              className="btn-primary w-full py-6 rounded-2xl font-black uppercase text-xs md:text-sm tracking-widest text-white shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {contactIsSubmitting ? 'Enviando...' : 'Submit Request'}
            </button>
            {contactSubmitted && (
              <div className="rounded-3xl bg-emerald-50 border border-emerald-200 p-4 text-center text-sm text-emerald-800">
                {contactSubmitMessage}
              </div>
            )}
            {!contactSubmitted && (
              <p className="text-center text-xs text-slate-400">
                {contactSaved ? 'Últimos cambios guardados.' : 'Tus datos se guardan automáticamente mientras escribes.'}
              </p>
            )}
          </form>
        </div>
      </div>

    </div>
  </div>
</section>

      

                

      {/* Footer shared globally via App.jsx */}
    </div>
  )
}
