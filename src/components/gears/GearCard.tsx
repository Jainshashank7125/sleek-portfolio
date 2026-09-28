import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import React from 'react';

interface GearCardProps {
  index: number;
  name: string;
  icon?: React.ReactNode;
  href?: string;
}

export default function GearCard({ index, name, icon, href }: GearCardProps) {
  const content = (
    <>
      <span className="font-mono text-[0.65rem] text-[var(--field-red)]">
        {String(index).padStart(2, '0')}
      </span>
      {icon ? (
        <span className="text-brand">{icon}</span>
      ) : (
        <span aria-hidden="true" />
      )}
      <span className="min-w-0 flex-1 text-sm font-semibold">{name}</span>
      {href && <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />}
    </>
  );

  const className =
    'grid min-h-16 grid-cols-[2.5rem_auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-border py-4 first:border-t';

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} hover:text-brand`}
    >
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}
