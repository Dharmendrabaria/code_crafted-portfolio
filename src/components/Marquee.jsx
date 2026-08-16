import { motion } from 'framer-motion';

const marqueeItems = [
  'REACT', '·', 'NODE.JS', '·', 'MONGODB', '·', 'EXPRESS', '·',
  'JAVASCRIPT', '·', 'FULL STACK', '·', 'MERN DEVELOPER', '·',
  'CLEAN CODE', '·', 'MODERN UI', '·', 'SCALABLE', '·',
  'CODE CRAFTED', '·', 'DHARMENDRA BARIA', '·',
];

export default function Marquee() {
  const content = [...marqueeItems, ...marqueeItems];

  return (
    <div className="marquee-section">
      <motion.div
        className="marquee-track"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
      >
        {content.map((item, i) => (
          <span
            key={i}
            className={`marquee-item ${item === '·' ? 'marquee-dot' : ''}`}
          >
            {item}
          </span>
        ))}
      </motion.div>

      <style>{`
        .marquee-section {
          padding: 1.5rem 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          overflow: hidden;
          background: var(--bg-secondary);
        }
        .marquee-track {
          display: flex;
          gap: 2.5rem;
          white-space: nowrap;
          width: max-content;
        }
        .marquee-item {
          font-family: var(--font-display);
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: var(--text-dim);
          flex-shrink: 0;
        }
        .marquee-dot {
          color: var(--accent);
          font-size: 1.2rem;
        }
      `}</style>
    </div>
  );
}
