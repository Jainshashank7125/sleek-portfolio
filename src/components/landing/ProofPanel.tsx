import { FieldNote } from '@/components/field-notes/FieldNote';
import { SectionLabel } from '@/components/field-notes/SectionLabel';
import { fieldNotesConfig } from '@/config/FieldNotes';
import React from 'react';

export default function ProofPanel() {
  const { proof } = fieldNotesConfig;

  return (
    <aside className="flex min-w-0 flex-col border-t border-border py-12 sm:py-16 lg:border-t-0 lg:border-l lg:py-14 lg:pl-10">
      <SectionLabel index="02">Real outcomes. Real impact.</SectionLabel>
      <h2 className="font-editorial mt-10 max-w-xl text-[clamp(3rem,6vw,6.25rem)] leading-[0.9] tracking-[-0.055em] text-balance">
        {proof.headline}
      </h2>
      <span
        className="mt-3 block h-0.5 w-4/5 -rotate-2 bg-[var(--field-red)]"
        aria-hidden="true"
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-auto">
        {proof.items.map((item) => (
          <div
            key={item.title}
            className="border-t border-border pt-4 sm:border-t-0 sm:border-l sm:pl-5 first:sm:border-l-0 first:sm:pl-0"
          >
            <h3 className="font-editorial text-2xl leading-tight">
              {item.title}
            </h3>
            <p className="mt-2 text-base text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <FieldNote className="mt-9 ml-auto max-w-64 text-right text-sm">
        {proof.note}
      </FieldNote>
    </aside>
  );
}
