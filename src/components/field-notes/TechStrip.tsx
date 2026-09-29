import { cn } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import React from 'react';

type TechStripItem = string | { name: string; href?: string };

interface TechStripProps {
  items: TechStripItem[];
  label?: string;
  className?: string;
}

export function TechStrip({ items, label, className }: TechStripProps) {
  return (
    <div className={cn('flex min-w-0 flex-wrap items-center gap-2', className)}>
      {label && <span className="eyebrow mr-3">{label}</span>}
      {items.map((item) => {
        const normalized = typeof item === 'string' ? { name: item } : item;

        return normalized.href ? (
          <Link
            key={normalized.name}
            href={normalized.href}
            className="tech-chip"
            target="_blank"
            rel="noopener noreferrer"
          >
            {normalized.name}
          </Link>
        ) : (
          <span key={normalized.name} className="tech-chip">
            {normalized.name}
          </span>
        );
      })}
    </div>
  );
}
