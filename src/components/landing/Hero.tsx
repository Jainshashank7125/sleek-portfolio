import { SectionLabel } from '@/components/field-notes/SectionLabel';
import { TechStrip } from '@/components/field-notes/TechStrip';
import { Button } from '@/components/ui/button';
import { heroConfig } from '@/config/Hero';
import { ArrowRight, FileText } from '@phosphor-icons/react/dist/ssr';
import { Link } from 'next-view-transitions';
import React from 'react';

export default function Hero() {
  return (
    <section className="flex min-w-0 flex-col py-12 sm:py-16 lg:pr-10 lg:pt-14 lg:pb-10">
      <SectionLabel index="01">{heroConfig.eyebrow}</SectionLabel>

      <h1 className="mt-7 text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.8] font-black tracking-[-0.075em] text-balance">
        {heroConfig.name}
      </h1>
      <p className="font-editorial mt-5 text-[clamp(2rem,4vw,4.25rem)] leading-[0.98] tracking-[-0.045em] text-balance">
        {heroConfig.headline}
      </p>
      <p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl lg:text-2xl">
        {heroConfig.subheadline}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button size="lg" asChild>
          <Link href="/projects">
            <ArrowRight className="size-4" aria-hidden="true" />
            Explore case studies
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/resume">
            <FileText className="size-4" aria-hidden="true" />
            View résumé
          </Link>
        </Button>
      </div>

      <TechStrip
        className="mt-auto border-t border-border pt-8 lg:mt-10"
        label="Tech I work with"
        items={heroConfig.skills}
      />
    </section>
  );
}
