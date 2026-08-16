 import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe, Layers, Database, LayoutDashboard, Server, Wrench } from 'lucide-react';

const services = [
  {
    num: '01',
    title: 'Web Development',
    desc: 'Bespoke, high-performance websites engineered for scale and tailored to elevate your brand.',
    icon: <Globe size={28} />,
  },
  {
    num: '02',
    title: 'React Architecture',
    desc: 'Fluid, interactive frontend applications built with advanced React patterns and component-driven design.',
    icon: <Layers size={28} />,
  },
  {
    num: '03',
    title: 'Full MERN Stack',
    desc: 'End-to-end ecosystems utilizing MongoDB, Express, React, and Node.js for seamless data flow.',
    icon: <Database size={28} />,
  },
  {
    num: '04',
    title: 'Admin Dashboards',
    desc: 'Complex data visualization and powerful management tools packed into intuitive, clean interfaces.',
    icon: <LayoutDashboard size={28} />,
  },
  {
    num: '05',
    title: 'REST APIs',
    desc: 'Secure, lightning-fast backend architectures and APIs built to support enterprise-grade applications.',
    icon: <Server size={28} />,
  },
  {
    num: '06',
    title: 'System Support',
    desc: 'Continuous technical refinement, performance monitoring, and structural updates for your platforms.',
    icon: <Wrench size={28} />,
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [active, setActive] = useState(0); // First one active by default on desktop

  return (
    <section id="services" className="section services-section" ref={ref}>
      <div className="container">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">Capabilities</span>
          <h2 className="section-title">WHAT <span className="gradient-text">I DO</span></h2>
        </motion.div>

        <motion.div 
          className="services-pillars"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {services.map((service, i) => {
            const isActive = active === i;
            return (
              <div
                key={service.num}
                className={`pillar ${isActive ? 'active' : ''}`}
                onMouseEnter={() => setActive(i)}
              >
                <div className="pillar-bg" />
                <div className="pillar-content">
                  <div className="pillar-top">
                    <div className="pillar-icon-wrapper">
                      {service.icon}
                    </div>
                    <span className="pillar-num">{service.num}</span>
                  </div>

                  <div className="pillar-info">
                    <h3 className="pillar-title">{service.title}</h3>
                    <div className="pillar-desc-wrapper">
                      <p className="pillar-desc">{service.desc}</p>
                    </div>
                  </div>

                  {/* Vertical title for non-active state */}
                  <div className="pillar-vertical-title">
                    {service.title}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      <style>{`
        .services-section {
          position: relative;
          z-index: 2;
          padding-top: 6rem;
        }
        .services-header {
          text-align: center;
          margin-bottom: 5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Pillars Container */
        .services-pillars {
          display: flex;
          gap: 1rem;
          height: 500px;
          max-width: 1200px;
          margin: 0 auto;
          border-radius: 24px;
          overflow: hidden;
        }

        /* Individual Pillar */
        .pillar {
          position: relative;
          flex: 1;
          height: 100%;
          background: rgba(17, 32, 29, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        /* Active State */
        .pillar.active {
          flex: 4;
          background: rgba(17, 32, 29, 0.8);
          border-color: rgba(94, 234, 212, 0.3);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        /* Ambient Glow inside pillar */
        .pillar-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(20, 184, 166, 0.15) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.6s ease;
          pointer-events: none;
        }
        .pillar.active .pillar-bg {
          opacity: 1;
        }

        .pillar-content {
          position: relative;
          z-index: 1;
          height: 100%;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        /* Top section (Icon & Number) */
        .pillar-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          opacity: 0.5;
          transition: opacity 0.3s;
        }
        .pillar.active .pillar-top {
          opacity: 1;
        }
        .pillar-icon-wrapper {
          color: var(--text-primary);
          transition: color 0.4s;
        }
        .pillar.active .pillar-icon-wrapper {
          color: var(--accent);
        }
        .pillar-num {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          font-weight: 600;
        }

        /* Main Info */
        .pillar-info {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }
        .pillar.active .pillar-info {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
          transition-delay: 0.1s;
        }

        .pillar-title {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.1;
          white-space: nowrap;
        }
        .pillar-desc-wrapper {
          overflow: hidden;
        }
        .pillar-desc {
          font-size: 1.1rem;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 400px;
        }

        /* Vertical Title (when collapsed) */
        .pillar-vertical-title {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%) rotate(-90deg);
          transform-origin: left bottom;
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          opacity: 1;
          transition: opacity 0.3s;
          letter-spacing: 0.05em;
        }
        .pillar.active .pillar-vertical-title {
          opacity: 0;
          pointer-events: none;
        }

        @media (max-width: 1024px) {
          .services-pillars {
            flex-direction: column;
            height: auto;
            min-height: 600px;
          }
          .pillar {
            flex: 1 !important;
            height: 80px;
            min-height: 80px;
          }
          .pillar.active {
            flex: none !important;
            height: 250px;
            min-height: 250px;
          }
          .pillar-content {
            padding: 1.5rem;
          }
          .pillar-vertical-title {
            bottom: auto;
            left: 5rem;
            top: 50%;
            transform: translateY(-50%);
          }
          .pillar-title {
            font-size: 2rem;
          }
        }
        
        @media (max-width: 640px) {
          .pillar-title {
            font-size: 1.5rem;
            white-space: normal;
          }
          .pillar-vertical-title {
            font-size: 1rem;
          }
          .pillar.active {
            height: 300px;
            min-height: 300px;
          }
        }
      `}</style>
    </section>
  );
}
