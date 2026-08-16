import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, X, ArrowUpRight, Sparkles } from 'lucide-react';

const packages = [
  {
    name: 'Starter',
    price: '5,000',
    desc: 'For simple websites',
    included: ['1–3 pages', 'Basic UI design', 'Contact form', 'Basic animations', 'Basic SEO', 'Deployment assistance'],
    excluded: ['Login system', 'Database', 'Admin panel', 'Backend API'],
    popular: false,
  },
  {
    name: 'Basic',
    price: '10,000',
    desc: 'For small business websites',
    included: ['3–5 pages', 'React frontend', 'Contact form', 'Basic animations', 'Basic API integration', 'Deployment'],
    excluded: ['Login system', 'Database', 'Admin panel'],
    popular: false,
  },
  {
    name: 'Professional',
    price: '15,000',
    desc: 'For growing businesses',
    included: ['5–7 pages', 'React frontend', 'Fully responsive', 'Professional UI', 'Smooth animations', 'Contact form', 'Basic API integrations', 'SEO basics', 'Deployment', '7 days basic support'],
    excluded: ['Database', 'Admin panel'],
    popular: true,
  },
  {
    name: 'Business',
    price: '25,000',
    desc: 'For serious business applications',
    included: ['6–10 pages', 'React + Node.js + Express', 'MongoDB database', 'REST APIs', 'Login / Register', 'Authentication', 'CRUD operations', 'Basic Admin Panel', 'Search & filter', 'File upload', 'Responsive design', 'Deployment', '15 days support'],
    excluded: [],
    popular: false,
  },
  {
    name: 'MERN',
    price: '40,000',
    desc: 'Full-stack MERN application',
    included: ['8–12 pages', 'React + Node + Express + MongoDB', 'JWT authentication', 'Role-based access', 'User dashboard', 'Admin dashboard', 'CRUD operations', 'Search & filter', 'Pagination', 'File upload', 'API integrations', 'Notifications', 'Responsive design', 'Deployment', '30 days support'],
    excluded: [],
    popular: false,
  },
  {
    name: 'Custom',
    price: '50,000+',
    desc: 'For advanced web applications',
    included: ['Custom pages', 'Custom features', 'Advanced authentication', 'Advanced admin panel', 'Multiple user roles', 'Payment integration', 'Third-party APIs', 'File management', 'Reports & analytics', 'Scalable backend', 'Custom database architecture', 'Deployment', 'Custom support plan'],
    excluded: [],
    popular: false,
  },
];

export default function Packages() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="packages" className="section packages-section" ref={ref}>
      <div className="container">
        <motion.div
          className="packages-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">Pricing</span>
          <h2 className="section-title">CHOOSE YOUR <span className="gradient-text">BUILD</span></h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Simple, transparent pricing for every stage of your idea.
          </p>
        </motion.div>

        <div className="packages-grid">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              className={`package-card ${pkg.popular ? 'package-card--popular' : ''} ${expanded === i ? 'package-card--expanded' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
            >
              {pkg.popular && (
                <div className="package-badge">
                  <Sparkles size={12} /> MOST POPULAR
                </div>
              )}

              <div className="package-header">
                <h3 className="package-name">{pkg.name}</h3>
                <div className="package-price">
                  <span className="package-currency">₹</span>
                  <span className="package-amount">{pkg.price}</span>
                </div>
                <p className="package-desc">{pkg.desc}</p>
              </div>

              <div className="package-features">
                {pkg.included.slice(0, expanded === i ? pkg.included.length : 5).map((f, fi) => (
                  <div key={fi} className="package-feature">
                    <Check size={14} className="package-feature-icon package-feature-icon--yes" />
                    <span>{f}</span>
                  </div>
                ))}
                {pkg.excluded.map((f, fi) => (
                  <div key={fi} className="package-feature package-feature--no">
                    <X size={14} className="package-feature-icon package-feature-icon--no" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              {pkg.included.length > 5 && (
                <button
                  className="package-toggle"
                  onClick={() => setExpanded(expanded === i ? null : i)}
                >
                  {expanded === i ? 'Show less' : `+${pkg.included.length - 5} more features`}
                </button>
              )}

              <a href="#contact" className={`btn ${pkg.popular ? 'btn-primary' : 'btn-outline'} package-cta`} data-cursor="OPEN" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Get Started <ArrowUpRight size={14} />
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="packages-custom-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p>Have something bigger in mind?</p>
          <a href="#contact" className="btn btn-outline" data-cursor="OPEN" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Let's Talk <ArrowUpRight size={14} />
          </a>
        </motion.div>

        <motion.p
          className="packages-note"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          Domain, hosting, paid database plans and third-party services are billed separately.
        </motion.p>
      </div>

      <style>{`
        .packages-section {
          border-top: 1px solid var(--border);
          background: var(--bg-secondary);
        }
        .packages-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .packages-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        .package-card {
          padding: 1.5rem;
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 1;
        }
        .package-card:hover {
          border-color: var(--accent);
          background: rgba(17, 32, 29, 0.6);
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(94, 234, 212, 0.1);
          z-index: 10;
        }
        .package-card--popular {
          border-color: rgba(94, 234, 212, 0.3);
          background: linear-gradient(180deg, rgba(94, 234, 212, 0.08) 0%, var(--glass-bg) 100%);
        }
        .package-card--popular:hover {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 40px rgba(94, 234, 212, 0.2);
        }
        .package-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          padding: 0.35rem 1rem;
          background: var(--accent-gradient);
          color: #081110;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          border-radius: 100px;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          white-space: nowrap;
        }
        .package-header {
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border);
        }
        .package-name {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .package-price {
          display: flex;
          align-items: baseline;
          gap: 0.25rem;
          margin-bottom: 0.5rem;
        }
        .package-currency {
          font-size: 1.25rem;
          color: var(--accent);
          font-weight: 500;
        }
        .package-amount {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1;
        }
        .package-desc {
          font-size: 0.8rem;
          color: var(--text-dim);
        }
        .package-features {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-bottom: 1.25rem;
        }
        .package-feature {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .package-feature--no span {
          color: var(--text-dim);
          text-decoration: line-through;
        }
        .package-feature-icon--yes {
          color: var(--accent);
          flex-shrink: 0;
        }
        .package-feature-icon--no {
          color: var(--text-dim);
          flex-shrink: 0;
        }
        .package-toggle {
          font-size: 0.8rem;
          color: var(--accent);
          margin-bottom: 1rem;
          text-align: left;
          font-family: var(--font-mono);
          letter-spacing: 0.02em;
          transition: opacity 0.3s;
        }
        .package-toggle:hover {
          opacity: 0.7;
        }
        .package-cta {
          width: 100%;
          justify-content: center;
          margin-top: auto;
        }
        .packages-custom-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          margin-top: 3rem;
          padding: 1.5rem;
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .packages-custom-cta p {
          font-size: 1rem;
          color: var(--text-muted);
        }
        .packages-note {
          text-align: center;
          font-size: 0.8rem;
          color: var(--text-dim);
          margin-top: 2rem;
        }

        @media (max-width: 1100px) {
          .packages-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 650px) {
          .packages-grid {
            grid-template-columns: 1fr;
          }
          .packages-custom-cta {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
