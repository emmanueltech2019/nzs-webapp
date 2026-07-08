import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_MAIN || 'http://localhost:3000';

  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/product', 
    '/shop', 
    '/privacy-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' ? 'daily' : 'weekly') as 'daily' | 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...staticRoutes];
}