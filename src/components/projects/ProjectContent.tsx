import { Button } from '@/components/ui/button';
import { ProjectCaseStudyFrontmatter } from '@/types/project';
import rehypeHighlight from '@shikijs/rehype';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Link } from 'next-view-transitions';

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

  const statusStamp =
    status === 'completed'
      ? { label: 'Completed', className: 'stamp-paid' }
      : status === 'in-progress'
        ? { label: 'In progress', className: 'stamp-pending' }
        : { label: 'Archived', className: 'text-muted-foreground' };

  const meta = [
    { label: 'Timeline', value: timeline },
    { label: 'Role', value: role },
    ...(team ? [{ label: 'Team', value: team }] : []),
  ];

  return (
    <article className="mx-auto max-w-4xl">
      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-3">
          <span className={`stamp ${statusStamp.className}`}>
            {statusStamp.label}
          </span>
          {category && (
            <span className="font-narrow text-muted-foreground text-sm font-semibold">
              {category}
            </span>
          )}
        </div>

        <h1 className="font-wide mt-4 max-w-[22ch] text-[clamp(2rem,4.4vw,3.1rem)] leading-[1.05] font-semibold tracking-[-0.02em]">
          {title}
        </h1>
        <p className="text-muted-foreground mt-5 max-w-[62ch] text-xl leading-relaxed">
          {description}
        </p>

        {problem && (
          <div className="border-denied mt-8 max-w-[62ch] border-l-2 pl-5">
            <p className="font-narrow text-denied text-sm font-semibold">
              The problem
            </p>
            <p className="mt-1 leading-relaxed">{problem}</p>
          </div>
        )}

        {/* Title block */}
        <dl className="sheet mt-10 grid sm:grid-cols-2 lg:grid-cols-4">
          {meta.map((item) => (
            <div
              key={item.label}
              className="border-border border-b px-4 py-3 sm:border-r lg:border-b-0"
            >
              <dt className="font-narrow text-muted-foreground text-xs">
                {item.label}
              </dt>
              <dd className="text-sm font-semibold">{item.value}</dd>
            </div>
          ))}
          <div className="px-4 py-3 lg:col-start-4">
            <dt className="font-narrow text-muted-foreground text-xs">
              Built with
            </dt>
            <dd className="text-sm font-semibold">
              {technologies.slice(0, 4).join(', ')}
            </dd>
          </div>
        </dl>

        {(live || github) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {live && (
              <Button asChild>
                <Link href={live} target="_blank" rel="noopener noreferrer">
                  Open the live site
                </Link>
              </Button>
            )}
            {github && (
              <Button variant="outline" asChild>
                <Link href={github} target="_blank" rel="noopener noreferrer">
                  View the source code
                </Link>
              </Button>
            )}
          </div>
        )}

        {confidential && (
          <p className="text-muted-foreground mt-4 text-sm">
            Professional work, shared at a high level: architecture, decisions,
            and outcomes, without proprietary detail or links.
          </p>
        )}
      </header>

      <div className="mb-10">
        <p className="font-narrow text-muted-foreground mb-2 text-sm font-semibold">
          Full stack
        </p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          {technologies.map((tech) => (
            <li key={tech} className="tech-chip">
              {tech}
            </li>
          ))}
        </ul>
      </div>

      {/* Content */}
      <div className="prose prose-neutral dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-headings:[font-stretch:112%] prose-a:text-brand prose-pre:rounded-none prose-pre:border prose-pre:border-border prose-blockquote:border-construct max-w-[68ch]">
        <MDXRemote
          source={content}
          components={ProjectComponents}
          options={{
            mdxOptions: {
              rehypePlugins: [
                [
                  rehypeHighlight,
                  { themes: { light: 'github-light', dark: 'github-dark' } },
                ],
              ],
            },
          }}
        />
      </div>

      {/* Challenges & learnings */}
      {(challenges?.length || learnings?.length) && (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {challenges && challenges.length > 0 && (
            <ListCard title="Key challenges" items={challenges} />
          )}
          {learnings && learnings.length > 0 && (
            <ListCard title="What I took away" items={learnings} />
          )}
        </div>
      )}
    </article>
  );
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="sheet p-5">
      <h3 className="mb-3 text-base font-semibold tracking-tight">{title}</h3>
      <ul className="space-y-2.5">
        {items.map((item, index) => (
          <li
            key={index}
            className="text-muted-foreground flex items-start gap-2.5 text-sm"
          >
            <span
              aria-hidden
              className="bg-construct mt-[0.7em] block h-px w-2 shrink-0"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
