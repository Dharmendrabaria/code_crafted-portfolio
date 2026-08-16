import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Mail, Phone, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';

const WHATSAPP_NUMBER = '918799462715';

function buildWhatsAppMessage(data) {
  const lines = [
    `🚀 *New Project Inquiry — Code Crafted*`,
    ``,
    `👤 *Name:* ${data.name}`,
    `📧 *Email:* ${data.email}`,
  ];
  if (data.company) lines.push(`🏢 *Company:* ${data.company}`);
  if (data.projectType) lines.push(`📂 *Project Type:* ${data.projectType}`);
  if (data.budget) lines.push(`💰 *Budget:* ${data.budget}`);
  lines.push(``, `💬 *Message:*`, data.message, ``, `— Sent from codecrafted.dev`);
  return lines.join('\n');
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', projectType: '', budget: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = buildWhatsAppMessage(formData);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', company: '', projectType: '', budget: '', message: '' });
  };

  const socials = [
    { icon: <Mail size={18} />, label: 'Email', href: 'mailto:d.baria2411@gmail.com', value: 'd.baria2411@gmail.com' },
    { icon: <Phone size={18} />, label: 'WhatsApp', href: 'https://wa.me/918799462715', value: '+91 87994 62715' },
    { icon: <GithubIcon size={18} />, label: 'GitHub', href: 'https://github.com/dharmendrabaria', value: 'github.com/dharmendrabaria' },
    { icon: <LinkedinIcon size={18} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/dharmendra-baria-579b31312', value: 'Dharmendra Baria' },
    { icon: <InstagramIcon size={18} />, label: 'Instagram', href: 'https://www.instagram.com/_.code._crafted', value: '@_.code._crafted' },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="contact" className="section contact-section" ref={ref}>
      <div className="contact-glow" />
      <div className="contact-glow contact-glow-2" />

      <div className="container">
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">LET'S BUILD SOMETHING <span className="gradient-text">GREAT.</span></h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Have a project in mind? Tell me about it and let's turn the idea into something real.
          </p>
        </motion.div>

        <div className="contact-grid">
          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div className="contact-form-row" variants={itemVariants}>
              <div className="contact-field">
                <label htmlFor="contact-name">Name *</label>
                <input type="text" id="contact-name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
              </div>
              <div className="contact-field">
                <label htmlFor="contact-email">Email *</label>
                <input type="email" id="contact-email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
              </div>
            </motion.div>

            <motion.div className="contact-form-row" variants={itemVariants}>
              <div className="contact-field">
                <label htmlFor="contact-company">Company</label>
                <input type="text" id="contact-company" name="company" value={formData.company} onChange={handleChange} placeholder="Your company" />
              </div>
              <div className="contact-field">
                <label htmlFor="contact-type">Project Type</label>
                <select id="contact-type" name="projectType" value={formData.projectType} onChange={handleChange}>
                  <option value="">Select type</option>
                  <option value="Website">Website</option>
                  <option value="React Application">React Application</option>
                  <option value="MERN Full-Stack">MERN Full-Stack</option>
                  <option value="Admin Dashboard">Admin Dashboard</option>
                  <option value="API Development">API Development</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </motion.div>

            <motion.div className="contact-field" variants={itemVariants}>
              <label htmlFor="contact-budget">Budget Range</label>
              <select id="contact-budget" name="budget" value={formData.budget} onChange={handleChange}>
                <option value="">Select budget</option>
                <option value="₹5,000 – ₹10,000">₹5,000 – ₹10,000</option>
                <option value="₹10,000 – ₹15,000">₹10,000 – ₹15,000</option>
                <option value="₹15,000 – ₹25,000">₹15,000 – ₹25,000</option>
                <option value="₹25,000 – ₹40,000">₹25,000 – ₹40,000</option>
                <option value="₹40,000 – ₹50,000">₹40,000 – ₹50,000</option>
                <option value="₹50,000+">₹50,000+</option>
              </select>
            </motion.div>

            <motion.div className="contact-field" variants={itemVariants}>
              <label htmlFor="contact-message">Message *</label>
              <textarea id="contact-message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell me about your project..." rows={5} required />
            </motion.div>

            <motion.button type="submit" className="btn btn-primary contact-submit" data-cursor="SEND" variants={itemVariants}>
              {submitted ? '✓ Sent to WhatsApp!' : <>Send Message <ArrowUpRight size={16} /></>}
            </motion.button>
          </motion.form>

          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="contact-info-heading">Let's connect</h3>
            <p className="contact-info-text">
              Whether you have a detailed project brief or just an idea, feel free to reach out. I'm always open to discussing new projects and opportunities.
            </p>

            <div className="contact-socials">
              {socials.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  className="contact-social"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="OPEN"
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                >
                  <div className="contact-social-icon">{s.icon}</div>
                  <div>
                    <span className="contact-social-label">{s.label}</span>
                    <span className="contact-social-value">{s.value}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact-section {
          border-top: 1px solid var(--border);
          background: var(--bg-secondary);
          position: relative;
          overflow: hidden;
        }
        .contact-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(94, 234, 212, 0.06) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .contact-glow-2 {
          width: 400px;
          height: 400px;
          top: 20%;
          left: 10%;
          background: radial-gradient(circle, rgba(20, 184, 166, 0.04) 0%, transparent 70%);
        }
        .contact-header {
          text-align: center;
          margin-bottom: 4rem;
          position: relative;
          z-index: 1;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 4rem;
          position: relative;
          z-index: 1;
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .contact-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }
        .contact-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .contact-field label {
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-muted);
          letter-spacing: 0.02em;
        }
        .contact-field input,
        .contact-field select,
        .contact-field textarea {
          background: var(--bg-primary);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 0.875rem 1rem;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 0.9rem;
          transition: all 0.3s var(--ease-out);
          outline: none;
        }
        .contact-field input:focus,
        .contact-field select:focus,
        .contact-field textarea:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(94, 234, 212, 0.1);
        }
        .contact-field input::placeholder,
        .contact-field textarea::placeholder {
          color: var(--text-dim);
        }
        .contact-field select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239AA9A6' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
        }
        .contact-field select option {
          background: var(--bg-primary);
          color: var(--text-primary);
        }
        .contact-field textarea {
          resize: vertical;
          min-height: 120px;
        }
        .contact-submit {
          align-self: flex-start;
          padding: 1rem 2.5rem;
        }
        .contact-info {
          padding: 2.5rem;
          border: 1px solid var(--border);
          border-radius: 20px;
          background: var(--bg-primary);
          align-self: start;
        }
        .contact-info-heading {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        .contact-info-text {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 2rem;
        }
        .contact-socials {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .contact-social {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border: 1px solid var(--border);
          border-radius: 12px;
          transition: all 0.3s var(--ease-out);
        }
        .contact-social:hover {
          border-color: var(--accent);
          background: rgba(94, 234, 212, 0.05);
          transform: translateX(4px);
        }
        .contact-social-icon {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: rgba(94, 234, 212, 0.08);
          color: var(--accent);
          flex-shrink: 0;
          transition: all 0.3s;
        }
        .contact-social:hover .contact-social-icon {
          background: rgba(94, 234, 212, 0.15);
          box-shadow: 0 0 15px rgba(94, 234, 212, 0.1);
        }
        .contact-social-label {
          display: block;
          font-size: 0.75rem;
          color: var(--text-dim);
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }
        .contact-social-value {
          display: block;
          font-size: 0.85rem;
          font-weight: 500;
        }
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .contact-form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
