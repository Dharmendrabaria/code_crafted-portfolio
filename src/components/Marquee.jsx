import { useRef } from 'react';
import { motion } from 'framer-motion';

const marqueeItems = [
  'REACT.JS', 'NODE.JS', 'MONGODB', 'EXPRESS', 
  'JAVASCRIPT', 'FULL STACK', 'MERN DEVELOPER', 
  'CLEAN CODE', 'MODERN UI', 'SCALABLE ARCHITECTURE', 
  'CODE CRAFTED', 'DHARMENDRA BARIA'
];

export default function Marquee() {
  const containerRef = useRef(null);

  return (
    <section className="marquee-clean-wrapper" ref={containerRef}>
      <motion.div
        className="marquee-track"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 35, ease: 'linear', repeat: Infinity }}
      >
        {/* We duplicate the content to ensure a seamless infinite loop */}
        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
          <div key={i} className="marquee-item-group">
            <span className="marquee-separator">✦</span>
            <span className="marquee-interactive-text">{item}</span>
          </div>
        ))}
      </motion.div>

      <style>{`
        .marquee-clean-wrapper {
          position: relative;
          padding: 1.5rem 0; /* Original small height */
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          overflow: hidden;
          background: var(--bg-secondary);
        }

        .marquee-track {
          display: flex;
          white-space: nowrap;
          width: max-content;
        }

        .marquee-item-group {
          display: flex;
          align-items: center;
          gap: 2rem; /* Spacing between text and separator */
          padding-right: 2rem;
        }

        .marquee-separator {
          font-size: 1.2rem;
          color: rgba(94, 234, 212, 0.2); /* Dim cyan star */
          transition: color 0.3s ease;
        }

        /* --- THE INTERACTIVE TEXT --- */
        .marquee-interactive-text {
          font-family: var(--font-display);
          font-size: 0.95rem; /* Original sleek size */
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--text-dim);
          text-transform: uppercase;
          cursor: crosshair; /* Shows it is interactive */
          
          /* Hardware accelerated transitions for buttery smooth hover */
          transition: color 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      text-shadow 0.3s ease,
                      opacity 0.3s ease;
          display: inline-block;
        }

        /* SIBLING FADE EFFECT: When hovering ANYWHERE in the track, dim all text */
        .marquee-track:hover .marquee-interactive-text {
          opacity: 0.2;
          filter: blur(1px);
        }

        /* BUT keep the SPECIFIC text being hovered bright, scaled, and glowing! */
        .marquee-track .marquee-interactive-text:hover {
          opacity: 1;
          filter: blur(0px);
          color: var(--accent); /* Solid Cyan */
          transform: scale(1.25) translateY(-2px); /* Pops out at you */
          text-shadow: 0 5px 20px rgba(94, 234, 212, 0.6);
        }

        @media (max-width: 768px) {
          .marquee-item-group { gap: 1.5rem; padding-right: 1.5rem; }
          .marquee-interactive-text { font-size: 0.85rem; }
        }
      `}</style>
    </section>
  );
}
