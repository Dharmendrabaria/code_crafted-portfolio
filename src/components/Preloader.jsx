import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let startTime = null;
    const duration = 2000; // 2 seconds loading

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const updateProgress = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const runtime = timestamp - startTime;
      const relativeProgress = Math.min(runtime / duration, 1);
      
      setProgress(easeOutQuart(relativeProgress) * 100);

      if (runtime < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => setLoading(false), 300);
      }
    };

    requestAnimationFrame(updateProgress);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <div className="preloader">
          {/* Top Half of the door */}
          <motion.div
            className="preloader-door preloader-door-top"
            exit={{ y: '-100%' }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          />
          
          {/* Bottom Half of the door */}
          <motion.div
            className="preloader-door preloader-door-bottom"
            exit={{ y: '100%' }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Central Content */}
          <motion.div 
            className="preloader-content"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="preloader-brand"
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              animate={{ opacity: 1, letterSpacing: '0.3em' }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              CODE CRAFTED
            </motion.div>

            <div className="preloader-progress-wrapper">
              <motion.div
                className="preloader-progress-bar"
                style={{ scaleX: progress / 100 }}
              />
            </div>

            <motion.div 
              className="preloader-number"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {Math.floor(progress)}%
            </motion.div>
          </motion.div>

          <style>{`
            .preloader {
              position: fixed;
              inset: 0;
              z-index: 99999;
              display: flex;
              align-items: center;
              justify-content: center;
              pointer-events: none;
            }
            .preloader-door {
              position: absolute;
              left: 0;
              width: 100%;
              height: 50vh;
              background: #081110;
              z-index: 1;
            }
            .preloader-door-top {
              top: 0;
              border-bottom: 1px solid rgba(94, 234, 212, 0.05);
            }
            .preloader-door-bottom {
              bottom: 0;
            }
            .preloader-content {
              position: relative;
              z-index: 2;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 1.5rem;
            }
            .preloader-brand {
              font-family: 'Space Grotesk', sans-serif;
              font-size: 1.25rem;
              font-weight: 600;
              color: #E6FFF9;
              text-transform: uppercase;
            }
            .preloader-progress-wrapper {
              width: 200px;
              height: 1px;
              background: rgba(255, 255, 255, 0.1);
              position: relative;
              overflow: hidden;
            }
            .preloader-progress-bar {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: var(--accent);
              transform-origin: left;
              box-shadow: 0 0 10px var(--accent);
            }
            .preloader-number {
              font-family: 'Fira Code', monospace;
              font-size: 0.75rem;
              color: var(--accent);
              letter-spacing: 0.1em;
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
}
