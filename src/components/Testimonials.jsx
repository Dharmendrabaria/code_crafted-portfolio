import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
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

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const isScrolling = useRef(false);

  const slideNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const slidePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // Handle Trackpad / Mouse Wheel Swiping
  const handleWheel = (e) => {
    if (isScrolling.current) return;
    
    // Check if the scroll is mostly horizontal
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (e.deltaX > 20) {
        isScrolling.current = true;
        slideNext();
      } else if (e.deltaX < -20) {
        isScrolling.current = true;
        slidePrev();
      }
      
      // Debounce to prevent rapid sliding
      setTimeout(() => {
        isScrolling.current = false;
      }, 600);
    }
  };

  return (
    <section className="section testimonials-section" ref={ref}>
      <div className="container">
        <motion.div
          className="testimonials-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">CLIENT <span className="gradient-text">SUCCESS</span></h2>
        </motion.div>

        <div className="coverflow-container">
          <div className="coverflow-glow" />

          {/* Add onWheel for trackpad swiping */}
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

                let x = 0;
                let scale = 1;
                let rotateY = 0;
                let zIndex = 10;
                let opacity = 1;
                let blur = 0;

                if (isActive) {
                  x = 0;
                  scale = 1;
                  rotateY = 0;
                  zIndex = 20;
                  opacity = 1;
                  blur = 0;
                } else if (isLeft) {
                  x = -350;
                  scale = 0.75;
                  rotateY = 30;
                  zIndex = 10;
                  opacity = 0.4;
                  blur = 4;
                } else if (isRight) {
                  x = 350;
                  scale = 0.75;
                  rotateY = -30;
                  zIndex = 10;
                  opacity = 0.4;
                  blur = 4;
                } else {
                  x = distance > 0 ? 500 : -500;
                  scale = 0.5;
                  rotateY = distance > 0 ? -45 : 45;
                  zIndex = 0;
                  opacity = 0;
                  blur = 10;
                }

                return (
                  <motion.div
                    key={testimonial.id}
                    className={`coverflow-card ${isActive ? 'is-active' : ''}`}
                    initial={false}
                    animate={{ x, scale, rotateY, zIndex, opacity, filter: `blur(${blur}px)` }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 150, damping: 20 }}
                    
                    /* Drag functionality */
                    drag={isActive ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(e, { offset, velocity }) => {
                      if (offset.x < -50 || velocity.x < -500) {
                        slideNext();
                      } else if (offset.x > 50 || velocity.x > 500) {
                        slidePrev();
                      }
                    }}

                    onClick={() => {
                      if (!isActive) setCurrentIndex(index);
                    }}
                  >
                    <div className="card-inner-glow" />
                    
                    <div className="quote-mark">
                      <Quote size={80} />
                    </div>

                    <div className="card-content-inner">
                      <div className="stars">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} size={18} fill="var(--accent)" color="var(--accent)" />
                        ))}
                      </div>

                      <p className="review-text">{testimonial.text}</p>

                      <div className="author-info">
                        <div className="avatar">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="author-name">{testimonial.name}</h4>
                          <p className="author-role">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="slider-controls">
            <button className="slider-btn" onClick={slidePrev}>
              <ChevronLeft size={24} />
            </button>
            <div className="slider-dots">
              {testimonials.map((_, idx) => (
                <button 
                  key={idx}
                  className={`dot ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                />
              ))}
            </div>
            <button className="slider-btn" onClick={slideNext}>
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .testimonials-section {
          border-top: 1px solid var(--border);
          padding-top: 8rem;
          padding-bottom: 8rem;
          background: var(--bg-secondary);
          overflow: hidden;
        }

        .testimonials-header {
          text-align: center;
          margin-bottom: 6rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .coverflow-container {
          position: relative;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          perspective: 1500px; /* Important for the 3D tilt effect */
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .coverflow-glow {
          position: absolute;
          width: 400px;
          height: 400px;
          background: var(--accent);
          border-radius: 50%;
          filter: blur(150px);
          opacity: 0.15;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 0;
          pointer-events: none;
        }

        .coverflow-track {
          position: relative;
          width: 100%;
          height: 450px;
          display: flex;
          align-items: center;
          justify-content: center;
          transform-style: preserve-3d;
        }

        .coverflow-card {
          position: absolute;
          width: 100%;
          max-width: 650px;
          height: 400px;
          background: rgba(17, 32, 29, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 28px;
          padding: 3.5rem;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.4);
          overflow: hidden;
          cursor: pointer; /* Side cards can be clicked to bring to center */
          transition: border-color 0.3s;
        }

        .coverflow-card.is-active {
          border-color: rgba(94, 234, 212, 0.3);
          cursor: default;
        }

        .card-inner-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(to bottom, rgba(94, 234, 212, 0.05), transparent);
          pointer-events: none;
        }

        .quote-mark {
          position: absolute;
          top: 20px;
          right: 30px;
          color: rgba(94, 234, 212, 0.05);
          z-index: 0;
          pointer-events: none;
        }

        .card-content-inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
        }

        .stars {
          display: flex;
          gap: 0.4rem;
          margin-bottom: 2rem;
        }

        .review-text {
          font-family: var(--font-display);
          font-size: 1.4rem;
          line-height: 1.6;
          color: var(--text-primary);
          font-weight: 400;
        }

        .author-info {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-top: 2rem;
        }

        .avatar {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: rgba(94, 234, 212, 0.1);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 700;
          border: 1px solid rgba(94, 234, 212, 0.2);
        }

        .author-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.2rem;
          letter-spacing: 0.02em;
        }

        .author-role {
          font-size: 0.9rem;
          color: var(--text-dim);
          font-family: var(--font-mono);
        }

        /* Controls */
        .slider-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 3rem;
          margin-top: 3rem;
          z-index: 30;
        }
        
        .slider-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(17, 32, 29, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          backdrop-filter: blur(10px);
          transition: all 0.3s;
        }
        .slider-btn:hover {
          background: var(--accent);
          color: var(--bg-primary);
          border-color: var(--accent);
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(94, 234, 212, 0.4);
        }

        .slider-dots {
          display: flex;
          gap: 0.75rem;
        }
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }
        .dot:hover {
          background: rgba(255, 255, 255, 0.4);
        }
        .dot.active {
          background: var(--accent);
          transform: scale(1.3);
          box-shadow: 0 0 10px var(--accent);
        }

        @media (max-width: 1024px) {
          .coverflow-card {
            max-width: 550px;
            padding: 2.5rem;
          }
          .review-text {
            font-size: 1.2rem;
          }
        }
        
        @media (max-width: 768px) {
          .coverflow-track {
            height: 400px;
          }
          .coverflow-card {
            max-width: 85%;
            padding: 2rem;
          }
          .review-text {
            font-size: 1.1rem;
          }
          /* On mobile, we reduce the X shift so cards stay on screen */
          .coverflow-card:not(.is-active) {
            opacity: 0 !important; /* Hide side cards entirely on mobile */
            pointer-events: none;
          }
        }
      `}</style>
    </section>
  );
}
