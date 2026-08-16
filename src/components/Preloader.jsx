import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 400);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="preloader"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="preloader-content">
            <motion.div
              className="preloader-brand"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="preloader-logo">CODE CRAFTED</span>
            </motion.div>

            <div className="preloader-bar-container">
              <motion.div
                className="preloader-bar"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: Math.min(progress, 100) / 100 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>

            <motion.span
              className="preloader-percent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.span>
          </div>

          <style>{`
            .preloader {
              position: fixed;
              inset: 0;
              z-index: 99999;
              background: #081110;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .preloader-content {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 2rem;
            }
            .preloader-logo {
              font-family: 'Space Grotesk', sans-serif;
              font-size: 1.5rem;
              font-weight: 700;
              letter-spacing: 0.2em;
              color: #E6FFF9;
            }
            .preloader-bar-container {
              width: 200px;
              height: 2px;
              background: rgba(94, 234, 212, 0.1);
              border-radius: 2px;
              overflow: hidden;
            }
            .preloader-bar {
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, #5EEAD4, #14B8A6);
              transform-origin: left;
              border-radius: 2px;
            }
            .preloader-percent {
              font-family: 'Fira Code', monospace;
              font-size: 0.8rem;
              color: #5EEAD4;
              letter-spacing: 0.1em;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
