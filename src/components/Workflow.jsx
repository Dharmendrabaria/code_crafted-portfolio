import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Map, Palette, Code, TestTube, Rocket } from 'lucide-react';

const steps = [
  { num: '01', title: 'DISCOVER', desc: 'Understand the idea, goals and requirements.', icon: <Search size={22} /> },
  { num: '02', title: 'PLAN', desc: 'Define features, structure and technology.', icon: <Map size={22} /> },
  { num: '03', title: 'DESIGN', desc: 'Create the visual direction and user experience.', icon: <Palette size={22} /> },
  { num: '04', title: 'DEVELOP', desc: 'Build the product with clean and scalable code.', icon: <Code size={22} /> },
  { num: '05', title: 'TEST', desc: 'Test functionality, responsiveness and performance.', icon: <TestTube size={22} /> },
  { num: '06', title: 'DEPLOY', desc: 'Launch the product and make it production-ready.', icon: <Rocket size={22} /> },
];

export default function Workflow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="workflow" className="section workflow-section" ref={ref}>
      <div className="container">
        <motion.div
          className="workflow-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">Process</span>
          <h2 className="section-title">HOW <span className="gradient-text">I WORK</span></h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            A clear process from idea to launch.
          </p>
        </motion.div>

        <div className="workflow-grid">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="workflow-step"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            >
              <div className="workflow-step-top">
                <div className="workflow-icon">{step.icon}</div>
                {i < steps.length - 1 && <div className="workflow-connector" />}
              </div>
              <span className="workflow-num">{step.num}</span>
              <h3 className="workflow-title">{step.title}</h3>
              <p className="workflow-desc">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .workflow-section {
          border-top: 1px solid var(--border);
        }
        .workflow-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .workflow-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 1rem;
        }
        .workflow-step {
          text-align: center;
          position: relative;
        }
        .workflow-step-top {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        .workflow-icon {
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          background: rgba(94, 234, 212, 0.06);
          border: 1px solid var(--border);
          color: var(--accent);
          position: relative;
          z-index: 1;
          transition: all 0.4s var(--ease-out);
        }
        .workflow-step:hover .workflow-icon {
          background: rgba(94, 234, 212, 0.12);
          border-color: var(--border-active);
          box-shadow: 0 0 30px rgba(94, 234, 212, 0.1);
          transform: translateY(-4px);
        }
        .workflow-connector {
          position: absolute;
          top: 50%;
          left: calc(50% + 35px);
          right: calc(-50% + 35px);
          height: 1px;
          background: linear-gradient(90deg, var(--border-hover), var(--border));
        }
        .workflow-num {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--accent);
          letter-spacing: 0.2em;
          display: block;
          margin-bottom: 0.5rem;
        }
        .workflow-title {
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          margin-bottom: 0.5rem;
          transition: color 0.3s;
        }
        .workflow-step:hover .workflow-title {
          color: var(--accent);
        }
        .workflow-desc {
          font-size: 0.8rem;
          color: var(--text-dim);
          line-height: 1.5;
          max-width: 160px;
          margin: 0 auto;
        }

        @media (max-width: 900px) {
          .workflow-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
          }
          .workflow-connector {
            display: none;
          }
        }
        @media (max-width: 480px) {
          .workflow-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
