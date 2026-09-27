import { type Project } from '@/types/project';
import { Link } from 'next-view-transitions';
import React from 'react';

interface ProjectCardProps {
  project: Project;
}

/** A row in the drawing register: what it is and the result on the left, context on the right. */
export function ProjectCard({ project }: ProjectCardProps) {
  const {
    title,
    category,
    description,
    metric,
    technologies,
    github,
    live,
    link,
    details,
    projectDetailsPageSlug,
    confidential,
    stages,
  } = project;

  const externalLink = live || link;
  const href =
    details && projectDetailsPageSlug ? projectDetailsPageSlug : null;

  return (
    <article className="group bg-sheet has-[a.row-link:hover]:bg-muted/60 relative grid gap-5 p-5 transition-colors md:grid-cols-[1fr_13rem] md:gap-8 md:p-6">
      <div className="min-w-0">
        {category && (
          <p className="font-narrow text-muted-foreground text-sm font-semibold">
            {category}
          </p>
        )}
        <h3 className="font-wide mt-1 text-lg leading-snug font-semibold tracking-tight">
          {href ? (
            <Link
              href={href}
              className="row-link group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4 after:absolute after:inset-0"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        {metric && (
          <p className="metric-value text-brand mt-2 font-semibold">{metric}</p>
        )}
        <p className="text-muted-foreground mt-2 max-w-[62ch] text-[0.95rem] leading-relaxed">
          {description}
        </p>
      </div>

      <div className="md:border-border flex flex-col gap-4 text-sm md:border-l md:pl-6">
        {stages && stages.length > 0 && (
          <div>
            <p className="font-narrow text-muted-foreground text-xs">
              Where in the cycle
            </p>
            <p className="mt-0.5 font-semibold">{stages.join(', ')}</p>
          </div>
        )}
        <div>
          <p className="font-narrow text-muted-foreground text-xs">
            Built with
          </p>
          <ul className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
            {technologies.map((tech) => (
              <li key={tech} className="tech-chip">
                {tech}
              </li>
            ))}
          </ul>
        </div>
        {(externalLink || github) && (
          <div className="relative z-10 flex gap-4">
            {externalLink && (
              <Link
                href={externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="link-ink"
              >
                Live site
              </Link>
            )}
            {github && (
              <Link
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-ink"
              >
                Source code
              </Link>
            )}
          </div>
        )}
        {confidential && (
          <p className="text-muted-foreground text-xs">
            Confidential, shown at a high level
          </p>
        )}
      </div>
    </article>
  );
}
