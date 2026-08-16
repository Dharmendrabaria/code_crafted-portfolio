import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, MapPin, Cpu, ArrowUpRight } from 'lucide-react';

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section about-section" ref={ref}>
      <div className="container">
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label">Behind The Code</span>
          <h2 className="section-title">ABOUT <span className="gradient-text">ME</span></h2>
        </motion.div>

        <div className="bento-grid">
          {/* Card 1: Main Intro (Spans 2 columns on desktop) */}
          <motion.div 
            className="bento-card bento-intro"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="bento-glow" style={{ background: 'radial-gradient(circle at 0% 0%, rgba(94, 234, 212, 0.15) 0%, transparent 60%)' }} />
            <h3 className="bento-title">Who I Am</h3>
            <p className="bento-text">
              I'm <span className="text-white font-semibold">Dharmendra Baria</span>, a Full Stack Developer dedicated to building modern, high-performance web applications. I believe that exceptional software lives at the intersection of clean engineering and thoughtful, user-centric design.
            </p>
            <p className="bento-text mt-4">
              From crafting fluid frontends with React to architecting robust REST APIs with Node.js and MongoDB, I build end-to-end digital ecosystems.
            </p>
          </motion.div>

          {/* Card 2: Stats / Projects */}
          <motion.div 
            className="bento-card bento-stat"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <div className="bento-glow" style={{ background: 'radial-gradient(circle at 100% 100%, rgba(20, 184, 166, 0.15) 0%, transparent 70%)' }} />
            <div className="stat-number">20+</div>
            <div className="stat-label">Projects<br/>Completed</div>
            <ArrowUpRight className="bento-top-icon" size={20} />
          </motion.div>

          {/* Card 3: Location / Availability */}
          <motion.div 
            className="bento-card bento-location"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -5 }}
          >
            <div className="location-icon-wrapper">
              <MapPin size={24} className="location-icon" />
              <div className="location-pulse" />
            </div>
            <div className="location-info">
              <span className="location-status">Available Worldwide</span>
              <span className="location-text">Remote / Freelance</span>
            </div>
          </motion.div>

          {/* Card 4: Philosophy / Clean Code (Spans 2 columns) */}
          <motion.div 
            className="bento-card bento-philosophy"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -5 }}
          >
            <div className="bento-glow" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(94, 234, 212, 0.08) 0%, transparent 60%)' }} />
            <div className="philosophy-header">
              <Cpu size={24} className="text-accent" />
              <h3 className="bento-title m-0">Engineering Philosophy</h3>
            </div>
            <div className="philosophy-grid">
              <div className="philosophy-item">
                <Code size={16} className="text-muted" />
                <span>Scalable Architecture</span>
              </div>
              <div className="philosophy-item">
                <Code size={16} className="text-muted" />
                <span>Pixel-Perfect UI</span>
              </div>
              <div className="philosophy-item">
                <Code size={16} className="text-muted" />
                <span>Performance Optimized</span>
              </div>
              <div className="philosophy-item">
                <Code size={16} className="text-muted" />
                <span>Secure REST APIs</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .about-section {
          position: relative;
          z-index: 2;
          padding-top: 6rem;
        }
        .about-header {
          text-align: center;
          margin-bottom: 4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        /* Bento Grid Layout */
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(2, minmax(220px, auto));
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        
        .bento-card {
          position: relative;
          background: rgba(17, 32, 29, 0.4);
          border: 1px solid var(--glass-border);
          border-radius: 24px;
          padding: 2.5rem;
          overflow: hidden;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .bento-card:hover {
          border-color: rgba(94, 234, 212, 0.3);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }
        
        .bento-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .bento-card:hover .bento-glow {
          opacity: 1;
        }
        
        .bento-intro {
          grid-column: span 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .bento-stat {
          grid-column: span 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: linear-gradient(135deg, rgba(17, 32, 29, 0.6) 0%, rgba(20, 184, 166, 0.1) 100%);
        }
        
        .bento-location {
          grid-column: span 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 1.5rem;
        }
        
        .bento-philosophy {
          grid-column: span 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 2rem;
        }

        /* Card Content Styles */
        .bento-title {
          position: relative;
          z-index: 1;
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1.25rem;
        }
        .bento-text {
          position: relative;
          z-index: 1;
          font-size: 1.05rem;
          color: var(--text-muted);
          line-height: 1.7;
        }
        .mt-4 { margin-top: 1rem; }
        .text-white { color: var(--text-primary); }
        .font-semibold { font-weight: 600; }
        .m-0 { margin: 0; }
        .text-accent { color: var(--accent); }
        .text-muted { color: var(--text-dim); }

        .stat-number {
          font-family: var(--font-display);
          font-size: 4.5rem;
          font-weight: 700;
          color: var(--accent);
          line-height: 1;
          position: relative;
          z-index: 1;
        }
        .stat-label {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          text-transform: uppercase;
          position: relative;
          z-index: 1;
        }
        .bento-top-icon {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          color: var(--accent);
          opacity: 0.5;
        }

        .location-icon-wrapper {
          position: relative;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(94, 234, 212, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
        }
        .location-pulse {
          position: absolute;
          inset: -10px;
          border: 1px solid var(--accent);
          border-radius: 50%;
          opacity: 0;
          animation: map-pulse 2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
        @keyframes map-pulse {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .location-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          position: relative;
          z-index: 1;
        }
        .location-status {
          font-weight: 600;
          color: var(--text-primary);
        }
        .location-text {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .philosophy-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          position: relative;
          z-index: 1;
        }
        .philosophy-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          position: relative;
          z-index: 1;
        }
        .philosophy-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text-primary);
          background: rgba(0,0,0,0.2);
          padding: 0.75rem 1rem;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.02);
        }

        @media (max-width: 992px) {
          .bento-grid {
            grid-template-columns: 1fr 1fr;
          }
          .bento-intro { grid-column: span 2; }
          .bento-stat { grid-column: span 1; }
          .bento-location { grid-column: span 1; }
          .bento-philosophy { grid-column: span 2; }
        }

        @media (max-width: 640px) {
          .bento-grid {
            grid-template-columns: 1fr;
          }
          .bento-intro, .bento-stat, .bento-location, .bento-philosophy {
            grid-column: span 1;
          }
          .philosophy-grid {
            grid-template-columns: 1fr;
          }
          .bento-card {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
