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

  return (
    <section id="workflow" className="section workflow-section" ref={ref}>
      <div className="container">
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
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.4 }}
                className="active-step-card"
              >
                <div className="step-watermark">{steps[activeStep].num}</div>
                <div className="step-badge">STEP {steps[activeStep].num}</div>
                <h3 className="step-title">{steps[activeStep].title}</h3>
                <p className="step-desc">{steps[activeStep].desc}</p>
                
                <div className="step-progress-bar">
                  <motion.div 
                    className="progress-fill" 
                    initial={{ width: 0 }}
                    animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side: Interactive Orbital Dial */}
          <div className="orbital-dial-wrapper">
            {/* The spinning rings */}
            <div className="dial-ring ring-outer"></div>
            <div className="dial-ring ring-inner"></div>

            {/* The Dial Container that rotates */}
            <motion.div 
              className="dial-container"
              animate={{ rotate: rotation }}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
            >
              {steps.map((step, index) => {
                // Calculate position on the circle (start at top: -90deg)
                const angle = (index * 60) - 90; 
                // Convert angle to radians for x/y positioning
                const radian = angle * (Math.PI / 180);
                const radius = 220; // radius of the circle
                const x = Math.cos(radian) * radius;
                const y = Math.sin(radian) * radius;

                const isActive = index === activeStep;

                return (
                  <motion.button
                    key={step.num}
                    className={`dial-node ${isActive ? 'is-active' : ''}`}
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    onClick={() => handleNodeClick(index)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {/* Reverse the rotation so the icons stay upright while the dial spins */}
                    <motion.div 
                      className="node-icon-wrapper"
                      animate={{ rotate: -rotation }}
                      transition={{ type: "spring", stiffness: 60, damping: 15 }}
                    >
                      {step.icon}
                    </motion.div>
                    
                    {/* Number badge on the node */}
                    <motion.div 
                      className="node-number"
                      animate={{ rotate: -rotation }}
                      transition={{ type: "spring", stiffness: 60, damping: 15 }}
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
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .workflow-section {
          border-top: 1px solid var(--border);
          padding-top: 8rem;
          padding-bottom: 8rem;
          background: var(--bg-primary);
          overflow: hidden;
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
          max-width: 1100px;
          margin: 0 auto;
          gap: 4rem;
        }

        /* --- Left Side: Content --- */
        .orbital-content {
          flex: 1;
          position: relative;
          min-height: 400px;
          display: flex;
          align-items: center;
        }

        .content-glow {
          position: absolute;
          width: 300px;
          height: 300px;
          background: var(--accent);
          filter: blur(150px);
          opacity: 0.15;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 0;
          pointer-events: none;
        }

        .active-step-card {
          position: relative;
          z-index: 1;
          background: rgba(17, 32, 29, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          padding: 4rem 3rem;
          backdrop-filter: blur(20px);
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          width: 100%;
        }

        .step-watermark {
          position: absolute;
          top: -30px;
          right: 20px;
          font-family: var(--font-display);
          font-size: 14rem;
          font-weight: 900;
          line-height: 1;
          color: rgba(94, 234, 212, 0.03);
          pointer-events: none;
          z-index: 0;
        }

        .step-badge {
          position: relative;
          z-index: 1;
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--bg-primary);
          background: var(--accent);
          padding: 0.5rem 1.25rem;
          border-radius: 100px;
          margin-bottom: 1.5rem;
          box-shadow: 0 0 20px rgba(94, 234, 212, 0.4);
        }

        .step-title {
          position: relative;
          z-index: 1;
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          letter-spacing: 0.02em;
        }

        .step-desc {
          position: relative;
          z-index: 1;
          font-size: 1.15rem;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 3rem;
        }

        .step-progress-bar {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: var(--accent);
          border-radius: 4px;
          box-shadow: 0 0 10px var(--accent);
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
        }

        .dial-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px dashed rgba(255, 255, 255, 0.1);
          pointer-events: none;
        }
        .ring-outer {
          width: 440px;
          height: 440px;
          animation: spin-slow 40s linear infinite reverse;
        }
        .ring-inner {
          width: 300px;
          height: 300px;
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
          background: var(--bg-secondary);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text-dim);
          transition: all 0.3s;
          padding: 0;
          outline: none;
          z-index: 3;
        }

        .dial-node:hover {
          border-color: var(--accent);
          color: var(--text-primary);
          box-shadow: 0 0 20px rgba(94, 234, 212, 0.2);
        }

        .dial-node.is-active {
          background: var(--accent);
          color: var(--bg-primary);
          border-color: var(--accent);
          box-shadow: 0 0 30px rgba(94, 234, 212, 0.5);
          transform-origin: center center;
        }

        .node-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .node-number {
          position: absolute;
          bottom: -25px;
          left: 50%;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          pointer-events: none;
          transform: translateX(-50%);
        }
        .dial-node.is-active .node-number {
          color: var(--accent);
        }

        /* Center Core */
        .dial-center-core {
          position: absolute;
          width: 140px;
          height: 140px;
          background: rgba(17, 32, 29, 0.8);
          border: 1px solid rgba(94, 234, 212, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          backdrop-filter: blur(10px);
          box-shadow: inset 0 0 40px rgba(94, 234, 212, 0.1);
        }
        
        .core-inner {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(94, 234, 212, 0.4), transparent 70%);
          border: 1px solid rgba(94, 234, 212, 0.3);
          box-shadow: 0 0 30px rgba(94, 234, 212, 0.3);
          animation: pulse-core 3s ease-in-out infinite alternate;
        }

        @keyframes pulse-core {
          0% { transform: scale(0.9); opacity: 0.8; }
          100% { transform: scale(1.1); opacity: 1; }
        }

        @media (max-width: 1024px) {
          .workflow-orbital-container {
            flex-direction: column-reverse;
            gap: 6rem;
          }
          .orbital-content {
            width: 100%;
            max-width: 600px;
          }
          .orbital-dial-wrapper {
            transform: scale(0.85);
          }
        }
        
        @media (max-width: 600px) {
          .orbital-dial-wrapper {
            transform: scale(0.65);
            margin-top: -3rem;
            margin-bottom: -3rem;
          }
          .active-step-card {
            padding: 2.5rem 1.5rem;
          }
          .step-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
