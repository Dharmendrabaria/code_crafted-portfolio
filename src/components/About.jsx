import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Layers, Cpu } from 'lucide-react';

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const highlights = [
    { icon: <Code size={20} />, label: 'Full Stack', desc: 'End-to-end development' },
    { icon: <Layers size={20} />, label: 'MERN Stack', desc: 'React · Node · Express · MongoDB' },
    { icon: <Cpu size={20} />, label: 'Clean Architecture', desc: 'Scalable & maintainable code' },
  ];

  const counters = [
    { value: '20+', label: 'Projects Completed' },
    { value: '10+', label: 'Technologies' },
    { value: '100%', label: 'Commitment' },
  ];

  return (
    <section id="about" className="section about-section" ref={ref}>
      <div className="container">
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label">About Me</span>
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-left"
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="about-heading">
              Hi, I'm{' '}
              <span className="gradient-text">Dharmendra Baria</span>
              <span className="about-heading-sub">— turning ideas into digital products.</span>
            </h2>

            <div className="about-counters">
              {counters.map((c, i) => (
                <motion.div
                  key={i}
                  className="about-counter"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                >
                  <span className="about-counter-value">{c.value}</span>
                  <span className="about-counter-label">{c.label}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="about-availability"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="availability-dot" />
              <span>Available for Freelance Projects</span>
            </motion.div>
          </motion.div>

          <motion.div
            className="about-right"
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="about-text">
              I'm a Full Stack Developer focused on building modern, high-performance
              web applications using the MERN stack. I believe great software is the
              intersection of clean engineering and thoughtful design.
            </p>
            <p className="about-text">
              From responsive frontends in React to scalable REST APIs with Node.js
              and Express, I build complete digital products — not just websites.
              Every project is crafted with attention to performance, maintainability,
              and user experience.
            </p>

            <div className="about-highlights">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  className="about-highlight"
                  initial={{ opacity: 0, y: 25 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
                  whileHover={{ x: 6, borderColor: 'rgba(94, 234, 212, 0.25)' }}
                >
                  <div className="about-highlight-icon">{item.icon}</div>
                  <div>
                    <span className="about-highlight-label">{item.label}</span>
                    <span className="about-highlight-desc">{item.desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .about-section {
          border-top: 1px solid var(--border);
        }
        .about-header {
          margin-bottom: 3rem;
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }
        .about-heading {
          font-size: clamp(2rem, 4vw, 3rem);
          line-height: 1.2;
          margin-bottom: 3rem;
        }
        .about-heading-sub {
          display: block;
          color: var(--text-muted);
          font-size: 0.55em;
          font-weight: 400;
          margin-top: 0.75rem;
          letter-spacing: 0;
        }
        .about-counters {
          display: flex;
          gap: 2.5rem;
          margin-bottom: 3rem;
        }
        .about-counter {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .about-counter-value {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--accent);
          line-height: 1;
        }
        .about-counter-label {
          font-size: 0.8rem;
          color: var(--text-dim);
          letter-spacing: 0.02em;
        }
        .about-availability {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.25rem;
          border-radius: 100px;
          border: 1px solid var(--border);
          background: rgba(94, 234, 212, 0.03);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--accent);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .availability-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 10px var(--accent-glow-strong);
          animation: pulse 2s ease-in-out infinite;
        }
        .about-text {
          font-size: 1.05rem;
          color: var(--text-muted);
          line-height: 1.8;
          margin-bottom: 1.25rem;
        }
        .about-highlights {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 2rem;
        }
        .about-highlight {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          border: 1px solid var(--border);
          border-radius: 12px;
          transition: all 0.3s var(--ease-out);
          cursor: default;
        }
        .about-highlight:hover {
          background: var(--bg-card);
        }
        .about-highlight-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: rgba(94, 234, 212, 0.08);
          color: var(--accent);
          flex-shrink: 0;
          transition: all 0.3s;
        }
        .about-highlight:hover .about-highlight-icon {
          background: rgba(94, 234, 212, 0.15);
          box-shadow: 0 0 20px rgba(94, 234, 212, 0.1);
        }
        .about-highlight-label {
          display: block;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 0.95rem;
        }
        .about-highlight-desc {
          display: block;
          font-size: 0.8rem;
          color: var(--text-dim);
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .about-counters {
            gap: 1.5rem;
          }
          .about-counter-value {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
