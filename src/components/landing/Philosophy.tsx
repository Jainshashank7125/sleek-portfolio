import { philosophy } from '@/config/Philosophy';
import React from 'react';

import Section from '../common/Section';

export default function Philosophy() {
  return (
    <Section
      id="notes"
      heading="General notes"
      description="Every drawing set carries its notes. These are the ones that apply to everything I build."
    >
      <ol className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
        {philosophy.map((principle, index) => (
          <li key={principle.title} className="grid grid-cols-[1.75rem_1fr]">
            <span className="metric-value text-muted-foreground font-semibold">
              {index + 1}.
            </span>
            <div>
              <h3 className="font-semibold">{principle.title}</h3>
              <p className="text-muted-foreground mt-1.5 text-[0.95rem] leading-relaxed">
                {principle.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
