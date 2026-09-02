import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const headingWords = ['I', 'BUILD', 'DIGITAL', 'EXPERIENCES', 'THAT', 'MATTER.'];
  const accentWords = ['DIGITAL', 'EXPERIENCES'];

  return (
    <section id="home" className="hero" ref={ref}>
      {/* Animated Background */}
      <div className="hero-bg">
        <div className="hero-grid" />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="hero-particle"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              width: `${3 + i}px`,
              height: `${3 + i}px`,
            }}
            animate={{
              y: [0, -30 - i * 5, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      <motion.div className="hero-content container" style={{ opacity, scale }}>
        <div className="hero-left">
          <motion.div
            className="hero-label"
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <span className="hero-label-dot" />
            FULL STACK MERN DEVELOPER
          </motion.div>

          <h1 className="hero-heading">
            {headingWords.map((word, i) => (
              <span key={i} className="hero-word-wrap">
                <motion.span
                  className={`hero-word ${accentWords.includes(word) ? 'hero-word--accent' : ''}`}
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 1 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="hero-desc"
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 1.7 }}
          >
            I help businesses and startups turn ideas into powerful, scalable
            and modern web applications.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 2 }}
          >
            <motion.a
              href="#work"
              className="btn btn-primary"
              data-cursor="VIEW"
              onClick={(e) => { e.preventDefault(); document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }); }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              View My Work <ArrowUpRight size={16} />
            </motion.a>
            <motion.a
              href="#contact"
              className="btn btn-outline"
              data-cursor="OPEN"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Let's Work Together
            </motion.a>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.3 }}
          >
            {[
              { num: '20+', label: 'Projects' },
              { num: '10+', label: 'Technologies' },
              { num: '100%', label: 'Commitment' },
            ].map((s, i) => (
              <motion.div key={i} className="hero-stat" whileHover={{ y: -3 }}>
                <span className="hero-stat-num">{s.num}</span>
                <span className="hero-stat-label">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="hero-right"
          initial={{ opacity: 0, scale: 0.85, rotateY: -10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-visual">
            <motion.div
              className="hero-code-window"
              whileHover={{ borderColor: 'rgba(94, 234, 212, 0.2)' }}
            >
              <div className="hero-code-bar">
                <span className="hero-code-dot" style={{ background: 'rgba(239, 68, 68, 0.6)' }} />
                <span className="hero-code-dot" style={{ background: 'rgba(234, 179, 8, 0.6)' }} />
                <span className="hero-code-dot" style={{ background: 'rgba(34, 197, 94, 0.6)' }} />
                <span className="hero-code-filename">app.jsx</span>
              </div>
              <div className="hero-code-body">
                <code>
                  <span className="c-keyword">const</span>{' '}
                  <span className="c-fn">CodeCrafted</span>{' '}
                  <span className="c-op">=</span>{' '}
                  <span className="c-bracket">{'() => {'}</span>
                  <br />
                  {' '}<span className="c-keyword">return</span>{' '}
                  <span className="c-bracket">{'('}</span>
                  <br />
                  {'  '}<span className="c-tag">{'<'}</span>
                  <span className="c-component">Experience</span>
                  <br />
                  {'    '}<span className="c-attr">developer</span>
                  <span className="c-op">=</span>
                  <span className="c-string">"Dharmendra"</span>
                  <br />
                  {'    '}<span className="c-attr">stack</span>
                  <span className="c-op">=</span>
                  <span className="c-string">"MERN"</span>
                  <br />
                  {'    '}<span className="c-attr">quality</span>
                  <span className="c-op">=</span>
                  <span className="c-string">"premium"</span>
                  <br />
                  {'    '}<span className="c-attr">passion</span>
                  <span className="c-op">=</span>
                  <span className="c-bool">{'{true}'}</span>
                  <br />
                  {'  '}<span className="c-tag">{'/>'}</span>
                  <br />
                  {' '}<span className="c-bracket">{')'}</span>
                  <br />
                  <span className="c-bracket">{'}'}</span>
                </code>
              </div>
            </motion.div>

            <div className="hero-floating-badges">
              <motion.div
                className="hero-badge"
                animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                ⚛️ React
              </motion.div>
              <motion.div
                className="hero-badge hero-badge-2"
                animate={{ y: [0, 12, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                🟢 Node.js
              </motion.div>
              <motion.div
                className="hero-badge hero-badge-3"
                animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                🍃 MongoDB
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8 }}
      >
        <span>SCROLL TO EXPLORE</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>

      <style>{`
        .hero {
          min-height: 100svh;
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding-top: 5rem;
          padding-bottom: 4rem;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(94, 234, 212, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(94, 234, 212, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 50% at 50% 50%, black 30%, transparent 100%);
        }
        .hero-particle {
          position: absolute;
          border-radius: 50%;
          background: var(--accent);
          pointer-events: none;
        }
        .hero-content {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(1.5rem, 4vw, 3rem);
          align-items: center;
          width: 100%;
        }
        .hero-left {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .hero-label {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-mono);
          font-size: clamp(0.6rem, 1.5vw, 0.75rem);
          letter-spacing: 0.2em;
          color: var(--accent);
        }
        .hero-label-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 12px var(--accent-glow-strong);
          animation: pulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 12px var(--accent-glow-strong); }
          50% { opacity: 0.5; box-shadow: 0 0 20px var(--accent-glow-strong); }
        }
        .hero-heading {
          font-size: clamp(2rem, 4.5vw, 4rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.03em;
        }
        .hero-word-wrap {
          display: inline-block;
          overflow: hidden;
          margin-right: 0.3em;
          vertical-align: top;
        }
        .hero-word {
          display: inline-block;
        }
        .hero-word--accent {
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-desc {
          font-size: clamp(0.95rem, 2vw, 1.1rem);
          color: var(--text-muted);
          max-width: 480px;
          line-height: 1.6;
        }
        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .hero-stats {
          display: flex;
          align-items: center;
          gap: clamp(1rem, 3vw, 2rem);
          margin-top: 0.5rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
        }
        .hero-stat {
          display: flex;
          flex-direction: column;
          cursor: default;
          transition: all 0.3s;
        }
        .hero-stat-num {
          font-family: var(--font-display);
          font-size: clamp(1.25rem, 3vw, 1.75rem);
          font-weight: 700;
          color: var(--accent);
        }
        .hero-stat-label {
          font-size: clamp(0.7rem, 1.5vw, 0.8rem);
          color: var(--text-dim);
          letter-spacing: 0.05em;
        }
        .hero-right {
          display: flex;
          justify-content: center;
          position: relative;
          perspective: 800px;
        }
        .hero-visual {
          position: relative;
          width: 100%;
          max-width: 480px;
        }
        .hero-code-window {
          background: rgba(17, 32, 29, 0.8);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(94, 234, 212, 0.05),
            0 25px 70px rgba(0, 0, 0, 0.5);
          transition: border-color 0.4s, box-shadow 0.4s;
        }
        .hero-code-window:hover {
          box-shadow:
            0 0 0 1px rgba(94, 234, 212, 0.1),
            0 25px 70px rgba(0, 0, 0, 0.5),
            0 0 40px rgba(94, 234, 212, 0.05);
        }
        .hero-code-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0.875rem 1rem;
          border-bottom: 1px solid var(--border);
        }
        .hero-code-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .hero-code-filename {
          margin-left: auto;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-dim);
        }
        .hero-code-body {
          padding: clamp(1rem, 3vw, 1.5rem);
          font-family: var(--font-mono);
          font-size: clamp(0.7rem, 1.5vw, 0.85rem);
          line-height: 1.8;
        }
        .hero-code-body code {
          display: block;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .c-keyword { color: #c792ea; }
        .c-fn { color: #82aaff; }
        .c-op { color: var(--text-dim); }
        .c-bracket { color: #e6e6e6; }
        .c-tag { color: var(--text-dim); }
        .c-component { color: #5EEAD4; }
        .c-attr { color: #c792ea; }
        .c-string { color: #c3e88d; }
        .c-bool { color: #f78c6c; }
        .hero-floating-badges {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .hero-badge {
          position: absolute;
          padding: 0.5rem 1rem;
          background: rgba(17, 32, 29, 0.9);
          border: 1px solid var(--border);
          border-radius: 100px;
          font-size: clamp(0.7rem, 1.5vw, 0.8rem);
          font-weight: 500;
          color: var(--text-primary);
          backdrop-filter: blur(10px);
          top: -10px;
          right: 20px;
        }
        .hero-badge-2 {
          top: auto;
          bottom: 60px;
          right: auto;
          left: -30px;
        }
        .hero-badge-3 {
          top: auto;
          bottom: -10px;
          right: 40px;
          left: auto;
        }
        .hero-scroll {
          position: absolute;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          color: var(--text-dim);
        }

        /* ===== TABLET ===== */
        @media (max-width: 1024px) {
          .hero-content {
            grid-template-columns: 1.2fr 1fr;
          }
          .hero-floating-badges {
            display: none;
          }
        }

        /* ===== MOBILE ===== */
        @media (max-width: 768px) {
          .hero {
            padding-top: 5rem;
            padding-bottom: 5rem;
          }
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .hero-left {
            align-items: center;
          }
          .hero-label {
            justify-content: center;
          }
          .hero-desc {
            margin: 0 auto;
          }
          .hero-actions {
            justify-content: center;
          }
          .hero-stats {
            justify-content: center;
          }
          .hero-right {
            order: -1;
            max-width: 360px;
            margin: 0 auto;
          }
          .hero-code-body {
            padding: 1rem;
            font-size: 0.7rem;
            line-height: 1.6;
          }
          .hero-badge-2 {
            left: -10px;
          }
          .hero-scroll {
            display: none;
          }
        }

        /* ===== VERY SMALL MOBILE ===== */
        @media (max-width: 380px) {
          .hero-heading {
            font-size: 1.75rem;
          }
          .hero-right {
            width: 100%;
            max-width: 100%;
          }
          .hero-code-body {
            padding: 0.8rem;
            font-size: 0.65rem;
            line-height: 1.6;
          }
          .hero-actions {
            flex-direction: column;
            width: 100%;
          }
          .hero-actions .btn {
            width: 100%;
            justify-content: center;
          }
        }

        /* ===== LANDSCAPE MOBILE ===== */
        @media (max-height: 500px) and (orientation: landscape) {
          .hero {
            min-height: auto;
            padding-top: 5rem;
            padding-bottom: 2rem;
          }
          .hero-content {
            grid-template-columns: 1fr 1fr;
          }
          .hero-right {
            order: 0;
          }
          .hero-scroll {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
