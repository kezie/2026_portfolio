import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router';
import Annotation from './Annotation';

const projects = [
  {
    //Nile Media
    id: 'Agentic-identity',
    title: 'Agent Swarm',
    category: 'System Automation',
    year: '2026',
    image: 'https://media.base44.com/images/public/6a05e6f6183a677fd3f8f616/d2f73039f_generated_851737c6.png',
  },
    {
    //Ultimate HMO
    id: 'monolith-identity',
    title: 'Rank Zero',
    category: 'Full-Stack Dev',
    year: '2025',
    image: 'https://media.base44.com/images/public/6a05e6f6183a677fd3f8f616/d2f73039f_generated_851737c6.png',
  },
  {
    //Havosoft
    id: 'carbon-systems',
    title: 'Velocity Stack',
    category: 'Web Performance',
    year: '2025',
    image: 'https://media.base44.com/images/public/6a05e6f6183a677fd3f8f616/baa799063_generated_ca5957c5.png',
  },
  {
    //Nigeria First - Data Analysis
    id: 'tectonic-shift',
    title: 'Schema Engine',
    category: 'Structured Data',
    year: '2018',
    image: 'https://media.base44.com/images/public/6a05e6f6183a677fd3f8f616/beac88da1_generated_992d1c3c.png',
  },
  {
    //Kelina Hospital 
    id: 'blueprint-archive',
    title: 'Core Architecture',
    category: 'Technical SEO',
    year: '2022',
    image: 'https://media.base44.com/images/public/6a05e6f6183a677fd3f8f616/2680a599f_generated_956b85ca.png',
  },
  {
    //CPDI Africa
    id: 'glass-pavilion',
    title: 'Signal & Crawl',
    category: 'Programmatic Ads',
    year: '2020',
    image: 'https://media.base44.com/images/public/6a05e6f6183a677fd3f8f616/65c7d775c_generated_819d6998.png',
  },
];

export default function WorkArchive() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <section id="work" className="py-24 md:py-40 px-6 md:px-12">
      {/* Section header */}
      <div className="flex items-baseline justify-between mb-16 md:mb-24">
        <div>
          <Annotation label="02 / SELECTED WORK" />
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-[-0.04em] mt-4 text-foreground">
            Work Archive
          </h2>
        </div>
        <span className="hidden md:block font-mono text-xs text-muted-foreground tracking-widest">
          ({String(projects.length).padStart(2, '0')}) PROJECTS
        </span>
      </div>

      {/* Project list */}
      <div
        ref={containerRef}
        className="relative"
        onMouseMove={handleMouseMove}
      >
        {/* Cursor-follower image */}
        <AnimatePresence>
          {hoveredIndex !== null && (
            <motion.div
              className="hidden md:block fixed pointer-events-none z-30 w-[350px] lg:w-[420px] aspect-[4/3] overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: mousePos.x - 210,
                y: mousePos.y - 150,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
                x: { type: 'spring', stiffness: 150, damping: 25 },
                y: { type: 'spring', stiffness: 150, damping: 25 },
              }}
              style={{ position: 'absolute' }}
            >
              <img
                src={projects[hoveredIndex].image}
                alt={projects[hoveredIndex].title}
                className="w-full h-full object-cover grayscale-0 transition-all duration-700"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            className="border-t border-border py-6 md:py-8 cursor-pointer group relative z-10"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => navigate(`/project/${project.id}`)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-4 md:gap-8">
                <span className="font-mono text-[10px] text-muted-foreground tracking-widest">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-3xl md:text-5xl lg:text-[8vw] tracking-[-0.04em] text-foreground group-hover:text-accent transition-colors duration-500 leading-none">
                  {project.title}
                </h3>
              </div>
              <div className="hidden md:flex items-center gap-8">
                <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
                  {project.category}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground tracking-widest">
                  {project.year}
                </span>
                <motion.div
                  className="w-8 h-8 border border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent transition-all duration-300"
                  whileHover={{ rotate: 45 }}
                >
                  <svg
                    className="w-3 h-3 text-foreground group-hover:text-accent-foreground transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </motion.div>
              </div>
            </div>
            {/* Mobile meta */}
            <div className="flex md:hidden items-center gap-4 mt-2 ml-10">
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
                {project.category}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest">
                {project.year}
              </span>
            </div>
          </motion.div>
        ))}
        {/* Bottom border */}
        <div className="border-t border-border" />
      </div>
    </section>
  );
}