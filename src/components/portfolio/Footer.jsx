import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const socials = [
  { label: 'Twitter', href: 'https://twitter.com/kezielive' },
  { label: 'GitHub', href: 'https://github.com/kezie' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/chikezieoguamanam' },
  { label: 'Instagram', href: 'https://instagram.com/chee_kay_zie' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border px-6 md:px-12 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            © 2026 — DESIGNED BY CHIKEZIE OGUAMANAM
          </span>
          <div className="flex items-center gap-6">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="group flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                {social.label}
                <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>
        <button
          onClick={scrollToTop}
          className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}