import { experiences } from '@/config/Experience';
import { Link } from 'next-view-transitions';
import React from 'react';

import Section from '../common/Section';
import { ExperienceTimeline } from '../experience/ExperienceCard';

export default function Experience() {
  return (
    <Section id="experience" heading="Experience">
      <ExperienceTimeline experiences={experiences.slice(0, 3)} />
      <Link
        href="/work-experience"
        className="link-ink mt-6 inline-block text-sm font-medium"
      >
        Full work history
      </Link>
    </Section>
  );
}
