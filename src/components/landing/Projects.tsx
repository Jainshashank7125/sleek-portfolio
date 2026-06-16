import { projects } from '@/config/Projects';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { ProjectList } from '../projects/ProjectList';
import { Button } from '../ui/button';

export default function Projects() {
  const featured = projects.filter((p) => p.details).slice(0, 4);

  return (
    <Container className="mt-24 max-w-5xl">
      <SectionHeading
        subHeading="Selected work"
        heading="Featured Projects"
        description="Each is a real system — the problem, the architecture, the tradeoffs, and the results. Work projects stay high-level to respect confidentiality."
      />

      <ProjectList className="mt-8" projects={featured} />

      <div className="mt-8 flex justify-center">
        <Button variant="outline" asChild>
          <Link href="/projects">View all projects</Link>
        </Button>
      </div>
    </Container>
  );
}
