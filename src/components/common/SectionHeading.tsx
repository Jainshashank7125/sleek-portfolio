import React from 'react';

interface SectionHeadingProps {
  subHeading: string;
  heading: string;
  description?: string;
}

export default function SectionHeading({
  subHeading,
  heading,
  description,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="eyebrow">{subHeading}</p>
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
        {heading}
      </h2>
      {description && (
        <p className="mt-1 max-w-2xl text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
