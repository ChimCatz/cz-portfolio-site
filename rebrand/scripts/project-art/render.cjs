// Renders the project banners, card thumbnails, and the suite architecture diagram to PNG.
//
//   npm run project-art
//
// Needs Playwright with Chromium. It isn't a project dependency; install it
// once with `npx playwright install chromium` and run with Playwright on the
// path, or point PLAYWRIGHT_PATH at an existing playwright package folder.
// Edit BANNERS below to change a banner's text or numbers, then re-run.

const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');

const here = __dirname;
const projects = path.join(here, '../../src/content/projects');

// [folder, icon, kicker, banner title, [[value, label] x3]]
const BANNERS = [
  ['from-vba-to-a-python-tool-suite', 'suite', 'Flagship case study', 'From a VBA Workbook to a Python Tool Suite',
    [['8', 'tools, one launcher'], ['300K+', 'records processed'], ['v21', 'and still growing']]],
  ['search-and-filter-engine', 'search', 'Python desktop tool', 'Search & Filter Engine',
    [['<10 s', 'per search'], ['100K+', 'rows, no lag'], ['90–95%', 'match accuracy']]],
  ['crm-conversion-engine', 'convert', 'Python ETL tool', 'CRM Conversion Engine',
    [['~18 s', 'for 40K+ records'], ['95%+', 'less processing time'], ['80–90%', 'fewer import errors']]],
  ['crm-reconciliation-tool', 'merge', 'Python desktop tool', 'CRM Reconciliation Tool',
    [['1 run', 'whole import package'], ['0', 'blank overwrites'], ['Ordered', 'import files']]],
  ['call-analytics-tool', 'calls', 'Python desktop tool', 'Call Analytics Tool',
    [['<15 s', 'per dataset'], ['98%', 'less time per run'], ['3-layer', 'phone matching']]],
  ['pivot-report-tool', 'table', 'Python desktop tool', 'Pivot Report Tool',
    [['<20 s', 'per report'], ['95%', 'less time'], ['Saved', 'sessions']]],
  ['turning-excel-into-a-crm', 'sheet', 'Advanced Excel', 'Turning Excel Into a CRM',
    [['30,000+', 'records'], ['160+', 'fields per record'], ['6', 'sources merged']]],
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 1.5 });

  await page.setViewportSize({ width: 1600, height: 640 });
  for (const [folder, icon, kicker, title, stats] of BANNERS) {
    const data = encodeURIComponent(JSON.stringify({ icon, kicker, title, stats }));
    // A hash-only change doesn't reload the page, so each banner gets a fresh load.
    await page.goto('about:blank');
    await page.goto(`${pathToFileURL(path.join(here, 'banner.html'))}#${data}`);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(projects, folder, 'banner.png') });
    console.log('banner', folder);
  }

  // Icon-only thumbnails for the Projects page cards
  await page.setViewportSize({ width: 1200, height: 480 });
  for (const [folder, icon] of BANNERS) {
    const data = encodeURIComponent(JSON.stringify({ icon, variant: 'thumb', kicker: '', title: '', stats: [] }));
    await page.goto('about:blank');
    await page.goto(`${pathToFileURL(path.join(here, 'banner.html'))}#${data}`);
    await page.screenshot({ path: path.join(projects, folder, 'thumb.png') });
    console.log('thumb', folder);
  }

  await page.setViewportSize({ width: 1600, height: 900 });
  await page.goto(pathToFileURL(path.join(here, 'architecture.html')).href);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(projects, 'from-vba-to-a-python-tool-suite', 'architecture.png') });
  console.log('architecture diagram');

  await browser.close();
})();
