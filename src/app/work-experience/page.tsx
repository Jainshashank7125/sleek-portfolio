import Container from '@/components/common/Container';
import { ExperienceList } from '@/components/experience/ExperienceList';
import { EditorialPageHeader } from '@/components/field-notes/EditorialPageHeader';
import { RuledSection } from '@/components/field-notes/RuledSection';
import { SectionLabel } from '@/components/field-notes/SectionLabel';
import { experiences } from '@/config/Experience';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { Metadata } from 'next';

export const metadata: Metadata = getMetadata('/work-experience');

export default function WorkExperiencePage() {
  return (
    <Container>
      <EditorialPageHeader
        index="01"
        eyebrow="Career timeline"
        title="Roles shaped by the systems behind them."
        description="A career across healthcare, AI products, enterprise software, mobile applications, and cloud platforms—with increasing ownership from implementation through production operation."
      />

      <RuledSection>
        <SectionLabel index="02">Experience</SectionLabel>
        <div className="mt-8">
          <ExperienceList experiences={experiences} />
        </div>
      </RuledSection>
    </Container>
  );
}
