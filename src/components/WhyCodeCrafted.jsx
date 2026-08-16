import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileCode2, Paintbrush, Zap, Lightbulb } from 'lucide-react';

const reasons = [
  {
    icon: <FileCode2 size={40} />,
    title: 'CLEAN ARCHITECTURE',
    desc: 'Maintainable and scalable code built with industry best practices. I write code that other developers love to read, ensuring your project can grow without technical debt.',
    className: 'bento-wide'
  },
  {
    icon: <Paintbrush size={40} />,
    title: 'AWWWARDS DESIGN',
    desc: 'Interfaces that feel current, purposeful, and premium. No generic templates—only bespoke, high-end visual language.',
    className: 'bento-square'
  },
  {
    icon: <Zap size={40} />,
    title: '60FPS PERFORMANCE',
    desc: 'Lightning-fast, optimized experiences. I prioritize core web vitals, smooth animations, and immediate load times.',
    className: 'bento-square'
  },
  {
    icon: <Lightbulb size={40} />,
    title: 'COMPLEX PROBLEM SOLVING',
    desc: 'Turning complex business requirements into simple, elegant engineering solutions. I don\'t just write code; I solve product challenges.',
    className: 'bento-wide'
  },
];

export default function WhyCodeCrafted() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section why-section" ref={ref}>
      <div className="container">
        <motion.div
          className="why-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">Why Me</span>
          <h2 className="section-title">THE <span className="gradient-text">DIFFERENCE</span></h2>
        </motion.div>

        <div className="why-bento-grid">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              className={`why-bento-card ${r.className}`}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.1, type: 'spring', stiffness: 50 }}
            >
              {/* Massive background icon for depth */}
              <div className="bg-icon-watermark">
                {r.icon}
              </div>

              <div className="why-card-content">
                <div className="why-icon-wrapper">
                  {r.icon}
                </div>
                <div>
                  <h3 className="why-title">{r.title}</h3>
                  <p className="why-desc">{r.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .why-section {
          padding-top: 8rem;
          padding-bottom: 8rem;
          border-top: 1px solid var(--border);
          background: var(--bg-secondary);
          position: relative;
        }
        
        .why-header {
          text-align: center;
          margin-bottom: 5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Bento Grid */
        .why-bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 320px;
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }

        .why-bento-card {
          position: relative;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          background: rgba(17, 32, 29, 0.4);
          overflow: hidden;
          padding: 3rem;
          display: flex;
          align-items: flex-end;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .bento-wide {
          grid-column: span 2;
        }
        .bento-square {
          grid-column: span 1;
        }

        .why-bento-card:hover {
          background: rgba(17, 32, 29, 0.8);
          border-color: rgba(94, 234, 212, 0.3);
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }

        /* Background Watermark Icon */
        .bg-icon-watermark {
          position: absolute;
          top: -20px;
          right: -20px;
          color: rgba(94, 234, 212, 0.03);
          transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }
        .bg-icon-watermark svg {
          width: 250px;
          height: 250px;
        }
        .why-bento-card:hover .bg-icon-watermark {
          color: rgba(94, 234, 212, 0.08);
          transform: scale(1.1) rotate(-10deg);
        }

        /* Content */
        .why-card-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          height: 100%;
          justify-content: space-between;
        }

        .why-icon-wrapper {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          background: rgba(94, 234, 212, 0.08);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s;
          border: 1px solid rgba(94, 234, 212, 0.1);
        }
        .why-bento-card:hover .why-icon-wrapper {
          background: var(--accent);
          color: var(--bg-primary);
          box-shadow: 0 0 25px rgba(94, 234, 212, 0.4);
          transform: scale(1.1);
        }

        .why-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          letter-spacing: 0.02em;
        }

        .why-desc {
          font-size: 1rem;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 90%;
        }

        @media (max-width: 1024px) {
          .why-bento-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: auto;
          }
          .bento-wide {
            grid-column: span 2;
          }
          .bento-square {
            grid-column: span 1;
          }
          .why-bento-card {
            padding: 2.5rem;
          }
        }
        
        @media (max-width: 768px) {
          .why-bento-grid {
            grid-template-columns: 1fr;
          }
          .bento-wide, .bento-square {
            grid-column: span 1;
          }
          .why-bento-card {
            min-height: 300px;
          }
        }
      `}</style>
    </section>
  );
}
