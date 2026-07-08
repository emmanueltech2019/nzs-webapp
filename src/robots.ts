import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Ensure this matches the base URL used in your sitemap
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.naijazone.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/auth',       // Blocks authentication pages from being indexed
        '/billing',    // Blocks user billing and checkout areas
        '/_next/',     // Prevents crawlers from wasting resources on Next.js build files
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}