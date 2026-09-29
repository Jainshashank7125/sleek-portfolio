import Container from '@/components/common/Container';
import { RuledSection } from '@/components/field-notes/RuledSection';
import { SectionLabel } from '@/components/field-notes/SectionLabel';
import { about } from '@/config/About';
import { fieldNotesConfig } from '@/config/FieldNotes';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { Link } from 'next-view-transitions';
import React from 'react';

export default function About() {
  return (
    <Container>
      <RuledSection>
        <SectionLabel index="07">About</SectionLabel>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <h2 className="font-editorial max-w-3xl text-4xl tracking-[-0.04em] text-balance sm:text-5xl">
              Product thinking, systems depth, production ownership.
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              {about.description}
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex min-h-11 items-center gap-2 font-semibold text-brand"
            >
              Start a conversation
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="border-t border-border lg:border-t-0 lg:border-l lg:pl-8">
            <p className="eyebrow py-4 lg:pt-0">Current field notes</p>
            <ul>
              {fieldNotesConfig.aboutInterests.map((interest, index) => (
                <li
                  key={interest}
                  className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-border py-4 text-sm leading-relaxed"
                >
                  <span className="font-mono text-[0.65rem] text-[var(--field-red)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{interest}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </RuledSection>
    </Container>
  );
}
