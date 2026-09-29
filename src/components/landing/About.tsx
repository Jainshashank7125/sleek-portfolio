import { about } from '@/config/About';
import React from 'react';

import Section from '../common/Section';

export default function About() {
  return (
    <Section id="about" heading="About">
      <div className="grid gap-10 lg:grid-cols-[1fr_16rem]">
        <p className="max-w-[62ch] text-lg leading-relaxed">
          {about.description}
        </p>
        <ul className="text-muted-foreground flex flex-col gap-3 text-sm">
          {about.highlights.map((highlight) => (
            <li key={highlight} className="border-construct border-l-2 pl-3">
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
