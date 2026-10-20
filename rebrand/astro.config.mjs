// @ts-check
import { defineConfig } from 'astro/config';
import rehypeFigure from './src/lib/rehype-figure.mjs';
import rehypePokemonTypes from './src/lib/rehype-pokemon-types.mjs';

// Deployed to GitHub Pages as a project site:
// https://chimcatz.github.io/cz-portfolio-site/
const base = '/cz-portfolio-site';

export default defineConfig({
  site: 'https://chimcatz.github.io',
  base,
  // Fetch a page's HTML when the pointer rests on a link to it (or it gets
  // keyboard focus), so the click opens it almost at once. Only this site's
  // own pages are fetched.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  markdown: {
    rehypePlugins: [rehypeFigure, [rehypePokemonTypes, { iconBase: `${base}/icons/pokemon-types/` }]],
  },
});
