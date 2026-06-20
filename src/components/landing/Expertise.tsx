import { expertise } from '@/config/Expertise';
import {
  BrainCircuit,
  Building2,
  Cloud,
  Layers,
  LucideProps,
  Server,
  Workflow,
} from 'lucide-react';
import React from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Server,
  Building2,
  Cloud,
  BrainCircuit,
  Workflow,
  Layers,
};

export default function Expertise() {
  return (
    <Container className="mt-24 max-w-5xl">
      <SectionHeading
        subHeading="What I do"
        heading="Core Expertise"
        description="I build and own systems end to end — from architecture and data model to deployment, observability, and the AI layer on top."
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {expertise.map((pillar) => {
          const Icon = iconMap[pillar.icon];
          return (
            <div
              key={pillar.title}
              className="card-hover group rounded-xl border border-border bg-card p-6"
            >
              <div className="flex items-start justify-between">
                {Icon && (
                  <span className="flex size-9 items-center justify-center rounded-lg bg-brand-muted text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-base font-semibold tracking-tight">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
