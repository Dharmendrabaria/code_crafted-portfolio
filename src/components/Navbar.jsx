import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Packages', href: '#packages' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const scrollTo = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="navbar-wrapper">
        <motion.nav
          className={`navbar-island ${scrolled ? 'is-scrolled' : ''}`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="navbar-inner">
            <a href="#home" className="navbar-brand" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}>
              <span className="brand-dot"></span>
              CODE CRAFTED
            </a>

            <div className="navbar-links">
              {navLinks.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className={`navbar-link ${activeSection === href.slice(1) ? 'navbar-link--active' : ''}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                >
                  {label}
                </a>
              ))}
            </div>

            <div className="navbar-actions">
              <a
                href="#contact"
                className="navbar-cta"
                data-cursor="OPEN"
                onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
              >
                Let's Talk <ArrowUpRight size={16} />
              </a>

              <button
                className="navbar-mobile-toggle"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(30px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4 }}
          >
            <div className="mobile-menu-content">
              {navLinks.map(({ label, href }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  className={`mobile-menu-link ${activeSection === href.slice(1) ? 'mobile-menu-link--active' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                >
                  <span className="mobile-menu-number">0{i + 1}</span>
                  {label}
                </motion.a>
              ))}
              
              <motion.div 
                className="mobile-menu-footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <a href="mailto:d.baria2411@gmail.com">d.baria2411@gmail.com</a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          display: flex;
          justify-content: center;
          padding: 1.5rem 2rem;
          pointer-events: none; /* Let clicks pass through the wrapper */
        }

        .navbar-island {
          pointer-events: auto; /* Re-enable clicks on the island */
          width: 100%;
          max-width: 1400px;
          background: transparent;
          border: 1px solid transparent;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Scrolled Floating Pill State */
        .navbar-island.is-scrolled {
          width: auto;
          background: rgba(8, 12, 10, 0.65);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 100px;
          padding: 0.5rem 1rem 0.5rem 2rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 3rem;
        }

        /* Brand */
        .navbar-brand {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: transform 0.3s;
        }
        .navbar-brand:hover {
          transform: scale(1.02);
        }
        
        .brand-dot {
          width: 8px;
          height: 8px;
          background: var(--accent);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--accent);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(94, 234, 212, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(94, 234, 212, 0); }
          100% { box-shadow: 0 0 0 0 rgba(94, 234, 212, 0); }
        }

        /* Links */
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .navbar-link {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-muted);
          padding: 0.6rem 1.2rem;
          border-radius: 100px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }
        
        .navbar-link:hover {
          color: var(--text-primary);
        }

        .navbar-link--active {
          color: var(--bg-primary);
          background: var(--text-primary);
        }
        
        /* CTA & Actions */
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .navbar-cta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: var(--accent);
          color: var(--bg-primary);
          border-radius: 100px;
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.3s;
        }
        
        .navbar-cta:hover {
          background: #4de3cd;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(94, 234, 212, 0.2);
        }

        .navbar-mobile-toggle {
          display: none;
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 999;
          background: rgba(5, 8, 7, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mobile-menu-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
          max-width: 400px;
          padding: 2rem;
        }
        
        .mobile-menu-link {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 1.5rem;
          transition: color 0.3s, transform 0.3s;
        }
        
        .mobile-menu-link:hover,
        .mobile-menu-link--active {
          color: var(--accent);
          transform: translateX(10px);
        }
        
        .mobile-menu-number {
          font-family: var(--font-mono);
          font-size: 0.9rem;
          color: var(--text-dim);
          font-weight: 400;
        }

        .mobile-menu-footer {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .mobile-menu-footer a {
          color: var(--text-dim);
          font-family: var(--font-mono);
          font-size: 0.9rem;
          transition: color 0.3s;
        }
        .mobile-menu-footer a:hover {
          color: var(--accent);
        }

        @media (max-width: 1024px) {
          .navbar-links {
            display: none;
          }
          .navbar-cta {
            display: none;
          }
          .navbar-mobile-toggle {
            display: flex;
          }
          .navbar-wrapper {
            padding: 1rem;
          }
          .navbar-island.is-scrolled {
            padding: 0.5rem 0.5rem 0.5rem 1.5rem;
            width: 100%;
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
}
