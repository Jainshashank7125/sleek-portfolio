import { expertise } from '@/config/Expertise';
import React from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';

export default function Expertise() {
  return (
    <Container className="mt-24 max-w-5xl">
      <SectionHeading
        subHeading="What I do"
        heading="Core Expertise"
        description="I build and own systems end to end — from architecture and data model to deployment, observability, and the AI layer on top."
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {expertise.map((pillar, index) => (
          <div
            key={pillar.title}
            className="card-hover rounded-xl border border-border bg-card p-6"
          >
            <span className="metric-value text-xs text-muted-foreground">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-3 text-lg font-semibold tracking-tight">
              {pillar.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}
