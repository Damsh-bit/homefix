import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  const navLinks = [
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Before & After', href: '/before-after' },
    { label: 'Team', href: '/team' },
  ]

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 100,
          padding: '1rem 0',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: scrolled ? '1px solid rgba(37,99,235,0.12)' : '1px solid transparent',
          transition: 'all 0.3s ease',
          boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.06)' : 'none',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/assets/fixmyhome-logo-black.png"
              alt="FixMyHome LLC"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  color: '#475569',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => (e.target.style.color = '#2563eb')}
                onMouseLeave={e => (e.target.style.color = '#475569')}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/#quote"
              style={{
                background: 'linear-gradient(135deg, #2563eb, #0ea5e9)',
                color: 'white',
                padding: '0.75rem 1.75rem',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                borderRadius: '100px',
                textDecoration: 'none',
                boxShadow: '0 4px 15px rgba(37,99,235,0.3)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 8px 25px rgba(37,99,235,0.4)'
              }}
              onMouseLeave={e => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 4px 15px rgba(37,99,235,0.3)'
              }}
            >
              Get Quote
            </a>
          </div>

          {/* Mobile Burger */}
          <button
            onClick={() => setMobileOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#0f172a',
              display: 'none',
            }}
            className="mobile-burger"
            aria-label="Open menu"
          >
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <button
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'rgba(255,255,255,0.7)',
          }}
          aria-label="Close menu"
        >
          <X size={32} />
        </button>

        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            style={{
              fontSize: '2rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="/#quote"
          onClick={() => setMobileOpen(false)}
          style={{
            background: 'linear-gradient(135deg, #2563eb, #0ea5e9)',
            color: 'white',
            padding: '1rem 2.5rem',
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            borderRadius: '100px',
            textDecoration: 'none',
          }}
        >
          Get Free Quote
        </a>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .desktop-nav { display: none !important; }
          .mobile-burger { display: block !important; }
        }
      `}</style>
    </>
  )
}
