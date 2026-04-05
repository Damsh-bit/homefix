import QuoterForm from '../components/quoter/QuoterForm'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Quoter() {
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
        <QuoterForm />
      </div>
    </div>
  )
}
