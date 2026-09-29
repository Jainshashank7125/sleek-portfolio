import { type Experience } from '@/config/Experience';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import React from 'react';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

interface ExperienceLink {
  label: string;
  href: string;
}

function formatDescription(text: string) {
  return text.split(/(\*[^*]+\*)/g).map((part, index) => {
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <strong
          key={`${part}-${index}`}
          className="text-foreground font-semibold"
        >
          {part.slice(1, -1)}
        </strong>
      );
    }

    return part;
  });
}

export function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const links: ExperienceLink[] = [
    experience.website && { label: 'Website', href: experience.website },
    experience.linkedin && { label: 'LinkedIn', href: experience.linkedin },
    experience.github && { label: 'GitHub', href: experience.github },
    experience.x && { label: 'X', href: experience.x },
  ].filter((link): link is ExperienceLink => Boolean(link));

  return (
    <article className="border-border grid gap-6 border-b py-9 first:border-t md:grid-cols-[4.5rem_minmax(0,1fr)] lg:gap-10 lg:py-12">
      <p className="text-brand font-mono text-[0.68rem] tracking-[0.12em] uppercase">
        {String(index).padStart(2, '0')}
      </p>

      <div>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-10">
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <h2 className="font-editorial text-3xl tracking-[-0.035em] sm:text-4xl">
                {experience.company}
              </h2>
              {experience.isCurrent && (
                <span className="border-brand text-brand border px-2 py-1 font-mono text-[0.62rem] tracking-[0.1em] uppercase">
                  Current role
                </span>
              )}
            </div>
            <p className="text-foreground mt-2 text-lg font-semibold">
              {experience.position}
            </p>
          </div>

          <div className="lg:text-right">
            <p className="font-editorial text-lg">
              {experience.startDate} —{' '}
              {experience.isCurrent ? 'Present' : experience.endDate}
            </p>
            <p className="text-muted-foreground mt-1 text-sm">
              {experience.location}
            </p>
          </div>
        </div>

        <div className="mt-7 grid gap-8 xl:grid-cols-[minmax(0,1.45fr)_minmax(15rem,0.55fr)] xl:gap-12">
          <ul className="space-y-4">
            {experience.description.map((description) => (
              <li
                key={description}
                className="text-muted-foreground grid grid-cols-[0.8rem_minmax(0,1fr)] gap-2 text-sm leading-relaxed"
              >
                <span className="text-[var(--field-red)]" aria-hidden="true">
                  →
                </span>
                <span>{formatDescription(description)}</span>
              </li>
            ))}
          </ul>

          <div className="xl:border-border xl:border-l xl:pl-8">
            <p className="eyebrow">Working stack</p>
            <ul
              className="mt-4 flex flex-wrap gap-1.5"
              aria-label="Technology stack"
            >
              {experience.technologies.map((technology) => (
                <li key={technology} className="tech-chip">
                  {technology}
                </li>
              ))}
            </ul>

            {links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-brand inline-flex min-h-11 items-center gap-1.5 font-mono text-[0.67rem] tracking-[0.08em] uppercase"
                  >
                    {link.label}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
