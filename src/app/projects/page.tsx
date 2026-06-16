import Container from '@/components/common/Container';
import { ProjectList } from '@/components/projects/ProjectList';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { projects } from '@/config/Projects';
import { Metadata } from 'next';

export const metadata: Metadata = getMetadata('/projects');

export default function ProjectsPage() {
  const flagship = projects.filter((p) => p.details);
  const openSource = projects.filter((p) => p.category === 'Open Source');
  const otherWork = projects.filter(
    (p) => !p.details && p.category !== 'Open Source',
  );

  return (
    <Container className="max-w-5xl py-16">
      <div className="space-y-16">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <p className="eyebrow">Selected work</p>
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Projects &amp; Case Studies
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Systems I&apos;ve designed and built — from AI agent platforms and
            event-driven pipelines to multi-tenant SaaS. Work projects are
            described high-level to respect confidentiality.
          </p>
        </div>

        <section className="space-y-6">
          <h2 className="text-xl font-semibold tracking-tight">
            Flagship case studies
          </h2>
          <ProjectList projects={flagship} />
        </section>

        {otherWork.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-semibold tracking-tight">Other work</h2>
            <ProjectList projects={otherWork} />
          </section>
        )}

        {openSource.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-semibold tracking-tight">
              Open source &amp; side projects
            </h2>
            <ProjectList projects={openSource} />
          </section>
        )}
      </div>
    </Container>
  );
}
