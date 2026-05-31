import React from 'react';

export default function Annotation({ label, className = '' }) {
  return (
    <span className={`font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-muted-foreground ${className}`}>
      {label}
    </span>
  );
}