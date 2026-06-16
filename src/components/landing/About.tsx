import { about } from '@/config/About';
import { CheckCircle } from 'lucide-react';
import React from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';

export default function About() {
  return (
    <Container className="mt-24 max-w-5xl">
      <SectionHeading subHeading="About" heading="A bit about me" />
      <div className="mt-8 grid gap-10 md:grid-cols-5">
        <p className="text-lg leading-relaxed text-muted-foreground md:col-span-3">
          {about.description}
        </p>
        <ul className="flex flex-col gap-3 md:col-span-2">
          {about.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-3 text-sm">
              <CheckCircle className="mt-0.5 size-4 shrink-0 text-brand" />
              <span className="text-muted-foreground">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
