import Container from '@/components/common/Container';
import { PipelineDiagram } from '@/components/field-notes/PipelineDiagram';
import { RuledSection } from '@/components/field-notes/RuledSection';
import { SectionLabel } from '@/components/field-notes/SectionLabel';
import { fieldNotesConfig } from '@/config/FieldNotes';
import { projects } from '@/config/Projects';
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { Link } from 'next-view-transitions';
import React from 'react';

export default function Projects() {
  const supportingProjects = fieldNotesConfig.homepageProjects
    .map((slug) =>
      projects.find((project) => project.projectDetailsPageSlug === slug),
    )
    .filter((project) => project !== undefined);

  return (
    <Container>
      <RuledSection id="featured-work">
        <SectionLabel index="03">Featured work</SectionLabel>

        <div className="mt-8 grid gap-10 xl:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.5fr)] xl:items-stretch">
          <div className="flex flex-col">
            <h2 className="font-editorial max-w-xl text-5xl leading-[0.94] tracking-[-0.045em] text-balance sm:text-6xl">
              {fieldNotesConfig.featuredWorkflow.title}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Redesigned a healthcare document-ingestion path to avoid
              unnecessary page rendering while preserving scanned and
              mixed-content support. The result is a leaner, more reliable
              workflow grounded in real production behavior.
            </p>
            <ul className="mt-7 flex flex-wrap gap-2" aria-label="Case study themes">
              {fieldNotesConfig.featuredWorkflow.themes.map((theme) => (
                <li key={theme} className="tech-chip">
                  {theme}
                </li>
              ))}
            </ul>
            <Link
              href="/projects/healthcare-document-ingestion"
              className="mt-8 inline-flex min-h-11 w-fit items-center gap-2 font-editorial text-lg text-[var(--field-red)] hover:text-brand"
            >
              Explore the full case study
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <PipelineDiagram stages={fieldNotesConfig.featuredWorkflow.stages} />
        </div>

        <div className="mt-14 border-t border-border pt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">04 / More work</p>
              <h3 className="font-editorial mt-3 text-3xl tracking-[-0.035em] sm:text-4xl">
                Systems around the workflow
              </h3>
            </div>
            <Link
              href="/projects"
              className="inline-flex min-h-11 items-center gap-2 font-mono text-xs tracking-[0.08em] uppercase text-muted-foreground hover:text-brand"
            >
              View all work
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-7 grid border-t border-border lg:grid-cols-3">
            {supportingProjects.map((project, index) => (
              <article
                key={project.title}
                className="min-w-0 border-b border-border py-7 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                <p className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-brand">
                  {String(index + 1).padStart(2, '0')} · {project.category}
                </p>
                <h4 className="font-editorial mt-4 text-2xl leading-tight tracking-[-0.025em]">
                  {project.title}
                </h4>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <Link
                  href={project.projectDetailsPageSlug}
                  className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand"
                >
                  Read case study
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </RuledSection>
    </Container>
  );
}
