import { writeFile } from 'node:fs/promises';
import process from 'node:process';

// Run after build, once the real production origin is known.
const origin = new URL(process.env.SITE_URL || 'http://localhost');
if (origin.protocol !== 'https:' || origin.hostname === 'localhost') {
  throw new Error('Set SITE_URL to the real HTTPS production origin before generating SEO URLs.');
}
const routes = ['/', '/1', '/2', '/3', '/4', '/5'];
const escapeXml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(route => `  <url><loc>${escapeXml(new URL(route, origin).href)}</loc></url>`).join('\n')}\n</urlset>\n`;
await writeFile(new URL('../dist/sitemap.xml', import.meta.url), sitemap);
await writeFile(new URL('../dist/robots.txt', import.meta.url), `User-agent: *\nAllow: /\nSitemap: ${origin.origin}/sitemap.xml\n`);
