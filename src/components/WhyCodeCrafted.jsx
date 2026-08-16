import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileCode2, Paintbrush, Zap, Lightbulb } from 'lucide-react';

const reasons = [
  {
    icon: <FileCode2 size={28} />,
    title: 'CLEAN CODE',
    desc: 'Maintainable and scalable architecture built with industry best practices and clear documentation.',
  },
  {
    icon: <Paintbrush size={28} />,
    title: 'MODERN DESIGN',
    desc: 'Interfaces that feel current, purposeful and premium — not templates or generic layouts.',
  },
  {
    icon: <Zap size={28} />,
    title: 'PERFORMANCE',
    desc: 'Fast, optimized and responsive experiences that load quickly and run smoothly on every device.',
  },
  {
    icon: <Lightbulb size={28} />,
    title: 'PROBLEM SOLVING',
    desc: 'Turning complex requirements into simple, elegant solutions with thoughtful engineering.',
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
          <span className="section-label">Why Choose Me</span>
          <h2 className="section-title">WHY <span className="gradient-text">WORK WITH ME?</span></h2>
        </motion.div>

        <div className="why-grid">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              className="why-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            >
              <div className="why-icon">{r.icon}</div>
              <h3 className="why-title">{r.title}</h3>
              <p className="why-desc">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .why-section {
          border-top: 1px solid var(--border);
          background: var(--bg-secondary);
        }
        .why-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .why-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        .why-card {
          padding: 2.5rem 2rem;
          border: 1px solid var(--border);
          border-radius: 16px;
          background: var(--bg-primary);
          text-align: center;
          transition: all 0.4s var(--ease-out);
        }
        .why-card:hover {
          border-color: var(--border-hover);
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
        }
        .why-icon {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          border-radius: 16px;
          background: rgba(94, 234, 212, 0.06);
          color: var(--accent);
          transition: all 0.4s;
        }
        .why-card:hover .why-icon {
          background: rgba(94, 234, 212, 0.12);
          box-shadow: 0 0 30px rgba(94, 234, 212, 0.15);
        }
        .why-title {
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          margin-bottom: 0.75rem;
          transition: color 0.3s;
        }
        .why-card:hover .why-title {
          color: var(--accent);
        }
        .why-desc {
          font-size: 0.875rem;
          color: var(--text-muted);
          line-height: 1.7;
        }

        @media (max-width: 900px) {
          .why-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .why-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
