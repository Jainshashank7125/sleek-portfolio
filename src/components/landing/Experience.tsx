import { type Experience, experiences } from '@/config/Experience';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { ExperienceCard } from '../experience/ExperienceCard';
import { Button } from '../ui/button';

export default function Experience() {
  return (
    <Container className="mt-24 max-w-5xl">
      <SectionHeading subHeading="Where I've worked" heading="Experience" />
      <div className="mt-8 flex flex-col gap-6">
        {experiences.slice(0, 2).map((experience: Experience) => (
          <ExperienceCard key={experience.company} experience={experience} />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Button variant="outline" asChild>
          <Link href="/work-experience">View full work history</Link>
        </Button>
      </div>
    </Container>
  );
}
