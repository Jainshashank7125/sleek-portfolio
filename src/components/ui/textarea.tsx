import { cn } from '@/lib/utils';
import * as React from 'react';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-input placeholder:text-muted-foreground focus-visible:border-ring aria-invalid:border-destructive aria-invalid:bg-destructive/5 focus-visible:bg-brand-muted flex field-sizing-content min-h-28 w-full border bg-transparent px-3 py-3 text-base transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
