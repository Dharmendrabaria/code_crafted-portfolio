import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileCode2, Paintbrush, Zap, Lightbulb } from 'lucide-react';

const reasons = [
  {
    id: 'architecture',
    icon: <FileCode2 size={24} />,
    title: 'CLEAN ARCHITECTURE',
    desc: 'Maintainable and scalable code built with industry best practices. I write code that other developers love to read, ensuring your project can grow without technical debt.',
    className: 'bento-wide',
  },
  {
    id: 'design',
    icon: <Paintbrush size={24} />,
    title: 'AWWWARDS DESIGN',
    desc: 'Interfaces that feel current, purposeful, and premium. No generic templates—only bespoke, high-end visual language.',
    className: 'bento-square',
  },
  {
    id: 'performance',
    icon: <Zap size={24} />,
    title: '60FPS PERFORMANCE',
    desc: 'Lightning-fast, optimized experiences. I prioritize core web vitals, smooth animations, and immediate load times.',
    className: 'bento-square',
  },
  {
    id: 'solving',
    icon: <Lightbulb size={24} />,
    title: 'COMPLEX PROBLEM SOLVING',
    desc: 'Turning complex business requirements into simple, elegant engineering solutions. I don\'t just write code; I solve product challenges.',
    className: 'bento-wide',
  },
];

