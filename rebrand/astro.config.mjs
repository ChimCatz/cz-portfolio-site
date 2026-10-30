// @ts-check
import { unified } from '@astrojs/markdown-remark';
import { defineConfig } from 'astro/config';
import rehypeFigure from './src/lib/rehype-figure.mjs';
import rehypeJobMarket from './src/lib/rehype-job-market.mjs';
import rehypePokemonTypes from './src/lib/rehype-pokemon-types.mjs';

// Deployed to GitHub Pages as a project site:
// https://chimcatz.github.io/cz-portfolio-site/
const base = '/cz-portfolio-site';

export default defineConfig({
  site: 'https://chimcatz.github.io',
  base,
  // Keep one space where text meets a tag on the next line. Astro 7's default
  // ("jsx") drops it, gluing words together ("under theCreative Commons").
  compressHTML: true,
  // Fetch a page's HTML when the pointer rests on a link to it (or it gets
  // keyboard focus), so the click opens it almost at once. Only this site's
  // own pages are fetched.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  // The rehype plugins run on the unified (remark/rehype) Markdown processor,
  // not on Astro 7's default one.
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeFigure, rehypeJobMarket, [rehypePokemonTypes, { iconBase: `${base}/icons/pokemon-types/` }]],
    }),
  },
});
