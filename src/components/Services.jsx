import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Globe, Layers, Database, LayoutDashboard, Server, Wrench } from 'lucide-react';

const services = [
  {
    num: '01',
    title: 'Web Development',
    desc: 'Bespoke, high-performance websites engineered for scale and tailored to elevate your brand identity. I build digital experiences that load instantly and perform flawlessly.',
    icon: <Globe size={48} strokeWidth={1.5} />,
    color: '#14B8A6'
  },
  {
    num: '02',
    title: 'React Architecture',
    desc: 'Fluid, interactive frontend applications built with advanced React patterns, Framer Motion animations, and scalable component-driven design systems.',
    icon: <Layers size={48} strokeWidth={1.5} />,
    color: '#38bdf8'
  },
  {
    num: '03',
    title: 'Full MERN Stack',
    desc: 'End-to-end ecosystems utilizing MongoDB, Express, React, and Node.js. Seamless data flow from the database to the DOM with zero bottlenecks.',
    icon: <Database size={48} strokeWidth={1.5} />,
    color: '#4db33d'
  },
  {
    num: '04',
    title: 'Admin Dashboards',
    desc: 'Complex data visualization and powerful management tools packed into intuitive, clean interfaces. Real-time analytics and role-based access control.',
    icon: <LayoutDashboard size={48} strokeWidth={1.5} />,
    color: '#f59e0b'
  },
  {
    num: '05',
    title: 'REST APIs',
    desc: 'Secure, lightning-fast backend architectures and APIs built to support enterprise-grade applications with microservices scaling in mind.',
    icon: <Server size={48} strokeWidth={1.5} />,
    color: '#8b5cf6'
  },
  {
    num: '06',
    title: 'System Support',
    desc: 'Continuous technical refinement, performance monitoring, legacy code refactoring, and structural updates to keep your platform bleeding-edge.',
    icon: <Wrench size={48} strokeWidth={1.5} />,
    color: '#ec4899'
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);

  const activeService = services[activeIndex];

  return (
    <section id="services" className="section services-section" ref={ref}>
      <div className="container">
        
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">Capabilities</span>
          <h2 className="section-title">WHAT <span className="gradient-text">I DO</span></h2>
        </motion.div>

        <div className="services-split-layout">
          {/* Left Side: List of Services */}
          <div className="services-list-container">
            {services.map((service, index) => {
              const isActive = activeIndex === index;
              return (
                <div 
                  key={service.num} 
                  className={`service-list-item ${isActive ? 'is-active' : ''}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="service-list-num">{service.num}</div>
                  <h3 className="service-list-title">{service.title}</h3>
                  <motion.div 
                    className="service-list-line" 
                    initial={false}
                    animate={{ 
                      width: isActive ? '100%' : '0%',
                      backgroundColor: isActive ? service.color : 'rgba(255,255,255,0.1)'
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              );
            })}
          </div>

          {/* Right Side: Sticky Spotlight Window */}
          <div className="services-spotlight-container">
            <div className="spotlight-sticky-wrapper">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeIndex}
                  className="spotlight-card"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Dynamic Glowing Background */}
                  <div 
                    className="spotlight-glow" 
                    style={{ background: `radial-gradient(circle at top right, ${activeService.color}40 0%, transparent 60%)` }} 
                  />
                  
                  <div className="spotlight-content">
                    <div className="spotlight-icon-wrapper" style={{ color: activeService.color }}>
                      <div className="spotlight-icon-bg" style={{ backgroundColor: `${activeService.color}15` }} />
                      {activeService.icon}
                    </div>
                    
                    <div className="spotlight-text-group">
                      <h3 className="spotlight-title">{activeService.title}</h3>
                      <p className="spotlight-desc">{activeService.desc}</p>
                    </div>

                    <div className="spotlight-footer">
                      <span className="spotlight-num" style={{ color: activeService.color }}>
                        {activeService.num}
                      </span>
                      <span className="spotlight-label">Service Focus</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .services-section {
          position: relative;
          z-index: 2;
          padding-top: 6rem;
          padding-bottom: 6rem;
        }

        .services-header {
          text-align: center;
          margin-bottom: 5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .services-split-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }

        /* Left Side */
        .services-list-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding-top: 2rem;
          padding-bottom: 2rem;
        }

        .service-list-item {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.5rem 0;
          position: relative;
          cursor: pointer;
          transition: opacity 0.3s;
          opacity: 0.4;
        }

        .service-list-item:hover {
          opacity: 0.7;
        }

        .service-list-item.is-active {
          opacity: 1;
        }

        .service-list-num {
          font-family: var(--font-mono);
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        .service-list-item.is-active .service-list-num {
          color: var(--text-primary);
        }

        .service-list-title {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 700;
          color: var(--text-primary);
          transition: transform 0.4s ease;
        }

        .service-list-item.is-active .service-list-title {
          transform: translateX(10px);
        }

        .service-list-line {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
        }

        /* Right Side Spotlight */
        .services-spotlight-container {
          position: relative;
        }

        .spotlight-sticky-wrapper {
          position: sticky;
          top: 20vh;
          min-height: 400px;
          display: flex;
          align-items: center;
        }

        .spotlight-card {
          width: 100%;
          min-height: 400px;
          background: rgba(17, 32, 29, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: clamp(20px, 4vw, 32px);
          overflow: hidden;
          position: relative;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.3);
          display: flex;
          flex-direction: column;
        }

        .spotlight-glow {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .spotlight-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: clamp(2rem, 4vw, 3.5rem);
        }

        .spotlight-icon-wrapper {
          position: relative;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .spotlight-icon-bg {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          transform: rotate(-10deg);
          z-index: -1;
        }

        .spotlight-text-group {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .spotlight-title {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.1;
        }

        .spotlight-desc {
          font-size: clamp(0.9rem, 1.8vw, 1.15rem);
          color: var(--text-muted);
          line-height: 1.7;
        }

        .spotlight-footer {
          display: flex;
          align-items: baseline;
          gap: 1rem;
          margin-top: auto;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .spotlight-num {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          line-height: 0.8;
          opacity: 0.2;
        }

        .spotlight-label {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-dim);
        }

        /* ===== TABLET ===== */
        @media (max-width: 1024px) {
          .services-split-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .services-list-container {
            display: flex; 
            order: 2;
            padding-top: 0;
          }
          .services-spotlight-container {
            order: 1;
          }
          .spotlight-sticky-wrapper {
            position: sticky;
            top: 100px;
            z-index: 10;
            min-height: auto;
          }
          .spotlight-card {
            min-height: 300px;
          }
        }

        /* ===== MOBILE ===== */
        @media (max-width: 640px) {
          .spotlight-sticky-wrapper {
            position: relative;
            top: 0;
          }
          .spotlight-card {
            min-height: auto;
          }
          .service-list-item {
            gap: 1rem;
            padding: 1rem 0;
          }
          .spotlight-icon-wrapper {
            width: 60px;
            height: 60px;
            margin-bottom: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
