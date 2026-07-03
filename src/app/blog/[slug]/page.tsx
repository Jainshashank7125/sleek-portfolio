import { BlogContent } from '@/components/blog/BlogContent';
import { BlogList } from '@/components/blog/BlogList';
import Container from '@/components/common/Container';
import ArrowLeft from '@/components/svgs/ArrowLeft';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/config/Meta';
import {
  getBlogPostBySlug,
  getPublishedBlogPosts,
  getRelatedPosts,
} from '@/lib/blog';
import { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static paths for published blog posts only
export async function generateStaticParams() {
  const posts = getPublishedBlogPosts();

  return posts.map(({ slug }) => ({
    slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  //  await params
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post || !post.frontmatter.isPublished) {
    return {
      title: 'Post Not Found',
    };
  }

  const { title, description, image, date, tags } = post.frontmatter;
  const url = `${siteConfig.url}/blog/${slug}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.title,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      type: 'article',
      publishedTime: date,
      authors: [siteConfig.author.name],
      tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post || !post.frontmatter.isPublished) {
    notFound();
  }
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
    <Container className="py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="space-y-12">
        {/* Back Button */}
        <div>
          <Button variant="ghost" asChild className="group">
            <Link href="/blog" className="flex items-center space-x-2">
              <ArrowLeft className="size-4" />
              <span>Back to Blog</span>
            </Link>
          </Button>
        </div>

        {/* Blog Content */}
        <BlogContent frontmatter={post.frontmatter} content={post.content} />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="space-y-6">
            <Separator />
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Related Posts</h2>
              <BlogList posts={relatedPosts} />
            </div>
          </div>
        )}

        {/* Back to Blog CTA */}
        <div className="text-center">
          <Separator className="mb-8" />
          <Button asChild size="lg">
            <Link href="/blog">View All Blogs</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
