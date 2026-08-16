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
      <motion.nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="navbar-inner container">
          <a href="#home" className="navbar-brand" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}>
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

          <a
            href="#contact"
            className="navbar-cta btn btn-primary"
            data-cursor="OPEN"
            onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
          >
            Let's Work Together <ArrowUpRight size={16} />
          </a>

          <button
            className="navbar-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-menu-content">
              {navLinks.map(({ label, href }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  className={`mobile-menu-link ${activeSection === href.slice(1) ? 'mobile-menu-link--active' : ''}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                  onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                >
                  <span className="mobile-menu-number">0{i + 1}</span>
                  {label}
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                className="btn btn-primary mobile-menu-cta"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
              >
                Let's Work Together <ArrowUpRight size={16} />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 1.25rem 0;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .navbar--scrolled {
          padding: 0.75rem 0;
          background: rgba(8, 17, 16, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
        }
        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .navbar-brand {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--text-primary);
          transition: color 0.3s;
        }
        .navbar-brand:hover {
          color: var(--accent);
        }
        .navbar-links {
          display: flex;
          gap: 2rem;
        }
        .navbar-link {
          font-size: 0.875rem;
          font-weight: 400;
          color: var(--text-muted);
          transition: color 0.3s;
          position: relative;
        }
        .navbar-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--accent);
          transition: width 0.3s var(--ease-out);
        }
        .navbar-link:hover,
        .navbar-link--active {
          color: var(--accent);
        }
        .navbar-link--active::after,
        .navbar-link:hover::after {
          width: 100%;
        }
        .navbar-cta {
          padding: 0.65rem 1.5rem;
          font-size: 0.85rem;
        }
        .navbar-mobile-toggle {
          display: none;
          color: var(--text-primary);
        }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 999;
          background: rgba(8, 17, 16, 0.97);
          backdrop-filter: blur(30px);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mobile-menu-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          align-items: flex-start;
          padding: 2rem;
        }
        .mobile-menu-link {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 600;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: color 0.3s;
        }
        .mobile-menu-link:hover,
        .mobile-menu-link--active {
          color: var(--accent);
        }
        .mobile-menu-number {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-dim);
        }
        .mobile-menu-cta {
          margin-top: 2rem;
        }

        @media (max-width: 1024px) {
          .navbar-links, .navbar-cta {
            display: none;
          }
          .navbar-mobile-toggle {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}
