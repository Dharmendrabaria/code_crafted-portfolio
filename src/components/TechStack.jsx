import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

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

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredTech, setHoveredTech] = useState(null);

  // Group technologies by category
  const categories = technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) acc[tech.category] = [];
    acc[tech.category].push(tech);
    return acc;
  }, {});

  return (
    <section id="tech" className="section tech-section" ref={ref}>
      <div className="container">
        <motion.div
          className="tech-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">Technologies</span>
          <h2 className="section-title">THE STACK BEHIND <span className="gradient-text">THE CRAFT</span></h2>
        </motion.div>

        <div className="tech-dashboard">
          {Object.entries(categories).map(([category, techs], catIndex) => (
            <motion.div 
              key={category}
              className="tech-category-group"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + catIndex * 0.1 }}
            >
              <h3 className="category-title">{category}</h3>
              <div className="tech-list">
                {techs.map((tech, i) => (
                  <motion.div
                    key={tech.name}
                    className="tech-row"
                    onMouseEnter={() => setHoveredTech(tech.name)}
                    onMouseLeave={() => setHoveredTech(null)}
                    style={{
                      borderColor: hoveredTech === tech.name ? `${tech.color}50` : 'var(--glass-border)',
                      backgroundColor: hoveredTech === tech.name ? `${tech.color}0A` : 'var(--glass-bg)',
                    }}
                  >
                    <div className="tech-row-left">
                      <div className="tech-dot" style={{ background: tech.color, boxShadow: hoveredTech === tech.name ? `0 0 10px ${tech.color}` : 'none' }} />
                      <div className="tech-info">
                        <span className="tech-name">{tech.name}</span>
                        <span className="tech-desc">{tech.desc}</span>
                      </div>
                    </div>
                    
                    <div className="tech-row-right">
                      <div className="tech-bar-bg">
                        <motion.div 
                          className="tech-bar-fill"
                          style={{ backgroundColor: tech.color }}
                          initial={{ scaleX: 0 }}
                          animate={inView ? { scaleX: tech.level / 100 } : {}}
                          transition={{ duration: 1, delay: 0.4 + (catIndex * 0.1) + (i * 0.05), ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                      <span className="tech-percent">{tech.level}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .tech-section {
          position: relative;
          z-index: 2;
        }
        .tech-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .tech-dashboard {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }
        .tech-category-group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .category-title {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-dim);
          padding-left: 0.5rem;
        }
        .tech-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .tech-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          border-radius: 12px;
          border: 1px solid var(--glass-border);
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: all 0.3s ease;
          cursor: default;
        }
        .tech-row-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .tech-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          transition: box-shadow 0.3s;
        }
        .tech-info {
          display: flex;
          flex-direction: column;
        }
        .tech-name {
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--text-primary);
        }
        .tech-desc {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .tech-row-right {
          display: flex;
          align-items: center;
          gap: 1rem;
          width: 120px;
        }
        .tech-bar-bg {
          flex: 1;
          height: 3px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 2px;
          overflow: hidden;
        }
        .tech-bar-fill {
          width: 100%;
          height: 100%;
          transform-origin: left;
          border-radius: 2px;
        }
        .tech-percent {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-muted);
          min-width: 30px;
          text-align: right;
        }

        @media (max-width: 768px) {
          .tech-dashboard {
            grid-template-columns: 1fr;
          }
          .tech-row-right {
            width: 90px;
          }
        }
      `}</style>
    </section>
  );
}
