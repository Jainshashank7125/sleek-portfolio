import { philosophy } from '@/config/Philosophy';
import { Activity, Bot, Package, TrendingUp, Zap } from 'lucide-react';
import React from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';

const principleIcons = [Package, TrendingUp, Zap, Activity, Bot];

export default function Philosophy() {
  const isOdd = philosophy.length % 2 === 1;

  return (
    <Container className="mt-24 max-w-5xl">
      <SectionHeading
        subHeading="How I think"
        heading="Engineering Philosophy"
        description="The principles that show up in every system I build."
      />

      <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
        {philosophy.map((principle, index) => {
          const Icon = principleIcons[index % principleIcons.length];
          const isLastOdd = isOdd && index === philosophy.length - 1;
          return (
            <div
              key={principle.title}
              className={`flex flex-col gap-3 bg-card p-6 ${isLastOdd ? 'sm:col-span-2' : ''}`}
            >
              <Icon size={18} strokeWidth={1.75} className="text-brand" />
              <h3 className="text-base font-semibold tracking-tight">
                {principle.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {principle.description}
              </p>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
