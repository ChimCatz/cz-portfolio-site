// Site check: opens every page in the sitemap at the three baseline screen
// sizes and reports anything that broke. Run it after `npm run build`.
//
//   npm run check                 rules only (below)
//   npm run check -- --save       ...and save a layout baseline
//   npm run check -- --compare    ...and compare the layout with the saved baseline
//   npm run check -- --perf       frame-rate test on a few pages (scrolls each one)
//   npm run check -- --perf --slow   ...with the CPU slowed 4x, roughly a mid-range phone
//   npm run check -- --perf --phone  ...on a 360x800 touch screen at 3x pixel density
//   npm run check -- --perf --weak-gpu  ...drawing in software: a stand-in for a weak phone
//                                 graphics chip, where blur and pixel count cost the most
//   npm run check -- --only=home,about       limit to the homepage and pages whose path contains these
//
// Rules (fail the run): no script errors, no horizontal scroll, the footer is
// never taller than 10% of the screen.
//
// Layout baseline: the position and size of the main elements on each page,
// measured with reduced motion on (no reveal or intro animations, no globe), so
// two runs of the same site match exactly. Save one before a change that should
// not move anything (a refactor, a performance change), then compare after it.
// The baseline file is local and git-ignored: it is only a before/after tool.
//
// Perf: scrolls each page with motion on and reports frames per second, the
// share of slow frames (over 25 ms), how busy the main thread was, and long
// main-thread tasks. On Windows it
// uses the real graphics card (ANGLE on Direct3D 11); elsewhere headless
// Chromium may draw WebGL in software. Compare numbers between runs on the same
// computer rather than reading them as absolutes.
//
// Needs Playwright with Chromium (not a dependency): set PLAYWRIGHT_PATH or
// have `playwright` on the path, as for `npm run project-art`.

const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');

const ROOT = path.join(__dirname, '..');
// CHECK_DIST=<folder> checks another build, e.g. a copy of the previous one, for before/after numbers.
const DIST = process.env.CHECK_DIST ? path.resolve(process.env.CHECK_DIST) : path.join(ROOT, 'dist');
const BASE = '/cz-portfolio-site';
const BASELINE = path.join(ROOT, '.layout-baseline.json');
const SIZES = [
  [1920, 1080],
  [1366, 768],
  [360, 800],
];
// Pages for the frame-rate test: the full globe, a dimmed list, long reading pages, an embed, the contact form.
const PERF_PAGES = ['/', '/projects/', '/about/', '/insights/too-many-applicants-too-few-jobs-and-how-to-win/', '/projects/voip-call-tracking-dashboard/', '/contact/'];
// Elements whose boxes make up the layout fingerprint
const LAYOUT = 'header, footer, main :is(h1, h2, h3, img, figure, table, section, aside, nav, iframe, details, .btn, li)';

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const only = (args.find((a) => a.startsWith('--only=')) || '').slice(7).split(',').filter(Boolean);
// `home` is the homepage; anything else matches pages whose path contains it.
const wanted = (p) => !only.length || only.some((o) => (o === 'home' ? p === '/' : p.includes(o)));

// ---- A small static server for dist/, mounted at the site's base path ----
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif',
  '.woff2': 'font/woff2', '.xml': 'application/xml', '.csv': 'text/csv', '.pdf': 'application/pdf',
};
function serve() {
  const server = http.createServer((req, res) => {
    let url = decodeURIComponent(req.url.split('?')[0]);
    if (!url.startsWith(BASE)) return res.writeHead(404).end();
    let file = path.join(DIST, url.slice(BASE.length));
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    else if (!fs.existsSync(file) && fs.existsSync(`${file}.html`)) file = `${file}.html`;
    if (!fs.existsSync(file)) return res.writeHead(404).end();
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}

function pages() {
  const xml = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
  const list = [...xml.matchAll(/<loc>[^<]*?\/cz-portfolio-site(\/[^<]*)<\/loc>/g)].map((m) => m[1]);
  return list.filter(wanted);
}

// Waits until fonts and images on the page have settled.
async function settle(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    // Lazy images: load them all so their boxes are final.
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => (img.loading = 'eager'));
    await Promise.all(
      Array.from(document.images)
        .filter((img) => !img.complete)
        .map((img) => new Promise((r) => { img.onload = img.onerror = r; })),
    );
  });
  await page.waitForTimeout(150);
}

