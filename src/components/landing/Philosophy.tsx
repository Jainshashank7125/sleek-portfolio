import { philosophy } from '@/config/Philosophy';
import React from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';

export default function Philosophy() {
  return (
    <Container className="mt-24 max-w-5xl">
      <SectionHeading
        subHeading="How I think"
        heading="Engineering Philosophy"
        description="The principles that show up in every system I build."
      />

      <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
        {philosophy.map((principle, index) => (
          <div
            key={principle.title}
            className={`flex flex-col gap-2 bg-card p-6 ${
              index === philosophy.length - 1 && philosophy.length % 2 === 1
                ? 'sm:col-span-2'
                : ''
            }`}
          >
            <span className="metric-value text-xs text-brand">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="text-lg font-semibold tracking-tight">
              {principle.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {principle.description}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}
