import { type Experience } from '@/config/Experience';
import React from 'react';

import { ExperienceTimeline } from './ExperienceCard';

interface ExperienceListProps {
  experiences: Experience[];
}

export function ExperienceList({ experiences }: ExperienceListProps) {
  if (experiences.length === 0) {
    return (
      <p className="text-muted-foreground py-8">
        No work experience to show yet.
      </p>
    );
  }

  return <ExperienceTimeline experiences={experiences} />;
}
