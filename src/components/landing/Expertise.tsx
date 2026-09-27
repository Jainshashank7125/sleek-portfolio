import { expertise } from '@/config/Expertise';
import React from 'react';

import Section from '../common/Section';

export default function Expertise() {
  return (
    <Section
      id="expertise"
      heading="What I work on"
      description="I own systems end to end, from the product workflow and data model to the infrastructure and the AI layer on top."
    >
      <dl className="grid gap-x-10 sm:grid-cols-2">
        {expertise.map((pillar) => (
          <div key={pillar.title} className="border-border border-t py-5">
            <dt className="font-semibold">{pillar.title}</dt>
            <dd className="text-muted-foreground mt-1.5 text-[0.95rem] leading-relaxed">
              {pillar.description}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
