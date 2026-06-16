import Container from '@/components/common/Container';
import { ExperienceList } from '@/components/experience/ExperienceList';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { experiences } from '@/config/Experience';
import { Metadata } from 'next';

export const metadata: Metadata = getMetadata('/work-experience');

export default function WorkExperiencePage() {
  return (
    <Container className="max-w-5xl py-16">
      <div className="space-y-10">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <p className="eyebrow">Career</p>
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Work Experience
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Roles where I&apos;ve designed, built, and shipped production
            systems — from enterprise SaaS to AI platforms.
          </p>
        </div>

        <ExperienceList experiences={experiences} />
      </div>
    </Container>
  );
}
