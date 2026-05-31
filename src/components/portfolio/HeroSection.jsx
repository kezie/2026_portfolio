import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const HERO_IMAGE = 'https://media.base44.com/images/public/6a05e6f6183a677fd3f8f616/944306e25_generated_8a9811d4.png';

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.6], [0.35, 0.8]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 0.4]);

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] min-h-[600px] overflow-hidden flex flex-col justify-end"
    >
      {/* Background parallax image */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: imageY }}
      >
        <motion.img
          src={HERO_IMAGE}
          alt="Macro close-up of ink pressing onto cotton paper with architectural lighting"
          className="w-full h-[115%] object-cover"
          style={{ opacity: imageOpacity }}
        />
      </motion.div>

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 z-[1] bg-foreground"
        style={{ opacity: overlayOpacity }}
      />

      {/* Annotation top-left */}
      <motion.div
        className="absolute top-28 left-6 md:left-12 z-10 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="block">01 / TYPE: SEO ENGINEER | WEB DEVELOPER | AUTOMATION SPECIALIST</span>
        <span className="block mt-1">STACK: React · Node.js · PHP · PYTHON · Core Web Vitals</span>
      </motion.div>

      {/* Main display text */}
      <motion.div
        className="relative z-10 px-6 md:px-12 pb-12 md:pb-20"
        style={{ y: textY }}
      >
        <div className="overflow-hidden">
          <motion.h1
            className="font-display text-[14vw] md:text-[12vw] leading-[0.85] tracking-[-0.05em] text-foreground"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            Ranked.
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            className="font-display italic text-[14vw] md:text-[12vw] leading-[0.85] tracking-[-0.05em] text-foreground"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          >
            Built.
          </motion.h1>
        </div>

        {/* Bottom row */}
        <motion.div
          className="flex items-end justify-between mt-8 md:mt-12 border-t border-border pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="max-w-sm">
            <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
              SEO Engineer & Web Developer. I build fast, search-optimized 
              web experiences that rank, convert, and endure.
            </p>
          </div>
          <motion.div
            className="hidden md:flex items-center gap-2 font-mono text-xs tracking-widest text-muted-foreground"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            SCROLL
            <ArrowDown className="w-3.5 h-3.5" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}