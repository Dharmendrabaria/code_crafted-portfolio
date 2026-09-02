import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Mail, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';

const WHATSAPP_NUMBER = '918799462715';

function buildWhatsAppMessage(data) {
  const lines = [
    `*Subject: New Project Inquiry - Code Crafted*`,
    ``,
    `Hello Dharmendra,`,
    ``,
    `I am reaching out to you from your portfolio website. I would like to discuss a potential collaboration. Please find my details below:`,
    ``,
    `*--- Client Details ---*`,
    `*Name:* ${data.name}`,
    `*Email:* ${data.email}`,
  ];
  if (data.service) lines.push(`*Service Required:* ${data.service}`);
  lines.push(
    ``, 
    `*--- Message ---*`, 
    data.message, 
    ``, 
    `Looking forward to your response.`,
    ``,
    `Best regards,`,
    `${data.name}`
  );
  return lines.join('\n');
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = buildWhatsAppMessage(formData);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', service: '', message: '' });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('d.baria2411@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="contact" className="section contact-section" ref={ref}>
      <div className="contact-bg-glow" />

      <div className="container">
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">Collaboration</span>
          <h2 className="section-title">LET'S WORK <span className="gradient-text">TOGETHER</span></h2>
        </motion.div>

        <motion.div
          className="bento-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Main Form Card (Spans 2 columns) */}
          <motion.div className="bento-card bento-form-card" variants={cardVariants}>
            <div className="card-glare" />
            <div className="bento-header">
              <h3>Send a Message</h3>
              <p>Fill out the form below and I'll get back to you within 24 hours.</p>
            </div>

            <form onSubmit={handleSubmit} className="bento-form">
              <div className="form-row">
                <div className="form-group">
                  <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-group">
                <select name="service" value={formData.service} onChange={handleChange} required>
                  <option value="" disabled hidden>Select Service</option>
                  <option value="Website Development">Website Development</option>
                  <option value="Full-Stack Application">Full-Stack Application</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Other">Other Inquiry</option>
                </select>
              </div>

              <div className="form-group">
                <textarea name="message" placeholder="Tell me about your project..." value={formData.message} onChange={handleChange} rows={4} required />
              </div>

              <button type="submit" className="bento-submit-btn" disabled={submitted}>
                {submitted ? (
                  <span className="success"><CheckCircle2 size={18} /> Sent to WhatsApp</span>
                ) : (
                  <span>Launch Project <Send size={16} className="btn-icon" /></span>
                )}
              </button>
            </form>
          </motion.div>

          {/* Right Side Column */}
          <div className="bento-right-col">

            {/* Email Card */}
            <motion.div className="bento-card bento-mini-card" variants={cardVariants}>
              <div className="bento-mini-content">
                <div className="mini-icon-box"><Mail size={24} /></div>
                <div>
                  <h4>Email Me</h4>
                  <p>d.baria2411@gmail.com</p>
                </div>
              </div>
              <button className="copy-btn" onClick={handleCopyEmail}>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </motion.div>

            {/* WhatsApp Card */}
            <motion.a
              href="https://wa.me/918799462715"
              target="_blank"
              rel="noopener noreferrer"
              className="bento-card bento-mini-card whatsapp-card"
              variants={cardVariants}
            >
              <div className="bento-mini-content">
                <div className="mini-icon-box whatsapp-box"><MessageCircle size={24} /></div>
                <div>
                  <h4>WhatsApp</h4>
                  <p>+91 87994 62715</p>
                </div>
              </div>
              <ArrowUpRight className="wa-arrow" size={20} />
            </motion.a>

            {/* Socials Card */}
            <motion.div className="bento-card bento-social-card" variants={cardVariants}>
              <h4>Connect</h4>
              <div className="social-links-row">
                <a href="https://github.com/dharmendrabaria" target="_blank" rel="noopener noreferrer" className="bento-social-btn">
                  <GithubIcon size={22} />
                </a>
                <a href="https://www.linkedin.com/in/dharmendra-baria-579b31312" target="_blank" rel="noopener noreferrer" className="bento-social-btn">
                  <LinkedinIcon size={22} />
                </a>
                <a href="https://www.instagram.com/_.code._crafted" target="_blank" rel="noopener noreferrer" className="bento-social-btn">
                  <InstagramIcon size={22} />
                </a>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>

      <style>{`
        .contact-section {
          padding-top: 8rem;
          padding-bottom: 0;
          background: var(--bg-primary);
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .contact-bg-glow {
          position: absolute;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(94, 234, 212, 0.04) 0%, transparent 60%);
          top: 0;
          right: -20%;
          pointer-events: none;
        }

        .contact-header {
          text-align: center;
          margin-bottom: 5rem;
        }

        /* Bento Grid System */
        .bento-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }

        .bento-right-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .bento-card {
          background: rgba(17, 32, 29, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .bento-card:hover {
          border-color: rgba(94, 234, 212, 0.2);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .card-glare {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(125deg, rgba(255,255,255,0.05) 0%, transparent 40%);
          pointer-events: none;
        }

        /* Form Card */
        .bento-form-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .bento-header h3 {
          font-family: var(--font-display);
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        .bento-header p {
          color: var(--text-muted);
          font-size: 1rem;
          margin-bottom: 2rem;
        }

        .bento-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 1.2rem;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 1rem;
          outline: none;
          transition: all 0.3s;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: var(--accent);
          background: rgba(94, 234, 212, 0.03);
          box-shadow: 0 0 0 4px rgba(94, 234, 212, 0.1);
        }
        
        .form-group select {
          appearance: none;
          cursor: pointer;
        }
        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .bento-submit-btn {
          width: 100%;
          padding: 1.25rem;
          background: var(--accent);
          color: #000;
          border: none;
          border-radius: 12px;
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 1rem;
          letter-spacing: 0.05em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          transition: all 0.3s;
          margin-top: 0.5rem;
        }
        
        .bento-submit-btn:hover {
          background: #4de3cd;
          box-shadow: 0 10px 25px rgba(94, 234, 212, 0.3);
          transform: translateY(-2px);
        }

        .bento-submit-btn .btn-icon {
          transition: transform 0.3s;
        }
        .bento-submit-btn:hover .btn-icon {
          transform: translateX(4px) translateY(-4px);
        }

        .bento-submit-btn:disabled {
          background: rgba(94, 234, 212, 0.2);
          color: var(--accent);
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }
        
        .success {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* Mini Cards */
        .bento-mini-card {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 2rem;
          text-decoration: none;
          color: inherit;
        }

        .bento-mini-content {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .mini-icon-box {
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          transition: all 0.3s;
        }
        
        .whatsapp-box {
          background: rgba(37, 211, 102, 0.1);
          color: #25D366;
        }

        .bento-mini-card h4 {
          font-size: 1.1rem;
          margin-bottom: 0.2rem;
        }
        .bento-mini-card p {
          color: var(--text-dim);
          font-size: 0.9rem;
        }

        .copy-btn {
          background: rgba(255, 255, 255, 0.08);
          border: none;
          color: var(--text-primary);
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.3s;
        }
        .copy-btn:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .whatsapp-card:hover .whatsapp-box {
          background: #25D366;
          color: #fff;
        }
        .wa-arrow {
          color: var(--text-dim);
          transition: all 0.3s;
        }
        .whatsapp-card:hover .wa-arrow {
          color: #25D366;
          transform: translate(4px, -4px);
        }

        /* Social Card */
        .bento-social-card {
          padding: 2rem;
        }
        .bento-social-card h4 {
          margin-bottom: 1.25rem;
          font-size: 1.1rem;
        }
        .social-links-row {
          display: flex;
          gap: 1rem;
        }
        .bento-social-btn {
          flex: 1;
          height: 60px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          transition: all 0.3s;
        }
        .bento-social-btn:hover {
          background: rgba(94, 234, 212, 0.1);
          border-color: var(--accent);
          color: var(--accent);
          transform: translateY(-3px);
        }

        @media (max-width: 1024px) {
          .bento-grid {
            grid-template-columns: 1fr;
          }
          .bento-right-col {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }
          .bento-social-card {
            grid-column: span 2;
          }
        }
        
        @media (max-width: 650px) {
          .bento-right-col {
            grid-template-columns: 1fr;
          }
          .bento-social-card {
            grid-column: span 1;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
          .bento-card {
            padding: 1.5rem;
            border-radius: 18px;
          }
        }

        @media (max-width: 380px) {
          .bento-card {
            padding: 1.25rem;
          }
          .bento-header h3 {
            font-size: 1.5rem;
          }
          .bento-submit-btn {
            padding: 1rem;
            font-size: 0.85rem;
          }
          .mini-icon-box {
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }
          .bento-mini-card {
            padding: 1.25rem;
          }
        }
      `}</style>
    </section>
  );
}
