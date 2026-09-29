import { SectionLabel } from '@/components/field-notes/SectionLabel';
import { BlogFrontmatter } from '@/types/blog';
import rehypeHighlight from '@shikijs/rehype';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';

import { BlogComponents } from './BlogComponents';

interface BlogContentProps {
  frontmatter: BlogFrontmatter;
  content: string;
}

export function BlogContent({ frontmatter, content }: BlogContentProps) {
  const formattedDate = new Date(frontmatter.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <article>
      <header className="pb-12 sm:pb-16">
        <SectionLabel index="02">Field note</SectionLabel>
        <h1 className="editorial-page-title mt-8 max-w-6xl">
          {frontmatter.title}
        </h1>
        <p className="text-muted-foreground mt-7 max-w-4xl text-xl leading-relaxed">
          {frontmatter.description}
        </p>

        <div className="border-border mt-8 flex flex-col gap-5 border-y py-5 sm:flex-row sm:items-center sm:justify-between">
          <time
            dateTime={frontmatter.date}
            className="font-editorial text-foreground text-lg"
          >
            {formattedDate}
          </time>
          <ul className="flex flex-wrap gap-1.5" aria-label="Topics">
            {frontmatter.tags.map((tag) => (
              <li key={tag} className="tech-chip capitalize">
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {frontmatter.image && (
          <div className="border-border bg-card relative mt-9 aspect-[16/7] overflow-hidden border">
            <Image
              src={frontmatter.image}
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </header>

      <div className="mx-auto max-w-4xl">
        <div className="field-notes-prose">
          <MDXRemote
            source={content}
            components={BlogComponents}
            options={{
              mdxOptions: {
                rehypePlugins: [[rehypeHighlight, { theme: 'github-dark' }]],
              },
            }}
          />
        </div>
      </div>
    </article>
  );
}
