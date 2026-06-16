import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ProjectCaseStudyFrontmatter } from '@/types/project';
import rehypeHighlight from '@shikijs/rehype';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Link } from 'next-view-transitions';
import Image from 'next/image';

import Github from '../svgs/Github';
import Website from '../svgs/Website';
import { ProjectComponents } from './ProjectComponents';

interface ProjectContentProps {
  frontmatter: ProjectCaseStudyFrontmatter;
  content: string;
}

export function ProjectContent({ frontmatter, content }: ProjectContentProps) {
  const {
    title,
    category,
    description,
    problem,
    image,
    technologies,
    github,
    live,
    timeline,
    role,
    team,
    status,
    confidential,
    challenges,
    learnings,
  } = frontmatter;

  const statusVariant =
    status === 'completed'
      ? 'default'
      : status === 'in-progress'
        ? 'secondary'
        : 'outline';
  const statusLabel = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <article className="mx-auto max-w-4xl">
      <header className="mb-10 space-y-6">
        {/* Banner */}
        <div className="relative flex aspect-[16/6] items-end overflow-hidden rounded-xl border border-border bg-card">
          {image ? (
            <Image src={image} alt={title} fill className="object-cover" priority />
          ) : (
            <>
              <div className="absolute inset-0 bg-dot-grid opacity-60" />
              <div className="absolute inset-x-0 top-0 h-40 bg-brand-glow" />
              <div className="relative p-6">
                {category && <p className="eyebrow">{category}</p>}
                <p className="metric-value mt-2 text-xl font-semibold tracking-tight md:text-2xl">
                  {title}
                </p>
              </div>
            </>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={statusVariant} className="text-sm">
              {statusLabel}
            </Badge>
            {category && (
              <Badge variant="outline" className="text-xs">
                {category}
              </Badge>
            )}
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight lg:text-5xl">
            {title}
          </h1>

          <p className="text-xl text-muted-foreground">{description}</p>

          {/* Problem callout */}
          {problem && (
            <div className="rounded-lg border border-border bg-brand-muted p-4">
              <p className="eyebrow">The problem</p>
              <p className="mt-1.5 text-sm leading-relaxed">{problem}</p>
            </div>
          )}

          {/* Meta */}
          <div className="grid gap-4 rounded-lg border border-border bg-muted/20 p-4 sm:grid-cols-2 lg:grid-cols-4">
            <Meta label="Timeline" value={timeline} />
            <Meta label="Role" value={role} />
            {team && <Meta label="Team" value={team} />}
            <div>
              <h5 className="text-xs font-medium text-muted-foreground">
                Status
              </h5>
              <Badge variant={statusVariant} className="mt-1 text-xs">
                {statusLabel}
              </Badge>
            </div>
          </div>

          {/* Links (only when present) */}
          {(live || github) && (
            <div className="flex flex-wrap gap-3">
              {live && (
                <Button asChild>
                  <Link
                    href={live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Website className="size-4" />
                    Live
                  </Link>
                </Button>
              )}
              {github && (
                <Button variant="outline" asChild>
                  <Link
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github className="size-4" />
                    Source Code
                  </Link>
                </Button>
              )}
            </div>
          )}

          {confidential && (
            <p className="text-xs text-muted-foreground">
              This is professional work shared at a high level — architecture,
              decisions, and outcomes without proprietary detail or links.
            </p>
          )}
        </div>

        <Separator />
      </header>

      {/* Tech stack */}
      <div className="mb-10">
        <p className="eyebrow mb-3">Stack</p>
        <div className="flex flex-wrap gap-1.5">
          {technologies.map((tech) => (
            <span key={tech} className="tech-chip">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-pre:rounded-lg prose-pre:border prose-pre:border-border">
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

      {/* Challenges & learnings */}
      {(challenges?.length || learnings?.length) && (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {challenges && challenges.length > 0 && (
            <ListCard title="Key Challenges" items={challenges} />
          )}
          {learnings && learnings.length > 0 && (
            <ListCard title="What I Took Away" items={learnings} />
          )}
        </div>
      )}
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <h5 className="text-xs font-medium text-muted-foreground">{label}</h5>
      <p className="mt-1 text-sm">{value}</p>
    </div>
  );
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="mb-3 text-base font-semibold tracking-tight">{title}</h3>
      <ul className="space-y-2.5">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-2.5 text-sm text-muted-foreground"
          >
            <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-brand" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
