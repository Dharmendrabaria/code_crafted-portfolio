import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let startTime = null;
    const duration = 2200; // Fast, punchy loading time

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const updateProgress = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const runtime = timestamp - startTime;
      const relativeProgress = Math.min(runtime / duration, 1);

      setProgress(easeOutQuart(relativeProgress) * 100);

      if (runtime < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        setIsReady(true);
        // Wait for the pillars to finish sliding before completely unmounting
        setTimeout(() => setLoading(false), 1200);
      }
    };

    requestAnimationFrame(updateProgress);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <div className="preloader-wrapper">

          {/* Staggered Vertical Pillars */}
          <div className="pillars-container">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="pillar"
                initial={{ y: 0 }}
                animate={isReady ? { y: i % 2 === 0 ? '-100vh' : '100vh' } : { y: 0 }}
                transition={{
                  duration: 0.9,
                  ease: [0.76, 0, 0.24, 1], // Cinematic ease out
                  delay: isReady ? i * 0.08 : 0 // The stagger effect
                }}
              >
                {/* Subtle internal gradient for the glass effect */}
                <div className="pillar-glass" />
              </motion.div>
            ))}
          </div>

          {/* Central Content */}
          <motion.div
            className="content-overlay"
            animate={isReady ? { opacity: 0, scale: 1.1, filter: 'blur(10px)' } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >

            <div className="huge-number-container">
              <div className="mask-wrapper">
                <motion.h1
                  className="huge-number"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                >
                  {Math.floor(progress)}<span className="percent-sign">%</span>
                </motion.h1>
              </div>
            </div>

            <div className="brand-and-bar">
              <h2 className="brand-text">CODE CRAFTED</h2>
              <div className="premium-progress-bar">
                <motion.div
                  className="progress-fill"
                  style={{ scaleX: progress / 100 }}
                />
              </div>
            </div>

          </motion.div>

          <style>{`
            .preloader-wrapper {
              position: fixed;
              inset: 0;
              z-index: 999999;
              display: flex;
              align-items: center;
              justify-content: center;
              pointer-events: none;
              background: transparent;
            }

            /* --- STAGGERED PILLARS --- */
            .pillars-container {
              position: absolute;
              inset: 0;
              display: flex;
              width: 100vw;
              height: 100vh;
              z-index: 1;
            }

            .pillar {
              flex: 1;
              height: 100%;
              background: #081110;
              border-right: 1px solid rgba(255, 255, 255, 0.03);
              position: relative;
              overflow: hidden;
            }
            .pillar:last-child {
              border-right: none;
            }

            /* Add a subtle shine to the pillars */
            .pillar-glass {
              position: absolute;
              inset: 0;
              background: linear-gradient(180deg, transparent, rgba(94, 234, 212, 0.02), transparent);
            }

            /* --- CONTENT OVERLAY --- */
            .content-overlay {
              position: relative;
              z-index: 10;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 2rem;
            }

            .huge-number-container {
              overflow: hidden; /* For the slide-up reveal mask */
            }

            .mask-wrapper {
              overflow: hidden;
            }

            .huge-number {
              font-family: var(--font-display);
              font-size: clamp(6rem, 15vw, 12rem);
              font-weight: 800;
              line-height: 0.9;
              color: #fff;
              margin: 0;
              letter-spacing: -0.05em;
              text-shadow: 0 20px 40px rgba(0,0,0,0.5);
            }
            .percent-sign {
              font-size: clamp(3rem, 7vw, 6rem);
              color: var(--accent);
              margin-left: 5px;
            }

            .brand-and-bar {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 1.5rem;
              width: 100%;
            }

            .brand-text {
              font-family: var(--font-mono);
              font-size: 1rem;
              letter-spacing: 0.4em;
              color: var(--text-muted);
              margin: 0;
              text-transform: uppercase;
            }

            .premium-progress-bar {
              width: 250px;
              height: 2px;
              background: rgba(255, 255, 255, 0.1);
              position: relative;
              overflow: hidden;
            }

            .progress-fill {
              position: absolute;
              top: 0; left: 0;
              width: 100%; height: 100%;
              background: var(--accent);
              transform-origin: left;
              box-shadow: 0 0 10px var(--accent);
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
}
