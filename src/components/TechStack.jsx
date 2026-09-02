import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const technologies = [
  { name: 'HTML', category: 'Frontend', level: 95, desc: 'Semantic markup', color: '#e34c26' },
  { name: 'CSS / Tailwind', category: 'Frontend', level: 90, desc: 'Advanced layouts', color: '#38bdf8' },
  { name: 'JavaScript', category: 'Frontend', level: 90, desc: 'ES6+ & DOM', color: '#f7df1e' },
  { name: 'React', category: 'Frontend', level: 90, desc: 'Component architecture', color: '#61dafb' },
  { name: 'Node.js', category: 'Backend', level: 85, desc: 'Runtime environment', color: '#68a063' },
  { name: 'Express.js', category: 'Backend', level: 85, desc: 'REST APIs', color: '#ffffff' },
  { name: 'MongoDB', category: 'Database', level: 80, desc: 'NoSQL design', color: '#4db33d' },
  { name: 'C++', category: 'Language', level: 75, desc: 'Algorithms', color: '#00599c' },
  { name: 'Git & GitHub', category: 'Tools', level: 85, desc: 'Version control', color: '#f05032' },
];

const categories = ['All', ...Array.from(new Set(technologies.map(t => t.category)))];

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState('All');
  const [hoveredTech, setHoveredTech] = useState(null);

  const filteredTech = activeTab === 'All' 
    ? technologies 
    : technologies.filter(t => t.category === activeTab);

  return (
    <section id="tech" className="section tech-section" ref={ref}>
      <div className="tech-bg-glow" />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        <motion.div
          className="tech-header-modern"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="header-top">
            <span className="section-label">Capabilities</span>
            <h2 className="section-title">MY <span className="gradient-text">TECH STACK</span></h2>
          </div>
          
          <div className="tech-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`tech-tab ${activeTab === cat ? 'active' : ''}`}
              >
                {activeTab === cat && (
                  <motion.div 
                    layoutId="activeTabGlow" 
                    className="tab-active-bg"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="tab-text">{cat}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="tech-grid-modern">
          <AnimatePresence mode="popLayout">
            {filteredTech.map((tech, i) => (
              <motion.div
                layout
                key={tech.name}
                className="tech-card-modern"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onMouseEnter={() => setHoveredTech(tech.name)}
                onMouseLeave={() => setHoveredTech(null)}
                style={{
                  '--tech-color': tech.color,
                  boxShadow: hoveredTech === tech.name ? `0 10px 30px -10px ${tech.color}40` : 'none',
                  borderColor: hoveredTech === tech.name ? `${tech.color}50` : 'rgba(255,255,255,0.05)'
                }}
              >
                <div className="tech-card-bg" style={{ background: `radial-gradient(circle at 50% 0%, ${tech.color}15 0%, transparent 70%)` }} />
                
                <div className="tech-card-header">
                  <div className="tech-logo-placeholder" style={{ backgroundColor: `${tech.color}20`, color: tech.color }}>
                     {/* Dynamic generic icon fallback based on first letter */}
                     <span className="tech-letter">{tech.name.charAt(0)}</span>
                  </div>
                  <div className="tech-card-title-group">
                    <h3 className="tech-card-name">{tech.name}</h3>
                    <span className="tech-card-cat">{tech.category}</span>
                  </div>
                </div>

                <p className="tech-card-desc">{tech.desc}</p>

                <div className="tech-card-progress">
                  <div className="progress-header">
                    <span>Proficiency</span>
                    <span className="progress-value" style={{ color: tech.color }}>{tech.level}%</span>
                  </div>
                  <div className="progress-track">
                    <motion.div 
                      className="progress-fill"
                      style={{ backgroundColor: tech.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${tech.level}%` }}
                      transition={{ duration: 1, delay: 0.2 + (i * 0.05) }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      <style>{`
        .tech-section {
          position: relative;
          padding-top: 5rem;
          padding-bottom: 5rem;
          min-height: 80vh;
        }

        .tech-bg-glow {
          position: absolute;
          top: 0;
          left: 50%;
          width: 1000px;
          height: 1000px;
          background: radial-gradient(ellipse at 50% 50%, rgba(94, 234, 212, 0.08) 0%, transparent 60%);
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 0;
        }

        .tech-header-modern {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2.5rem;
          margin-bottom: 3.5rem;
        }

        .header-top {
          text-align: center;
        }

        .tech-tabs {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(17, 32, 29, 0.85);
          padding: 0.5rem;
          border-radius: 100px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          flex-wrap: wrap;
          justify-content: center;
          position: sticky;
          top: 100px;
          z-index: 50;
        }

        .tech-tab {
          position: relative;
          padding: 0.6rem 1.25rem;
          border-radius: 100px;
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: color 0.3s ease;
          outline: none;
        }

        .tech-tab:hover {
          color: var(--text-primary);
        }

        .tech-tab.active {
          color: var(--bg-primary);
        }

        .tab-text {
          position: relative;
          z-index: 2;
        }

        .tab-active-bg {
          position: absolute;
          inset: 0;
          background: var(--accent);
          border-radius: 100px;
          z-index: 1;
        }

        .tech-grid-modern {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          width: 100%;
        }

        .tech-card-modern {
          position: relative;
          background: rgba(10, 20, 18, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 1.5rem;
          overflow: hidden;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: border-color 0.4s ease, transform 0.4s ease;
          display: flex;
          flex-direction: column;
        }
        
        .tech-card-modern:hover {
          transform: translateY(-5px);
        }

        .tech-card-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          opacity: 0.5;
          pointer-events: none;
          transition: opacity 0.4s ease;
        }

        .tech-card-modern:hover .tech-card-bg {
          opacity: 1;
        }

        .tech-card-header {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .tech-logo-placeholder {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 800;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .tech-card-title-group {
          display: flex;
          flex-direction: column;
        }

        .tech-card-name {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .tech-card-cat {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-dim);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .tech-card-desc {
          position: relative;
          z-index: 1;
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 1.5rem;
          flex: 1;
        }

        .tech-card-progress {
          position: relative;
          z-index: 1;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-dim);
          margin-bottom: 0.5rem;
        }

        .progress-value {
          font-weight: 700;
        }

        .progress-track {
          height: 4px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 4px;
        }

        @media (max-width: 768px) {
          .tech-grid-modern {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
        }

        @media (max-width: 640px) {
          .tech-grid-modern {
            grid-template-columns: 1fr;
          }
          .tech-card-modern {
            padding: 1.25rem;
          }
        }

        @media (max-width: 480px) {
          .tech-tabs {
            border-radius: 20px;
            padding: 0.5rem;
            width: 100%;
            justify-content: center;
          }
          .tech-tab {
            flex: 1 1 auto;
            text-align: center;
            font-size: 0.75rem;
            padding: 0.5rem 0.75rem;
          }
          .tab-active-bg {
            border-radius: 100px;
          }
        }
      `}</style>
    </section>
  );
}
