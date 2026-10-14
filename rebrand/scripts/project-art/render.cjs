// Renders the dashboard screenshots, the suite architecture diagram and the
// link-preview card (og-card.html -> public/og-card.png) to PNG
// (and icon banners and card thumbnails for any project listed in BANNERS).
//
//   npm run project-art
//
// Needs Playwright with Chromium. It isn't a project dependency; install it
// once with `npx playwright install chromium` and run with Playwright on the
// path, or point PLAYWRIGHT_PATH at an existing playwright package folder.
// Edit BANNERS below to change a banner's text or numbers, then re-run.
// Dashboard projects have no banner: their card image is a screenshot of the
// live page in public/dashboards/ (see SHOTS).

const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');

const here = __dirname;
const projects = path.join(here, '../../src/content/projects');
const dashboards = path.join(here, '../../public/dashboards');

// [folder, icon, kicker, banner title, [[value, label] x3]]
// Empty: the suite's tool projects have no picture (the Projects page shows
// their headline numbers instead), and the others use a supplied image. To
// render an icon banner and thumb for a new project, add a row, e.g.
//   ['my-tool', 'search', 'Python desktop tool', 'My Tool',
//     [['<10 s', 'per search'], ['100K+', 'rows, no lag'], ['90–95%', 'match accuracy']]],
const BANNERS = [];

// [folder, dashboard page under public/dashboards/, viewport width, viewport height]
const SHOTS = [
  ['voip-call-tracking-dashboard', 'VoIP_Call_Tracking_Tool/VoIP_Call_Tracking_Dashboard.html', 1100, 688],
  ['database-management-dashboard', 'Database_Management_Dashboard/Database_Management_Dashboard.html', 1440, 900],
  ['website-analytics-dashboards', 'Website_Analytics_Overview/Tech_Site_A.html', 1440, 900],
  ['email-marketing-dashboards', 'Zoho_Marketing_Automation_Overview/Email_Campaigns_Overview.html', 1440, 900],
  ['monthly-crm-and-calls-report', 'Monthly_CRM_and_Calls_Analytics_Report/Monthly_CRM_and_Calls_Analytics_Report.html', 1440, 900],
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

  // Dashboard screenshots: the top of each live page, without its nav strip
  const shotPage = await browser.newPage();
  for (const [folder, file, width, height] of SHOTS) {
    await shotPage.setViewportSize({ width, height });
    await shotPage.goto(pathToFileURL(path.join(dashboards, file)).href);
    await shotPage.addStyleTag({ content: '#hubNav { display: none !important; }' });
    await shotPage.evaluate(() => document.fonts.ready);
    await shotPage.waitForTimeout(500);
    await shotPage.screenshot({ path: path.join(projects, folder, 'thumb.png') });
    console.log('screenshot', folder);
  }
  await shotPage.close();

  await page.setViewportSize({ width: 1600, height: 900 });
  await page.goto(pathToFileURL(path.join(here, 'architecture.html')).href);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(projects, 'from-vba-to-a-python-tool-suite', 'architecture.png') });
  console.log('architecture diagram');

  // Link-preview picture for pages without an image of their own
  const cardPage = await browser.newPage({ deviceScaleFactor: 1 });
  await cardPage.setViewportSize({ width: 1200, height: 630 });
  await cardPage.goto(pathToFileURL(path.join(here, 'og-card.html')).href);
  await cardPage.evaluate(() => document.fonts.ready);
  await cardPage.screenshot({ path: path.join(here, '../../public/og-card.png') });
  await cardPage.close();
  console.log('link-preview card');

  await browser.close();
})();
