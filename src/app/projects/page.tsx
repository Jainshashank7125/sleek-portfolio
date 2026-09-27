import Container from '@/components/common/Container';
import PageHeader from '@/components/common/PageHeader';
import { ProjectList } from '@/components/projects/ProjectList';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { projects } from '@/config/Projects';
import { Metadata } from 'next';

export const metadata: Metadata = getMetadata('/projects');

export default function ProjectsPage() {
  const flagship = projects.filter((p) => p.details && !p.earlier);
  const earlier = projects.filter((p) => p.details && p.earlier);
  const openSource = projects.filter((p) => p.category === 'Open Source');
  const otherWork = projects.filter(
    (p) => !p.details && p.category !== 'Open Source',
  );

  return (
    <Container className="max-w-5xl py-16">
      <div className="space-y-16">
        {/* Header */}
        <PageHeader
          title="Work"
          description="Systems I've designed and built: today in US healthcare revenue cycle management, and before that AI agent platforms, event-driven pipelines, and multi-tenant SaaS. Work projects are described at a high level to respect confidentiality."
        />

        <section className="space-y-6">
          <h2 className="font-wide text-xl font-semibold tracking-tight">
            Healthcare RCM case studies
          </h2>
          <ProjectList projects={flagship} />
        </section>

        {earlier.length > 0 && (
          <section className="space-y-6">
            <h2 className="font-wide text-xl font-semibold tracking-tight">
              Earlier case studies
            </h2>
            <ProjectList projects={earlier} />
          </section>
        )}

        {otherWork.length > 0 && (
          <section className="space-y-6">
            <h2 className="font-wide text-xl font-semibold tracking-tight">
              Other work
            </h2>
            <ProjectList projects={otherWork} />
          </section>
        )}

        {openSource.length > 0 && (
          <section className="space-y-6">
            <h2 className="font-wide text-xl font-semibold tracking-tight">
              Open source &amp; side projects
            </h2>
            <ProjectList projects={openSource} />
          </section>
        )}
      </div>
    </Container>
  );
}
