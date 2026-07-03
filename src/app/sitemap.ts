import { siteConfig } from '@/config/Meta';
import { getPublishedBlogPosts } from '@/lib/blog';
import { getPublishedProjectCaseStudies } from '@/lib/project';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/blog',
    '/contact',
    '/gears',
    '/projects',
    '/resume',
    '/setup',
    '/work-experience',
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
  }));

  const blogRoutes = getPublishedBlogPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
  }));

  // ProjectCaseStudyFrontmatter has no real date field (only a free-text
  // `timeline` range), so lastModified is intentionally omitted here.
  const projectRoutes = getPublishedProjectCaseStudies().map((project) => ({
    url: `${siteConfig.url}/projects/${project.slug}`,
  }));

  return [...staticRoutes, ...blogRoutes, ...projectRoutes];
}
