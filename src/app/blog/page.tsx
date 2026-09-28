import { BlogList } from '@/components/blog/BlogList';
import Container from '@/components/common/Container';
import { EditorialPageHeader } from '@/components/field-notes/EditorialPageHeader';
import { RuledSection } from '@/components/field-notes/RuledSection';
import { SectionLabel } from '@/components/field-notes/SectionLabel';
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
    <Container>
      <EditorialPageHeader
        index="01"
        eyebrow="Technical writing"
        title="Notes from the work."
        description="Long-form explanations of backend systems, distributed workflows, data infrastructure, and the tradeoffs behind production engineering decisions."
      />

      <RuledSection>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel index="02">Published notes</SectionLabel>
            <p className="font-editorial text-muted-foreground mt-6 text-2xl">
              {posts.length} {posts.length === 1 ? 'essay' : 'essays'} and
              growing.
            </p>
          </div>

          {tags.length > 0 && (
            <ul
              className="flex max-w-3xl flex-wrap gap-1.5"
              aria-label="Topics"
            >
              {tags.map((tag) => (
                <li key={tag} className="tech-chip capitalize">
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-9">
          <BlogList posts={posts} />
        </div>
      </RuledSection>
    </Container>
  );
}
