import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One folder per entry: src/content/<collection>/<slug>/index.md plus its images.
// The page URL comes from `slug` in the frontmatter.

const insights = defineCollection({
  loader: glob({ base: './src/content/insights', pattern: '*/index.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string(),
      date: z.coerce.date(),
      /** Short intro under the title; also used on the Insights list. */
      summary: z.string(),
      banner: image(),
      bannerAlt: z.string(),
      highlights: z.array(z.string()).default([]),
      /** Leave empty to hide the "Tools used" block. */
      tools: z.array(z.string()).default([]),
    }),
});

const dataStudies = defineCollection({
  loader: glob({ base: './src/content/data-studies', pattern: '*/index.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string(),
      date: z.coerce.date(),
      /** Short intro under the title; also used on the Data Studies list. */
      summary: z.string(),
      banner: image(),
      bannerAlt: z.string(),
      /** "At a glance" rows in the sidebar, e.g. { label: 'Records', value: '1,025' } */
      facts: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
      tools: z.array(z.string()).default([]),
      /** Dataset file in the study folder, e.g. ./my-data.csv */
      dataset: z.string().optional(),
      /** Link to the project files on GitHub */
      repo: z.string().url().optional(),
      /** Dataset or methodology note shown above the article */
      note: z.string().optional(),
      /** Copyright and data-use note, always shown last on the page */
      copyright: z.string().optional(),
      /** Pokémon type badges: the ## section headings where they apply (src/lib/rehype-pokemon-types.mjs) */
      typeBadges: z.array(z.string()).default([]),
    }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '*/index.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string(),
      /** Position on the Projects page and in "Next Project" (lowest first) */
      order: z.number(),
      /** The flagship case study shown large at the top of the Projects page */
      featured: z.boolean().default(false),
      /** Short label in the eyebrow and on cards, e.g. "Python desktop tool" */
      kicker: z.string(),
      summary: z.string(),
      banner: image(),
      bannerAlt: z.string(),
      /** Icon-only image for the Projects page cards (npm run project-art) */
      thumb: image(),
      /** Headline numbers: shown as a strip above the article; the first one also on the card */
      results: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
      /** How the project evolved, shown as a timeline above the article */
      evolution: z.array(z.object({ stage: z.string(), title: z.string(), detail: z.string() })).default([]),
      facts: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
      tools: z.array(z.string()).default([]),
      /** Shown above the article, e.g. that figures are illustrative */
      note: z.string().optional(),
    }),
});

export const collections = { insights, dataStudies, projects };
