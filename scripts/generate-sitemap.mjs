import fs from "node:fs";
import path from "node:path";
import "dotenv/config";

const cwd = process.cwd();

const rawSiteUrl = process.env.VITE_SITE_URL || process.env.SITE_URL || "http://localhost:5173";
const siteUrl = rawSiteUrl.replace(/\/+$/, "");

const publicDir = path.join(cwd, "public");
fs.mkdirSync(publicDir, { recursive: true });

const today = new Date().toISOString();

const urls = [
  { loc: `${siteUrl}/`, changefreq: "weekly", priority: 1.0 },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap, "utf8");

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

fs.writeFileSync(path.join(publicDir, "robots.txt"), robots, "utf8");

console.log(`[seo] Generated public/sitemap.xml and public/robots.txt for ${siteUrl}`);

