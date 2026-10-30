// Writes the data tables and the BLS quotes of the job market insight
// (frontmatter `story: job-market`) into the page at build time, so the
// numbers behind every chart are in the HTML and read without JavaScript.
// The charts themselves are still drawn in the browser by JobMarketStory.astro.
//
// Fills the empty placeholders in the insight's index.md: <div id="t-..."></div>
// gets a "View data table" <details>, <div id="bls-quotes"></div> the quotes.
// The article is raw HTML, which Astro parses only after the rehype plugins
// have run, so the placeholders are filled in the HTML text itself.
import { readFileSync } from 'node:fs';
import { esc, quotes, tables } from './job-market.js';

const tableHtml = ({ head, rows }) =>
  '<details class="tbl"><summary>View data table</summary><div class="tbl-scroll"><table>' +
  `<tr>${head.map((cell) => `<th scope="col">${esc(cell)}</th>`).join('')}</tr>` +
  rows.map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join('')}</tr>`).join('') +
  '</table></div></details>';

const quoteHtml = (q) => `<blockquote class="bls">${esc(q.text)}<cite>${esc(q.cite)}</cite></blockquote>`;

export default function rehypeJobMarket() {
  const build = () => {
    const data = JSON.parse(readFileSync(new URL('../data/job-market-occupations.json', import.meta.url), 'utf8'));
    const filled = {};
    for (const [id, table] of Object.entries(tables(data))) filled[id] = tableHtml(table);
    filled['bls-quotes'] = quotes(data).map(quoteHtml).join('');
    return filled;
  };

  const walk = (node, fill) => {
    if (node.type === 'raw') node.value = fill(node.value);
    for (const child of node.children || []) walk(child, fill);
  };

  return (tree, file) => {
    if (file.data.astro?.frontmatter?.story !== 'job-market') return;
    const filled = build();
    const left = new Set(Object.keys(filled));
    walk(tree, (html) =>
      html.replace(/(<div id="([\w-]+)"[^>]*>)(<\/div>)/g, (match, open, id, close) => {
        if (!(id in filled)) return match;
        left.delete(id);
        return open + filled[id] + close;
      }),
    );
    if (left.size) throw new Error(`Job market insight: no placeholder for ${[...left].join(', ')}`);
  };
}
