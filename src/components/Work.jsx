import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

const projects = [
  {
    num: '01',
    title: 'ReelMatic',
    desc: 'A premium video production and creative agency management platform for Instagram reel production.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    features: ['Booking System', 'Pricing Engine', 'Lead Management', 'CMS Dashboard'],
    live: 'https://reelmatic-by-vivek.vercel.app',
    github: '#',
    image: null,
    color: '#5EEAD4',
  },
  {
    num: '02',
    title: 'FlowForge',
    desc: 'A collaborative project management system with kanban boards, task tracking and team workflows.',
    tech: ['React', 'Node.js', 'MongoDB', 'JWT Auth'],
    features: ['Kanban Boards', 'Team Management', 'Real-time Updates', 'Role-based Access'],
    live: '#',
    github: '#',
    image: null,
    color: '#14B8A6',
  },
  {
    num: '03',
    title: 'DevConnect',
    desc: 'A developer portfolio and networking platform connecting tech professionals with opportunities.',
    tech: ['React', 'Express.js', 'MongoDB', 'REST API'],
    features: ['User Profiles', 'Search & Filter', 'Messaging', 'Portfolio Builder'],
    live: '#',
    github: '#',
    image: null,
    color: '#2dd4bf',
  },
];

function ProjectCard({ project, index, inView }) {
  const [hovered, setHovered] = useState(false);
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      className={`project-card ${isReversed ? 'project-card--reversed' : ''}`}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="VIEW"
    >
      <div className="project-preview">
        <div className="project-preview-inner" style={{ background: `linear-gradient(135deg, ${project.color}10, ${project.color}05)` }}>
          <div className="project-preview-content">
            <span className="project-preview-num" style={{ color: project.color }}>{project.num}</span>
            <span className="project-preview-name">{project.title}</span>
            <div className="project-preview-code">
              <span style={{ color: '#c792ea' }}>{'<'}</span>
              <span style={{ color: project.color }}>{project.title}</span>
              <span style={{ color: '#c792ea' }}>{' />'}</span>
            </div>
          </div>
          <motion.div
            className="project-preview-overlay"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight size={32} />
          </motion.div>
        </div>
      </div>

      <div className="project-info">
        <span className="project-num">{project.num}</span>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.desc}</p>

        <div className="project-features">
          {project.features.map((f, i) => (
            <span key={i} className="project-feature">{f}</span>
          ))}
        </div>

        <div className="project-tech">
          {project.tech.map((t, i) => (
            <span key={i} className="project-tech-tag">{t}</span>
          ))}
        </div>

        <div className="project-links">
          <a href={project.live} className="project-link" target="_blank" rel="noopener noreferrer" data-cursor="OPEN">
            <ExternalLink size={16} /> Live Demo
          </a>
          <a href={project.github} className="project-link" target="_blank" rel="noopener noreferrer" data-cursor="OPEN">
            <GithubIcon size={16} /> GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Work() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="work" className="section work-section" ref={ref}>
      <div className="container">
        <motion.div
          className="work-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">Portfolio</span>
          <h2 className="section-title">SELECTED <span className="gradient-text">WORK</span></h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Things I've built, shipped and crafted.
          </p>
        </motion.div>

        <div className="projects-list">
          {projects.map((project, i) => (
            <ProjectCard key={project.num} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>

      <style>{`
        .work-section {
          border-top: 1px solid var(--border);
        }
        .work-header {
          text-align: center;
          margin-bottom: 5rem;
        }
        .projects-list {
          display: flex;
          flex-direction: column;
          gap: 6rem;
        }
        .project-card {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 4rem;
          align-items: center;
        }
        .project-card--reversed {
          direction: rtl;
        }
        .project-card--reversed > * {
          direction: ltr;
        }

        /* Preview */
        .project-preview {
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--glass-border);
          transition: border-color 0.3s;
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .project-card:hover .project-preview {
          border-color: var(--border-hover);
        }
        .project-preview-inner {
          aspect-ratio: 16 / 9;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .project-card:hover .project-preview-inner {
          transform: scale(1.04);
        }
        .project-preview-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          text-align: center;
        }
        .project-preview-num {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.2em;
        }
        .project-preview-name {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .project-preview-code {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          opacity: 0.5;
        }
        .project-preview-overlay {
          position: absolute;
          inset: 0;
          background: rgba(94, 234, 212, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
        }

        /* Info */
        .project-info {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .project-num {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--accent);
          letter-spacing: 0.2em;
        }
        .project-title {
          font-size: 1.75rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .project-desc {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .project-features {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .project-feature {
          font-size: 0.75rem;
          color: var(--text-muted);
          padding: 0.35rem 0.75rem;
          border: 1px solid var(--border);
          border-radius: 100px;
          font-family: var(--font-mono);
        }
        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }
        .project-tech-tag {
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--accent);
          padding: 0.4rem 0.9rem;
          background: rgba(94, 234, 212, 0.08);
          border-radius: 100px;
        }
        .project-links {
          display: flex;
          gap: 1.5rem;
          margin-top: 0.5rem;
        }
        .project-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-muted);
          transition: color 0.3s;
        }
        .project-link:hover {
          color: var(--accent);
        }

        @media (max-width: 900px) {
          .project-card,
          .project-card--reversed {
            grid-template-columns: 1fr;
            direction: ltr;
            gap: 2rem;
          }
        }
        @media (max-width: 480px) {
          .project-preview-name {
            font-size: 1.75rem;
          }
          .project-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
