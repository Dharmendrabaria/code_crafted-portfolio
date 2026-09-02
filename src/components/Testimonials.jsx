import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useTransform } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Founder, TechStart',
    text: '"The quality of work exceeded our expectations. Clean code, beautiful design, and delivered on time. They took our vague ideas and turned them into a world-class digital product. Highly recommend for anyone looking for professional web development."',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Director of Marketing, Elevate',
    text: '"Our website went from an idea to a fully functional, professional product in record time. The attention to detail and technical expertise really shows in the final result. The performance improvements alone doubled our conversion rate."',
    rating: 5,
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Project Manager, NexusCorp',
    text: '"Communication was excellent throughout the project. Every feature was implemented exactly as discussed, and the code quality is outstanding. It is rare to find an engineer who also has such a strong eye for high-end design."',
    rating: 5,
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'CEO, Global Reach',
    text: '"Absolutely phenomenal work. The attention to performance and the fluid animations have completely transformed our brand identity online. This is web development at its absolute finest."',
    rating: 5,
  }
];

function TestimonialCard({ 
  testimonial, isActive, isLeft, isRight, distance, 
  slideNext, slidePrev, setCurrentIndex, index 
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const tiltX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const tiltY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);
  const glareX = useTransform(mouseX, [-0.5, 0.5], [100, -100]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], [100, -100]);

  const handleMouseMove = (e) => {
    if (!isActive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  let x = 0;
  let scale = 1;
  let baseRotateY = 0;
  let zIndex = 10;
  let opacity = 1;
  let blur = 0;

  if (isActive) {
    x = 0; scale = 1; baseRotateY = 0; zIndex = 20; opacity = 1; blur = 0;
  } else if (isLeft) {
    x = -280; scale = 0.8; baseRotateY = 20; zIndex = 10; opacity = 0.4; blur = 4;
  } else if (isRight) {
    x = 280; scale = 0.8; baseRotateY = -20; zIndex = 10; opacity = 0.4; blur = 4;
  } else {
    x = distance > 0 ? 400 : -400; scale = 0.6; baseRotateY = distance > 0 ? -40 : 40; zIndex = 0; opacity = 0; blur = 8;
  }

  return (
    <motion.div
      ref={cardRef}
      className={`hologram-card-wrapper ${isActive ? 'is-active' : ''}`}
      initial={false}
      animate={{ 
        x, 
        y: "-50%", // Guaranteed NO text cut-off, always centered vertically
        scale, 
        zIndex, 
        opacity, 
        filter: `blur(${blur}px)`,
        rotateX: (isActive && isHovered) ? tiltX.get() : 0,
        rotateY: (isActive && isHovered) ? tiltY.get() : baseRotateY,
      }}
      transition={{ 
        duration: 0.7, 
        type: "spring", stiffness: 120, damping: 20, 
        rotateX: { duration: (isActive && isHovered) ? 0 : 0.7 },
        rotateY: { duration: (isActive && isHovered) ? 0 : 0.7 }
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      
      drag={isActive ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={(e, { offset, velocity }) => {
        // High responsiveness to mouse drag
        if (offset.x < -30 || velocity.x < -300) slideNext();
        else if (offset.x > 30 || velocity.x > 300) slidePrev();
      }}
      onClick={() => { if (!isActive) setCurrentIndex(index); }}
    >
      <div className="card-glass-body">
        {isActive && (
          <motion.div 
            className="hologram-glare"
            style={{ x: glareX, y: glareY, opacity: isHovered ? 1 : 0 }}
          />
        )}
        {isActive && <div className="continuous-scanner" />}
        <div className="ambient-corner-glow" />
        
        <motion.div 
          className="quote-mark-parallax"
          animate={{ rotate: isActive ? 0 : -10, scale: isActive ? 1 : 0.8 }}
          transition={{ duration: 0.8 }}
        >
          <Quote size={120} />
        </motion.div>

        <div className="card-content-inner">
          <div className="stars-container">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: isActive ? 0.3 + (i * 0.1) : 0, type: "spring", stiffness: 200 }}
              >
                <Star size={20} fill="var(--accent)" color="var(--accent)" className="star-icon" />
              </motion.div>
            ))}
          </div>

          <p className="review-text">{testimonial.text}</p>

          <div className="author-info-holographic">
            <div className="avatar-ring">
              <div className="avatar-core">
                {testimonial.name.charAt(0)}
              </div>
            </div>
            <div className="author-text-group">
              <h4 className="author-name">{testimonial.name}</h4>
              <p className="author-role">{testimonial.role}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const isScrolling = useRef(false);

  const slideNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setProgress(0); // Reset timer bar
  };

  const slidePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setProgress(0); // Reset timer bar
  };

  // Keyboard (PC Button) Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') slidePrev();
      if (e.key === 'ArrowRight') slideNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Autoplay (Apne aap change)
  const AUTOPLAY_TIME_MS = 6000;
  
  useEffect(() => {
    if (isPaused) return;

    // Progress bar animation interval (updates every 50ms)
    const intervalTime = 50;
    const progressStep = (intervalTime / AUTOPLAY_TIME_MS) * 100;
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + progressStep >= 100) {
          slideNext();
          return 0;
        }
        return prev + progressStep;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, currentIndex]);

  // Trackpad Swiping
  const handleWheel = (e) => {
    if (isScrolling.current) return;
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (e.deltaX > 20) {
        isScrolling.current = true;
        slideNext();
      } else if (e.deltaX < -20) {
        isScrolling.current = true;
        slidePrev();
      }
      setTimeout(() => { isScrolling.current = false; }, 600);
    }
  };

  return (
    <section className="section testimonials-section" ref={ref}>
      
      <div className="ambient-particles">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 5}s`
          }} />
        ))}
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        <motion.div
          className="testimonials-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">CLIENT <span className="gradient-text">SUCCESS</span></h2>
        </motion.div>

        {/* The entire coverflow container pauses autoplay on hover */}
        <div 
          className="coverflow-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="coverflow-glow-stage" />

          <div className="coverflow-track" onWheel={handleWheel}>
            <AnimatePresence mode="popLayout">
              {testimonials.map((testimonial, index) => {
                let distance = index - currentIndex;
                
                if (distance > 2) distance -= testimonials.length;
                if (distance < -2) distance += testimonials.length;

                if (Math.abs(distance) > 2) return null;

                const isActive = distance === 0;
                const isLeft = distance === -1;
                const isRight = distance === 1;

                return (
                  <TestimonialCard 
                    key={testimonial.id}
                    testimonial={testimonial}
                    isActive={isActive}
                    isLeft={isLeft}
                    isRight={isRight}
                    distance={distance}
                    slideNext={slideNext}
                    slidePrev={slidePrev}
                    setCurrentIndex={setCurrentIndex}
                    index={index}
                  />
                );
              })}
            </AnimatePresence>
          </div>
          
          {/* Creative Autoplay Progress Bar */}
          <div className="autoplay-progress-container">
             <motion.div 
               className="autoplay-progress-fill" 
               animate={{ width: `${progress}%` }}
               transition={{ ease: 'linear', duration: 0.05 }}
             />
          </div>

          <div className="slider-controls">
            <button className="hologram-btn" onClick={slidePrev}>
              <ChevronLeft size={24} />
            </button>
            <div className="slider-dots">
              {testimonials.map((_, idx) => (
                <button 
                  key={idx}
                  className={`cyber-dot ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setProgress(0);
                  }}
                />
              ))}
            </div>
            <button className="hologram-btn" onClick={slideNext}>
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .testimonials-section {
          padding-top: 5rem;
          padding-bottom: 5rem;
          background: var(--bg-secondary);
          overflow: hidden;
          position: relative;
        }

        .ambient-particles { position: absolute; inset: 0; overflow: hidden; z-index: 0; pointer-events: none; }
        .particle { position: absolute; width: 3px; height: 3px; background: var(--accent); border-radius: 50%; box-shadow: 0 0 10px var(--accent); opacity: 0; animation: float-particle linear infinite; }
        @keyframes float-particle { 0% { transform: translateY(100vh) scale(0); opacity: 0; } 50% { opacity: 0.6; } 100% { transform: translateY(-100vh) scale(1.5); opacity: 0; } }

        .testimonials-header { text-align: center; margin-bottom: 2rem; display: flex; flex-direction: column; align-items: center; }

        .coverflow-container { position: relative; width: 100%; max-width: 1000px; margin: 0 auto; perspective: 2000px; display: flex; flex-direction: column; align-items: center; }
        .coverflow-glow-stage { position: absolute; width: 600px; height: 400px; background: radial-gradient(ellipse at center, rgba(94, 234, 212, 0.15), transparent 70%); top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 0; pointer-events: none; }
        .coverflow-track { position: relative; width: 100%; height: 460px; display: flex; align-items: center; justify-content: center; transform-style: preserve-3d; }

        .hologram-card-wrapper {
          position: absolute;
          top: 50%; 
          width: 100%;
          max-width: 600px; 
          height: auto; /* DYNAMIC HEIGHT - NEVER CUTS OFF */
          min-height: 320px;
          border-radius: 26px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%);
          transform-style: preserve-3d;
          cursor: pointer;
        }
        .hologram-card-wrapper.is-active { cursor: grab; box-shadow: 0 40px 80px rgba(0,0,0,0.6), 0 0 50px rgba(94, 234, 212, 0.15); z-index: 20 !important; }
        .hologram-card-wrapper.is-active:active { cursor: grabbing; }

        .card-glass-body {
          position: relative;
          width: 100%;
          height: 100%;
          background: rgba(12, 22, 20, 0.88);
          border-radius: 25px;
          padding: 3.5rem 3.5rem; 
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          overflow: hidden; 
          display: flex;
          flex-direction: column;
          transform-style: preserve-3d;
        }

        .hologram-glare { position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle at center, rgba(255,255,255,0.12) 0%, transparent 40%); pointer-events: none; z-index: 0; transition: opacity 0.4s ease; }
        .continuous-scanner { position: absolute; inset: 0; background: linear-gradient(180deg, transparent, rgba(94, 234, 212, 0.06) 50%, transparent); background-size: 100% 200%; animation: scan-vertical 5s linear infinite; pointer-events: none; z-index: 0; }
        @keyframes scan-vertical { 0% { background-position: 0% -100%; } 100% { background-position: 0% 200%; } }

        .ambient-corner-glow { position: absolute; top: 0; right: 0; width: 250px; height: 250px; background: radial-gradient(circle at top right, rgba(94, 234, 212, 0.15), transparent 70%); pointer-events: none; }
        
        .quote-mark-parallax { position: absolute; top: 15px; right: 25px; color: rgba(94, 234, 212, 0.05); z-index: 0; pointer-events: none; transform-style: preserve-3d; }

        .card-content-inner {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
          transform: translateZ(40px);
        }

        .stars-container { display: flex; gap: 0.4rem; margin-bottom: 2rem; }
        .star-icon { filter: drop-shadow(0 0 8px rgba(94, 234, 212, 0.6)); }

        .review-text {
          font-family: var(--font-display);
          font-size: 1.25rem;
          line-height: 1.7;
          color: var(--text-primary);
          font-weight: 500;
          letter-spacing: 0.01em;
          margin-bottom: 2.5rem; 
        }

        .author-info-holographic { display: flex; align-items: center; gap: 1.2rem; margin-top: auto; }
        .avatar-ring { padding: 3px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), transparent); box-shadow: 0 0 20px rgba(94, 234, 212, 0.4); }
        .avatar-core { width: 50px; height: 50px; border-radius: 50%; background: rgba(17, 32, 29, 0.95); color: var(--accent); display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 1.4rem; font-weight: 800; }
        .author-name { font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.1rem; letter-spacing: 0.02em; }
        .author-role { font-size: 0.85rem; color: var(--text-dim); font-family: var(--font-mono); letter-spacing: 0.05em; }

        /* CREATIVE AUTOPLAY PROGRESS BAR */
        .autoplay-progress-container {
          width: 100px;
          height: 2px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          margin-top: 1.5rem;
          overflow: hidden;
          position: relative;
        }
        
        .autoplay-progress-fill {
          height: 100%;
          background: var(--accent);
          box-shadow: 0 0 10px var(--accent);
          border-radius: 2px;
        }

        .slider-controls { display: flex; align-items: center; justify-content: center; gap: 3rem; margin-top: 1.5rem; z-index: 30; }
        .hologram-btn { width: 48px; height: 48px; border-radius: 50%; background: rgba(17, 32, 29, 0.6); border: 1px solid rgba(94, 234, 212, 0.2); color: var(--accent); display: flex; align-items: center; justify-content: center; cursor: pointer; backdrop-filter: blur(10px); transition: all 0.3s; }
        .hologram-btn:hover { background: var(--accent); color: #000; box-shadow: 0 0 25px rgba(94, 234, 212, 0.5); transform: scale(1.1); }
        
        .slider-dots { display: flex; gap: 0.6rem; }
        .cyber-dot { width: 35px; height: 4px; border-radius: 4px; background: rgba(255, 255, 255, 0.15); border: none; cursor: pointer; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .cyber-dot:hover { background: rgba(255, 255, 255, 0.4); }
        .cyber-dot.active { background: var(--accent); width: 60px; box-shadow: 0 0 15px var(--accent); }

        @media (max-width: 1024px) {
          .hologram-card-wrapper { max-width: 520px; }
          .review-text { font-size: 1.15rem; }
        }
        
        @media (max-width: 768px) {
          .coverflow-track { height: 440px; }
          .hologram-card-wrapper { max-width: 85%; }
          .card-glass-body { padding: 2rem; }
          .review-text { font-size: 1.1rem; }
          .hologram-card-wrapper:not(.is-active) { opacity: 0 !important; pointer-events: none; }
        }
      `}</style>
    </section>
  );
}