async function checkPage(page, url, [w, h]) {
  const problems = [];
  const errors = [];
  const onError = (e) => errors.push(e.message);
  const onConsole = (m) => {
    // Requests to other sites (fonts on embedded dashboards) may fail offline: not the site's fault.
    if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(m.text());
  };
  page.on('pageerror', onError);
  page.on('console', onConsole);
  await page.setViewportSize({ width: w, height: h });
  await page.goto(url, { waitUntil: 'load' });
  await settle(page);

  const result = await page.evaluate((selector) => {
    const doc = document.documentElement;
    const footer = document.querySelector('footer');
    const boxes = Array.from(document.querySelectorAll(selector))
      .map((el) => {
        const r = el.getBoundingClientRect();
        if (!r.width && !r.height) return null;
        const name = el.tagName.toLowerCase() + (el.classList[0] ? `.${el.classList[0]}` : '');
        const text = (el.textContent || el.getAttribute('alt') || '').trim().replace(/\s+/g, ' ').slice(0, 40);
        return [name, text, Math.round(r.x), Math.round(r.y + scrollY), Math.round(r.width), Math.round(r.height)];
      })
      .filter(Boolean);
    return {
      overflow: doc.scrollWidth - innerWidth,
      footer: footer ? footer.offsetHeight / innerHeight : 0,
      height: doc.scrollHeight,
      boxes,
    };
  }, LAYOUT);

  page.off('pageerror', onError);
  page.off('console', onConsole);
  if (result.overflow > 0) problems.push(`scrolls sideways by ${result.overflow}px`);
  if (result.footer > 0.1) problems.push(`footer is ${(result.footer * 100).toFixed(1)}% of the screen height (max 10%)`);
  errors.forEach((e) => problems.push(`script error: ${e}`));
  return { problems, layout: { height: result.height, boxes: result.boxes } };
}

function compareLayout(before, after) {
  const notes = [];
  if (Math.abs(before.height - after.height) > 2) notes.push(`page height ${before.height} -> ${after.height}`);
  if (before.boxes.length !== after.boxes.length) {
    notes.push(`element count ${before.boxes.length} -> ${after.boxes.length}`);
    return notes;
  }
  let moved = 0;
  before.boxes.forEach((b, i) => {
    const a = after.boxes[i];
    const off = [2, 3, 4, 5].some((k) => Math.abs(a[k] - b[k]) > 2);
    if (off && moved++ < 5) notes.push(`${b[0]} "${b[1]}": [${b.slice(2)}] -> [${a.slice(2)}]`);
  });
  if (moved > 5) notes.push(`...and ${moved - 5} more elements moved`);
  return notes;
}

