import { cn } from '@/lib/utils';
import React from 'react';

interface RuledSectionProps extends React.ComponentPropsWithoutRef<'section'> {
  children: React.ReactNode;
}

export function RuledSection({
  children,
  className,
  ...props
}: RuledSectionProps) {
  return (
    <section className={cn('ruled-section', className)} {...props}>
      {children}
    </section>
  );
}
