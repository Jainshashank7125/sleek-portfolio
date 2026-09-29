import { heroConfig } from '@/config/Hero';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from '../common/Container';
import { Button } from '../ui/button';
import WorkflowSchematic from './WorkflowSchematic';

export default function Hero() {
  const { headline, subheadline, buttons } = heroConfig;

  return (
    <Container className="max-w-5xl pt-12 md:pt-20">
      <h1 className="font-wide max-w-[17ch] text-[clamp(2.3rem,5.6vw,4.4rem)] leading-[1.03] font-semibold tracking-[-0.025em] text-balance">
        {headline}
      </h1>

      <div className="mt-7 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <p className="text-muted-foreground max-w-[58ch] text-lg leading-relaxed">
          {subheadline}
        </p>
        <div className="flex shrink-0 flex-wrap gap-2">
          {buttons.map((button) => (
            <Button
              key={button.text}
              variant={button.variant as 'outline' | 'default'}
              asChild
            >
              <Link href={button.href}>{button.text}</Link>
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <WorkflowSchematic />
      </div>
    </Container>
  );
}
