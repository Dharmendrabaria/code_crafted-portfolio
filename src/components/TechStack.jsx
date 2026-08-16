import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const technologies = [
  { name: 'HTML', category: 'Frontend', level: 95, desc: 'Semantic markup & accessibility', color: '#e34c26' },
  { name: 'CSS', category: 'Frontend', level: 90, desc: 'Advanced layouts, animations & responsive design', color: '#264de4' },
  { name: 'JavaScript', category: 'Language', level: 90, desc: 'ES6+, async patterns & DOM manipulation', color: '#f7df1e' },
  { name: 'React', category: 'Frontend', level: 90, desc: 'Component architecture, hooks & state management', color: '#61dafb' },
  { name: 'Node.js', category: 'Backend', level: 85, desc: 'Server-side JavaScript & runtime environment', color: '#68a063' },
  { name: 'Express.js', category: 'Backend', level: 85, desc: 'REST API development & middleware patterns', color: '#ffffff' },
  { name: 'MongoDB', category: 'Database', level: 80, desc: 'NoSQL database design & aggregation pipelines', color: '#4db33d' },
  { name: 'Tailwind CSS', category: 'Frontend', level: 85, desc: 'Utility-first CSS framework', color: '#38bdf8' },
  { name: 'C++', category: 'Language', level: 75, desc: 'Data structures, algorithms & problem solving', color: '#00599c' },
  { name: 'Git', category: 'Tools', level: 85, desc: 'Version control & collaborative workflows', color: '#f05032' },
  { name: 'GitHub', category: 'Tools', level: 85, desc: 'Repository management & CI/CD', color: '#ffffff' },
  { name: 'REST APIs', category: 'Backend', level: 85, desc: 'API architecture, auth & integration', color: '#5EEAD4' },
];

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Technologies I use to build modern, performant digital products.
          </p>
        </motion.div>

        <div className="tech-grid">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.name}
              className={`tech-card ${hoveredIndex === i ? 'tech-card--active' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-cursor="VIEW"
            >
              <div className="tech-card-top">
                <div className="tech-dot" style={{ background: tech.color, boxShadow: `0 0 12px ${tech.color}40` }} />
                <span className="tech-category">{tech.category}</span>
              </div>
              <h3 className="tech-name">{tech.name}</h3>

              <div className="tech-details">
                <p className="tech-desc">{tech.desc}</p>
                <div className="tech-level">
                  <div className="tech-level-bar">
                    <motion.div
                      className="tech-level-fill"
                      initial={{ scaleX: 0 }}
                      animate={inView ? { scaleX: tech.level / 100 } : {}}
                      transition={{ duration: 1, delay: 0.3 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <span className="tech-level-num">{tech.level}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .tech-section {
          border-top: 1px solid var(--border);
        }
        .tech-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .tech-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
        }
        .tech-card {
          background: var(--bg-primary);
          padding: 1.75rem;
          transition: all 0.4s var(--ease-out);
          position: relative;
          overflow: hidden;
        }
        .tech-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(94, 234, 212, 0.04) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .tech-card--active::before {
          opacity: 1;
        }
        .tech-card--active {
          background: var(--bg-secondary);
        }
        .tech-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .tech-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .tech-category {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-dim);
        }
        .tech-name {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          transition: color 0.3s;
        }
        .tech-card--active .tech-name {
          color: var(--accent);
        }
        .tech-details {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s var(--ease-out), opacity 0.3s;
          opacity: 0;
        }
        .tech-card--active .tech-details {
          max-height: 100px;
          opacity: 1;
        }
        .tech-desc {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-bottom: 0.75rem;
          line-height: 1.5;
        }
        .tech-level {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .tech-level-bar {
          flex: 1;
          height: 3px;
          background: rgba(94, 234, 212, 0.1);
          border-radius: 2px;
          overflow: hidden;
        }
        .tech-level-fill {
          width: 100%;
          height: 100%;
          background: var(--accent-gradient);
          transform-origin: left;
          border-radius: 2px;
        }
        .tech-level-num {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--accent);
          min-width: 30px;
          text-align: right;
        }

        @media (max-width: 1024px) {
          .tech-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 768px) {
          .tech-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .tech-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
