import { cn } from '@/lib/utils';
import React from 'react';

import { SectionLabel } from './SectionLabel';

interface EditorialPageHeaderProps {
  index?: string;
  eyebrow: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function EditorialPageHeader({
  index,
  eyebrow,
  title,
  description,
  actions,
  className,
}: EditorialPageHeaderProps) {
  return (
    <header className={cn('py-14 sm:py-20 lg:py-24', className)}>
      <SectionLabel index={index}>{eyebrow}</SectionLabel>
      <h1 className="editorial-page-title mt-8 max-w-5xl">{title}</h1>
      {(description || actions) && (
        <div className="mt-8 flex max-w-4xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          {description && (
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
          {actions}
        </div>
      )}
    </header>
  );
}
