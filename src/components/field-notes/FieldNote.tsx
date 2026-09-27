import { cn } from '@/lib/utils';
import React from 'react';

interface FieldNoteProps {
  children: React.ReactNode;
  className?: string;
  decorative?: boolean;
}

export function FieldNote({
  children,
  className,
  decorative = true,
}: FieldNoteProps) {
  return (
    <p
      className={cn('field-note', className)}
      aria-hidden={decorative ? 'true' : undefined}
    >
      {children}
    </p>
  );
}
