import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

const projects = [
  {
    num: '01',
    title: 'ReelMatic',
    desc: 'A premium video production and creative agency management platform. Built to handle complex lead tracking, interactive pricing engines, and seamless client onboarding for high-end Instagram reel production.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    live: 'https://reelmatic-by-vivek.vercel.app',
    github: '#',
    color: '#5EEAD4',
  },
  {
    num: '02',
    title: 'FlowForge',
    desc: 'A collaborative project management ecosystem featuring real-time kanban boards, task tracking, and role-based team workflows. Engineered for speed and scalability.',
    tech: ['React', 'Node.js', 'MongoDB', 'JWT Auth'],
    live: '#',
    github: '#',
    color: '#14B8A6',
  },
  {
    num: '03',
    title: 'DevConnect',
    desc: 'A specialized networking platform connecting elite tech professionals with opportunities. Features advanced filtering, messaging, and automated portfolio generation.',
    tech: ['React', 'Express.js', 'MongoDB', 'REST API'],
    live: '#',
    github: '#',
    color: '#2dd4bf',
  },
];

function ProjectCard({ project, index, targetScale }) {
  const cardRef = useRef(null);

  // Parallax effect for the inner content
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start']
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <div className="project-card-container">
      <motion.div
        className="project-card"
        ref={cardRef}
        style={{
          scale: targetScale,
          top: `calc(10vh + ${index * 30}px)`
        }}
      >
        <div className="project-card-glow" style={{ background: `radial-gradient(circle at 80% 0%, ${project.color}20 0%, transparent 60%)` }} />

        <div className="project-content">
          <div className="project-info">
            <div className="project-header">
              <span className="project-num" style={{ color: project.color }}>{project.num}</span>
              <h3 className="project-title">{project.title}</h3>
            </div>

            <p className="project-desc">{project.desc}</p>

            <div className="project-tech">
              {project.tech.map((t, i) => (
                <span key={i} className="project-tech-tag">{t}</span>
              ))}
            </div>

            <div className="project-links">
              <a href={project.live} className="project-link primary-link" target="_blank" rel="noopener noreferrer" style={{ '--hover-color': project.color }}>
                <span>Live Demo</span> <ArrowUpRight size={18} />
              </a>
              <a href={project.github} className="project-link secondary-link" target="_blank" rel="noopener noreferrer">
                <GithubIcon size={18} /> <span>Source</span>
              </a>
            </div>
          </div>

          <div className="project-visual">
            <motion.div className="browser-mockup" style={{ scale: imageScale }}>
              <div className="browser-header">
                <span className="browser-dot close" />
                <span className="browser-dot min" />
                <span className="browser-dot max" />
              </div>
              <div className="browser-body" style={{ background: `linear-gradient(135deg, rgba(17,32,29,0.9), ${project.color}15)` }}>
                <div className="mockup-content">
                  <span className="mockup-logo" style={{ color: project.color }}>{project.title}</span>
                  <div className="mockup-lines">
                    <div className="mockup-line w-3/4" />
                    <div className="mockup-line w-1/2" />
                    <div className="mockup-line w-5/6" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Work() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <section id="work" className="section work-section" ref={containerRef}>
      <div className="container">
        <motion.div
          className="work-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">Selected Projects</span>
          <h2 className="section-title">THE <span className="gradient-text">PORTFOLIO</span></h2>
        </motion.div>

        <div className="projects-stack">
          {projects.map((project, i) => {
            // Calculate scale down for previous cards
            const targetScale = useTransform(
              scrollYProgress,
              [i * (1 / projects.length), 1],
              [1, 1 - (projects.length - i) * 0.02]
            );

            return (
              <ProjectCard
                key={project.num}
                project={project}
                index={i}
                targetScale={targetScale}
              />
            );
          })}
        </div>
      </div>

      <style>{`
        .work-section {
          position: relative;
          z-index: 2;
          padding-top: 6rem;
          padding-bottom: 10rem;
        }
        .work-header {
          text-align: center;
          margin-bottom: clamp(3rem, 6vw, 6rem);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .projects-stack {
          display: flex;
          flex-direction: column;
          gap: 4rem;
          position: relative;
        }
        
        .project-card-container {
          position: sticky;
          top: 10vh;
          height: 80vh;
          max-height: 600px;
          display: flex;
          align-items: center;
        }
        
        .project-card {
          width: 100%;
          height: 100%;
          background: rgba(17, 32, 29, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: clamp(20px, 4vw, 32px);
          overflow: hidden;
          position: relative;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transform-origin: top center;
          box-shadow: 0 -20px 40px rgba(0,0,0,0.4);
        }
        
        .project-card-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        
        .project-content {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: 100%;
        }
        
        /* Left Info Side */
        .project-info {
          padding: clamp(1.5rem, 4vw, 4rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: clamp(1rem, 2vw, 2rem);
        }
        .project-header {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .project-num {
          font-family: var(--font-mono);
          font-size: 1rem;
          letter-spacing: 0.1em;
          font-weight: 600;
        }
        .project-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: var(--text-primary);
        }
        .project-desc {
          font-size: clamp(0.9rem, 1.8vw, 1.1rem);
          color: var(--text-muted);
          line-height: 1.7;
          max-width: 90%;
        }
        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .project-tech-tag {
          font-family: var(--font-mono);
          font-size: clamp(0.65rem, 1.2vw, 0.75rem);
          color: var(--text-primary);
          padding: 0.4rem 0.8rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 100px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .project-links {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-top: 0.5rem;
          flex-wrap: wrap;
        }
        .project-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: clamp(0.75rem, 1.5vw, 0.85rem);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: all 0.3s;
        }
        .primary-link {
          color: var(--bg-primary);
          background: var(--text-primary);
          padding: 0.8rem 1.25rem;
          border-radius: 100px;
        }
        .primary-link:hover {
          background: var(--hover-color);
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        .secondary-link {
          color: var(--text-muted);
        }
        .secondary-link:hover {
          color: var(--text-primary);
        }
        
        /* Right Visual Side */
        .project-visual {
          border-left: 1px solid rgba(255, 255, 255, 0.05);
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: rgba(0, 0, 0, 0.2);
        }
        .browser-mockup {
          width: 100%;
          height: 100%;
          max-height: 400px;
          background: #000;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }
        .browser-header {
          height: 32px;
          background: #111;
          display: flex;
          align-items: center;
          padding: 0 1rem;
          gap: 6px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          flex-shrink: 0;
        }
        .browser-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .close { background: #ff5f56; }
        .min { background: #ffbd2e; }
        .max { background: #27c93f; }
        
        .browser-body {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .mockup-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          width: 80%;
        }
        .mockup-logo {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          font-weight: 700;
          letter-spacing: -0.05em;
        }
        .mockup-lines {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
        }
        .mockup-line {
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .w-3\\/4 { width: 75%; }
        .w-1\\/2 { width: 50%; }
        .w-5\\/6 { width: 83%; }

        /* ===== TABLET ===== */
        @media (max-width: 1024px) {
          .work-section {
            padding-bottom: 6rem;
          }
          .project-card-container {
            height: 85vh;
            max-height: 800px;
          }
          .projects-stack {
            gap: 2rem;
          }
          .project-content {
            grid-template-columns: 1fr;
          }
          .project-visual {
            border-left: none;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            min-height: 250px;
          }
          .project-info {
            padding: 2.5rem 2rem;
          }
          .project-desc {
            max-width: 100%;
          }
        }

        /* ===== MOBILE ===== */
        @media (max-width: 640px) {
          .project-info {
            padding: 1.5rem;
          }
          .project-visual {
            min-height: 200px;
            padding: 1.25rem;
          }
        }

        /* ===== VERY SMALL MOBILE ===== */
        @media (max-width: 380px) {
          .project-links {
            flex-direction: column;
            align-items: stretch;
          }
          .primary-link {
            justify-content: center;
          }
          .secondary-link {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
