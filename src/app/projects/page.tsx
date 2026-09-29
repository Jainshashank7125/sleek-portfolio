import Container from '@/components/common/Container';
import { EditorialPageHeader } from '@/components/field-notes/EditorialPageHeader';
import { RuledSection } from '@/components/field-notes/RuledSection';
import { SectionLabel } from '@/components/field-notes/SectionLabel';
import { ProjectList } from '@/components/projects/ProjectList';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { projects } from '@/config/Projects';
import { Metadata } from 'next';

export const metadata: Metadata = getMetadata('/projects');

export default function ProjectsPage() {
  const current = projects.filter((project) => project.era === 'current');
  const earlier = projects.filter((project) => project.era === 'earlier');
  const openSource = projects.filter(
    (project) => project.era === 'open-source',
  );

  return (
    <Container>
      <EditorialPageHeader
        index="01"
        eyebrow="Selected systems"
        title="Work across the whole path."
        description="Healthcare and revenue-cycle systems lead this collection, followed by earlier AI, SaaS, enterprise, mobile, and open-source work. Professional projects are shared at a level that protects client and product details."
      />

      <RuledSection>
        <SectionLabel index="02">Current healthcare work</SectionLabel>
        <div className="mt-8">
          <ProjectList projects={current} />
        </div>
      </RuledSection>

      <RuledSection>
        <SectionLabel index="03">Earlier product systems</SectionLabel>
        <div className="mt-8">
          <ProjectList projects={earlier} startIndex={current.length + 1} />
        </div>
      </RuledSection>

      <RuledSection>
        <SectionLabel index="04">Open source &amp; experiments</SectionLabel>
        <div className="mt-8">
          <ProjectList
            projects={openSource}
            startIndex={current.length + earlier.length + 1}
          />
        </div>
      </RuledSection>
    </Container>
  );
}
