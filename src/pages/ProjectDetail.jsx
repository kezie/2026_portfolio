import React from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Navbar from '../components/portfolio/Navbar';
import Annotation from '../components/portfolio/Annotation';
import Footer from '../components/portfolio/Footer';

const projects = [
  {
    id: 'monolith-identity',
    title: 'Rank Zero',
    category: 'Technical SEO',
    year: '2026',
    image: 'https://media.base44.com/images/public/6a05e6f6183a677fd3f8f616/d2f73039f_generated_851737c6.png',
    description: 'A full technical SEO overhaul for a B2B SaaS platform with 500k+ pages. Eliminated crawl bloat, restructured the internal linking architecture, and deployed a dynamic XML sitemap system — resulting in a 3× lift in indexed pages and a 180% increase in organic sessions within 90 days.',
    role: 'Lead SEO Engineer',
    tools: 'Screaming Frog, Python, Next.js, Google Search Console',
    duration: '3 Months',
    client: 'Enterprise SaaS Platform',
    results: '+180% Organic Sessions',
  },
  {
    id: 'carbon-systems',
    title: 'Velocity Stack',
    category: 'Web Performance',
    year: '2025',
    image: 'https://media.base44.com/images/public/6a05e6f6183a677fd3f8f616/baa799063_generated_ca5957c5.png',
    description: 'Rebuilt a high-traffic e-commerce front-end from a bloated Shopify theme into a headless React + Next.js stack. Achieved a perfect 100 Lighthouse score across all Core Web Vitals (LCP, CLS, INP), reducing time-to-interactive by 74% and directly lifting conversion rate by 22%.',
    role: 'Full-Stack Developer',
    tools: 'React, Next.js, TypeScript, Vercel, Shopify Storefront API',
    duration: '4 Months',
    client: 'D2C E-commerce Brand',
    results: '100 Lighthouse Score',
  },
  {
    id: 'tectonic-shift',
    title: 'Schema Engine',
    category: 'Structured Data',
    year: '2025',
    image: 'https://media.base44.com/images/public/6a05e6f6183a677fd3f8f616/beac88da1_generated_992d1c3c.png',
    description: 'Designed and deployed a programmatic Schema.org markup engine for a national news publisher with 2M+ monthly readers. Built a CMS-driven JSON-LD pipeline covering Article, BreadcrumbList, FAQPage, and HowTo schemas — unlocking rich results that increased CTR from search by 47%.',
    role: 'SEO Engineer',
    tools: 'Node.js, JSON-LD, Google Rich Results Test, CMS API',
    duration: '6 Weeks',
    client: 'National Media Publisher',
    results: '+47% Search CTR',
  },
  {
    id: 'blueprint-archive',
    title: 'Core Architecture',
    category: 'Full-Stack Dev',
    year: '2024',
    image: 'https://media.base44.com/images/public/6a05e6f6183a677fd3f8f616/2680a599f_generated_956b85ca.png',
    description: 'Ground-up design and build of a scalable SaaS web application. Engineered the full stack — from a Next.js App Router front-end with server components, to a REST API layer in Node.js/Express, with a PostgreSQL database. Baked in SEO from day one: SSR, metadata APIs, and structured data.',
    role: 'Full-Stack Developer & SEO Lead',
    tools: 'Next.js, TypeScript, Node.js, PostgreSQL, Prisma',
    duration: '5 Months',
    client: 'Series-A SaaS Startup',
    results: 'Ranked P1 in 60 days',
  },
  {
    id: 'glass-pavilion',
    title: 'Signal & Crawl',
    category: 'SEO Audit',
    year: '2024',
    image: 'https://media.base44.com/images/public/6a05e6f6183a677fd3f8f616/65c7d775c_generated_819d6998.png',
    description: 'A comprehensive technical SEO audit and remediation sprint for a legacy enterprise site hit by a Google core algorithm update. Diagnosed and fixed over 240 issues spanning canonicalization, page speed, thin content, and JavaScript rendering — recovering 65% of lost traffic in 8 weeks.',
    role: 'SEO Consultant',
    tools: 'Ahrefs, Screaming Frog, Semrush, Chrome DevTools, Python',
    duration: '8 Weeks',
    client: 'Fortune 500 Retail Brand',
    results: '+65% Traffic Recovery',
  },
];

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = projects.find((p) => p.id === id);
  const currentIndex = projects.findIndex((p) => p.id === id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="font-mono text-muted-foreground">Project not found</p>
      </div>
    );
  }

  const specs = [
    { label: 'Role', value: project.role },
    { label: 'Stack / Tools', value: project.tools },
    { label: 'Duration', value: project.duration },
    { label: 'Client', value: project.client },
    { label: 'Year', value: project.year },
    { label: 'Outcome', value: project.results },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Back button */}
      <div className="pt-24 px-6 md:px-12">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to archive
        </button>
      </div>

      {/* Project header */}
      <motion.div
        className="px-6 md:px-12 pt-12 md:pt-20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-baseline gap-4 mb-4">
          <Annotation label={`${String(currentIndex + 1).padStart(2, '0')} / TYPE: ${project.category.toUpperCase()}`} />
        </div>
        <h1 className="font-display text-[10vw] md:text-[8vw] leading-[0.9] tracking-[-0.05em] text-foreground">
          {project.title}
        </h1>
      </motion.div>

      {/* Hero image */}
      <motion.div
        className="mt-12 md:mt-20 px-6 md:px-12"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full aspect-video md:aspect-[21/9] object-cover"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </motion.div>

      {/* Content: Narrative + Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 px-6 md:px-12 py-20 md:py-32">
        {/* Narrative column */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Annotation label="THE NARRATIVE" className="block mb-6" />
          <p className="font-body text-xl md:text-2xl text-foreground leading-[1.7] font-light">
            {project.description}
          </p>
          <p className="font-body text-base text-muted-foreground leading-[1.7] mt-8">
            The process began with a full crawl audit and log-file analysis to understand 
            exactly how search engines were experiencing the site. From there, every fix 
            was prioritized by expected impact — high-signal issues first, documentation 
            second. Nothing was patched without being measured. Nothing was shipped 
            without being validated.
          </p>
        </motion.div>

        {/* Specs column */}
        <motion.div
          className="lg:col-span-4 lg:col-start-9 border-l border-border pl-6 md:pl-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Annotation label="TECHNICAL SPECS" className="block mb-8" />
          <div className="space-y-6">
            {specs.map((spec) => (
              <div key={spec.label}>
                <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground block mb-1">
                  {spec.label}
                </span>
                <span className="font-body text-sm text-foreground">{spec.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Next project footer */}
      <Link
        to={`/project/${nextProject.id}`}
        className="block border-t border-border group"
      >
        <div className="px-6 md:px-12 py-20 md:py-32 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <Annotation label="NEXT PROJECT" className="block mb-4" />
            <motion.h2
              className="font-display text-5xl md:text-7xl lg:text-[8vw] tracking-[-0.04em] text-foreground group-hover:text-accent transition-colors duration-500 leading-none"
              whileHover={{ x: 20 }}
              transition={{ duration: 0.4 }}
            >
              {nextProject.title}
            </motion.h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-muted-foreground group-hover:text-foreground transition-colors">
            View Project
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </Link>

      <Footer />
    </div>
  );
}