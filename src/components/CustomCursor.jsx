import { useState, useEffect, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isTouch, setIsTouch] = useState(false);
  const [visible, setVisible] = useState(false);

  // Motion values for precise tracking without React state lag
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the trailing ring
  const ringX = useSpring(mouseX, { damping: 30, stiffness: 400, mass: 0.5 });
  const ringY = useSpring(mouseY, { damping: 30, stiffness: 400, mass: 0.5 });

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const onMouseMove = useCallback((e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    if (!visible) setVisible(true);
  }, [mouseX, mouseY, visible]);

  useEffect(() => {
    if (isTouch) return;

    window.addEventListener('mousemove', onMouseMove);
    
    const handleOver = (e) => {
      // Check if hovering over a specific data-cursor element or any interactive element
      const dataTarget = e.target.closest('[data-cursor]');
      const linkTarget = e.target.closest('a, button, input, textarea');
      
      if (dataTarget) {
        setHovered(true);
        setHoverText(dataTarget.getAttribute('data-cursor') || 'VIEW');
      } else if (linkTarget) {
        setHovered(true);
        setHoverText('');
      }
    };

    const handleOut = (e) => {
      const dataTarget = e.target.closest('[data-cursor]');
      const linkTarget = e.target.closest('a, button, input, textarea');
      
      if (dataTarget || linkTarget) {
        setHovered(false);
        setHoverText('');
      }
    };

    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, [isTouch, onMouseMove]);

  if (isTouch || !visible) return null;

  return (
    <>
      {/* Exact Tracking Dot */}
      <motion.div
        className="cursor-dot"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: hovered ? 0.3 : 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />
      
      {/* Delayed Trailing Ring */}
      <motion.div
        className="cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovered ? (hoverText ? 80 : 45) : 32,
          height: hovered ? (hoverText ? 80 : 45) : 32,
          backgroundColor: hovered && !hoverText ? 'rgba(94, 234, 212, 0.15)' : 'rgba(94, 234, 212, 0.0)',
          borderColor: hovered ? 'rgba(94, 234, 212, 0.5)' : 'rgba(94, 234, 212, 0.3)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: hoverText ? 1 : 0 }}
        >
          {hoverText}
        </motion.span>
      </motion.div>

      <style>{`
        .cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 6px;
          height: 6px;
          background: #5EEAD4;
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          mix-blend-mode: difference;
        }
        .cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          border: 1px solid rgba(94, 234, 212, 0.3);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99998;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(2px);
          mix-blend-mode: difference;
        }
        .cursor-ring span {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: #5EEAD4;
          text-transform: uppercase;
        }
        @media (max-width: 1024px) {
          .cursor-dot, .cursor-ring {
            display: none !important;
          }
        }
        body { cursor: none; }
        @media (max-width: 1024px) {
          body { cursor: auto; }
        }
        /* Ensure normal cursor on interactive elements as fallback, but hide when custom cursor works */
        a, button, input, textarea {
          cursor: none;
        }
        @media (max-width: 1024px) {
          a, button, input, textarea {
            cursor: pointer;
          }
        }
      `}</style>
    </>
  );
}
