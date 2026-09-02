import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUp, ArrowUpRight, MessageCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Packages', href: '#packages' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { icon: <GithubIcon size={18} />, href: 'https://github.com/dharmendrabaria', label: 'GitHub' },
  { icon: <LinkedinIcon size={18} />, href: 'https://www.linkedin.com/in/dharmendra-baria-579b31312', label: 'LinkedIn' },
  { icon: <InstagramIcon size={18} />, href: 'https://www.instagram.com/_.code._crafted', label: 'Instagram' },
  { icon: <MessageCircle size={18} />, href: 'https://wa.me/918799462715', label: 'WhatsApp' },
];

export default function Footer() {
  const [time, setTime] = useState('');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    const updateTime = () => {
      const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      setTime(new Date().toLocaleTimeString('en-US', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const scrollTo = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer-premium" ref={ref}>
      <div className="footer-glow" />
      
      <div className="container">
        
        {/* Clean CTA Band with NO gap */}
        <motion.div
          className="footer-cta-band"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h3 className="footer-cta-heading">Ready to start your project?</h3>
          <a href="#contact" className="btn btn-primary" data-cursor="OPEN" onClick={(e) => scrollTo(e, '#contact')}>
            Let's Work Together <ArrowUpRight size={16} />
          </a>
        </motion.div>

        {/* Standard Footer Content */}
        <div className="footer-top">
          <div className="footer-brand-col">
            <a href="#home" className="footer-brand" onClick={(e) => scrollTo(e, '#home')}>
              CODE CRAFTED
            </a>
            <p className="footer-desc">
              Building modern web experiences with clean code and premium design aesthetics. Let's create something extraordinary together.
            </p>
            <p className="footer-author">
              Crafted in India by <span>Dharmendra Baria</span> <br />
              <span className="time-pulse">Local Time: {time}</span>
            </p>
          </div>

          <div className="footer-nav-col">
            <h4 className="footer-col-title">Navigation</h4>
            <div className="footer-nav">
              {navLinks.map(({ label, href }) => (
                <a key={href} href={href} className="footer-link" onClick={(e) => scrollTo(e, href)}>
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-social-col">
            <h4 className="footer-col-title">Connect</h4>
            <div className="footer-socials">
              {socials.map((s, i) => (
                <a key={i} href={s.href} className="footer-social" target="_blank" rel="noopener noreferrer" aria-label={s.label} data-cursor="OPEN">
                  {s.icon}
                </a>
              ))}
            </div>
            <div className="footer-contact-direct">
              <a href="mailto:d.baria2411@gmail.com" className="footer-link">d.baria2411@gmail.com</a>
              <a href="https://wa.me/918799462715" target="_blank" rel="noopener noreferrer" className="footer-link">+91 87994 62715</a>
            </div>
          </div>
        </div>

        {/* Massive Typography */}
        <div className="footer-massive-text">
          <h1>CODE CRAFTED</h1>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} Code Crafted. All Rights Reserved.</p>
          <span className="footer-tagline">Build. Create. Deliver.</span>
          <button onClick={scrollToTop} className="back-to-top-btn" aria-label="Back to top">
            Back to Top <ArrowUp size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .footer-premium {
          position: relative;
          background: #050807;
          padding-top: 0; 
          padding-bottom: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          overflow: visible;
          z-index: 10;
        }

        .footer-cta-band {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: clamp(2rem, 4vw, 3rem);
          border: 1px solid var(--border);
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(94, 234, 212, 0.04) 0%, rgba(5, 8, 7, 0.8) 60%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          position: relative;
          z-index: 50;
          transform: translateY(-2rem);
          margin-bottom: clamp(1rem, 3vw, 3rem);
          gap: 1.5rem;
        }
        
        .footer-cta-band::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -10%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(94, 234, 212, 0.06) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        
        .footer-cta-heading {
          font-size: clamp(1.1rem, 3vw, 1.75rem);
          font-weight: 600;
        }

        .footer-glow {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80vw;
          height: 300px;
          background: radial-gradient(ellipse at bottom, rgba(94, 234, 212, 0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: clamp(2rem, 4vw, 4rem);
          padding-bottom: clamp(2rem, 4vw, 4rem);
          position: relative;
          z-index: 2;
        }

        .footer-brand {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--text-primary);
          display: block;
          margin-bottom: 1.25rem;
          transition: color 0.3s;
        }
        .footer-brand:hover {
          color: var(--accent);
        }

        .footer-desc {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.7;
          max-width: 300px;
          margin-bottom: 1.5rem;
        }

        .footer-author {
          font-size: 0.85rem;
          color: var(--text-dim);
          line-height: 1.6;
        }
        .footer-author span {
          color: var(--text-primary);
          font-weight: 500;
        }

        .time-pulse {
          color: var(--accent) !important;
          font-family: var(--font-mono);
          display: inline-block;
          margin-top: 0.25rem;
        }

        .footer-col-title {
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-dim);
          margin-bottom: 1.5rem;
          font-family: var(--font-mono);
        }

        .footer-nav {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        .footer-link {
          font-size: 0.95rem;
          color: var(--text-muted);
          transition: all 0.3s;
          display: inline-block;
          text-decoration: none;
          width: fit-content;
        }
        .footer-link:hover {
          color: var(--accent);
          transform: translateX(4px);
        }

        .footer-socials {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .footer-social {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: var(--text-muted);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .footer-social:hover {
          border-color: var(--accent);
          color: var(--accent);
          background: rgba(94, 234, 212, 0.08);
          transform: translateY(-4px);
        }

        .footer-contact-direct {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .footer-massive-text {
          width: 100%;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: clamp(2rem, 4vw, 4rem);
          position: relative;
          z-index: 1;
        }

        .footer-massive-text h1 {
          font-family: var(--font-display);
          font-size: clamp(8vw, 11vw, 11vw);
          font-weight: 800;
          line-height: 0.8;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.15);
          text-transform: uppercase;
          letter-spacing: -0.02em;
          white-space: nowrap;
          transition: all 0.5s ease;
          background: linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0));
          -webkit-background-clip: text;
        }

        .footer-massive-text:hover h1 {
          -webkit-text-stroke: 1px var(--accent);
          color: rgba(94, 234, 212, 0.05);
        }

        .footer-bottom-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
          z-index: 2;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-bottom-bar p {
          font-size: 0.85rem;
          color: var(--text-dim);
        }

        .footer-tagline {
          font-family: var(--font-display);
          letter-spacing: 0.1em;
          color: var(--text-dim);
          font-size: 0.8rem;
          text-transform: uppercase;
        }

        .back-to-top-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 0.85rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          transition: color 0.3s;
        }
        .back-to-top-btn:hover {
          color: var(--accent);
        }
        .back-to-top-btn svg {
          transition: transform 0.3s;
        }
        .back-to-top-btn:hover svg {
          transform: translateY(-3px);
        }

        /* ===== TABLET ===== */
        @media (max-width: 900px) {
          .footer-cta-band {
            flex-direction: column;
            gap: 1.5rem;
            text-align: center;
          }
          .footer-top {
            grid-template-columns: 1fr;
            gap: 3rem;
            text-align: center;
          }
          .footer-desc {
            margin: 0 auto 1.5rem;
          }
          .footer-nav {
            align-items: center;
          }
          .footer-socials {
            justify-content: center;
          }
          .footer-massive-text h1 {
            font-size: 11vw;
          }
          .footer-bottom-bar {
            justify-content: center;
            text-align: center;
          }
        }

        /* ===== SMALL MOBILE ===== */
        @media (max-width: 480px) {
          .footer-premium {
            padding-bottom: 1.5rem;
          }
          .footer-cta-band {
            padding: 1.5rem;
            border-radius: 16px;
          }
          .footer-massive-text h1 {
            font-size: 10vw;
          }
          .footer-bottom-bar {
            flex-direction: column;
            gap: 0.75rem;
          }
          .back-to-top-btn {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </footer>
  );
}
