'use client';

import { type Project } from '@/types/project';
import { Link } from 'next-view-transitions';
import React from 'react';

import ArrowRight from '../svgs/ArrowRight';
import Github from '../svgs/Github';
import Website from '../svgs/Website';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface ProjectCardProps {
  project: Project;
}

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
  } = project;

  const externalLink = live || link;

  return (
    <div className="card-hover group relative flex h-full flex-col rounded-xl border border-border bg-card p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {category && <p className="eyebrow">{category}</p>}
          <h3 className="mt-2 text-lg font-semibold leading-tight tracking-tight">
            {title}
          </h3>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {externalLink && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="flex size-5 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                  href={externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View live"
                >
                  <Website />
                </Link>
              </TooltipTrigger>
              <TooltipContent>Live</TooltipContent>
            </Tooltip>
          )}
          {github && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="flex size-5 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View source"
                >
                  <Github />
                </Link>
              </TooltipTrigger>
              <TooltipContent>Source</TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      {/* Headline metric */}
      {metric && (
        <p className="metric-value mt-4 text-sm font-medium text-brand">
          {metric}
        </p>
      )}

      {/* Tech chips */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {technologies.map((tech) => (
          <span key={tech} className="tech-chip">
            {tech}
          </span>
        ))}
      </div>

      {/* Footer */}
      {(details || confidential) && (
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          {confidential ? (
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-muted-foreground/50" />
              Confidential — high-level only
            </span>
          ) : (
            <span />
          )}
          {details && projectDetailsPageSlug && (
            <Link
              href={projectDetailsPageSlug}
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Read case study
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
