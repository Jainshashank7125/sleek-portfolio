import Container from '@/components/common/Container';
import { RuledSection } from '@/components/field-notes/RuledSection';
import { SectionLabel } from '@/components/field-notes/SectionLabel';
import { experiences } from '@/config/Experience';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { Link } from 'next-view-transitions';
import React from 'react';

export default function Experience() {
  return (
    <Container>
      <RuledSection>
        <SectionLabel index="05">Experience</SectionLabel>
        <div className="mt-8 grid gap-10 lg:grid-cols-[0.6fr_1.4fr]">
          <div>
            <h2 className="font-editorial text-4xl tracking-[-0.04em] sm:text-5xl">
              Work across the whole path.
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
              Recent roles span healthcare workflows, AI systems, backend
              architecture, application surfaces, and the infrastructure that
              keeps them running.
            </p>
            <Link
              href="/work-experience"
              className="mt-7 inline-flex min-h-11 items-center gap-2 font-semibold text-brand"
            >
              View full work history
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <ol className="border-t border-border">
            {experiences.slice(0, 2).map((experience, index) => (
              <li
                key={experience.company}
                className="grid gap-4 border-b border-border py-6 sm:grid-cols-[3.5rem_minmax(0,1fr)_auto]"
              >
                <span className="font-mono text-xs text-[var(--field-red)]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h3 className="font-editorial text-2xl leading-tight">
                    {experience.company}
                  </h3>
                  <p className="mt-1 text-sm font-semibold">
                    {experience.position}
                  </p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {experience.description[0].replaceAll('*', '')}
                  </p>
                </div>
                <p className="font-mono text-[0.68rem] leading-relaxed text-muted-foreground sm:text-right">
                  {experience.startDate}
                  <br />
                  {experience.endDate}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </RuledSection>
    </Container>
  );
}
