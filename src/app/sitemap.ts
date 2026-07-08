import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Ensure you set NEXT_PUBLIC_BASE_URL in your .env files
  // e.g., NEXT_PUBLIC_BASE_URL="https://www.naijazone.com"
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  // Explicitly map only the public-facing, indexable routes derived from your file tree
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