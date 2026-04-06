import QuoterForm from '../components/quoter/QuoterForm'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { usePageMetadata } from '../hooks/usePageMetadata.jsx'

export default function Quoter() {
  usePageMetadata({
    title: 'Get a Free Quote | FixMyHome LLC',
    description: 'Submit your project details to receive a fast quote from Houston’s trusted patio and outdoor living contractor.',
    url: 'https://fixmyhomellc.com/quote',
    image: '/assets/materials/bbq-station.jpg'
  })

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-50 p-6 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors font-black uppercase tracking-widest text-[10px]">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <img src="/assets/fixmyhome-logo-black.png" alt="Logo" className="h-8 w-auto" />
        </div>
      </div>
      
      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center mb-14">
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-slate-900 mb-6 uppercase">
            Start Your Houston Outdoor Living Project
          </h1>
          <p className="text-slate-500 text-base sm:text-lg font-light max-w-2xl mx-auto">
            Share your vision and receive a fast, transparent quote from our experienced patio and renovation team.
          </p>
        </div>
        <QuoterForm />
      </div>
    </div>
  )
}
