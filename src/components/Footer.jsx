import { Link, useLocation } from 'react-router-dom'

export default function Footer() {
  const location = useLocation()

  const handleFooterNav = (to) => (event) => {
    if (location.pathname === to) {
      event.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-slate-950 text-slate-200 border-t border-slate-800">
      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.8fr_1fr_1fr] items-start">
          <div>
            <img
              src="/assets/fixmyhome-logo-white.png"
              alt="FixMyHome"
              className="h-10 w-auto mb-4"
            />
            <p className="max-w-md text-sm leading-relaxed text-slate-300">
              Premium patios, pergolas, outdoor kitchens, and home renovation projects built for Houston families who want lasting outdoor living.
            </p>
            <div className="mt-6 space-y-3 text-sm text-slate-300">
              <a href="tel:+18327445283" className="block hover:text-white">+1 (832) 744-5283</a>
              <a href="mailto:info@fixmyhomellc.com" className="block hover:text-white">info@fixmyhomellc.com</a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.35em] text-slate-400 mb-6">Quick links</h3>
            <div className="space-y-3 text-sm text-slate-300">
              <Link to="/" onClick={handleFooterNav('/')} className="block hover:text-white">Home</Link>
              <Link to="/quote" onClick={handleFooterNav('/quote')} className="block hover:text-white">Request a Quote</Link>
              <Link to="/portfolio" onClick={handleFooterNav('/portfolio')} className="block hover:text-white">Portfolio</Link>
              <Link to="/team" onClick={handleFooterNav('/team')} className="block hover:text-white">Team</Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.35em] text-slate-400 mb-6">Social</h3>
            <div className="space-y-3 text-sm text-slate-300">
              <a href="https://www.instagram.com/fixmyhomellc/" target="_blank" rel="noopener noreferrer" className="block hover:text-white">Instagram</a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 text-xs text-slate-500 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <span>© {new Date().getFullYear()} FixMyHome LLC. All rights reserved.</span>
          <span>Built for Houston homeowners who want premium outdoor living.</span>
        </div>
      </div>
    </footer>
  )
}
