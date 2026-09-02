import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Packages', href: '#packages' },
  { label: 'Workflow', href: '#workflow' },
];

const CreativeHamburger = ({ isOpen }) => (
  <motion.div
    style={{ width: 24, height: 24, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
  >
    <motion.span
      style={{ position: 'absolute', width: '22px', height: '2px', background: 'currentColor', borderRadius: '2px' }}
      animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -7 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    />
    <motion.span
      style={{ position: 'absolute', width: '16px', height: '2px', background: 'currentColor', borderRadius: '2px', right: 1 }}
      animate={isOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    />
    <motion.span
      style={{ position: 'absolute', width: '22px', height: '2px', background: 'currentColor', borderRadius: '2px' }}
      animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 7 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    />
  </motion.div>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredLink, setHoveredLink] = useState(null);

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
          layout
          className={`navbar-island ${scrolled ? 'is-scrolled' : ''}`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            layout: { duration: 0.6, type: "spring", stiffness: 200, damping: 25 },
            y: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }}
        >
          <div className="navbar-inner">

            <a href="#home" className="navbar-brand group" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}>
              <div className="brand-logo-icon-container">
                <img src="/pwa-192.png?v=3" alt="CC Icon" className="brand-logo-icon" />
              </div>
              <span className="brand-text">CODE CRAFTED</span>
            </a>

            <div className="navbar-links" onMouseLeave={() => setHoveredLink(null)}>
              {navLinks.map(({ label, href }) => {
                const isActive = activeSection === href.slice(1);
                const isHovered = hoveredLink === href;

                return (
                  <a
                    key={href}
                    href={href}
                    className={`navbar-link ${isActive ? 'is-active' : ''}`}
                    onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                    onMouseEnter={() => setHoveredLink(href)}
                  >
                    {/* The Magic Sliding Pill */}
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="active-pill-bg"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}

                    {/* Hover Glow Pill */}
                    {isHovered && !isActive && (
                      <motion.div
                        layoutId="hover-pill"
                        className="hover-pill-bg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}

                    <span className="link-text">{label}</span>
                  </a>
                );
              })}
            </div>

            <div className="navbar-actions">
              <a
                href="#contact"
                className="navbar-cta"
                onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
              >
                <div className="cta-glare" />
                <Sparkles size={14} className="cta-sparkle" />
                <span className="cta-text">Let's Talk</span>
                <ArrowUpRight size={16} className="cta-arrow" />
              </a>

              <button
                className="navbar-mobile-toggle"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                <CreativeHamburger isOpen={mobileOpen} />
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Premium Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: '0%' }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-menu-content">
              {navLinks.map(({ label, href }, i) => (
                <div key={href} className="mobile-link-wrapper">
                  <motion.a
                    href={href}
                    className={`mobile-menu-link ${activeSection === href.slice(1) ? 'mobile-menu-link--active' : ''}`}
                    initial={{ opacity: 0, y: 50, rotate: 5 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                  >
                    <span className="mobile-menu-number">0{i + 1}</span>
                    {label}
                  </motion.a>
                </div>
              ))}

              <motion.div
                className="mobile-menu-footer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p>Ready to start a project?</p>
                <a href="mailto:d.baria2411@gmail.com" className="mobile-email">d.baria2411@gmail.com</a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar-wrapper {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          display: flex;
          justify-content: center;
          padding: 1.5rem 2rem;
          pointer-events: none; 
        }

        .navbar-island {
          pointer-events: auto; 
          width: 100%;
          max-width: 1400px;
          background: transparent;
          border: 1px solid transparent;
          /* Removed CSS transition on width/padding to allow Framer Motion layout to handle it smoothly without jitter */
          transition: background 0.4s, box-shadow 0.4s, backdrop-filter 0.4s;
        }

        .navbar-island.is-scrolled {
          width: auto;
          background: rgba(8, 12, 10, 0.7);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 100px;
          padding: 0.5rem 0.5rem 0.5rem 2rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 2.5rem;
        }

        /* --- BRAND --- */
        .navbar-brand {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .brand-logo-icon-container {
          position: relative;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
        }
        
        .brand-logo-icon {
          width: 100%; height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 0 10px rgba(94, 234, 212, 0.4)) contrast(1.1);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease;
        }
        
        .navbar-brand:hover .brand-logo-icon { 
          transform: scale(1.15) rotate(-5deg); 
          filter: drop-shadow(0 0 15px rgba(94, 234, 212, 0.8)) contrast(1.2);
        }
        
        .brand-text { transition: color 0.3s; }
        .navbar-brand:hover .brand-text { color: var(--accent); }

        /* --- MAGIC PILL LINKS --- */
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          position: relative;
        }

        .navbar-link {
          position: relative;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
          padding: 0.6rem 1.25rem;
          border-radius: 100px;
          transition: color 0.3s ease;
          z-index: 1;
        }
        
        .navbar-link:hover { color: #fff; }
        .navbar-link.is-active { color: #000; }

        .link-text { position: relative; z-index: 10; }

        .active-pill-bg {
          position: absolute;
          inset: 0;
          background: #fff;
          border-radius: 100px;
          z-index: 0;
          box-shadow: 0 4px 15px rgba(255,255,255,0.2);
        }

        .hover-pill-bg {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 100px;
          z-index: 0;
        }

        /* --- ADVANCED CTA BUTTON --- */
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .navbar-cta {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.75rem;
          background: var(--accent);
          color: #000;
          border-radius: 100px;
          font-size: 0.85rem;
          font-weight: 700;
          overflow: hidden;
          transition: all 0.3s;
        }
        
        .navbar-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(94, 234, 212, 0.3);
        }

        .cta-glare {
          position: absolute;
          top: 0; left: -100%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          transform: skewX(-20deg);
          transition: 0s;
        }
        
        .navbar-cta:hover .cta-glare {
          left: 200%;
          transition: 0.6s ease-in-out;
        }

        .cta-sparkle { color: #000; transition: transform 0.3s; }
        .navbar-cta:hover .cta-sparkle { transform: rotate(45deg) scale(1.2); }

        .cta-arrow { transition: transform 0.3s; }
        .navbar-cta:hover .cta-arrow { transform: translate(3px, -3px); }

        /* --- MOBILE TOGGLE --- */
        .navbar-mobile-toggle {
          display: none;
          color: var(--accent);
          background: rgba(94, 234, 212, 0.05);
          border: 1px solid rgba(94, 234, 212, 0.2);
          width: 48px; height: 48px;
          border-radius: 50%;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }
        .navbar-mobile-toggle:hover {
          background: var(--accent);
          color: #000;
        }

        /* --- PREMIUM MOBILE MENU --- */
        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 998;
          background: rgba(8, 17, 15, 0.98);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          display: flex;
          align-items: center;
          padding: 2rem;
          padding-top: 6rem;
        }
        
        .mobile-menu-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .mobile-link-wrapper { overflow: hidden; }

        .mobile-menu-link {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 7vw, 4rem);
          font-weight: 800;
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: color 0.3s, transform 0.3s;
          text-transform: uppercase;
          line-height: 1.1;
        }
        
        .mobile-menu-link:hover,
        .mobile-menu-link--active {
          color: var(--accent);
          transform: translateX(15px);
        }
        
        .mobile-menu-number {
          font-family: var(--font-mono);
          font-size: 1.2rem;
          color: var(--text-dim);
          font-weight: 500;
          opacity: 0.5;
        }

        .mobile-menu-footer {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .mobile-menu-footer p {
          color: var(--text-dim);
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .mobile-email {
          color: #fff;
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          transition: color 0.3s;
        }
        .mobile-email:hover { color: var(--accent); }

        @media (max-width: 1024px) {
          .navbar-links, .navbar-cta { display: none; }
          .navbar-mobile-toggle { display: flex; }
          .navbar-wrapper { padding: 1rem; }
          .navbar-island.is-scrolled {
            padding: 0.5rem 0.5rem 0.5rem 1.5rem;
            width: 100%; max-width: 100%;
          }
        }

        @media (max-width: 480px) {
          .navbar-wrapper { padding: 0.5rem; }
          .mobile-menu { padding: 1rem; padding-top: 5rem; }
          .brand-text { display: none; }
          .navbar-brand { gap: 0.5rem; }
          .brand-logo-icon-container { width: 36px; height: 36px; }
          .navbar-island.is-scrolled {
            padding: 0.4rem 0.4rem 0.4rem 1rem;
          }
        }

        @media (max-height: 500px) and (orientation: landscape) {
          .mobile-menu { padding: 1rem; }
          .mobile-menu-content { gap: 0; }
          .mobile-menu-link {
            font-size: 1.5rem;
            gap: 1rem;
            line-height: 1.4;
          }
          .mobile-menu-footer { margin-top: 1rem; padding-top: 1rem; }
        }
      `}</style>
    </>
  );
}
