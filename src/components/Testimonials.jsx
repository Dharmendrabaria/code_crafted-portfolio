import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Client Name',
    role: 'Founder, Startup Project',
    text: '"The quality of work exceeded our expectations. Clean code, beautiful design and delivered on time. Highly recommend for anyone looking for professional web development."',
    rating: 5,
  },
  {
    name: 'Client Name',
    role: 'Business Owner',
    text: '"Our website went from an idea to a fully functional, professional product. The attention to detail and technical expertise really shows in the final result."',
    rating: 5,
  },
  {
    name: 'Client Name',
    role: 'Project Manager, Tech Company',
    text: '"Communication was excellent throughout the project. Every feature was implemented exactly as discussed, and the code quality is outstanding. Will definitely work together again."',
    rating: 5,
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

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
          <h2 className="section-title">WHAT CLIENTS <span className="gradient-text">SAY</span></h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Placeholder reviews — will be replaced with real client testimonials.
          </p>
        </motion.div>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="testimonial-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            >
              <div className="testimonial-quote-icon">
                <Quote size={20} />
              </div>

              <div className="testimonial-stars">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star key={si} size={14} fill="#5EEAD4" color="#5EEAD4" />
                ))}
              </div>

              <p className="testimonial-text">{t.text}</p>

              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <span className="testimonial-name">{t.name}</span>
                  <span className="testimonial-role">{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .testimonials-section {
          border-top: 1px solid var(--border);
        }
        .testimonials-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .testimonial-card {
          padding: 2.25rem;
          border: 1px solid var(--border);
          border-radius: 16px;
          transition: all 0.4s var(--ease-out);
          position: relative;
        }
        .testimonial-card:hover {
          border-color: var(--border-hover);
          background: var(--bg-card);
          transform: translateY(-4px);
        }
        .testimonial-quote-icon {
          color: rgba(94, 234, 212, 0.2);
          margin-bottom: 1rem;
        }
        .testimonial-stars {
          display: flex;
          gap: 0.25rem;
          margin-bottom: 1.25rem;
        }
        .testimonial-text {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.8;
          font-style: italic;
          margin-bottom: 1.5rem;
        }
        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border);
        }
        .testimonial-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(94, 234, 212, 0.1);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 0.8rem;
          font-weight: 600;
          flex-shrink: 0;
        }
        .testimonial-name {
          display: block;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .testimonial-role {
          display: block;
          font-size: 0.75rem;
          color: var(--text-dim);
        }

        @media (max-width: 900px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
            max-width: 500px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}
