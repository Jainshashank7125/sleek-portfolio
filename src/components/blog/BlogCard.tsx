import { BlogPostPreview } from '@/types/blog';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { Link } from 'next-view-transitions';

interface BlogCardProps {
  post: BlogPostPreview;
  index?: number;
}

export function BlogCard({ post, index = 1 }: BlogCardProps) {
  const { slug, frontmatter } = post;
  const formattedDate = new Date(frontmatter.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <article className="group border-border grid gap-5 border-b py-8 first:border-t sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:items-start sm:gap-7 lg:py-10">
      <span className="font-mono text-[0.68rem] tracking-[0.12em] text-[var(--field-red)]">
        {String(index).padStart(2, '0')}
      </span>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.65rem] tracking-[0.08em] uppercase">
          <time dateTime={frontmatter.date} className="text-muted-foreground">
            {formattedDate}
          </time>
          <span className="text-brand">
            {frontmatter.tags.slice(0, 3).join(' / ')}
          </span>
        </div>
        <h2 className="font-editorial mt-4 max-w-4xl text-3xl leading-[1.06] tracking-[-0.035em] text-balance sm:text-4xl">
          <Link href={`/blog/${slug}`} className="hover:text-brand">
            {frontmatter.title}
          </Link>
        </h2>
        <p className="text-muted-foreground mt-4 max-w-3xl text-base leading-relaxed">
          {frontmatter.description}
        </p>
        {frontmatter.tags.length > 3 && (
          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="More topics">
            {frontmatter.tags.slice(3).map((tag) => (
              <li key={tag} className="tech-chip capitalize">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Link
        href={`/blog/${slug}`}
        aria-label={`Read ${frontmatter.title}`}
        className="border-border text-brand hover:border-brand hover:text-foreground inline-flex size-11 items-center justify-center border transition-colors"
      >
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>
    </article>
  );
}
