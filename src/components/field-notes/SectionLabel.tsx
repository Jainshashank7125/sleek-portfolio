import { cn } from '@/lib/utils';
import React from 'react';

interface SectionLabelProps {
  index?: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({
  index,
  children,
  className,
}: SectionLabelProps) {
  return (
    <div className={cn('section-label', className)}>
      {index && <span className="section-label__index">{index}</span>}
      <span className="section-label__rule" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}
