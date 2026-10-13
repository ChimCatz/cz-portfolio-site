import type { APIRoute } from 'astro';
import { entryHref, getSorted, type ReadingCollection } from '../lib/reading';
import { CONTACT_LINK, HOME_HREF, NAV_LINKS, TERMS_LINK } from '../lib/site';

// The list of pages for search engines. Pages come from the same lists the
// header uses and from the three collections, so a new page or entry is
// included without touching this file.

const COLLECTIONS: ReadingCollection[] = ['projects', 'dataStudies', 'insights'];

export const GET: APIRoute = async ({ site }) => {
  const pages: { href: string; date?: Date }[] = [
    { href: HOME_HREF },
    ...[...NAV_LINKS, CONTACT_LINK, TERMS_LINK].map((link) => ({ href: link.href })),
  ];

  for (const collection of COLLECTIONS) {
    for (const entry of await getSorted(collection)) {
      const data = entry.data as { slug: string; date?: Date };
      pages.push({ href: entryHref(collection, { data }), date: data.date });
    }
  }

  const urls = pages.map(({ href, date }) => {
    // Pages are folders (about/index.html), so their address ends in a slash.
    const loc = new URL(href.endsWith('/') ? href : `${href}/`, site).href;
    const lastmod = date ? `<lastmod>${date.toISOString().slice(0, 10)}</lastmod>` : '';
    return `  <url><loc>${loc}</loc>${lastmod}</url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
