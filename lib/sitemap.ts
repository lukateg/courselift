import { blogPosts } from "@/lib/blog-data";

const BASE_URL = "https://www.courselift.xyz"; // canonical host

export function buildSitemapXml() {
  const iso = (d: Date) => d.toISOString();

  const staticPages = [
    { loc: `${BASE_URL}/`, lastmod: iso(new Date()) },
    { loc: `${BASE_URL}/lesson`, lastmod: iso(new Date()) },
    { loc: `${BASE_URL}/blog`, lastmod: iso(new Date()) },
  ];

  const blogPages = blogPosts
    .filter((p) => p.published)
    .map((p) => ({
      loc: `${BASE_URL}/blog/${p.slug}`,
      lastmod: iso(new Date(p.date)),
    }));

  const urls = [...staticPages, ...blogPages]
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}
