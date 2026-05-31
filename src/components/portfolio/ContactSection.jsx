import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Send } from 'lucide-react';
import Annotation from './Annotation';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', projectType: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-24 md:py-40 px-6 md:px-12 min-h-screen flex flex-col justify-center">
      <Annotation label="04 / DIRECT INQUIRY" />
      
      <motion.div
        className="mt-8 md:mt-12 max-w-5xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12">
          {/* Fill-in-the-blank style form */}
          <div className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.4] md:leading-[1.5] tracking-[-0.03em] text-foreground">
            <span>Hi, my name is </span>
            <span className="relative inline-block">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="your name"
                className="bg-transparent border-b-2 border-foreground font-display italic text-accent placeholder:text-muted-foreground/40 outline-none w-48 md:w-64 lg:w-80 pb-1 focus:border-accent transition-colors"
                required
              />
            </span>
            <span> and I need help with </span>
            <span className="relative inline-block">
              <input
                type="text"
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                placeholder="SEO / web dev"
                className="bg-transparent border-b-2 border-foreground font-display italic text-accent placeholder:text-muted-foreground/40 outline-none w-40 md:w-56 lg:w-72 pb-1 focus:border-accent transition-colors"
                required
              />
            </span>
          </div>

          {/* Message area */}
          <div className="border-t border-border pt-8">
            <label className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground block mb-4">
              ADDITIONAL DETAILS
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell me about your site, goals, and current challenges..."
              className="w-full bg-transparent font-body text-lg text-foreground placeholder:text-muted-foreground/30 resize-none outline-none leading-relaxed h-32"
              rows={4}
            />
          </div>

          {/* Submit button */}
          <motion.button
            type="submit"
            className="group relative flex items-center gap-4 bg-foreground text-primary-foreground px-8 md:px-12 py-4 md:py-5 font-mono text-xs tracking-[0.2em] uppercase overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">
              {submitted ? 'Message Sent' : 'Send Inquiry'}
            </span>
            <motion.span
              className="relative z-10"
              animate={submitted ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              {submitted ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              )}
            </motion.span>
            <motion.div
              className="absolute inset-0 bg-accent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.button>
        </form>
      </motion.div>

      {/* Contact info row */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 md:mt-32 border-t border-border pt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div>
          <Annotation label="EMAIL" className="block mb-2" />
          <a href="mailto:mail@chikezie.com.ng" className="font-body text-sm text-foreground hover:text-accent transition-colors">
            mail@chikezie.com.ng
          </a>
        </div>
        <div>
          <Annotation label="BASED IN" className="block mb-2" />
          <span className="font-body text-sm text-foreground">Abuja, NG</span>
        </div>
        <div>
          <Annotation label="AVAILABILITY" className="block mb-2" />
          <span className="font-body text-sm text-foreground flex items-center gap-2">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            Open for projects
          </span>
        </div>
      </motion.div>
    </section>
  );
}