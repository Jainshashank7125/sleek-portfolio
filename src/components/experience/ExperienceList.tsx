import { type Experience } from '@/config/Experience';

import { ExperienceCard } from './ExperienceCard';

interface ExperienceListProps {
  experiences: Experience[];
}

export function ExperienceList({ experiences }: ExperienceListProps) {
  if (experiences.length === 0) {
    return (
      <div className="border-border border-y py-10">
        <p className="font-editorial text-muted-foreground text-xl">
          No experience entries yet.
        </p>
      </div>
    );
  }

  return (
    <div>
      {experiences.map((experience, index) => (
        <ExperienceCard
          key={`${experience.company}-${experience.startDate}`}
          experience={experience}
          index={index + 1}
        />
      ))}
    </div>
  );
}
