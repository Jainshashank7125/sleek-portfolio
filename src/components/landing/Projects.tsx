import { projects } from '@/config/Projects';
import { Link } from 'next-view-transitions';
import React from 'react';

import Section from '../common/Section';
import { ProjectList } from '../projects/ProjectList';

export default function Projects() {
  const featured = projects.filter((p) => p.details && !p.earlier).slice(0, 4);

  return (
    <Section
      id="work"
      heading="Selected work"
      description="Healthcare revenue-cycle systems I work on now. Work projects are described at a high level to respect confidentiality."
    >
      <ProjectList projects={featured} />
      <Link
        href="/projects"
        className="link-ink mt-6 inline-block text-sm font-medium"
      >
        All projects, including earlier AI and SaaS work
      </Link>
    </Section>
  );
}
