import Container from '@/components/common/Container';
import PageHeader from '@/components/common/PageHeader';
import { ExperienceList } from '@/components/experience/ExperienceList';
import { experiences } from '@/config/Experience';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { Metadata } from 'next';

export const metadata: Metadata = getMetadata('/work-experience');

export default function WorkExperiencePage() {
  return (
    <Container className="max-w-5xl py-16">
      <div className="space-y-10">
        {/* Header */}
        <PageHeader
          title="Experience"
          description="Roles where I've designed, built, and run production systems, from enterprise SaaS and AI platforms to the US healthcare revenue cycle."
        />

        <ExperienceList experiences={experiences} />
      </div>
    </Container>
  );
}
