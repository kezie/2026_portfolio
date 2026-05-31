import React from 'react';

export default function MarqueeStrip({ text = 'SEO ENGINEERING — WEB DEVELOPMENT - AUTOMATION SPECIALIST', separator = '—' }) {
  const repeated = Array(8).fill(`${text} ${separator} `).join('');

  return (
    <div className="overflow-hidden border-y border-border py-4 md:py-6">
      <div className="animate-marquee whitespace-nowrap">
        <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
          {repeated}{repeated}
        </span>
      </div>
    </div>
  );
}