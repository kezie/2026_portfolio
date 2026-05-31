import React from 'react';
import { motion } from 'framer-motion';
import Annotation from './Annotation';

const stats = [
  { label: 'Years Active', value: '10+' },
  { label: 'Sites Optimized', value: '10+' },
  { label: 'Avg. Traffic Lift', value: '3×' },
  { label: 'Core Web Vitals', value: '100' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-40 px-6 md:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        {/* Left column */}
        <div className="lg:col-span-5">
          <Annotation label="03 / ABOUT" />
          <motion.h2
            className="font-display text-5xl md:text-6xl lg:text-7xl tracking-[-0.04em] mt-4 text-foreground leading-[0.95]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Engineering
            <br />
            <span className="italic">visibility</span>
            <br />
            by design
          </motion.h2>

          {/* Stats grid */}
          <motion.div
            className="grid grid-cols-2 gap-px bg-border mt-12 md:mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="bg-background p-6">
                <span className="font-display text-3xl md:text-4xl text-foreground">{stat.value}</span>
                <span className="block font-mono text-[10px] tracking-widest uppercase text-muted-foreground mt-2">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right column - narrative */}
        <div className="lg:col-span-6 lg:col-start-7">
          <motion.div
            className="border-l border-border pl-6 md:pl-10 space-y-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <p className="font-body text-lg md:text-xl text-foreground leading-[1.7] font-light">
              I treat search engines as an engineering problem — not a guessing game. 
              Every site I build is a precision instrument: fast, crawlable, and 
              architected to earn and hold top positions.
            </p>
            <p className="font-body text-base text-muted-foreground leading-[1.7]">
              With 10+ years across technical SEO, full-stack web development, and 
              performance engineering, I've helped SaaS companies, e-commerce brands, 
              healthcare institutions, and media publishers multiply organic traffic through code-level precision — 
              not just keyword strategy.
            </p>
            <p className="font-body text-base text-muted-foreground leading-[1.7]">
              When I'm not deep in a crawl log or a Lighthouse report, I'm contributing 
              to open-source tooling and writing about the intersection of web performance 
              and organic growth.
            </p>
          </motion.div>

          {/* Services */}
          <motion.div
            className="mt-12 md:mt-16 border-t border-border pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Annotation label="SERVICES" className="mb-6 block" />
            <div className="flex flex-wrap gap-3">
              {['Technical SEO', 'React / Node.js', 'PHP', 'Core Web Vitals', 'Site Architecture', 'Python', 'Automation' ,'Programmatic Ads'].map(
                (service) => (
                  <span
                    key={service}
                    className="border border-border px-4 py-2 font-mono text-[11px] tracking-widest uppercase text-foreground hover:border-foreground transition-colors duration-300"
                  >
                    {service}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}