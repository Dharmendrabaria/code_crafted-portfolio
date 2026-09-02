import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const NUM_PARTICLES = 30; // Amount of smoke particles in the pool

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isTouch, setIsTouch] = useState(false);
  const [visible, setVisible] = useState(false);

  // Core Cursor Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const ringX = useSpring(mouseX, { damping: 30, stiffness: 400, mass: 0.5 });
  const ringY = useSpring(mouseY, { damping: 30, stiffness: 400, mass: 0.5 });

  // Smoke Trail Tracking
  const particlesRef = useRef([]);
  const particleIndex = useRef(0);
  // We use requestAnimationFrame to throttle the smoke emission slightly to prevent clumpiness
  const lastEmitTime = useRef(0);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const onMouseMove = useCallback((e) => {
    // Update main cursor
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    if (!visible) setVisible(true);

    // SMOKE TRAIL LOGIC (High Performance raw DOM manipulation)
    const now = performance.now();
    // Only emit a particle every 15ms to spread them out evenly
    if (now - lastEmitTime.current > 15 && particlesRef.current.length > 0) {
      const particle = particlesRef.current[particleIndex.current];
      if (particle) {
        // Reset animation state
        particle.classList.remove('active');
        void particle.offsetWidth; // Force CSS reflow to restart animation

        // Randomize physics for this specific smoke particle
        const driftX = (Math.random() - 0.5) * 60; // Drifts left or right
        const driftY = (Math.random() * -60) - 20; // Always drifts UP
        const scale = Math.random() * 2 + 1.5; // Random size expansion
        const rotate = Math.random() * 360; // Random starting rotation

        // Apply physics to CSS variables
        particle.style.setProperty('--drift-x', `${driftX}px`);
        particle.style.setProperty('--drift-y', `${driftY}px`);
        particle.style.setProperty('--end-scale', scale);
        particle.style.setProperty('--start-rot', `${rotate}deg`);
        particle.style.setProperty('--end-rot', `${rotate + (driftX > 0 ? 90 : -90)}deg`);

        // Position at exact mouse coordinate
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;

        // Trigger animation
        particle.classList.add('active');

        // Cycle to next particle in the pool
        particleIndex.current = (particleIndex.current + 1) % NUM_PARTICLES;
        lastEmitTime.current = now;
      }
    }
  }, [mouseX, mouseY, visible]);

  useEffect(() => {
    if (isTouch) return;

    window.addEventListener('mousemove', onMouseMove);
    
    const handleOver = (e) => {
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
      {/* 1. THE SMOKE TRAIL CONTAINER */}
      <div className="smoke-container">
        {[...Array(NUM_PARTICLES)].map((_, i) => (
          <div 
            key={i} 
            className="smoke-particle" 
            ref={(el) => (particlesRef.current[i] = el)} 
          />
        ))}
      </div>

      {/* 2. THE EXACT TRACKING DOT */}
      <motion.div
        className="cursor-dot"
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hovered ? 0 : 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />
      
      {/* 3. THE GLOWING MAGNETIC RING */}
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovered ? (hoverText ? 80 : 50) : 36,
          height: hovered ? (hoverText ? 80 : 50) : 36,
          backgroundColor: hovered && !hoverText ? 'rgba(94, 234, 212, 0.2)' : 'rgba(94, 234, 212, 0.05)',
          borderColor: hovered ? 'rgba(94, 234, 212, 0.8)' : 'rgba(94, 234, 212, 0.4)',
          boxShadow: hovered ? '0 0 20px rgba(94, 234, 212, 0.4)' : '0 0 10px rgba(94, 234, 212, 0.1)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: hoverText ? 1 : 0 }}>
          {hoverText}
        </motion.span>
      </motion.div>

      <style>{`
        /* --- CORE CURSOR --- */
        .cursor-dot {
          position: fixed; top: 0; left: 0;
          width: 8px; height: 8px;
          background: #fff;
          box-shadow: 0 0 10px var(--accent);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          mix-blend-mode: difference;
        }

        .cursor-ring {
          position: fixed; top: 0; left: 0;
          border: 1px solid rgba(94, 234, 212, 0.3);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99998;
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
          mix-blend-mode: difference;
        }

        .cursor-ring span {
          font-family: var(--font-display);
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: var(--accent);
          text-transform: uppercase;
        }

        /* --- LAG-FREE SMOKE EFFECT --- */
        .smoke-container {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 99997;
          overflow: hidden;
        }

        .smoke-particle {
          position: absolute;
          width: 24px;
          height: 24px;
          /* The 'Smoke' is a soft radial gradient that looks like glowing vapor */
          background: radial-gradient(circle, rgba(94, 234, 212, 0.4) 0%, rgba(94, 234, 212, 0) 70%);
          border-radius: 50%;
          opacity: 0;
          pointer-events: none;
          transform: translate(-50%, -50%) scale(0.5);
          /* Used for the gooey smoke blending effect */
          mix-blend-mode: screen; 
        }

        .smoke-particle.active {
          animation: smokeTrail 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes smokeTrail {
          0% { 
            opacity: 0.8; 
            transform: translate(-50%, -50%) scale(0.5) rotate(var(--start-rot)); 
            filter: blur(2px); 
          }
          100% { 
            opacity: 0; 
            transform: translate(calc(-50% + var(--drift-x)), calc(-50% + var(--drift-y))) scale(var(--end-scale)) rotate(var(--end-rot)); 
            filter: blur(12px); 
          }
        }

        /* --- MOBILE FALLBACKS --- */
        @media (max-width: 1024px) {
          .cursor-dot, .cursor-ring, .smoke-container { display: none !important; }
          body { cursor: auto; }
          a, button, input, textarea { cursor: pointer; }
        }
        
        @media (min-width: 1025px) {
          body { cursor: none; }
          a, button, input, textarea { cursor: none; }
        }
      `}</style>
    </>
  );
}
