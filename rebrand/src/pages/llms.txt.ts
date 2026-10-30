import type { APIRoute } from 'astro';
import { entryHref, getSorted, type ReadingCollection } from '../lib/reading';
import { CONTACT_LINK, HOME_HREF, NAV_LINKS, TERMS_LINK } from '../lib/site';

// A plain-text guide to the site for AI tools (llmstxt.org): who the site is
// about, then every page with its one-line summary. Built from the same lists
// as the sitemap, so a new page or entry is included without touching this file.

const SECTIONS: { collection: ReadingCollection; heading: string }[] = [
  { collection: 'projects', heading: 'Projects' },
  { collection: 'dataStudies', heading: 'Data Studies' },
  { collection: 'insights', heading: 'Insights' },
];

// The pages in the header, with what each one holds
const PAGES: Record<string, string> = {
  'About Me': 'Background, tools, certifications, and why data.',
  Projects: 'Every project on one page, with filters.',
  'Data Studies': 'All data studies, newest first.',
  Insights: 'All insights, newest first.',
  Resume: 'Resume, to read or download as a PDF.',
  'Get in Touch': 'Contact form, email, LinkedIn, Facebook, and GitHub.',
};

export const GET: APIRoute = async ({ site }) => {
  const url = (href: string) => new URL(href.endsWith('/') ? href : `${href}/`, site).href;
  const line = (title: string, href: string, note: string) => `- [${title}](${url(href)}): ${note}`;

  const lines = [
    '# CZ Catalan',
    '',
    '> Portfolio of Chim Zoe (CZ) Catalan, a data analyst with an engineering background in Cagayan de Oro City, Philippines, working across CRM data, reporting, and dashboards with Python, SQL, and AI.',
    '',
    'Projects are tools and dashboards CZ designed and built. Dashboards show sample data: the company, client, vendor, and people names in them are sample names.',
    '',
    '## Pages',
    '',
    line('Home', HOME_HREF, 'Selected work and the latest writing.'),
    ...[...NAV_LINKS, CONTACT_LINK].map((link) => line(link.label, link.href, PAGES[link.label] ?? link.label)),
  ];

  for (const { collection, heading } of SECTIONS) {
    lines.push('', `## ${heading}`, '');
    for (const entry of await getSorted(collection)) {
      const { title, summary, slug } = entry.data as { title: string; summary: string; slug: string };
      lines.push(line(title, entryHref(collection, { data: { slug } }), summary));
    }
  }

  lines.push('', '## Optional', '', line('Terms & Policies', TERMS_LINK.href, 'Terms of use, trademark notice, and privacy policy.'));

  return new Response(`${lines.join('\n')}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
