import Container from '@/components/common/Container';
import { RuledSection } from '@/components/field-notes/RuledSection';
import { SectionLabel } from '@/components/field-notes/SectionLabel';
import { getPublishedBlogPosts } from '@/lib/blog';
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { Link } from 'next-view-transitions';
import React from 'react';

export default function Writing() {
  const posts = getPublishedBlogPosts().slice(0, 2);

  return (
    <Container>
      <RuledSection>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel index="06">Writing</SectionLabel>
            <h2 className="font-editorial mt-7 text-4xl tracking-[-0.04em] sm:text-5xl">
              Notes from the work
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex min-h-11 items-center gap-2 font-mono text-xs tracking-[0.08em] uppercase text-muted-foreground hover:text-brand"
          >
            Read all notes
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 border-t border-border">
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className="grid gap-4 border-b border-border py-7 sm:grid-cols-[3.5rem_minmax(0,1fr)_auto] sm:items-start"
            >
              <span className="font-mono text-xs text-[var(--field-red)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[0.65rem] tracking-[0.08em] uppercase text-brand">
                  {post.frontmatter.tags.slice(0, 3).join(' / ')}
                </p>
                <h3 className="font-editorial mt-3 text-2xl leading-tight tracking-[-0.025em] sm:text-3xl">
                  <Link href={`/blog/${post.slug}`} className="hover:text-brand">
                    {post.frontmatter.title}
                  </Link>
                </h3>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  {post.frontmatter.description}
                </p>
              </div>
              <Link
                href={`/blog/${post.slug}`}
                aria-label={`Read ${post.frontmatter.title}`}
                className="inline-flex size-11 items-center justify-center border border-border text-brand hover:border-brand"
              >
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </RuledSection>
    </Container>
  );
}
