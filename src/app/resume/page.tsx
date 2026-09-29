import Container from '@/components/common/Container';
import { EditorialPageHeader } from '@/components/field-notes/EditorialPageHeader';
import { RuledSection } from '@/components/field-notes/RuledSection';
import { SectionLabel } from '@/components/field-notes/SectionLabel';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { resumeConfig } from '@/config/Resume';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { Metadata } from 'next';

export const metadata: Metadata = getMetadata('/resume');

export default function ResumePage() {
  return (
    <Container>
      <EditorialPageHeader
        index="01"
        eyebrow="Résumé"
        title="Experience, in one document."
        description="A concise record of the roles, systems, and technologies behind the field notes across this portfolio."
        actions={
          <a
            href={resumeConfig.url}
            target="_blank"
            rel="noopener noreferrer"
            className="border-foreground hover:border-brand hover:text-brand inline-flex min-h-11 items-center gap-2 border px-5 text-sm font-semibold"
          >
            Open in new tab
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        }
      />

      <RuledSection>
        <SectionLabel index="02">Document preview</SectionLabel>
        <div className="border-border bg-card mt-8 border">
          <iframe
            src={resumeConfig.url}
            title="Shashank Jain résumé"
            className="min-h-[75vh] w-full sm:min-h-screen"
          />
        </div>
        <p className="text-muted-foreground mt-4 text-sm sm:hidden">
          If the embedded document is difficult to read on a small screen, use
          “Open in new tab” above.
        </p>
      </RuledSection>
    </Container>
  );
}
