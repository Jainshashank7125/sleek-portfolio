import { type Experience } from '@/config/Experience';
import { Link } from 'next-view-transitions';
import React from 'react';

const parseDescription = (text: string): string =>
  text.replace(/\*(.*?)\*/g, '<b class="font-semibold text-foreground">$1</b>');

/** Roles as a dated timeline: dates on the left, a rail with a node per role. */
export function ExperienceTimeline({
  experiences,
}: {
  experiences: Experience[];
}) {
  return (
    <ol>
      {experiences.map((experience) => (
        <ExperienceCard key={experience.company} experience={experience} />
      ))}
    </ol>
  );
}

export function ExperienceCard({ experience }: { experience: Experience }) {
  const { isCurrent } = experience;

  return (
    <li className="group grid gap-x-8 md:grid-cols-[10rem_1fr]">
      <div className="pb-2 md:pt-0.5 md:pb-0 md:text-right">
        <p className="metric-value font-narrow text-sm font-semibold">
          {experience.startDate} – {isCurrent ? 'Present' : experience.endDate}
        </p>
        <p className="font-narrow text-muted-foreground text-sm">
          {experience.location}
        </p>
      </div>

      <div className="border-border relative border-l pb-10 pl-6 group-last:pb-0">
        <span
          aria-hidden
          className={`border-ink absolute top-1.5 -left-[5px] size-[9px] border-[1.5px] ${
            isCurrent ? 'bg-ink' : 'bg-background'
          }`}
        />
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="font-wide text-lg font-semibold tracking-tight">
            {experience.website ? (
              <Link
                href={experience.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {experience.company}
              </Link>
            ) : (
              experience.company
            )}
          </h3>
          {isCurrent && <span className="stamp stamp-paid">Current</span>}
        </div>
        <p className="text-muted-foreground">{experience.position}</p>

        <ul className="text-muted-foreground mt-3 flex max-w-[68ch] flex-col gap-2 text-[0.95rem] leading-relaxed">
          {experience.description.map((description, i) => (
            <li key={i} className="grid grid-cols-[0.9rem_1fr]">
              <span aria-hidden className="bg-construct mt-[0.7em] h-px w-2" />
              <span
                dangerouslySetInnerHTML={{
                  __html: parseDescription(description),
                }}
              />
            </li>
          ))}
        </ul>

        <ul
          className="mt-4 flex flex-wrap gap-x-4 gap-y-1"
          aria-label="Technologies"
        >
          {experience.technologies.map((tech) => (
            <li key={tech} className="tech-chip">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
