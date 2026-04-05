import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronDown, Phone, ArrowLeft } from 'lucide-react'
import Footer from '../components/Footer'

const TEAM_MEMBERS = [
  {
    name: 'Miguel Isaguirre',
    role: 'Founder & Chief Executive Officer (CEO)',
    bio: 'Miguel is the visionary force behind Fix My Home LLC. A builder, leader, and entrepreneur...',
    img: '/assets/miguel-isaguirre.webp'
  },
  {
    name: 'Lirisse N. Salazar',
    role: 'Chief Operating Officer (COO)',
    bio: 'Lirisse manages daily operations, permitting, and financial oversight. She ensures everything runs smoothly.',
    img: '/assets/lirisse-salazar.webp'
  },
  {
    name: 'Arnoldo Guerra',
    role: 'Project Director & Senior Engineer Designer',
    bio: 'Arnoldo leads the design and engineering department with precision and vision. Ensuring perfect builds.',
    img: '/assets/arnoldo-guerra.webp'
  },
  {
    name: 'Manuel Salazar',
    role: 'Lead Builder & Engineering Design Associate',
    bio: 'Manuel bridges design and construction. He collaborates directly with clients to make dreams reality.',
    img: '/assets/manuel-salazar.webp'
  },
  {
    name: 'Carlos Martinez',
    role: 'Project Supervisor & Sales Specialist',
    bio: 'Carlos oversees field crews, manages on-site execution, and ensures ultimate client satisfaction.',
    img: '/assets/carlos-martinez-isaguirre.webp'
  },
  {
    name: 'Nemesi Isaguirre',
    role: 'Marketing Director & Creative Strategist',
    bio: 'Nemesi drives Fix My Home\'s brand identity, digital presence, and creative marketing campaigns.',
    img: '/assets/nemesi-isaguirre.webp'
  }
]

export default function Team() {
  return (
    <div className="bg-white min-h-screen pt-24 pb-0 flex flex-col font-sans overflow-hidden">
      {/* Animated BG elements */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-br from-blue-100 via-white to-transparent blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-sky-50 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1200px] flex-1 relative z-10">
        
        {/* Back navigation */}
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 text-[10px] font-black uppercase tracking-widest mb-16 transition-colors">
          <ArrowLeft size={14} /> Back to Home
        </Link>
        
        {/* Header Section */}
        <div className="text-left mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-px w-10 bg-blue-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">
              The Visionaries
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter text-slate-900 mb-8 uppercase leading-[0.9]"
          >
            Meet our leadership team
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg md:text-xl font-light max-w-2xl leading-relaxed"
          >
            The masterminds and builders behind Houston's most exclusive outdoor living transformations. Driven by perfection, crafted with precision.
          </motion.p>
        </div>

        {/* Group Photo Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-32 md:mb-48"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-900">Our Foundation</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-slate-100 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl group relative border border-slate-100">
            <img 
              src="/assets/team-photo.png" 
              alt="Our Team" 
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
              onError={(e) => e.target.style.display = 'none'} 
            />
            {/* Dark overlay for text contrast exclusively on the corner */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
            
            <div className="absolute bottom-10 left-10 text-white z-20 hidden md:block">
              <h3 className="text-3xl font-bold tracking-tight mb-2">FixMyHome Executive Team</h3>
              <p className="text-sm text-white/80 font-light tracking-wide uppercase">Houston, Texas</p>
            </div>
          </div>
        </motion.div>

        {/* Individual Team Grid */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-900">The Directors</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 text-left">
            {TEAM_MEMBERS.map((member, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                key={member.name} 
                className="group relative"
              >
                {/* Main Photo Card */}
                <div className="aspect-[4/5] w-full rounded-[2.5rem] bg-slate-100 overflow-hidden relative border border-slate-200 shadow-xl mb-6">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                    onError={(e) => e.target.style.display = 'none'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/80" />
                  
                  {/* Name overlaid cleanly at bottom of photo before card */}
                  <div className="absolute bottom-6 left-6 right-6 z-20 transition-transform duration-500 transform group-hover:-translate-y-4">
                    <h4 className="font-black text-white text-3xl tracking-tight mb-1">
                      {member.name.split(' ')[0]} 
                      <span className="font-light"> {member.name.split(' ').slice(1).join(' ')}</span>
                    </h4>
                    <h5 className="text-[10px] font-bold uppercase text-blue-400 tracking-widest">
                      {member.role}
                    </h5>
                  </div>
                </div>
                
                {/* Biography Text (Below Photo) */}
                <div className="px-4">
                  <div className="w-12 h-px bg-slate-300 mb-4 transition-all duration-500 group-hover:w-full group-hover:bg-blue-500" />
                  <p className="text-sm text-slate-500 leading-relaxed font-light">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Block */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-slate-50 rounded-[3rem] p-12 md:p-24 text-center mb-24 border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden"
        >
          {/* Subtle noise/gradient background in CTA */}
          <div className="absolute top-0 right-0 w-[50%] h-full bg-blue-600/5 skew-x-12 translate-x-1/2 pointer-events-none" />
          
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter text-slate-900 uppercase italic">
            Ready to <span className="text-blue-600">Transform?</span>
          </h2>
          <p className="text-slate-500 font-light text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-12">
            We're young, hungry, and built from the ground up — a team of dreamers, doers, and builders redefining what quality means in outdoor living. Let's create something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              to="/quote" 
              className="w-full sm:w-auto px-12 py-5 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-[11px] transition-all hover:bg-blue-700 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative">Design My Patio</span>
            </Link>
            <a 
              href="tel:8327445283"
              className="w-full sm:w-auto px-12 py-5 bg-white border border-slate-200 text-slate-800 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
            >
              <Phone size={14} /> Call Us Now
            </a>
          </div>
        </motion.div>

      </div>
      
      {/* Footer */}
      <div className="bg-white border-t border-slate-100">
        <Footer />
      </div>
    </div>
  )
}
