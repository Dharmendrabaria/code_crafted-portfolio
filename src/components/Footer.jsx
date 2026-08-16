import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
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
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer" ref={ref}>
      <div className="container">
        {/* Large CTA Band */}
        <motion.div
          className="footer-cta-band"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h3 className="footer-cta-heading">Ready to start your project?</h3>
          <a href="#contact" className="btn btn-primary" data-cursor="OPEN" onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}>
            Let's Work Together <ArrowUpRight size={16} />
          </a>
        </motion.div>

        <div className="footer-top">
          <div className="footer-brand-col">
            <a href="#home" className="footer-brand" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}>
              CODE CRAFTED
            </a>
            <p className="footer-desc">
              Building modern web experiences with clean code and creative solutions.
            </p>
            <p className="footer-author">
              Crafted by <span>Dharmendra Baria</span>
            </p>
          </div>

          <div className="footer-nav-col">
            <h4 className="footer-col-title">Navigation</h4>
            <div className="footer-nav">
              {navLinks.map(({ label, href }) => (
                <a key={href} href={href} className="footer-link" onClick={(e) => { e.preventDefault(); scrollTo(href); }}>
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
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Code Crafted. All rights reserved.</span>
          <span className="footer-tagline">Build. Create. Deliver.</span>
        </div>
      </div>

      <style>{`
        .footer {
          border-top: 1px solid var(--border);
          padding: 0 0 2rem;
          background: var(--bg-primary);
        }
        .footer-cta-band {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 3.5rem 3rem;
          border: 1px solid var(--border);
          border-radius: 20px;
          margin-bottom: 4rem;
          margin-top: -3rem;
          background: linear-gradient(135deg, rgba(94, 234, 212, 0.04) 0%, transparent 60%);
          position: relative;
          overflow: hidden;
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
          font-size: clamp(1.25rem, 3vw, 1.75rem);
          font-weight: 600;
        }
        .footer-top {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 4rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid var(--border);
        }
        .footer-brand {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--text-primary);
          display: block;
          margin-bottom: 1rem;
          transition: color 0.3s;
        }
        .footer-brand:hover {
          color: var(--accent);
        }
        .footer-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.7;
          max-width: 280px;
          margin-bottom: 1rem;
        }
        .footer-author {
          font-size: 0.8rem;
          color: var(--text-dim);
        }
        .footer-author span {
          color: var(--accent);
          font-weight: 500;
        }
        .footer-col-title {
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-dim);
          margin-bottom: 1.25rem;
          font-family: var(--font-mono);
        }
        .footer-nav {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .footer-link {
          font-size: 0.9rem;
          color: var(--text-muted);
          transition: all 0.3s;
          display: inline-block;
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
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          border: 1px solid var(--border);
          color: var(--text-muted);
          transition: all 0.3s var(--ease-out);
        }
        .footer-social:hover {
          border-color: var(--accent);
          color: var(--accent);
          background: rgba(94, 234, 212, 0.08);
          transform: translateY(-3px);
        }
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 2rem;
          font-size: 0.8rem;
          color: var(--text-dim);
        }
        .footer-tagline {
          font-family: var(--font-display);
          letter-spacing: 0.1em;
          color: var(--text-dim);
        }
        @media (max-width: 768px) {
          .footer-top {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .footer-cta-band {
            flex-direction: column;
            gap: 1.5rem;
            text-align: center;
            padding: 2.5rem 2rem;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 0.5rem;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
