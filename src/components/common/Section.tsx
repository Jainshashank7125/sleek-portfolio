import React from 'react';

import Container from './Container';

interface SectionProps {
  id: string;
  heading: string;
  description?: string;
  children: React.ReactNode;
}

/** A drawing-sheet section: heading and note on the left, content on the right. */
export default function Section({
  id,
  heading,
  description,
  children,
}: SectionProps) {
  return (
    <Container className="mt-24 max-w-5xl md:mt-32">
      <section aria-labelledby={`${id}-heading`}>
        <div className="section-rule mb-8" />
        <div className="grid gap-8 md:grid-cols-[14rem_1fr] md:gap-12">
          <div>
            <h2
              id={`${id}-heading`}
              className="font-wide text-2xl leading-tight font-semibold tracking-tight text-balance md:text-[1.7rem]"
            >
              {heading}
            </h2>
            {description && (
              <p className="text-muted-foreground mt-3 text-[0.95rem] leading-relaxed">
                {description}
              </p>
            )}
          </div>
          <div className="min-w-0">{children}</div>
        </div>
      </section>
    </Container>
  );
}
