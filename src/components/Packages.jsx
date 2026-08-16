import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, ArrowUpRight, Zap, Star, Shield } from 'lucide-react';

const pricingTiers = [
  {
    name: 'Frontend MVP',
    price: '15,000',
    icon: <Zap size={24} />,
    desc: 'Perfect for landing pages and simple portfolios.',
    features: [
      'Up to 5 Pages',
      'React Frontend',
      'Framer Motion Animations',
      'Contact Form Integration',
      'Mobile Responsive',
      'Basic SEO Setup'
    ],
    color: '#14B8A6'
  },
  {
    name: 'MERN Ecosystem',
    price: '40,000',
    icon: <Star size={24} />,
    desc: 'Full-stack power for serious web applications.',
    popular: true,
    features: [
      'Up to 12 Pages',
      'React + Node.js + Express',
      'MongoDB Database',
      'JWT Authentication',
      'Custom Admin Dashboard',
      'REST API Development',
      '30 Days Free Support'
    ],
    color: '#5EEAD4'
  },
  {
    name: 'Enterprise Scale',
    price: '80,000',
    icon: <Shield size={24} />,
    desc: 'Complex architectures for growing businesses.',
    features: [
      'Unlimited Pages',
      'Advanced Microservices',
      'Payment Gateway Setup',
      'Multiple User Roles',
      'Real-time WebSockets',
      'Advanced Analytics',
      'Dedicated Maintenance'
    ],
    color: '#0D9488'
  }
];

// Interactive Spotlight Card Component
function PricingCard({ tier, index, inView }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`premium-pricing-card ${tier.popular ? 'is-popular' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
    >
      {/* Animated Tracing Border for Popular Card */}
      {tier.popular && (
        <div className="tracing-beam-border" />
      )}

      {/* Mouse Spotlight Effect */}
      <div 
        className="card-spotlight"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(94, 234, 212, ${isHovered ? 0.12 : 0}), transparent 40%)`
        }}
      />
      
      {tier.popular && (
        <div className="popular-badge">
          <Star size={12} fill="currentColor" className="spin-slow" /> MOST POPULAR
        </div>
      )}

      <div className="card-inner-content">
        <div className="tier-header">
          <div className="tier-icon" style={{ color: tier.color, background: `${tier.color}15`, boxShadow: `0 0 20px ${tier.color}20` }}>
            {tier.icon}
          </div>
          <h3 className="tier-name">{tier.name}</h3>
        </div>

        <div className="tier-pricing">
          <span className="currency" style={{ color: tier.color }}>₹</span>
          <span className="amount">{tier.price}</span>
          <span className="billing">/project</span>
        </div>
        
        <p className="tier-desc">{tier.desc}</p>

        <div className="divider" />

        <ul className="tier-features">
          {tier.features.map((feature, i) => (
            <motion.li 
              key={i} 
              className="feature-item"
              initial={false}
              animate={isHovered ? { x: 5 } : { x: 0 }}
              transition={{ duration: 0.2, delay: i * 0.03 }}
            >
              <div className="feature-check" style={{ color: tier.color, background: `${tier.color}15` }}>
                <Check size={12} strokeWidth={3} />
              </div>
              <span className="feature-text">{feature}</span>
            </motion.li>
          ))}
        </ul>

        <a 
          href="#contact" 
          className={`tier-btn ${tier.popular ? 'tier-btn-primary' : 'tier-btn-outline'}`}
          style={{ '--btn-color': tier.color }}
          onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
        >
          Select Plan <ArrowUpRight size={16} />
        </a>
      </div>
    </motion.div>
  );
}

