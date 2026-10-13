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
  markdown: {
    rehypePlugins: [rehypeFigure, [rehypePokemonTypes, { iconBase: `${base}/icons/pokemon-types/` }]],
  },
});
