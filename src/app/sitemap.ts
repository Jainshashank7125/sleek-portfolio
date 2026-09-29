import { siteConfig } from '@/config/Meta';
import { getPublishedBlogPosts } from '@/lib/blog';
import { getPublishedProjectCaseStudies } from '@/lib/project';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { route: '', priority: 1 },
    { route: '/projects', priority: 0.9 },
    { route: '/work-experience', priority: 0.8 },
    { route: '/blog', priority: 0.8 },
    { route: '/resume', priority: 0.7 },
    { route: '/contact', priority: 0.7 },
    { route: '/setup', priority: 0.5 },
    { route: '/gears', priority: 0.5 },
  ].map(({ route, priority }) => ({
    url: `${siteConfig.url}${route}`,
    changeFrequency: 'monthly' as const,
    priority,
  }));

  const blogRoutes = getPublishedBlogPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }));

  // ProjectCaseStudyFrontmatter has no real date field (only a free-text
  // `timeline` range), so lastModified is intentionally omitted here.
  const projectRoutes = getPublishedProjectCaseStudies().map((project) => ({
    url: `${siteConfig.url}/projects/${project.slug}`,
    changeFrequency: 'yearly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes, ...projectRoutes];
}