export default function Packages() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="packages" className="section packages-section" ref={ref}>
      {/* Animated Ambient Background Glows */}
      <div className="pricing-ambient-glow glow-1" />
      <div className="pricing-ambient-glow glow-2" />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          className="packages-header"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">Investment</span>
          <h2 className="section-title">TRANSPARENT <span className="gradient-text">PRICING</span></h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Elite engineering requires precise architecture. Choose the tier that fits your scale.
          </p>
        </motion.div>

        <div className="premium-pricing-grid">
          {pricingTiers.map((tier, i) => (
            <PricingCard key={tier.name} tier={tier} index={i} inView={inView} />
          ))}
        </div>

        <motion.div
          className="custom-enterprise-banner"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="banner-bg-glow" />
          <div className="banner-content">
            <div className="banner-text">
              <h3>Need a Custom Solution?</h3>
              <p>For specialized platforms, complex AI integrations, or dedicated offshore team extensions.</p>
            </div>
            <a href="#contact" className="banner-btn" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Let's Discuss Requirements <ArrowUpRight size={18} />
            </a>
          </div>
        </motion.div>
      </div>

      <style>{`
        .packages-section {
          position: relative;
          z-index: 2;
          padding-top: 8rem;
          padding-bottom: 8rem;
          border-top: 1px solid var(--border);
          overflow: hidden;
        }

        /* Ambient Glows */
        .pricing-ambient-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.15;
          pointer-events: none;
          z-index: 0;
          animation: floatOrb 10s ease-in-out infinite alternate;
        }
        .glow-1 {
          top: 10%;
          left: -10%;
          background: #14B8A6;
        }
        .glow-2 {
          bottom: 10%;
          right: -10%;
          background: #5EEAD4;
          animation-delay: -5s;
        }

        @keyframes floatOrb {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(50px, 50px) scale(1.1); }
        }
        
        .packages-header {
          text-align: center;
          margin-bottom: 5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* The Grid */
        .premium-pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
          margin-bottom: 5rem;
        }

        /* The Card */
        .premium-pricing-card {
          position: relative;
          background: rgba(10, 20, 18, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 28px;
          overflow: hidden;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: border-color 0.4s, transform 0.4s;
          display: flex;
          flex-direction: column;
        }
        .premium-pricing-card:hover {
          border-color: rgba(94, 234, 212, 0.3);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }
        
        .is-popular {
          background: rgba(17, 32, 29, 0.8);
          border-color: transparent !important;
          transform: scale(1.05);
          z-index: 10;
        }
        .is-popular:hover {
          transform: scale(1.05) translateY(-10px);
        }

        /* Animated Tracing Border */
        .tracing-beam-border {
          position: absolute;
          inset: 0;
          border-radius: 28px;
          padding: 2px;
          background: conic-gradient(from 0deg, transparent 70%, var(--accent) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: spin-border 4s linear infinite;
          pointer-events: none;
        }
        .is-popular::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 28px;
          padding: 1px;
          background: rgba(255,255,255,0.05);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        @keyframes spin-border {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Spotlight & Glows */
        .card-spotlight {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          transition: background 0.3s;
        }

        .popular-badge {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translate(-50%, -50%);
          background: var(--accent);
          color: var(--bg-primary);
          padding: 0.5rem 1.5rem;
          border-radius: 100px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          box-shadow: 0 0 25px rgba(94, 234, 212, 0.5);
          z-index: 2;
        }

        .spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }

        /* Inner Content */
        .card-inner-content {
          position: relative;
          z-index: 1;
          padding: 3.5rem 2.5rem;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .tier-header {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 2rem;
        }
        .tier-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s;
        }
        .premium-pricing-card:hover .tier-icon {
          transform: scale(1.1) rotate(5deg);
        }
        
        .tier-name {
          font-family: var(--font-display);
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .tier-pricing {
          display: flex;
          align-items: baseline;
          gap: 0.25rem;
          margin-bottom: 1rem;
        }
        .currency {
          font-size: 1.5rem;
          font-weight: 600;
        }
        .amount {
          font-family: var(--font-display);
          font-size: 3.8rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
          letter-spacing: -0.04em;
          background: linear-gradient(180deg, #fff 0%, #a0a0a0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .billing {
          font-size: 0.95rem;
          color: var(--text-dim);
          font-weight: 500;
        }

        .tier-desc {
          font-size: 1rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 2.5rem;
        }

        .divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%);
          margin-bottom: 2.5rem;
        }

        .tier-features {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          flex: 1;
        }
        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          font-size: 0.95rem;
          color: var(--text-muted);
          transition: color 0.3s;
        }
        .premium-pricing-card:hover .feature-item {
          color: var(--text-primary);
        }
        .feature-check {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }

        /* Buttons */
        .tier-btn {
          margin-top: 3rem;
          width: 100%;
          padding: 1.25rem;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
          position: relative;
          overflow: hidden;
        }
        
        .tier-btn-outline {
          background: rgba(255,255,255,0.03);
          color: var(--text-primary);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .tier-btn-outline:hover {
          background: rgba(255,255,255,0.08);
          border-color: var(--btn-color);
          box-shadow: 0 0 20px rgba(255,255,255,0.05);
          transform: translateY(-3px);
        }
        
        .tier-btn-primary {
          background: var(--text-primary);
          color: var(--bg-primary);
          border: 1px solid transparent;
        }
        .tier-btn-primary:hover {
          background: var(--btn-color);
          box-shadow: 0 10px 30px rgba(94, 234, 212, 0.4);
          transform: translateY(-4px);
        }

        /* Banner */
        .custom-enterprise-banner {
          position: relative;
          background: rgba(17, 32, 29, 0.4);
          border: 1px solid rgba(94, 234, 212, 0.2);
          border-radius: 28px;
          padding: 4rem;
          overflow: hidden;
          backdrop-filter: blur(12px);
        }
        .banner-bg-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 100% 50%, rgba(94, 234, 212, 0.15) 0%, transparent 50%);
          pointer-events: none;
        }
        .banner-content {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }
        .banner-text h3 {
          font-family: var(--font-display);
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }
        .banner-text p {
          font-size: 1.1rem;
          color: var(--text-muted);
        }
        .banner-btn {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1.25rem 2.5rem;
          background: rgba(94, 234, 212, 0.1);
          color: var(--accent);
          border: 1px solid var(--accent);
          border-radius: 100px;
          font-family: var(--font-mono);
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-decoration: none;
          transition: all 0.3s;
        }
        .banner-btn:hover {
          background: var(--accent);
          color: var(--bg-primary);
          box-shadow: 0 10px 30px rgba(94, 234, 212, 0.4);
          transform: translateY(-3px);
        }

        @media (max-width: 1024px) {
          .premium-pricing-grid {
            grid-template-columns: 1fr;
            max-width: 600px;
            margin: 0 auto 4rem auto;
            gap: 3rem;
          }
          .is-popular {
            transform: scale(1);
          }
          .is-popular:hover {
            transform: translateY(-10px);
          }
          .banner-content {
            flex-direction: column;
            text-align: center;
          }
          .custom-enterprise-banner {
            padding: 3rem 2rem;
          }
        }
      `}</style>
    </section>
  );
}
