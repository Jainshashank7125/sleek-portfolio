import Container from '@/components/common/Container';
import { SectionLabel } from '@/components/field-notes/SectionLabel';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { Link } from 'next-view-transitions';

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] items-center py-20">
      <div className="border-border w-full border-y py-12 sm:py-16">
        <SectionLabel index="404">Missing field note</SectionLabel>
        <h1 className="editorial-page-title mt-8 max-w-4xl">
          This path ends here.
        </h1>
        <p className="text-muted-foreground mt-7 max-w-xl text-lg leading-relaxed">
          The page may have moved, or the address may be incomplete. Return to
          the overview or continue through the case studies.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/"
            className="border-foreground hover:border-brand hover:text-brand inline-flex min-h-11 items-center gap-2 border px-5 text-sm font-semibold"
          >
            <ArrowLeft className="size-4" aria-hidden="true" /> Home
          </Link>
          <Link
            href="/projects"
            className="border-border text-brand hover:border-brand inline-flex min-h-11 items-center gap-2 border px-5 text-sm font-semibold"
          >
            Explore work <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Container>
  );
}
