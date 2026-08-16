import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe, Layers, Database, LayoutDashboard, Server, Wrench } from 'lucide-react';

const services = [
  {
    num: '01',
    title: 'Website Development',
    desc: 'Modern websites tailored for businesses and brands, built with performance and user experience in mind.',
    icon: <Globe size={24} />,
  },
  {
    num: '02',
    title: 'React Development',
    desc: 'Fast and interactive frontend applications built with component-driven architecture and modern React patterns.',
    icon: <Layers size={24} />,
  },
  {
    num: '03',
    title: 'MERN Development',
    desc: 'Full-stack applications using MongoDB, Express, React and Node.js — from database to user interface.',
    icon: <Database size={24} />,
  },
  {
    num: '04',
    title: 'Admin Dashboards',
    desc: 'Powerful dashboards for managing business operations, data visualization and user management.',
    icon: <LayoutDashboard size={24} />,
  },
  {
    num: '05',
    title: 'API Development',
    desc: 'Secure and scalable REST APIs with authentication, validation and clean documentation.',
    icon: <Server size={24} />,
  },
  {
    num: '06',
    title: 'Maintenance & Support',
    desc: 'Ongoing improvements, updates, bug fixes and technical support to keep your product running smoothly.',
    icon: <Wrench size={24} />,
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="section services-section" ref={ref}>
      <div className="container">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">Services</span>
          <h2 className="section-title">WHAT <span className="gradient-text">I DO</span></h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            From idea to production-ready product.
          </p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, i) => (
            <motion.div
              key={service.num}
              className="service-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}
              data-cursor="VIEW"
            >
              <div className="service-top">
                <div className="service-icon">{service.icon}</div>
                <span className="service-num">{service.num}</span>
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
              <div className="service-line" />
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .services-section {
          border-top: 1px solid var(--border);
        }
        .services-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .service-card {
          padding: 2.25rem;
          border: 1px solid var(--border);
          border-radius: 16px;
          transition: all 0.4s var(--ease-out);
          position: relative;
          overflow: hidden;
        }
        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--accent-gradient);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s var(--ease-out);
        }
        .service-card:hover::before {
          transform: scaleX(1);
        }
        .service-card:hover {
          border-color: var(--border-hover);
          background: var(--bg-card);
          transform: translateY(-4px);
        }
        .service-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }
        .service-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: rgba(94, 234, 212, 0.08);
          color: var(--accent);
          transition: all 0.3s;
        }
        .service-card:hover .service-icon {
          background: rgba(94, 234, 212, 0.15);
          box-shadow: 0 0 20px rgba(94, 234, 212, 0.1);
        }
        .service-num {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          color: var(--text-dim);
        }
        .service-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          transition: color 0.3s;
        }
        .service-card:hover .service-title {
          color: var(--accent);
        }
        .service-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.7;
        }
        .service-line {
          height: 1px;
          background: var(--border);
          margin-top: 1.5rem;
          transition: background 0.3s;
        }
        .service-card:hover .service-line {
          background: var(--border-hover);
        }

        @media (max-width: 900px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 550px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
