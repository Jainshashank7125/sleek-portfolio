import { SectionLabel } from '@/components/field-notes/SectionLabel';
import { ProjectCaseStudyFrontmatter } from '@/types/project';
import { ArrowUpRight, LockSimple } from '@phosphor-icons/react/dist/ssr';
import rehypeHighlight from '@shikijs/rehype';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';

import { ProjectComponents } from './ProjectComponents';

interface ProjectContentProps {
  frontmatter: ProjectCaseStudyFrontmatter;
  content: string;
}

export function ProjectContent({ frontmatter, content }: ProjectContentProps) {
  const statusLabel = frontmatter.status.replace('-', ' ');

  return (
    <article>
      <header className="pb-14 sm:pb-20">
        <SectionLabel index="02">
          {frontmatter.category || 'Case study'}
        </SectionLabel>

        <div className="mt-8 grid gap-10 xl:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.55fr)] xl:items-end">
          <div>
            <h1 className="editorial-page-title max-w-5xl">
              {frontmatter.title}
            </h1>
            <p className="text-muted-foreground mt-7 max-w-3xl text-xl leading-relaxed">
              {frontmatter.description}
            </p>
          </div>

          <dl className="border-border grid border-t sm:grid-cols-2 xl:grid-cols-1">
            <Meta label="Timeline" value={frontmatter.timeline} />
            <Meta label="Role" value={frontmatter.role} />
            {frontmatter.team && <Meta label="Team" value={frontmatter.team} />}
            <Meta label="Status" value={statusLabel} />
          </dl>
        </div>

        {frontmatter.problem && (
          <div className="border-border mt-10 grid gap-3 border-y py-6 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-8">
            <p className="eyebrow">The problem</p>
            <p className="font-editorial text-foreground max-w-4xl text-2xl leading-snug">
              {frontmatter.problem}
            </p>
          </div>
        )}

        {frontmatter.image && (
          <div className="border-border bg-card relative mt-10 aspect-[16/7] overflow-hidden border">
            <Image
              src={frontmatter.image}
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="border-border mt-8 flex flex-col gap-6 border-b pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Working stack</p>
            <ul
              className="mt-3 flex flex-wrap gap-1.5"
              aria-label="Technology stack"
            >
              {frontmatter.technologies.map((technology) => (
                <li key={technology} className="tech-chip">
                  {technology}
                </li>
              ))}
            </ul>
          </div>

          {(frontmatter.live || frontmatter.github) && (
            <div className="flex flex-wrap gap-5">
              {frontmatter.live && (
                <ExternalLink href={frontmatter.live}>View live</ExternalLink>
              )}
              {frontmatter.github && (
                <ExternalLink href={frontmatter.github}>
                  View source
                </ExternalLink>
              )}
            </div>
          )}
        </div>

        {frontmatter.confidential && (
          <p className="text-muted-foreground mt-5 inline-flex items-start gap-2 text-sm leading-relaxed">
            <LockSimple className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            Professional work shared at a high level: architecture, decisions,
            and outcomes without proprietary product or client detail.
          </p>
        )}
      </header>

      <div className="mx-auto max-w-4xl">
        <div className="field-notes-prose">
          <MDXRemote
            source={content}
            components={ProjectComponents}
            options={{
              mdxOptions: {
                rehypePlugins: [[rehypeHighlight, { theme: 'github-dark' }]],
              },
            }}
          />
        </div>

        {(frontmatter.challenges?.length || frontmatter.learnings?.length) && (
          <div className="border-border mt-16 grid border-y md:grid-cols-2">
            {frontmatter.challenges && frontmatter.challenges.length > 0 && (
              <ListNote
                title="Design constraints"
                items={frontmatter.challenges}
              />
            )}
            {frontmatter.learnings && frontmatter.learnings.length > 0 && (
              <ListNote
                title="What I took away"
                items={frontmatter.learnings}
              />
            )}
          </div>
        )}
      </div>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-border border-b py-4 sm:px-5 sm:first:pl-0 xl:px-0">
      <dt className="text-brand font-mono text-[0.65rem] tracking-[0.11em] uppercase">
        {label}
      </dt>
      <dd className="text-foreground mt-1 text-sm capitalize">{value}</dd>
    </div>
  );
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-brand hover:text-foreground inline-flex min-h-11 items-center gap-2 text-sm font-semibold"
    >
      {children}
      <ArrowUpRight className="size-4" aria-hidden="true" />
    </a>
  );
}

function ListNote({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="py-7 md:px-8 md:first:border-r md:first:pl-0 md:last:pr-0">
      <h2 className="font-editorial text-2xl tracking-[-0.025em]">{title}</h2>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="text-muted-foreground grid grid-cols-[0.75rem_minmax(0,1fr)] gap-2 text-sm leading-relaxed"
          >
            <span className="text-[var(--field-red)]" aria-hidden="true">
              →
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
