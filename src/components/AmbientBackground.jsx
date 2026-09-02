import { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function AmbientBackground() {
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, { damping: 50, stiffness: 200, mass: 0.5 });
  const canvasRef = useRef(null);

  // Ambient Glow Logic
  const ambientY = useTransform(smoothScroll, [0, 1], ['0vh', '80vh']);
  const ambientScale = useTransform(smoothScroll, [0, 0.2, 0.4, 0.6, 0.8, 1], [1, 1.2, 0.9, 1.1, 0.95, 1.3]);
  const ambientOpacity = useTransform(smoothScroll, [0, 0.1, 0.5, 0.9, 1], [0.15, 0.08, 0.12, 0.1, 0.18]);

  // Canvas Magnetic Constellation Logic (Highly Optimized for ZERO LAG)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // The gravity well size for the mouse
    const mouse = { x: -1000, y: -1000, radius: 250 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.5; // Subtle glowing points
        this.density = (Math.random() * 20) + 5;
        
        // Base drift speed (slow and elegant)
        this.baseVx = (Math.random() - 0.5) * 0.4;
        this.baseVy = (Math.random() - 0.5) * 0.4;
        
        // Current velocity
        this.vx = 0;
        this.vy = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = 'rgba(94, 234, 212, 0.7)'; // Exact match for Midnight Titanium Theme
        ctx.fill();
        
        // Soft glow matching theme
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(94, 234, 212, 0.8)';
      }

      update() {
        // MOUSE ATTRACTION LOGIC (Optimized to prevent lag)
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distanceSquared = dx * dx + dy * dy;
        let radiusSquared = mouse.radius * mouse.radius;
        
        // Only run expensive math IF mouse is near
        if (distanceSquared < radiusSquared) {
          let distance = Math.sqrt(distanceSquared); 
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          
          // Soft, smooth pulling force towards the mouse
          let force = (mouse.radius - distance) / mouse.radius; 
          this.vx += forceDirectionX * force * (this.density * 0.02);
          this.vy += forceDirectionY * force * (this.density * 0.02);
        }

        // Smooth Friction (stops them from flying away too fast/glitching)
        this.vx *= 0.92;
        this.vy *= 0.92;

        // Apply movement: Base drift + Magnetic velocity
        this.x += this.baseVx + this.vx;
        this.y += this.baseVy + this.vy;

        // Seamless screen wrapping
        if (this.x > canvas.width + 10) this.x = -10;
        if (this.x < -10) this.x = canvas.width + 10;
        if (this.y > canvas.height + 10) this.y = -10;
        if (this.y < -10) this.y = canvas.height + 10;
      }
    }

    const initParticles = () => {
      particles = [];
      // Max 50 particles for GUARANTEED 60-120fps on all devices
      const numParticles = Math.min((canvas.width * canvas.height) / 15000, 50);
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      // Clear screen cleanly for smooth rendering (no trailing glitches)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    // Start
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="ambient-container">
      
      {/* 1. INTERACTIVE MAGNETIC CONSTELLATION CANVAS */}
      <canvas ref={canvasRef} className="magnetic-canvas" />

      {/* 2. NOISE TEXTURE */}
      <div className="ambient-noise" />

      {/* 3. AURORA GLOWS */}
      <motion.div
        className="ambient-glow ambient-glow-primary"
        style={{ y: ambientY, scale: ambientScale, opacity: ambientOpacity }}
      />
      <motion.div
        className="ambient-glow ambient-glow-secondary"
        style={{
          y: useTransform(smoothScroll, [0, 1], ['40vh', '-20vh']),
          opacity: useTransform(smoothScroll, [0, 0.5, 1], [0.05, 0.1, 0.05]),
          scale: useTransform(ambientScale, s => s * 0.8),
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

        .magnetic-canvas {
          position: absolute;
          inset: 0;
          width: 100vw;
          height: 100vh;
          z-index: 1; /* Below noise, above background */
        }

        .ambient-noise {
          position: absolute;
          inset: 0;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          z-index: 2;
        }

        .ambient-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(140px);
          will-change: transform, opacity;
          transform: translateZ(0);
          z-index: 0;
        }

        .ambient-glow-primary {
          top: -10vh; left: 10vw;
          width: 70vw; height: 60vh;
          background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
          mix-blend-mode: screen;
        }

        .ambient-glow-secondary {
          top: 30vh; right: -10vw;
          width: 50vw; height: 50vh;
          background: radial-gradient(circle, var(--accent-secondary) 0%, transparent 70%);
          mix-blend-mode: screen;
        }

        @media (max-width: 768px) {
          .magnetic-canvas { display: none; /* Disable canvas on small mobile to save battery/performance */ }
          .ambient-glow { filter: blur(80px); }
          .ambient-glow-primary { width: 120vw; height: 40vh; }
        }
      `}</style>
    </div>
  );
}