async function perfPage(page, cdp, url) {
  await page.goto(url, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1500); // let the globe and the intro start
  const busy = async () => (await cdp.send('Performance.getMetrics')).metrics.find((m) => m.name === 'TaskDuration').value;
  const before = await busy();
  const started = Date.now();
  const result = await page.evaluate(async () => {
    const long = [];
    const observer = new PerformanceObserver((list) => list.getEntries().forEach((e) => long.push(e.duration)));
    try { observer.observe({ type: 'longtask', buffered: false }); } catch {}
    const frames = [];
    let last = performance.now();
    const end = last + 5000;
    const max = document.documentElement.scrollHeight - innerHeight;
    await new Promise((resolve) => {
      const tick = (now) => {
        frames.push(now - last);
        last = now;
        // Scroll down and back up again, as a reader would, over five seconds.
        const t = 1 - Math.abs(1 - ((now - (end - 5000)) / 5000) * 2);
        window.scrollTo(0, Math.max(0, Math.min(max, t)) * Math.min(max, 4000));
        if (now < end) requestAnimationFrame(tick);
        else resolve();
      };
      requestAnimationFrame(tick);
    });
    observer.disconnect();
    const total = frames.reduce((a, b) => a + b, 0);
    return {
      fps: Math.round((frames.length / total) * 1000),
      slow: Math.round((frames.filter((f) => f > 25).length / frames.length) * 100),
      longTasks: long.length,
      longest: Math.round(Math.max(0, ...long)),
    };
  });
  result.busy = Math.round((((await busy()) - before) * 1000 * 100) / (Date.now() - started));
  return result;
}

(async () => {
  if (!fs.existsSync(path.join(DIST, 'sitemap.xml'))) {
    console.error('No build found: run `npm run build` first.');
    process.exit(1);
  }
  const server = await serve();
  const origin = `http://127.0.0.1:${server.address().port}${BASE}`;
  const gpu = flag('weak-gpu') ? ['--use-angle=swiftshader'] : process.platform === 'win32' ? ['--use-angle=d3d11'] : [];
  const browser = await chromium.launch({ args: [...gpu, '--ignore-gpu-blocklist', '--enable-gpu-rasterization'] });
  let failed = 0;

  if (flag('perf')) {
    const context = await browser.newContext(
      flag('phone')
        ? { viewport: { width: 360, height: 800 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true }
        : { viewport: { width: 1366, height: 768 } },
    );
    const page = await context.newPage();
    const cdp = await context.newCDPSession(page);
    await cdp.send('Performance.enable');
    if (flag('slow')) await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    console.log('page'.padEnd(64), 'fps  slow%  busy%  long tasks (longest ms)');
    for (const p of PERF_PAGES.filter(wanted)) {
      const r = await perfPage(page, cdp, origin + p);
      console.log(p.padEnd(64), String(r.fps).padEnd(4), String(r.slow).padEnd(6), String(r.busy).padEnd(6), `${r.longTasks} (${r.longest})`);
    }
    await context.close();
  } else {
    const baseline = flag('compare') && fs.existsSync(BASELINE) ? JSON.parse(fs.readFileSync(BASELINE, 'utf8')) : null;
    if (flag('compare') && !baseline) console.log('No saved baseline: run with --save first. Checking rules only.');
    const saved = {};
    const page = await browser.newPage({ reducedMotion: 'reduce' });
    const list = pages();
    for (const p of list) {
      for (const size of SIZES) {
        const key = `${p} @ ${size.join('x')}`;
        const { problems, layout } = await checkPage(page, origin + p, size);
        saved[key] = layout;
        const notes = baseline ? (baseline[key] ? compareLayout(baseline[key], layout) : ['new page (not in the baseline)']) : [];
        if (problems.length) failed++;
        if (problems.length || notes.length) {
          console.log(`\n${key}`);
          problems.forEach((m) => console.log(`  FAIL ${m}`));
          notes.forEach((m) => console.log(`  layout: ${m}`));
        }
      }
    }
    if (flag('save')) {
      // Merged into the saved file, so a run limited with --only updates just those pages.
      const previous = fs.existsSync(BASELINE) ? JSON.parse(fs.readFileSync(BASELINE, 'utf8')) : {};
      fs.writeFileSync(BASELINE, JSON.stringify({ ...previous, ...saved }));
      console.log(`\nLayout baseline saved (${Object.keys(saved).length} page sizes).`);
    }
    console.log(`\nChecked ${list.length} pages at ${SIZES.length} sizes: ${failed ? `${failed} with problems` : 'all rules pass'}.`);
    await page.close();
  }

  await browser.close();
  server.close();
  process.exit(failed ? 1 : 0);
})();
