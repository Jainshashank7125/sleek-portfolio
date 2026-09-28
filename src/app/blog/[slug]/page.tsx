import { BlogContent } from '@/components/blog/BlogContent';
import { BlogList } from '@/components/blog/BlogList';
import Container from '@/components/common/Container';
import { siteConfig } from '@/config/Meta';
import {
  getBlogPostBySlug,
  getPublishedBlogPosts,
  getRelatedPosts,
} from '@/lib/blog';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPublishedBlogPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post || !post.frontmatter.isPublished) {
    return { title: 'Post Not Found' };
  }

  const { title, description, image, date, tags } = post.frontmatter;
  const url = `${siteConfig.url}/blog/${slug}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.title,
      images: [
        {
          url: image || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'article',
      publishedTime: date,
      authors: [siteConfig.author.name],
      tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image || siteConfig.ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post || !post.frontmatter.isPublished) notFound();

  const relatedPosts = await getRelatedPosts(slug, 3);
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    image: `${siteConfig.url}${post.frontmatter.image}`,
    datePublished: post.frontmatter.date,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: `${siteConfig.url}/blog/${slug}`,
  };

  return (
    <Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="py-8 sm:py-10">
        <Link
          href="/blog"
          className="text-muted-foreground hover:text-brand inline-flex min-h-11 items-center gap-2 font-mono text-[0.68rem] tracking-[0.1em] uppercase"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          All writing
        </Link>
      </div>

      <BlogContent frontmatter={post.frontmatter} content={post.content} />

      {relatedPosts.length > 0 && (
        <section className="border-border border-t py-14 sm:py-20">
          <p className="eyebrow">Continue reading</p>
          <div className="mt-7">
            <BlogList posts={relatedPosts} />
          </div>
        </section>
      )}
    </Container>
  );
}
