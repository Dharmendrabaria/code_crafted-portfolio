import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion';

export default function AmbientBackground() {
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, { damping: 50, stiffness: 200, mass: 0.5 });

  // Mouse interaction values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothMouseX = useSpring(mouseX, { damping: 40, stiffness: 100, mass: 0.8 });
  const smoothMouseY = useSpring(mouseY, { damping: 40, stiffness: 100, mass: 0.8 });

  // Transform scroll progress into vertical movement for the ambient light
  // Using 0 to 100vh for base movement
  const ambientY = useTransform(smoothScroll, [0, 1], ['0vh', '80vh']);
  
  // Transform scroll into scale and opacity changes to make it breathe
  const ambientScale = useTransform(smoothScroll, 
    [0, 0.2, 0.4, 0.6, 0.8, 1], 
    [1, 1.2, 0.9, 1.1, 0.95, 1.3]
  );
  
  const ambientOpacity = useTransform(smoothScroll,
    [0, 0.1, 0.5, 0.9, 1],
    [0.15, 0.08, 0.12, 0.1, 0.18]
  );

  useEffect(() => {
    // Only apply mouse effect if not on a touch device
    if (window.matchMedia('(hover: none)').matches) return;

    const handleMouseMove = (e) => {
      // Calculate normalized mouse position (-1 to 1)
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      
      // Move ambient light max 10vw/10vh based on mouse
      mouseX.set(nx * 10);
      mouseY.set(ny * 10);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="ambient-container">
      {/* Noise Texture Layer */}
      <div className="ambient-noise" />

      {/* Primary Ambient Light (Reacts to scroll and mouse) */}
      <motion.div
        className="ambient-glow ambient-glow-primary"
        style={{
          y: ambientY,
          x: useTransform(smoothMouseX, x => `${x}vw`),
          scale: ambientScale,
          opacity: ambientOpacity,
        }}
      />

      {/* Secondary Ambient Light (Opposite movement for parallax) */}
      <motion.div
        className="ambient-glow ambient-glow-secondary"
        style={{
          y: useTransform(smoothScroll, [0, 1], ['40vh', '-20vh']),
          x: useTransform(smoothMouseX, x => `${-x * 0.5}vw`),
          opacity: useTransform(smoothScroll, [0, 0.5, 1], [0.05, 0.1, 0.05]),
          scale: useTransform(ambientScale, s => s * 0.8),
        }}
      />
      
      {/* Fixed Core Glow (Hero & Footer Focus) */}
      <motion.div 
        className="ambient-glow ambient-glow-core"
        style={{
          opacity: useTransform(smoothScroll, [0, 0.2, 0.8, 1], [0.1, 0, 0, 0.15]),
          scale: useTransform(smoothScroll, [0, 1], [1, 1.5]),
        }}
      />

      <style>{`
        .ambient-container {
          position: fixed;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          overflow: hidden;
          background-color: var(--bg-primary);
        }

        .ambient-noise {
          position: absolute;
          inset: 0;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          z-index: 1;
        }

        .ambient-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(140px);
          will-change: transform, opacity;
          /* Hardware acceleration */
          transform: translateZ(0);
        }

        .ambient-glow-primary {
          top: -10vh;
          left: 10vw;
          width: 70vw;
          height: 60vh;
          background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
          mix-blend-mode: screen;
        }

        .ambient-glow-secondary {
          top: 30vh;
          right: -10vw;
          width: 50vw;
          height: 50vh;
          background: radial-gradient(circle, var(--accent-secondary) 0%, transparent 70%);
          mix-blend-mode: screen;
        }

        .ambient-glow-core {
          bottom: -20vh;
          left: 50%;
          transform: translateX(-50%);
          width: 80vw;
          height: 50vh;
          background: radial-gradient(circle, var(--accent) 0%, transparent 60%);
          mix-blend-mode: screen;
        }

        @media (max-width: 768px) {
          .ambient-glow {
            filter: blur(80px); /* Better performance on mobile */
          }
          .ambient-glow-primary {
            width: 120vw;
            height: 40vh;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ambient-glow {
            animation: none !important;
            transition: none !important;
            will-change: auto;
          }
        }
      `}</style>
    </div>
  );
}
