import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="py-20 bg-white border-t border-slate-100 mt-auto">
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
              { name: 'Facebook', url: '#' },
              { name: 'LinkedIn', url: '#' }
            ].map(s => (
              <a key={s.name} href={s.url} target={s.url !== '#' ? "_blank" : undefined} rel={s.url !== '#' ? "noopener noreferrer" : undefined} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors uppercase">{s.name}</a>
            ))}
          </div>

          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">© {new Date().getFullYear()} FixMyHome LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
