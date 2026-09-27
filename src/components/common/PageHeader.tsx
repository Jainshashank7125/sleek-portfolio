import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

export default function PageHeader({
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <header className="border-border flex flex-col gap-4 border-b pb-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-wide text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.05] font-semibold tracking-[-0.02em]">
          {title}
        </h1>
        {action}
      </div>
      {description && (
        <p className="text-muted-foreground max-w-[60ch] text-lg leading-relaxed">
          {description}
        </p>
      )}
    </header>
  );
}
