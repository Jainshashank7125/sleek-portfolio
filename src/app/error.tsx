'use client';

import Container from '@/components/common/Container';
import { SectionLabel } from '@/components/field-notes/SectionLabel';
import { ArrowClockwise, ArrowLeft } from '@phosphor-icons/react';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[70vh] items-center py-20">
      <div className="border-border w-full border-y py-12 sm:py-16">
        <SectionLabel index="!">Interrupted workflow</SectionLabel>
        <h1 className="editorial-page-title mt-8 max-w-4xl">
          Something stopped unexpectedly.
        </h1>
        <p className="text-muted-foreground mt-7 max-w-xl text-lg leading-relaxed">
          Try this step again. If the problem persists, return home and take a
          different path through the portfolio.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={reset}
            className="border-foreground hover:border-brand hover:text-brand inline-flex min-h-11 items-center gap-2 border px-5 text-sm font-semibold"
          >
            <ArrowClockwise className="size-4" aria-hidden="true" /> Try again
          </button>
          <Link
            href="/"
            className="border-border text-brand hover:border-brand inline-flex min-h-11 items-center gap-2 border px-5 text-sm font-semibold"
          >
            <ArrowLeft className="size-4" aria-hidden="true" /> Home
          </Link>
        </div>
      </div>
    </Container>
  );
}