// Custom Animated Backgrounds for each card
const CardBackgroundVisualizer = ({ id }) => {
  if (id === 'architecture') {
    return (
      <div className="visualizer arch-viz">
        {[...Array(6)].map((_, i) => (
          <motion.div 
            key={i} 
            className="code-line"
            animate={{ width: ['20%', '80%', '40%', '90%', '20%'] }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: 'linear' }}
            style={{ top: `${15 + i * 15}%`, opacity: 0.1 - (i * 0.01) }}
          />
        ))}
      </div>
    );
  }
  if (id === 'design') {
    return (
      <div className="visualizer design-viz">
        <div className="gradient-orb orb-1" />
        <div className="gradient-orb orb-2" />
      </div>
    );
  }
  if (id === 'performance') {
    return (
      <div className="visualizer perf-viz">
        <svg viewBox="0 0 100 40" className="sine-wave">
          <motion.path
            d="M 0 20 Q 12.5 0 25 20 T 50 20 T 75 20 T 100 20"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.5"
            opacity="0.2"
            animate={{ d: [
              "M 0 20 Q 12.5 0 25 20 T 50 20 T 75 20 T 100 20",
              "M 0 20 Q 12.5 40 25 20 T 50 20 T 75 20 T 100 20",
              "M 0 20 Q 12.5 0 25 20 T 50 20 T 75 20 T 100 20"
            ] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path
            d="M 0 20 Q 12.5 40 25 20 T 50 20 T 75 20 T 100 20"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1"
            opacity="0.4"
            animate={{ d: [
              "M 0 20 Q 12.5 40 25 20 T 50 20 T 75 20 T 100 20",
              "M 0 20 Q 12.5 0 25 20 T 50 20 T 75 20 T 100 20",
              "M 0 20 Q 12.5 40 25 20 T 50 20 T 75 20 T 100 20"
            ] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </div>
    );
  }
  if (id === 'solving') {
    return (
      <div className="visualizer solving-viz">
        <div className="node n1" />
        <div className="node n2" />
        <div className="node n3" />
        <div className="node n4" />
        <svg className="node-connections" width="100%" height="100%">
           <line x1="20%" y1="20%" x2="80%" y2="40%" stroke="rgba(94,234,212,0.1)" strokeWidth="1" />
           <line x1="80%" y1="40%" x2="40%" y2="80%" stroke="rgba(94,234,212,0.1)" strokeWidth="1" />
           <line x1="40%" y1="80%" x2="20%" y2="20%" stroke="rgba(94,234,212,0.1)" strokeWidth="1" />
        </svg>
      </div>
    );
  }
  return null;
};

export default function WhyCodeCrafted() {
  const ref = useRef(null);
  const gridRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  // Spotlight Mouse Tracking Logic
  const handleMouseMove = (e) => {
    if (!gridRef.current) return;
    const cards = gridRef.current.getElementsByClassName('why-bento-card');
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    }
  };

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

        <div 
          className="why-bento-grid" 
          ref={gridRef} 
          onMouseMove={handleMouseMove}
        >
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              className={`why-bento-card ${r.className}`}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.1, type: 'spring', stiffness: 50 }}
            >
              {/* Animated Interactive Backgrounds */}
              <CardBackgroundVisualizer id={r.id} />
              
              {/* Massive background icon watermark */}
              <div className="bg-icon-watermark">{r.icon}</div>

              {/* The Spotlight Overlay */}
              <div className="spotlight-overlay" />
              <div className="spotlight-border-overlay" />

              <div className="why-card-content">
                <div className="content-top">
                  <div className="why-icon-wrapper">
                    {r.icon}
                  </div>
                  <div className="badge-exclusive">EXCLUSIVE</div>
                </div>
                
                <div className="content-bottom">
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
          background: var(--bg-primary);
          position: relative;
          overflow: hidden;
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
          grid-auto-rows: 300px;
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }

        .why-bento-card {
          position: relative;
          background: rgba(12, 22, 20, 0.4);
          border-radius: 24px;
          overflow: hidden;
          padding: 3rem;
          display: flex;
          flex-direction: column;
          /* Default mouse position off-screen if unhovered */
          --mouse-x: -1000px;
          --mouse-y: -1000px;
        }

        .bento-wide { grid-column: span 2; }
        .bento-square { grid-column: span 1; }

        /* The Flashlight Border Effect (Vercel Style) */
        .why-bento-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: rgba(255, 255, 255, 0.05); /* Default static border */
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        
        .spotlight-border-overlay {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(94, 234, 212, 0.8), transparent 40%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
          z-index: 2;
        }

        /* The Inner Glow Spotlight */
        .spotlight-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(94, 234, 212, 0.06), transparent 40%);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
          z-index: 1;
        }

        /* Show spotlights when grid is hovered */
        .why-bento-grid:hover .spotlight-border-overlay,
        .why-bento-grid:hover .spotlight-overlay {
          opacity: 1;
        }

        .why-bento-card:hover {
          background: rgba(17, 32, 29, 0.6);
        }

        /* Animated Visualizers */
        .visualizer {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          opacity: 0.5;
          transition: opacity 0.5s ease;
        }
        
        .why-bento-card:hover .visualizer {
          opacity: 1;
        }

        /* Code Architecture Visualizer */
        .arch-viz .code-line {
          position: absolute;
          height: 2px;
          background: var(--accent);
          left: 10%;
          border-radius: 2px;
        }

        /* Design Visualizer */
        .design-viz .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.4;
          animation: orb-float 8s infinite alternate;
        }
        .orb-1 { width: 150px; height: 150px; background: rgba(94, 234, 212, 0.4); top: -20px; left: -20px; }
        .orb-2 { width: 100px; height: 100px; background: rgba(56, 189, 248, 0.3); bottom: 20px; right: 20px; animation-delay: -4s; }
        
        @keyframes orb-float {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(30px, 30px) scale(1.2); }
        }

        /* Performance Visualizer */
        .perf-viz {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .perf-viz svg {
          width: 150%;
          height: 100%;
          opacity: 0.5;
        }

        /* Solving Visualizer */
        .solving-viz .node {
          position: absolute;
          width: 4px; height: 4px;
          background: var(--accent);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--accent);
        }
        .n1 { top: 20%; left: 20%; }
        .n2 { top: 40%; left: 80%; }
        .n3 { top: 80%; left: 40%; }
        .n4 { top: 20%; left: 80%; } /* Unconnected */
        
        .node-connections {
          position: absolute;
          inset: 0;
        }

        /* Background Watermark Icon */
        .bg-icon-watermark {
          position: absolute;
          top: -30px;
          right: -30px;
          color: rgba(255,255,255,0.015);
          transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
          z-index: 0;
        }
        .bg-icon-watermark svg { width: 300px; height: 300px; }
        .why-bento-card:hover .bg-icon-watermark {
          color: rgba(94, 234, 212, 0.04);
          transform: scale(1.05) rotate(-5deg);
        }

        /* Content */
        .why-card-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
          pointer-events: none; /* Let mouse interact with the grid */
        }

        .content-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .badge-exclusive {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          color: var(--accent);
          border: 1px solid rgba(94,234,212,0.2);
          padding: 0.3rem 0.8rem;
          border-radius: 100px;
          background: rgba(94,234,212,0.05);
          opacity: 0;
          transform: translateY(-10px);
          transition: all 0.4s ease;
        }
        .why-bento-card:hover .badge-exclusive {
          opacity: 1;
          transform: translateY(0);
        }

        .why-icon-wrapper {
          width: 50px;
          height: 50px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.03);
          color: rgba(255, 255, 255, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.5s ease;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .why-bento-card:hover .why-icon-wrapper {
          background: var(--accent);
          color: #000;
          box-shadow: 0 0 20px rgba(94, 234, 212, 0.4);
          border-color: var(--accent);
          transform: scale(1.1);
        }

        .why-title {
          font-family: var(--font-display);
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          letter-spacing: -0.01em;
          transition: color 0.4s ease;
        }

        .why-bento-card:hover .why-title {
          color: #fff;
        }

        .why-desc {
          font-size: 1rem;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 95%;
          transition: color 0.4s ease;
        }

        .why-bento-card:hover .why-desc {
          color: #d1d5db;
        }

        @media (max-width: 1024px) {
          .why-bento-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: auto;
          }
          .bento-wide { grid-column: span 2; }
          .bento-square { grid-column: span 1; }
          .why-bento-card { padding: 2.5rem; min-height: 280px; }
        }
        
        @media (max-width: 768px) {
          .why-bento-grid { grid-template-columns: 1fr; }
          .bento-wide, .bento-square { grid-column: span 1; }
          .why-bento-card { min-height: 260px; padding: 2rem; }
        }
      `}</style>
    </section>
  );
}
