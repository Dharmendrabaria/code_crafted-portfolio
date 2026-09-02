import { useRef, useState, useEffect } from 'react';
import { motion, useInView, animate, useMotionValue, useTransform } from 'framer-motion';
import { Check, ArrowUpRight, Zap, Star, Shield } from 'lucide-react';

const pricingTiers = [
  {
    id: 'mvp',
    name: 'Frontend MVP',
    price: 15000,
    icon: <Zap size={20} />,
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
    id: 'ecosystem',
    name: 'MERN Ecosystem',
    price: 40000,
    icon: <Star size={20} />,
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
    id: 'enterprise',
    name: 'Enterprise Scale',
    price: 80000,
    icon: <Shield size={20} />,
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

// Animated Number Component
function AnimatedNumber({ value }) {
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: '-50px' });

  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(0, value, {
        duration: 2,
        ease: 'easeOut',
        onUpdate(v) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(v).toLocaleString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, value]);

  return <span ref={nodeRef}>{value.toLocaleString()}</span>;
}

// Premium 3D Card with Glare and Hover Border
function Premium3DCard({ tier, index, inView }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Subtle tilt for realism
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);
  
  // Glare effect follows mouse
  const glareX = useTransform(x, [-0.5, 0.5], [100, -100]);
  const glareY = useTransform(y, [-0.5, 0.5], [100, -100]);

  function handleMouseMove(event) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    // Animate back to flat
    animate(x, 0, { type: 'spring', stiffness: 300, damping: 30 });
    animate(y, 0, { type: 'spring', stiffness: 300, damping: 30 });
  }

  return (
    <div className="card-perspective-container">
      <motion.div
        ref={cardRef}
        className={`premium-card-wrapper ${tier.popular ? 'is-popular' : ''}`}
        style={{
          '--theme-color': tier.color,
          rotateX,
          rotateY,
        }}
        initial={{ opacity: 0, y: 30, scale: tier.popular ? 1.05 : 1 }}
        animate={inView ? { opacity: 1, y: 0, scale: tier.popular ? 1.05 : 1 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Mask to clip the rotating border without clipping the pop-out badge */}
        <div className="rotating-border-mask">
          <div className={`rotating-border ${isHovered ? 'active' : ''}`} />
        </div>
        
        {/* Floating badge placed outside inner surface to prevent overflow cutoff */}
        {tier.popular && (
          <div className="popular-badge-floating">
            <Star size={10} fill="currentColor" /> MOST POPULAR
          </div>
        )}

        {/* The main card content */}
        <div className="card-inner-surface">
          
          {/* Dynamic Glare Effect */}
          <motion.div 
            className="card-glare" 
            style={{ 
              x: glareX, 
              y: glareY,
              opacity: isHovered ? 1 : 0 
            }} 
          />

          {/* Compact Header */}
          <div className="tier-header-compact">
            <div className="tier-title-group">
              <div className="tier-icon-small" style={{ color: tier.color, backgroundColor: `${tier.color}15` }}>
                {tier.icon}
              </div>
              <h3 className="tier-name">{tier.name}</h3>
            </div>
            
            <div className="tier-price-compact">
              <span className="currency">₹</span>
              <span className="price-num">
                <AnimatedNumber value={tier.price} />
              </span>
            </div>
          </div>

          <p className="tier-desc-compact">{tier.desc}</p>
          
          <div className="compact-divider" />

          <ul className="compact-feature-list">
            {tier.features.map((feature, i) => (
              <li key={i} className="compact-feature-item">
                <div className="feature-check" style={{ color: tier.color, background: `${tier.color}15` }}>
                  <Check size={12} strokeWidth={3} />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <a 
            href="#contact" 
            className="btn-premium-action"
            style={{ 
              background: isHovered ? tier.color : 'rgba(255,255,255,0.03)',
              color: isHovered ? '#000' : 'var(--text-primary)',
              borderColor: isHovered ? tier.color : 'rgba(255,255,255,0.1)'
            }}
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            {tier.popular ? 'Deploy Now' : 'Select Plan'} <ArrowUpRight size={16} />
          </a>

        </div>
      </motion.div>
    </div>
  );
}

export default function Packages() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="packages" className="section packages-section" ref={containerRef}>
      
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        <motion.div
          className="packages-header"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">Investment</span>
          <h2 className="section-title">TRANSPARENT <span className="gradient-text">PRICING</span></h2>
        </motion.div>

        <div className="pricing-grid-3d">
          {pricingTiers.map((tier, index) => (
            <Premium3DCard key={tier.id} tier={tier} index={index} inView={inView} />
          ))}
        </div>

      </div>

      <style>{`
        .packages-section {
          position: relative;
          z-index: 2;
          padding-top: 6rem;
          padding-bottom: 6rem;
        }

        .packages-header {
          text-align: center;
          margin-bottom: 4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .pricing-grid-3d {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 4rem;
        }

        /* Perspective Container */
        .card-perspective-container {
          perspective: 1500px;
          display: flex;
        }

        /* 3D Wrapper */
        .premium-card-wrapper {
          position: relative;
          width: 100%;
          border-radius: 24px;
          padding: 1px; /* The exact width of the rotating border */
          transform-style: preserve-3d;
          background: rgba(255, 255, 255, 0.05); /* Static subtle border */
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          transition: box-shadow 0.4s ease;
        }
        
        .premium-card-wrapper:hover {
          box-shadow: 0 30px 60px rgba(0,0,0,0.6), 0 0 40px rgba(var(--theme-color), 0.1);
        }

        .premium-card-wrapper.is-popular {
          z-index: 10;
        }

        /* Border Mask to prevent cutting off 3D floating elements */
        .rotating-border-mask {
          position: absolute;
          inset: 0;
          border-radius: 24px;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }

        /* The Premium Thin Rotating Border */
        .rotating-border {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(from 0deg, transparent 70%, var(--theme-color) 100%);
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none; /* Don't interfere with mouse events */
        }

        .rotating-border.active {
          opacity: 1;
          animation: smooth-spin 2.5s linear infinite;
        }

        @keyframes smooth-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* The Inner Surface (Glass) */
        .card-inner-surface {
          position: relative;
          z-index: 1;
          height: 100%;
          background: #0f1916; /* Solid dark background looks best for 3D */
          border-radius: 23px; /* 1px smaller than wrapper */
          padding: 2.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          overflow: hidden; /* Keep glare inside */
          transform: translateZ(30px); /* Extrude content in 3D space */
          transition: box-shadow 0.4s ease, background 0.4s ease;
        }

        /* Highlight the Popular Card heavily without breaking Framer Motion transforms */
        .premium-card-wrapper.is-popular .card-inner-surface {
          box-shadow: inset 0 0 0 1px rgba(94, 234, 212, 0.4), 0 30px 60px rgba(0,0,0,0.6), 0 0 50px rgba(94, 234, 212, 0.15);
          background: linear-gradient(180deg, rgba(94, 234, 212, 0.12) 0%, rgba(15, 25, 22, 0.95) 100%);
        }
        
        .premium-card-wrapper.is-popular:hover .card-inner-surface {
          box-shadow: inset 0 0 0 1px rgba(94, 234, 212, 0.8), 0 40px 80px rgba(0,0,0,0.8), 0 0 80px rgba(94, 234, 212, 0.3);
          background: linear-gradient(180deg, rgba(94, 234, 212, 0.18) 0%, rgba(15, 25, 22, 0.95) 100%);
        }

        /* Mouse Tracking Glare */
        .card-glare {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, transparent 40%);
          pointer-events: none;
          z-index: 0;
          transition: opacity 0.4s ease;
        }

        /* Floating Popular Badge */
        .popular-badge-floating {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%) translateZ(70px); /* 40px + 30px (from surface) */
          background: var(--theme-color);
          color: #000;
          padding: 0.4rem 1.25rem;
          border-radius: 100px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          box-shadow: 0 4px 15px rgba(94, 234, 212, 0.6);
          z-index: 20;
        }

        /* Content Styling */
        .tier-header-compact {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1rem;
          position: relative;
          z-index: 1;
        }

        .tier-title-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .tier-icon-small {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tier-name {
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .tier-price-compact {
          display: flex;
          align-items: baseline;
          gap: 0.15rem;
        }

        .currency {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--theme-color);
        }

        .price-num {
          font-family: var(--font-display);
          font-size: 2.75rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
          letter-spacing: -0.04em;
        }

        .tier-desc-compact {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 1;
        }

        .compact-divider {
          height: 1px;
          background: rgba(255,255,255,0.05);
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 1;
        }

        .compact-feature-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          flex: 1;
          position: relative;
          z-index: 1;
        }

        .compact-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.95rem;
          color: var(--text-muted);
        }

        .feature-check {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .btn-premium-action {
          margin-top: 2.5rem;
          width: 100%;
          padding: 1.1rem;
          border-radius: 14px;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: all 0.3s ease;
          text-decoration: none;
          position: relative;
          z-index: 1;
          transform: translateZ(40px); /* Button pops out */
        }

        .btn-premium-action:hover {
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
          transform: translateZ(50px) translateY(-2px);
        }

        @media (max-width: 1024px) {
          .pricing-grid-3d {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .premium-card-wrapper {
            transform: none !important; /* Disable 3D tilt on mobile */
          }
          .card-inner-surface {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
