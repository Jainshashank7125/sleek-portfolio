import { resolveProjectActions } from '@/lib/project-actions.mjs';
import { type Project } from '@/types/project';
import {
  ArrowRight,
  ArrowUpRight,
  LockSimple,
} from '@phosphor-icons/react/dist/ssr';
import { Link } from 'next-view-transitions';
import React from 'react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

interface ProjectAction {
  kind: 'detail' | 'live' | 'github';
  label: string;
  href: string;
  external: boolean;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const actions = resolveProjectActions(project) as ProjectAction[];

  return (
    <article className="group border-border grid gap-6 border-b py-8 first:border-t md:grid-cols-[4.5rem_minmax(0,1fr)] lg:gap-10 lg:py-10">
      <div className="text-brand font-mono text-[0.68rem] tracking-[0.12em] uppercase">
        {String(index).padStart(2, '0')}
      </div>

      <div className="min-w-0">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(15rem,0.55fr)] lg:gap-12">
          <div>
            {project.category && <p className="eyebrow">{project.category}</p>}
            <h3 className="font-editorial mt-3 max-w-3xl text-3xl leading-[1.02] tracking-[-0.035em] text-balance sm:text-4xl">
              {project.title}
            </h3>
            <p className="text-muted-foreground mt-5 max-w-3xl text-base leading-relaxed">
              {project.description}
            </p>
            {project.problem && (
              <p className="text-muted-foreground mt-4 max-w-3xl border-l border-[var(--field-red)] pl-4 text-sm leading-relaxed">
                <span className="text-foreground font-semibold">
                  The problem:{' '}
                </span>
                {project.problem}
              </p>
            )}
          </div>

          <div className="lg:border-border flex flex-col lg:border-l lg:pl-8">
            {project.metric && (
              <p className="font-editorial text-foreground text-xl leading-snug">
                {project.metric}
              </p>
            )}
            <ul
              className="mt-5 flex flex-wrap gap-1.5"
              aria-label="Technology stack"
            >
              {project.technologies.map((technology) => (
                <li key={technology} className="tech-chip">
                  {technology}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 lg:mt-auto lg:pt-8">
              {actions.map((action) =>
                action.external ? (
                  <a
                    key={`${action.kind}-${action.href}`}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand hover:text-foreground inline-flex min-h-11 items-center gap-2 text-sm font-semibold"
                  >
                    {action.label}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                ) : (
                  <Link
                    key={`${action.kind}-${action.href}`}
                    href={action.href}
                    className="text-brand hover:text-foreground inline-flex min-h-11 items-center gap-2 text-sm font-semibold"
                  >
                    {action.label}
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                ),
              )}

              {project.confidential && (
                <span className="text-muted-foreground inline-flex items-center gap-1.5 font-mono text-[0.65rem] tracking-[0.05em] uppercase">
                  <LockSimple className="size-3.5" aria-hidden="true" />
                  High-level only
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
