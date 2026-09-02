import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Search, Map, Palette, Code, TestTube, Rocket } from 'lucide-react';

const steps = [
  { num: '01', title: 'DISCOVER', desc: 'Deep dive into your idea, goals, business logic, and technical requirements. We define the problem before building the solution.', icon: <Search size={24} /> },
  { num: '02', title: 'PLAN', desc: 'Architect the database, define features, and select the precise technology stack to ensure scalability and speed.', icon: <Map size={24} /> },
  { num: '03', title: 'DESIGN', desc: 'Craft the visual direction, wireframes, and interactive user experience. We build pixel-perfect prototypes.', icon: <Palette size={24} /> },
  { num: '04', title: 'DEVELOP', desc: 'Engineer the product with clean, scalable, and highly optimized code. This is where the magic happens.', icon: <Code size={24} /> },
  { num: '05', title: 'TEST', desc: 'Rigorous QA testing for functionality, responsiveness, and edge cases to ensure a bug-free launch.', icon: <TestTube size={24} /> },
  { num: '06', title: 'DEPLOY', desc: 'Launch the final product to production servers and monitor initial stability and performance.', icon: <Rocket size={24} /> },
];

export default function Workflow() {
  const [activeStep, setActiveStep] = useState(0);
  const [rotation, setRotation] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  // Handle clicking a node on the dial
  const handleNodeClick = (index) => {
    if (index === activeStep) return;

    // Calculate the shortest rotation path
    const diff = index - activeStep;
    let rotationDelta = diff * -60; // 360 / 6 = 60 degrees per step

    // Go the shortest way around the circle
    if (rotationDelta < -180) rotationDelta += 360;
    if (rotationDelta > 180) rotationDelta -= 360;

    setRotation(prev => prev + rotationDelta);
    setActiveStep(index);
  };

  // Generate SVG paths for circuit lines
  const radius = 220;
  const generateCircuitLines = () => {
    return steps.map((_, index) => {
      const angle = (index * 60) - 90;
      const radian = angle * (Math.PI / 180);
      const x = Math.cos(radian) * radius + 250; // Center is 250,250
      const y = Math.sin(radian) * radius + 250;
      const isActive = index === activeStep;

      return (
        <g key={index} className="circuit-path">
          {/* Base dim line */}
          <line x1="250" y1="250" x2={x} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="2" />

          {/* Active Glowing Line */}
          {isActive && (
            <>
              <line x1="250" y1="250" x2={x} y2={y} stroke="var(--accent)" strokeWidth="3" filter="url(#glow)" />
              {/* Energy packet traveling along the line */}
              <circle r="4" fill="#fff" filter="url(#glow)">
                <animateMotion
                  dur="1.5s"
                  repeatCount="indefinite"
                  path={`M ${x},${y} L 250,250`}
                />
              </circle>
            </>
          )}
        </g>
      );
    });
  };

  return (
    <section id="workflow" className="section workflow-section" ref={ref}>

      {/* Background Floating Particles for creative flair */}
      <div className="ambient-particles">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 10}s`
          }} />
        ))}
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          className="workflow-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">Process</span>
          <h2 className="section-title">THE <span className="gradient-text">ENGINEERING</span> PIPELINE</h2>
        </motion.div>

        <div className="workflow-orbital-container">

          {/* Left Side: Active Content */}
          <div className="orbital-content">
            <div className="content-glow" />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: 30, filter: 'blur(10px)' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="premium-step-card"
              >
                <div className="card-glass-panel">
                  <div className="step-watermark">{steps[activeStep].num}</div>

                  <div className="step-header">
                    <div className="step-badge">PHASE {steps[activeStep].num}</div>
                    <div className="step-indicator-dots">
                      {steps.map((_, i) => (
                        <div key={i} className={`dot ${i === activeStep ? 'active' : ''}`} />
                      ))}
                    </div>
                  </div>

                  <h3 className="step-title">{steps[activeStep].title}</h3>
                  <p className="step-desc">{steps[activeStep].desc}</p>

                  <div className="terminal-window">
                    <div className="terminal-header">
                      <span className="dot bg-red-500" />
                      <span className="dot bg-yellow-500" />
                      <span className="dot bg-green-500" />
                      <span className="terminal-title">pipeline_execution.sh</span>
                    </div>
                    <div className="terminal-body">
                      <span className="term-prompt">$</span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="term-text"
                      >
                        Initiating {steps[activeStep].title.toLowerCase()} protocols...
                      </motion.span>
                      <br />
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="term-success"
                      >
                        [SUCCESS] Core systems aligned.
                      </motion.span>
                    </div>
                  </div>

                  <div className="step-progress-bar">
                    <motion.div
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side: Interactive Orbital Dial */}
          <div className="orbital-dial-wrapper">

            {/* SVG Circuit Board Layer */}
            <motion.svg
              className="circuit-board-layer"
              width="500"
              height="500"
              viewBox="0 0 500 500"
              animate={{ rotate: rotation }}
              transition={{ type: "spring", stiffness: 50, damping: 14 }}
            >
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {generateCircuitLines()}
            </motion.svg>

            {/* The spinning rings */}
            <div className="dial-ring ring-outer"></div>
            <div className="dial-ring ring-middle"></div>
            <div className="dial-ring ring-inner"></div>

            {/* The Dial Container that rotates */}
            <motion.div
              className="dial-container"
              animate={{ rotate: rotation }}
              transition={{ type: "spring", stiffness: 50, damping: 14 }}
            >
              {steps.map((step, index) => {
                const angle = (index * 60) - 90;
                const radian = angle * (Math.PI / 180);
                const x = Math.cos(radian) * radius;
                const y = Math.sin(radian) * radius;
                const isActive = index === activeStep;

                return (
                  <motion.button
                    key={step.num}
                    className={`dial-node ${isActive ? 'is-active' : ''}`}
                    style={{
                      left: `calc(50% + ${x}px - 32px)`,
                      top: `calc(50% + ${y}px - 32px)`,
                    }}
                    onClick={() => handleNodeClick(index)}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.div
                      className="node-icon-wrapper"
                      animate={{ rotate: -rotation }}
                      transition={{ type: "spring", stiffness: 50, damping: 14 }}
                    >
                      {step.icon}
                    </motion.div>

                    <motion.div
                      className="node-number"
                      animate={{ rotate: -rotation }}
                      transition={{ type: "spring", stiffness: 50, damping: 14 }}
                    >
                      {step.num}
                    </motion.div>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Center Core element */}
            <div className="dial-center-core">
              <div className="core-inner" />
              <div className="core-glow-pulse" />

              <div className="core-binary-overlay">
                0110<br />1001
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .workflow-section {
          padding-top: 8rem;
          padding-bottom: 8rem;
          background: var(--bg-primary);
          overflow: hidden;
          position: relative;
        }

        /* Ambient Background Particles */
        .ambient-particles {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: var(--accent);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--accent);
          opacity: 0;
          animation: float-particle linear infinite;
        }

        @keyframes float-particle {
          0% { transform: translateY(100vh) scale(0); opacity: 0; }
          20% { opacity: 0.5; }
          80% { opacity: 0.5; }
          100% { transform: translateY(-100vh) scale(1.5); opacity: 0; }
        }

        .workflow-header {
          text-align: center;
          margin-bottom: 5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .workflow-orbital-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
          gap: 5rem;
        }

        /* --- Left Side: Content --- */
        .orbital-content {
          flex: 1;
          position: relative;
          min-height: 500px;
          display: flex;
          align-items: center;
        }

        .content-glow {
          position: absolute;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle at center, rgba(94, 234, 212, 0.15) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 0;
          pointer-events: none;
        }

        .premium-step-card {
          position: relative;
          z-index: 1;
          width: 100%;
          border-radius: 32px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 100%);
          box-shadow: 0 30px 60px rgba(0,0,0,0.5), inset 0 0 40px rgba(94,234,212,0.05);
        }

        .card-glass-panel {
          background: rgba(17, 32, 29, 0.85);
          border-radius: 31px;
          padding: 4rem 3.5rem;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .step-watermark {
          position: absolute;
          top: -20px;
          right: -10px;
          font-family: var(--font-display);
          font-size: 16rem;
          font-weight: 900;
          line-height: 0.8;
          color: rgba(255, 255, 255, 0.02);
          pointer-events: none;
          z-index: 0;
        }

        .step-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
          position: relative;
          z-index: 1;
        }

        .step-badge {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          color: #000;
          background: var(--accent);
          padding: 0.6rem 1.5rem;
          border-radius: 100px;
          box-shadow: 0 0 20px rgba(94, 234, 212, 0.4);
        }

        .step-indicator-dots {
          display: flex;
          gap: 6px;
        }

        .step-indicator-dots .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          transition: all 0.4s ease;
        }

        .step-indicator-dots .dot.active {
          background: var(--accent);
          width: 24px;
          border-radius: 10px;
          box-shadow: 0 0 10px var(--accent);
        }

        .step-title {
          position: relative;
          z-index: 1;
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 4vw, 3rem);
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .step-desc {
          position: relative;
          z-index: 1;
          font-size: clamp(0.95rem, 1.8vw, 1.15rem);
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
        }

        /* Unique Terminal Window inside card */
        .terminal-window {
          background: #000;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: clamp(1.5rem, 4vw, 3.5rem);
          font-family: var(--font-mono);
          position: relative;
          z-index: 1;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        
        .terminal-header {
          background: #111;
          padding: 8px 12px;
          display: flex;
          align-items: center;
          gap: 6px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        
        .terminal-header .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .bg-red-500 { background: #ff5f56; }
        .bg-yellow-500 { background: #ffbd2e; }
        .bg-green-500 { background: #27c93f; }
        
        .terminal-title {
          margin-left: 10px;
          font-size: 0.75rem;
          color: var(--text-dim);
        }

        .terminal-body {
          padding: 1.25rem;
          font-size: clamp(0.75rem, 1.5vw, 0.85rem);
          color: var(--text-muted);
        }
        
        .term-prompt {
          color: var(--accent);
          margin-right: 8px;
        }
        
        .term-text {
          color: #a8b2d1;
        }
        
        .term-success {
          color: #10b981;
          display: inline-block;
          margin-top: 8px;
        }

        .step-progress-bar {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 100px;
          overflow: hidden;
          margin-top: auto;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, rgba(94, 234, 212, 0.5), var(--accent));
          border-radius: 100px;
          box-shadow: 0 0 15px var(--accent);
        }

        /* --- Right Side: Orbital Dial --- */
        .orbital-dial-wrapper {
          flex: 1;
          position: relative;
          width: 500px;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* NEW SVG Circuit Layer */
        .circuit-board-layer {
          position: absolute;
          z-index: 1;
          pointer-events: none;
        }

        .dial-ring {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        
        .ring-outer {
          width: 440px;
          height: 440px;
          border: 1px dashed rgba(255, 255, 255, 0.15);
          animation: spin-slow 50s linear infinite reverse;
        }
        
        .ring-middle {
          width: 340px;
          height: 340px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          background: radial-gradient(circle at center, rgba(255,255,255,0.01) 0%, transparent 100%);
        }

        .ring-inner {
          width: 240px;
          height: 240px;
          border: 1px solid rgba(94, 234, 212, 0.1);
          animation: spin-slow 30s linear infinite;
        }

        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .dial-container {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 2;
        }

        .dial-node {
          position: absolute;
          width: 64px;
          height: 64px;
          background: rgba(17, 32, 29, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text-muted);
          transition: all 0.3s ease, border-color 0.3s ease;
          padding: 0;
          outline: none;
          z-index: 3;
          backdrop-filter: blur(10px);
          transform-origin: center;
        }

        .dial-node:hover {
          border-color: rgba(94, 234, 212, 0.5);
          color: var(--text-primary);
          box-shadow: 0 10px 25px rgba(94, 234, 212, 0.2);
          background: rgba(17, 32, 29, 0.95);
        }

        .dial-node.is-active {
          background: var(--accent);
          color: #000;
          border-color: var(--accent);
          box-shadow: 0 0 30px rgba(94, 234, 212, 0.5);
        }

        .node-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .node-number {
          position: absolute;
          bottom: -30px;
          left: 50%;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 800;
          color: var(--text-dim);
          pointer-events: none;
          transform: translateX(-50%);
          transition: color 0.3s;
        }
        
        .dial-node.is-active .node-number {
          color: var(--accent);
        }

        /* Center Core */
        .dial-center-core {
          position: absolute;
          width: 140px;
          height: 140px;
          background: rgba(17, 32, 29, 0.7);
          border: 1px solid rgba(94, 234, 212, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          backdrop-filter: blur(10px);
          box-shadow: inset 0 0 30px rgba(94, 234, 212, 0.1);
        }
        
        .core-inner {
          position: relative;
          z-index: 2;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(94, 234, 212, 0.6), transparent 70%);
          border: 1px solid rgba(94, 234, 212, 0.4);
          box-shadow: 0 0 30px rgba(94, 234, 212, 0.4);
        }

        .core-binary-overlay {
          position: absolute;
          z-index: 3;
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: rgba(0,0,0,0.5);
          text-align: center;
          font-weight: 900;
          line-height: 1;
          pointer-events: none;
        }

        .core-glow-pulse {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid var(--accent);
          opacity: 0;
          animation: pulse-ring 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }

        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        /* ===== TABLET ===== */
        @media (max-width: 1024px) {
          .workflow-orbital-container {
            flex-direction: column-reverse;
            gap: 2rem;
          }
          .orbital-content {
            width: 100%;
            max-width: 600px;
          }
          .orbital-dial-wrapper {
            transform: scale(0.8);
            margin-top: -1rem;
            margin-bottom: -3rem;
          }
        }

        /* ===== MOBILE ===== */
        @media (max-width: 700px) {
          .orbital-dial-wrapper {
            transform: scale(0.65);
            margin-top: -1.5rem;
            margin-bottom: -5rem;
          }
          .card-glass-panel {
            padding: 2rem 1.5rem;
          }
        }

        /* ===== SMALL MOBILE ===== */
        @media (max-width: 480px) {
          .orbital-dial-wrapper {
            transform: scale(0.55);
            margin-top: -2.5rem;
            margin-bottom: -7rem;
          }
        }
      `}</style>
    </section>
  );
}
