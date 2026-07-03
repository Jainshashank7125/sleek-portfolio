import { siteConfig } from '@/config/Meta';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
