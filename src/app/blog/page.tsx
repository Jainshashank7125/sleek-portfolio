import { BlogList } from '@/components/blog/BlogList';
import Container from '@/components/common/Container';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { getAllTags, getPublishedBlogPosts } from '@/lib/blog';
import { Metadata } from 'next';
import { Robots } from 'next/dist/lib/metadata/types/metadata-types';

export const generateMetadata = (): Metadata => {
  const metadata = getMetadata('/blog');
  return {
    ...metadata,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      } as Robots['googleBot'],
    },
  };
};

export default function BlogPage() {
  const posts = getPublishedBlogPosts();
  const tags = getAllTags();

  return (
    <Container className="max-w-5xl py-16">
      {/* Header — consistent with other page headers */}
      <div className="flex flex-col gap-2">
        <p className="eyebrow">Technical writing</p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Writing
        </h1>
        <p className="mt-1 max-w-2xl text-muted-foreground">
          Deep-dives on backend systems, distributed architectures, AI
          engineering, and the tradeoffs behind real production decisions.
        </p>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="tech-chip capitalize">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Posts */}
      <div className="mt-10">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="metric-value">{posts.length}</span>{' '}
            {posts.length === 1 ? 'post' : 'posts'}
          </p>
        </div>
        <BlogList posts={posts} />
      </div>
    </Container>
  );
}
