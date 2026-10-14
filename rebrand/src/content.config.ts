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
      /** Side of the banner the list thumbnail keeps when it has to crop (banners are wider than the thumbnail) */
      thumbFocus: z.enum(['left', 'center', 'right']).default('center'),
      highlights: z.array(z.string()).default([]),
      /** Leave empty to hide the "Tools used" block. */
      tools: z.array(z.string()).default([]),
      /** "On this page" links in the sidebar, for long insights: `id` is an id in the article */
      chapters: z.array(z.object({ label: z.string(), id: z.string() })).default([]),
      /**
       * Source data offered for download and credited to its owner. `file` is a file in
       * the insight folder (zip, xlsx, pdf or csv), e.g. ./tables.zip
       */
      datasets: z
        .array(
          z.object({
            name: z.string(),
            owner: z.string(),
            detail: z.string(),
            file: z.string(),
            /** Terms the file is shared under, e.g. "Open Government Licence v3.0" */
            license: z.string(),
            /** Where the owner publishes it */
            source: z.string().url(),
          }),
        )
        .default([]),
      /** Copyright and data-use note, always shown last on the page */
      copyright: z.string().optional(),
      /** Charts and tools of its own: the name of a component listed in src/pages/insights/[slug].astro */
      story: z.enum(['job-market']).optional(),
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
      /** Side of the banner the list thumbnail keeps when it has to crop (banners are wider than the thumbnail) */
      thumbFocus: z.enum(['left', 'center', 'right']).default('center'),
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
      /** Shown on the homepage under "Selected work" */
      featured: z.boolean().default(false),
      /** Which filter the project answers to on the Projects page ('other' only shows under All) */
      category: z.enum(['automation', 'dashboard', 'other']).default('automation'),
      /**
       * Badges (src/lib/projects.ts builds the row): status, then version and
       * build date where they are known, then `badges`, then the license.
       */
      status: z.enum(['ongoing', 'shipped', 'superseded']).default('shipped'),
      /** Current version, without the "v", e.g. "1.2.0" */
      version: z.string().optional(),
      /** Month of the build that version belongs to, e.g. "Sep 2026" */
      built: z.string().optional(),
      /** License the source is published under, e.g. "MIT" */
      license: z.string().optional(),
      /** Other details worth a badge when there is no version or date, e.g. { label: 'refresh', value: 'hourly' } */
      badges: z
        .array(
          z.object({
            label: z.string(),
            value: z.string(),
            tone: z.enum(['purple', 'blue', 'green', 'amber', 'teal', 'slate']).default('slate'),
          }),
        )
        .default([]),
      /** Public source code on GitHub */
      repo: z.string().url().optional(),
      /** Short label in the eyebrow and on cards, e.g. "Python desktop tool" */
      kicker: z.string(),
      /** One line under the title on the Projects page. Defaults to the part of the title after the colon. */
      tagline: z.string().optional(),
      summary: z.string(),
      /**
       * Page-top image. Optional: dashboard projects show the live dashboard in
       * its place, and the suite's tools have no picture at all.
       */
      banner: image().optional(),
      bannerAlt: z.string().optional(),
      /**
       * Image for the Projects page and the homepage (dashboard screenshots come
       * from npm run project-art). Without one, the Projects page shows the
       * project's `results` in the image's place.
       */
      thumb: image().optional(),
      /** Every image frame is 16:9. `full` fits the whole thumb inside it instead of cropping (wide illustrations). */
      thumbFit: z.enum(['crop', 'full']).default('crop'),
      /** Edge the frame keeps when it crops the thumb. Dashboard screenshots always keep the top. */
      thumbFocus: z.enum(['center', 'top']).default('center'),
      /** Frame color around a `full` thumb: the image's own background color, e.g. "#f8f5f0" */
      thumbBg: z.string().regex(/^#[0-9a-f]{6}$/i).optional(),
      /** Where the data comes from and ends up, e.g. ["Zoho CRM", "Zoho Analytics"] */
      flow: z.array(z.string()).default([]),
      /**
       * Live dashboards embedded at the top of the page; several become tabs.
       * `src` is a path under public/dashboards/. Zoho exports are a fixed 1440px
       * wide and need their `height` in px; pages that reflow set `fluid`.
       */
      dashboards: z
        .array(
          z.object({
            label: z.string(),
            src: z.string(),
            height: z.number().optional(),
            fluid: z.boolean().default(false),
          }),
        )
        .default([]),
      /** Headline numbers: a strip above the article, and on the Projects page (all three when there is no thumb) */
      results: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
      /** How the project evolved, shown as a timeline above the article */
      evolution: z.array(z.object({ stage: z.string(), title: z.string(), detail: z.string() })).default([]),
      facts: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
      tools: z.array(z.string()).default([]),
      /** Shown above the article, e.g. that figures are illustrative */
      note: z.string().optional(),
      /** A file in the project folder offered for download in the sidebar, e.g. a sample workbook */
      download: z.object({ file: z.string(), label: z.string() }).optional(),
      /** A live demo shown above the article: the name of a component listed in src/pages/projects/[slug].astro */
      demo: z.enum(['search']).optional(),
    }),
});

export const collections = { insights, dataStudies, projects };
