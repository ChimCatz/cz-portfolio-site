# AGENTS.md

Working notes for AI assistants (and people) changing this site. Read this
first. `README.md` describes the repo for visitors; this file holds the
decisions and rules behind it.

> **This repo is public.** Everything committed here can be read and
> downloaded by anyone, including this file. Private notes and source
> material live in `private/`, which git ignores. If `private/NOTES.md`
> exists, read it before changing project pages, dashboards or figures. If
> the folder is missing (a fresh clone on another computer), ask the user
> before changing names, figures or dashboards.

## Rules that always apply

- **Never commit:** credentials, keys, `.env` files, real records of any
  kind, internal documents, real screenshots, or the names of real
  companies, clients, vendors or people in project data. `node
  .github/scripts/repo-check.mjs` checks this; it runs before every commit
  once `git config core.hooksPath .githooks` is set, and again in CI.
- **How projects are described (user, 2026-10-13):** as tools and dashboards
  "I designed and built". Do not write "day job", "my team", "my employer",
  "the company" or similar on any page: keep the wording simple and neutral.
  Naming tools is fine: they are the user's tool stack. The site does not
  name an employer anywhere; work experience is in the resume PDF only.
- **Generic names:** the CRM tools are shown under generic names (Search &
  Filter Engine, CRM Conversion Engine, CRM Reconciliation Tool, Call
  Analytics Tool, and so on). Describe patterns and results only: never
  schemas, field lists, status policies or folder names. The user's own
  open-source projects (PowerFill, TI Champions Bot) keep their real names
  and link to their public repos.
- **Dashboards show sample data.** Company, client, vendor, website,
  campaign, list and people names in them are sample names: never add,
  guess or map real ones. Zoho products and Google Analytics 4 are named on
  purpose; other systems stay generic ("Secondary CRM", "VOIP 1", "Data
  Vendor A"). "Datamine" is a generic term and stays. Figures are left as
  exported and described as sample data. Phone numbers stay masked and agent
  names fictional. Don't reformat or restyle the Zoho export HTML: edit only
  text, images and the nav strip.
- **Figures marked illustrative stay illustrative.** Breakdown tables must
  keep adding up to the total stated on the page.
- **Never push to `main` without the user's say-so.** A push to `main`
  publishes the site.
- **Viewport baselines (always test):** 1920x1080, 1366x768, 360x800. Check
  every layout change at all three before calling it done, including
  horizontal overflow on mobile. `npm run check` does this for every page
  (see Performance and motion).
- **Performance (user, 2026-10-20):** the site may become a bit more
  interactive, but never at the cost of speed or frame rate. Follow the
  rules in Performance and motion, and measure before and after.
- **Footer height:** never taller than 10% of the screen height, at any
  screen size (see Footer below).
- **Writing:** direct, practical storytelling: the real problem, the
  solution, measurable results. No filler and no buzzwords.
- **Commit messages** start with a version prefix, e.g.
  `Version 16.9 - feat(rebrand): ...`. Keep them short and descriptive.

## Repo layout

| Path | What it is |
|---|---|
| `rebrand/` | The site (Astro 5). Run npm commands here. |
| `worker/` | The Cloudflare Worker behind the contact form (`worker/README.md`). Not published with the site; deployed by hand. |
| `source-files/` | Originals the site is made from (profile photo, tool logos, Vanta package). Not published. |
| `setup/` | Scripts and lists for rebuilding the dev setup on a new PC (`setup/README.md`). |
| `temp/` | Revisions and new files, one folder per page (About Me, each insight and data study; list in `temp/README.md`). Tracked so it syncs between the user's computers (user, 2026-10-29), but public: nothing private or copyrighted goes in it. The PNGs in `temp/about-me/world-data-chart/source-images/` (third-party charts) stay git-ignored. The repo check allows documents (xlsx, pdf, zip) in `temp/`. Keep file names short (Windows 260-character path limit). Not published to the site. Move a file into the site when you use it, so whatever is left there is unused. |
| `private/` | Git-ignored. Notes, source material and the blocked-terms list. Never referenced from the site. |
| `.github/` | Deploy and check workflows, Dependabot, the repo check script. |
| `.githooks/` | The pre-commit hook that runs the repo check. |

## Stack and publishing

- **Stack:** Astro 5 in `rebrand/`, static output, three dependencies
  (Astro and two font packages). Node 20 or newer works locally; CI uses
  Node 22. Upgrading to a newer Astro major is a separate, later step.
- **Publishing:** `.github/workflows/deploy.yml` runs the repo check, builds
  `rebrand/` and publishes `rebrand/dist` to GitHub Pages on every push to
  `main`. It needs the repo setting Settings > Pages > Source: "GitHub
  Actions", which can only be changed on the GitHub website.
  `.github/workflows/checks.yml` runs the same check and a build on every
  other branch and on pull requests. Day to day: work on a branch, merge
  into `main` to publish.
- **Contact form Worker:** `worker/` is deployed by hand
  (`npx wrangler deploy` there, Node 22 or newer), not by the workflows. Its
  secrets (`CAP_SECRET`, `RESEND_API_KEY`) are set with
  `npx wrangler secret put` and never go in a file or the chat: the user
  types the Resend key at the prompt. Its address is `CONTACT_API` in
  `site.ts`.
- **CI runs on Linux, where file names are case-sensitive:** a reference
  like `./Banner.png` to `banner.png` builds on Windows and fails there.
- **Rebuilding while previewing (Windows):** `astro preview` keeps files in
  `dist/` open, and the next `npm run build` then fails with EPERM. Stop the
  preview first.
- **Testing with a browser:** Playwright is not a dependency. Install it
  once (`npx playwright install chromium`) or point `PLAYWRIGHT_PATH` at an
  existing copy. In Git Bash, pass URL paths without a leading slash, or the
  shell rewrites them into Windows paths. `npm run check`
  (`scripts/check-site.cjs`) uses the same Playwright; it serves `dist/`
  itself, so no preview server is needed.
- **Old addresses:** `rebrand/public/czcatzzz.html` and `about-me.html`
  redirect the previous site's two main addresses. `src/pages/404.astro`
  sends other old `.html` links on: insights and data studies to their new
  page, old project pages to the Projects list.

## Brand

- **Approved brand (keep):** black/dark-purple palette, Space Grotesk for
  headlines, Montserrat for body text, eyebrow labels, pill buttons,
  gradient text. Tokens live in `rebrand/src/styles/global.css`, which is
  the source of truth.
- **Background:** Vanta globe (self-hosted three r134 + vanta.globe in
  `public/vendor/vanta/`), dimmed via `dimBackground` on reading pages.
  `src/components/GlobeBackground.astro` tunes it for speed without changing
  its look (Performance and motion, below). Don't edit the vendor files:
  change behaviour on the Vanta instance in that component.
- **Header:** fixed and semi-transparent, `cz.catzzz` wordmark, then About
  Me, Projects, Data Studies, Insights, Resume, Get in Touch; a menu button
  at 860px and below. Page links, email, social links and brand icon paths
  live in `src/lib/site.ts`, shared by the header, footer, Get in Touch,
  the 404 page and the sitemap: add a new page there.
- **Build approach:** the user builds the site section by section. Don't
  add sections that were not asked for.

## Pages

- **Homepage** (`src/pages/index.astro`): a hero that always fits the first
  screen (headline, intro, two buttons). Below it, on a dark veil that fades
  in over the globe (`.home-more`; on phones it starts at full strength):
  "Selected work" (the `featured` projects that have a `thumb`), "Latest"
  (the newest insight
  and the newest data study) and a closing Get in Touch / resume line.
  Everything fills itself from the collections.
- **About Me** (`src/pages/about.astro`): 25/75 layout, quick facts (Based
  In, Role, Focus), live age counter, KPIs, "why data" chart, tool logos,
  certifications.
- **Resume:** PDF download/open; the page image is rendered with
  `npm run resume`.
- **Get in Touch** (`src/pages/contact.astro`): same 25/75 split as About
  Me: profile card (photo, name, location, live local time in Asia/Manila),
  then the contact form, then "Or reach me directly": a large email tile
  with a Copy button and tiles for LinkedIn, Facebook and GitHub. No phone
  number, and nothing about being open to job offers, on purpose.
  - **Contact form** (Full Name, Email, Message): posts to the Worker in
    `worker/`, which checks a Cap proof-of-work token and sends the message
    through Resend to `EMAIL`. Nothing is stored. The Cap widget
    (`public/vendor/cap/`, self-hosted with its WASM file; don't edit those
    files) loads on the first focus, tap or keystroke in the form, never
    with the page. Its placeholder has the widget's exact size. The globe
    pauses (reason `contact-form`) from Cap's challenge request until the
    token comes back. Without JavaScript the form is hidden by a
    `<noscript>` style and the email tile still works. The plan it was built
    from is `setup/contact-form.md`.
  - **Motion on the page (user, 2026-10-21: "nicer, with more animation"):**
    a one-time rise-in of the card and column on load (CSS, `backwards`
    fill so nothing is held afterwards), a glow around the form while it
    has focus, a focus line under each field, a tick when the email looks
    valid, a message counter, a shake on fields that need fixing, and a
    send button whose plane flies off. The thank-you panel is filled in by
    the script with the sender's first name, address, a quote of the
    message and the time in Cagayan de Oro, takes the form's height so
    nothing below jumps, and plays its badge, burst and rise-in once. "Send
    another message" brings the form back empty. All transform and opacity,
    all off for reduced motion.
- **Terms & Policies** (`src/pages/terms.astro`): linked from the footer
  only. Keep it true to the site: it says there are no cookies, analytics
  or accounts, that GitHub Pages logs visitor IPs, that the dashboards load
  a font from Zoho's CDN, that the search demo runs in the browser, and how
  the contact form works (Cloudflare Worker and Resend, nothing stored, IP
  used only for rate limiting, Cap stores nothing in the browser).
  If any of that changes (e.g. analytics is added), update the privacy
  section and the `UPDATED` date in the same change. It also lists the
  trademark owners: add a line when a tool with a new owner is added. The
  statement the user cares about most is the callout in the logos section
  (not sponsored by, endorsed by or affiliated with any company whose logo
  appears). Drafted from general web guidance, not reviewed by a lawyer.
- **Footer** (`src/components/SiteFooter.astro`, in BaseLayout): a few short
  lines of small text that drops lines as the screen gets shorter (the tiers
  are listed at the top of the file). **Hard rule: never taller than 10% of
  the screen height.** After any footer change, measure footer height
  against `innerHeight` at many sizes, including just above and below each
  cut-off. `body` is a flex column at least one screen tall with `main`
  growing, so the footer sits at the bottom on short pages.
- **404** (`src/pages/404.astro`) and **sitemap**
  (`src/pages/sitemap.xml.ts`, built from `site.ts` and the collections).
  There is no `robots.txt` on purpose: for a project site
  (`/cz-portfolio-site/`) search engines only read the one at the domain
  root, which this repo does not control.

## Link previews

`BaseLayout` writes the canonical address and Open Graph tags. A page can
pass `image` (reading pages pass their banner; dashboard projects pass their
screenshot through ReadingLayout's `shareImage`), converted to a 1200px JPG
because several apps skip WebP. Pages without one use
`public/og-card.png`, rendered from `scripts/project-art/og-card.html` by
`npm run project-art`.

## Reading pages (Insights, Data Studies, Projects)

- All three use `src/layouts/ReadingLayout.astro` (eyebrow, title, intro
  from `summary`, uncropped banner, 75% article / 25% sticky sidebar, a
  "Next ..." link) and helpers in `src/lib/reading.ts`. Insights and Data
  Studies list pages use `src/layouts/ListLayout.astro`. Schemas are in
  `src/content.config.ts`. To add an entry, add a folder; nothing else needs
  updating.
- Sidebar content is `.side-block`s; on phones `side-first` blocks go above
  the article, others below.
- **Hero slot:** `projects/[slug].astro` fills ReadingLayout's `hero` slot
  conditionally, and `Astro.slots.has('hero')` is true even when that
  renders nothing. ReadingLayout renders the slot and falls back to the
  banner when it is empty. Keep that check if the layout is touched.
- **Markdown image patterns** (`src/lib/rehype-figure.mjs`):
  `![alt](./a.png "Caption")` = captioned figure; two captioned images on
  one line = side-by-side pair; several uncaptioned images on one line =
  gallery.
- **Lightbox** (`src/components/Lightbox.astro`): besides `[data-zoom]`
  figures and galleries, a `[data-lb-open]` element opens the image inside
  it, images under one `[data-lb-group]` can be stepped through, and on the
  image `data-full` is a larger file to show and `data-caption` the caption.
- **List thumbnails:** each entry's `banner` at the left, 280px wide and
  exactly as tall as the text beside it (the image is absolutely
  positioned). On phones it sits above the text at 2:1. Frontmatter
  `thumbFocus: left | right` keeps one side when cropping.

### Insights

`src/content/insights/<slug>/`. Sidebar: `highlights` and `tools`; an empty
list hides its block. Optional frontmatter: `chapters` ("On this page"),
`datasets` (files in the insight folder, shown with owner, licence, size and
source link, plus a sidebar button), `copyright` (rendered last), `story`.

- **Interactive insights:** frontmatter `story: job-market` loads
  `src/components/insights/JobMarketStory.astro`, which holds the styles
  (scoped to `.story-job-market`, sized by container queries) and the script
  that draws the charts and runs the job-title search from
  `src/data/job-market-occupations.json`. The article itself is raw HTML in
  `index.md` (no blank lines inside a `<section>`, or Markdown breaks it).
  To add another, add a component and list it in `stories` in
  `insights/[slug].astro`.
- **Job market insight:** the text, KPIs and numbers are the author's: don't
  reword them or change figures unasked. Since 2026-10-29 (user's decision)
  it compares March with March: Philippines March 2026 against March 2025,
  UK January to March 2026 against the same quarter of 2025, because youth
  unemployment swings with the school year. Job search methods and weeks
  spent looking are not in the March tables and stay July 2025, labeled.
  The chart data is in `JobMarketStory.astro` (`PSA`, `ageRate`, `ageChg`,
  `young`/`all`, `dur`); keep it, the tiles and the text in step.
- **Other people's data:** datasets are offered for download only when they
  are open data, each credited to its owner with its licence. Copyrighted
  reports are linked, not hosted. Keep that split for future sources.

### Data Studies

`src/content/data-studies/<slug>/` with `index.md`, `banner.png`, charts and
the dataset CSV. Frontmatter: `facts` ("At a glance"), `tools`, `dataset`
(download button with file size), `repo`, `note` (shown above the article),
`copyright` (always rendered last). The whole sidebar sits above the article
on phones. Q&A cards are raw `<details>` blocks in the Markdown.

- **Pokémon type badges:** type names become colored pills with the type
  icon at build time (`src/lib/rehype-pokemon-types.mjs`, icons in
  `public/icons/pokemon-types/`). Opt-in per study with frontmatter
  `typeBadges`: the `##` headings where badges apply. Section 3 is left out
  on purpose: "Normal Pokémon" there is a rarity class, not a type.

### Projects

`src/content/projects/<slug>/` with `index.md` and any images and figures.
Frontmatter adds `order`, `featured` (homepage only), `category`, `kicker`,
`tagline`, the badge fields (`status`, `version`, `built`, `license`,
`badges`), `repo`, `results`, `evolution` (timeline), `flow`,
`dashboards`, `download` and `demo`. Helpers shared with the homepage are
in `src/lib/projects.ts`.

- **Projects page layout (user, 2026-10-14):** one list, every project at the
  same level in the same kind of row: number, kicker, title, tagline, badges,
  summary, tools or data flow, and links on the left, and a panel on the
  right (between the title and the summary on phones). The panel is the
  project's `thumb` over its first two `results`, or, when there is no
  `thumb`, all three `results` as a framed block. So a project never needs
  a picture. Don't bring back a separate "featured" tier or an "ongoing"
  section: status is a badge. The one exception is "Just for fun" (below). Filter buttons (All, Automation tools,
  Dashboards, Open source, Ongoing) come from `category`, `repo` and
  `status`; the script only hides rows, and CSS counters keep the row
  numbers running 01, 02, 03 under any filter. "Small automations" is a
  hard-coded list in `src/pages/projects/index.astro`. Row titles are the
  part of `title` before the colon; the tagline is the part after it, or
  `tagline`. `order` sets the position everywhere.
- **Just for fun (user, 2026-10-20):** side projects the user planned and
  prompted while AI wrote the code (first one: Globe Trivia, its own public
  repo `globe-jss-with-data` with its own GitHub Pages site). They have
  `category: fun`, leave the main list and its filters, and appear as
  smaller cards in a "Just for fun" section after Small automations, by the
  user's choice. Say plainly on every one that AI wrote the code and that it
  is not a coding showcase (summary, `note`, a `code: written by AI` badge).
  Their facts come from the linked public sources; don't add figures that
  are not in the project's own repo.
- **Live apps hosted elsewhere:** frontmatter `live` (`url`, `label`) shows
  `src/components/projects/LiveEmbed.astro` in place of the banner: the
  `thumb` as a poster with a Start button, and the app in an iframe only
  after a click, so the page sends nothing to the other site before then
  (without JS, Start opens it in a new tab). The Terms privacy section names
  what the app loads (Globe Trivia: Google Fonts, flagcdn.com); add a line
  there for any new one. Its `thumb` is a screenshot of the live address
  (SHOTS in `scripts/project-art/render.cjs` takes full URLs too).
- **Badges** (`src/components/projects/ProjectBadges.astro`, built by
  `projectBadges` in `src/lib/projects.ts`): two-part tags in the style of
  GitHub README badges, on the Projects page and under the intro of every
  project page. Always in this order: `status` (ongoing, shipped or
  superseded), `version`, `built`, the project's own `badges`, `license`.
  Only real facts: a project with no known version or build date gets other
  details instead (type, stack, refresh rate, "data: sample"). The suite
  tools' versions and their "Sep 2026" build date come from the suite's
  version 21 release; where that is recorded is in `private/NOTES.md`. The
  value colors are set in the component and are dark enough for white text.
- **No AI illustrations (user, 2026-10-14):** the six tool projects (search,
  conversion, reconciliation, call analytics, pivot, Excel) have no picture
  on the Projects page or on their own pages: the user had the generated
  illustrations removed. Don't add illustrations back; if a tool needs a
  picture, ask for a real screenshot. Their link previews use the default
  card. The flagship suite keeps its illustration and TI Champions Bot uses
  its repo banner, both by the user's choice.
- **One image frame:** every project image sits in the same 16:9 frame
  (`.shot` in `global.css`, shared with the homepage). Illustrations fill
  it; dashboard screenshots, and any thumb with `thumbFocus: top`, are
  cropped from the top (`shot-screen`). `thumbFit: full` fits the whole
  image inside the frame; `thumbBg` is the frame color around it.
  `BANNERS` in `scripts/project-art/render.cjs` is empty, so
  `npm run project-art` renders only the dashboard screenshots, the
  architecture diagram and the link-preview card.
- **Open-source projects:** PowerFill and TI Champions Bot are the user's
  public GitHub repos, both ongoing. Their pages are written from each
  repo's README and changelog: when a new version ships, update `version`,
  `built`, the timeline and the "This page describes version ..." note
  together. `repo` adds "Source on GitHub" to the row and a sidebar button.
  Their images are copied from the repos' `docs/` folders. TI Champions Bot
  is built on another author's open-source script: keep that credit in its
  summary, note and facts, and keep the Valve trademark footnote.
- **Dashboard projects:** the live pages are static files in
  `rebrand/public/dashboards/` (Zoho Analytics HTML exports, plus a
  hand-written interactive VoIP page with `cdr-data.js`). A project lists
  them in frontmatter `dashboards` (`label`, `src`, and `height` in px for
  the fixed 1440px Zoho pages or `fluid: true` for pages that reflow) and
  its source chain in `flow`. `src/components/DashboardEmbed.astro` shows
  them in place of the banner: scaled to fit, never below 50%, collapsed
  behind "Show full dashboard" when tall, with tabs for several pages. Their
  `thumb.png` is a screenshot taken by `npm run project-art` (SHOTS list).
  Each dashboard page's nav strip links back to its project page and hides
  itself when embedded. When a new export is added, measure its height at
  1440 wide (Zoho pages scroll inside `.ly-holder`, so use that element's
  scrollHeight plus its offset).
- **Sample workbook:** the Excel project offers a sample workbook through
  frontmatter `download` (`file`, `label`), shown as a sidebar button. Its
  rows are made up; the formulas are real and were checked in Excel.
- **Search demo:** "Try it" on the Search & Filter Engine page, switched on
  by frontmatter `demo: search` (components are listed in `demos` in
  `projects/[slug].astro`). `src/lib/search-demo.js` is the engine: 50,000
  rows made up in the browser from a fixed seed, company names coined from
  syllables, no people. It follows the case study: brand roots for
  companies, level + function for titles, a leading minus sign excludes,
  exclusions win, three-way filters, first 100 rows shown, CSV export of all
  matches. It is plain JS so it can be checked with Node on its own; the
  generator keeps what it meant each title to be (`intended`) so the keyword
  rules can be tested against it.
  `src/components/projects/SearchDemo.astro` is the interface (global styles
  under `#try-it`, because the script creates the table rows). The page
  describes it as a JavaScript rebuild, not the original tool: keep that
  wording.

## About Me details

- **World data chart** (`src/components/DataGrowthChart.astro`, redesigned
  2026-10-29): drawn at build time from `src/data/world-data-1968-2030.csv`
  (yearly values in exabytes, with a `basis` per row) and
  `src/data/world-data-eras.csv` (five eras and their milestones). Log
  scale, 10 PB to 1,000 ZB, 1968 to 2030. It counts total storage, analog
  and digital (Hilbert and López), up to 2007 and data created each year
  (Statista, from IDC) from 2010, to match the reference chart the user
  approved. 1968 to 1985 is extended back from 1986 at 20% a year and is not
  data, so that stretch is dashed, like the forecast after 2023. Statista's
  2011, 2013, 2014, 2016, 2017 and 2019 figures were read off a chart
  (`statista_unverified`). The area under the line is coloured by era, with
  a key above the plot (years, how many times data multiplied). Milestone
  names are written inside their band, under the line (user, 2026-10-29),
  placed by the component's script; when they don't fit (phones) they are
  listed in the key instead. The caption stays one short line; the longer
  explanation and the table sit in the collapsed "About these numbers".
  Keep the dashed estimate and forecast and the note that what is counted
  changes around 2010. Statista's chart is copyrighted: cite it, don't host
  it. The same chart is embedded in the "Why Data Pulled Me In" insight with
  `<div data-embed="world-data"></div>` (see `embeddable` in
  `insights/[slug].astro`).
- **Tool logos:** every logo in the same 48px white tile with the name
  under it, in six groups sized to fill rows of 8 tiles (4 + 4, 7, 5 + 3,
  8); the panel uses a container query and falls back to 4 per row.
  Originals are in `source-files/logos/`; `npm run logos`
  (`rebrand/scripts/logos.cjs`) crops off any product name, trims and writes
  same-size PNGs to `src/assets/logos/`. Decisions: logo only, never the
  product name inside the logo; SQL uses the MySQL logo and VBA the Visual
  Basic logo. A tool with no logo does not get a tile: ask for a logo first.
  A one-line trademark note sits under the panel.
- **Certifications:** one row per certificate with a small preview, newest
  first; a click opens the whole image in the Lightbox. Images are in
  `src/assets/certificates/`. Each entry has `crop: [x, y, width, height]`
  (the certificate itself, in the image's pixels). No verify links or
  certificate IDs: ask the user for the URLs before adding any.

## Performance and motion

What moves today: `src/components/Motion.astro` (in BaseLayout) fades in
elements matching its REVEAL list on first scroll into view and counts up
`[data-count]` numbers. Project pages draw the evolution timeline (its "now"
dot pulses with a ring); ReadingLayout has the reading progress bar; the
homepage hero has a CSS-only word intro; About Me has the live age counter;
and the globe turns behind everything. Transitions live on the visible
state only, and everything is off for prefers-reduced-motion.

### The globe (`GlobeBackground.astro`)

- Starts when the browser is idle after the first paint, then fades in, so
  WebGL setup never delays the first screen or the hero intro.
- **Focus vs. veiled.** Where the globe is the focus (an element marked
  `data-globe-focus`: the homepage hero) it renders at the screen's own
  resolution, exactly as designed. Behind the dark veil (dimmed pages, and
  the homepage once the hero is fully off screen) it renders at half
  resolution and is drawn every other frame (its motion still advances
  every frame, so the speed doesn't change). The canvas opacity is lowered
  by the same factor as the resolution, so the brightness is unchanged
  (measured within 1%).
- **Dimmed pages blur the canvas itself** (`filter: blur(6px)`), not the
  veil (`body.bg-dim::before` has no backdrop-filter). Same look, but one
  blur pass instead of re-reading the whole screen on every frame. The
  homepage veil (`.home-more::before`) keeps its backdrop-filter, because
  the hero above it must stay sharp.
- **Adaptive:** if most frames over a 1.5-second stretch take longer than
  40 ms (under about 24 per second), the resolution steps down a level. A
  30-per-second battery-saver cap doesn't count as slow.
- Vanta's own per-frame and per-mousemove layout reads are replaced (the
  canvas is fixed to the screen, so its box is always the window).
- **Pause API:** `document.dispatchEvent(new CustomEvent('globe:pause',
  { detail: 'reason' }))` and `'globe:resume'` with the same reason. It runs
  again once every reason has resumed, and nothing happens if the globe
  isn't running. The lightbox pauses it while open; the live app embed
  pauses it while the app is on screen; the contact form pauses it while
  Cap's proof-of-work runs. Use it for anything that covers the
  page or brings its own animation.
- Off for prefers-reduced-motion and for Data Saver: the plain dark
  background stays.

### Rules for anything new

These keep new features from slowing down or breaking what exists. They are
defaults: break one only with a measured reason, and note it here.

1. **Only `transform` and `opacity` animate** (including `translate`,
   `scale`, `rotate`). No animating `box-shadow`, `filter`, `width`,
   `height`, `top`/`left`, `background-position` or colours on large areas.
   Small hover colour fades are fine. Existing exceptions: the hero intro's
   one-time blur-in and its one-time shine.
2. **No new `backdrop-filter` over the moving globe** on large areas. The
   header, the footer, the homepage veil and the lightbox backdrop are the
   only ones. A panel on a dimmed page uses a solid
   `rgba(13, 10, 22, 0.72)` background without blur: the veil behind it is
   already dark and soft, so a blur shows nothing and costs a redraw every
   frame.
3. **Every loop stops when nobody can see it.** A `requestAnimationFrame`
   or timer loop stops when its element leaves the screen
   (IntersectionObserver) and has a reduced-motion version. One-off
   animations end on their own.
4. **Input handlers do little.** Scroll and touch listeners are `passive`;
   `scroll`, `resize`, `pointermove` and `mousemove` work is coalesced to at
   most once per frame with `requestAnimationFrame`; read layout
   (`getBoundingClientRect`, `offsetHeight`) before writing styles, never
   in between.
5. **Heavy things load on demand.** Iframes, another canvas or WebGL scene,
   video, and large scripts or data load on a click or when they come near
   the screen, not with the page (see `LiveEmbed.astro`). If they animate,
   they pause the globe while they are on screen.
6. **Content first.** Never hide content with CSS alone (only a script
   hides, so a failed script shows everything); don't hide what is on the
   first screen; reserve space for anything that loads late (images have
   width and height, embeds a fixed height or aspect ratio) so nothing jumps.
7. **Scripts stay small and local.** No new runtime dependency or framework
   for interactivity: plain scripts inside the component that needs them,
   shipped only on pages that use them. Elements a script creates get
   global styles under a wrapper (see Lessons).
8. **Images** go through Astro's `<Image>` with `widths` and `sizes`, lazy
   below the first screen. Fonts: only the two brand families; their Latin
   files are preloaded in BaseLayout.
9. **Navigation:** pages are prefetched when a link is hovered or focused
   (`prefetch` in `astro.config.mjs`). Keep internal links as plain
   `<a href>`.

### How much interactivity (user, 2026-10-20)

"A bit more interactive, but not too much." Welcome: hover and focus
feedback, small reveals, interactive charts and tooltips, opt-in demos and
embeds behind a button, small touches like the live age counter. Not
welcome: scroll-jacking, parallax tied to scrolling, custom cursors,
autoplaying video or sound, things that keep moving on their own (the globe
and one-time intros are the only always-on motion), and anything that only
works with a mouse. Every interaction works by keyboard, and the page reads
fine without it.

### Checking a change (`npm run check`, in `rebrand/`)

Run after `npm run build`. It serves `dist/` itself and opens every page in
the sitemap at 1920x1080, 1366x768 and 360x800.

| Command | What it does |
|---|---|
| `npm run check` | Fails on a script error, sideways scrolling, or a footer taller than 10% of the screen. |
| `npm run check -- --save` | Also saves a layout baseline: the boxes of the main elements on every page, measured with reduced motion so runs match exactly. Git-ignored (`rebrand/.layout-baseline.json`). |
| `npm run check -- --compare` | Also compares with the saved baseline and lists what moved. |
| `npm run check -- --perf` | Scrolls five pages with motion on: frames per second, slow frames, main-thread load, long tasks. |
| `... --perf --phone` / `--slow` / `--weak-gpu` | Phone screen at 3x density / CPU slowed 4x / software drawing, a stand-in for a weak phone graphics chip. |
| `--only=home,about` | Limits a run to the homepage and pages whose path contains these. |

Routine: for a change that should not move anything (refactor, performance
work), `--save` before and `--compare` after: no layout lines means nothing
moved. For a change that adds or changes motion, run `--perf` and
`--perf --phone --weak-gpu` before and after: the numbers must not drop.
`CHECK_DIST=<folder>` runs it on another build (e.g. a copy of the old
`dist/` in `temp/`) for side-by-side numbers. On Windows, `--perf` uses the
real graphics card; desktop numbers there sit at 60, so the `--weak-gpu`
runs are where differences show. Software-drawn numbers vary by a few
frames between runs: repeat before trusting a small difference.

Measured on 2026-10-20 (weak-GPU runs, frames per second, before -> after
the performance pass): phone size, dimmed pages 31-36 -> 51-60 and the
homepage 51 -> 53; desktop size, dimmed pages 14-18 -> 20-26 (the homepage,
whose hero is unchanged by design, 8-14 both).

## Lessons

- **Hover UI:** any flyout or hover reveal must size its hoverable parent to
  cover the revealed content, or the hover state drops before the cursor
  reaches it.
- **`hidden` and `display`:** a `display` rule on an element (e.g.
  `display: grid`) beats the `hidden` attribute, so `el.hidden = true` does
  nothing. Give such elements a `[hidden] { display: none; }` rule. The
  contact form shipped once with this bug: the form stayed on screen under
  the thank-you message.
- **Scoped styles and scripts:** elements a script creates do not get
  Astro's scoped-style attribute. Style them with `is:global` under a
  wrapper, as the search demo and the job market insight do.
- **backdrop-filter over animation:** a backdrop-filter re-reads and blurs
  everything behind it whenever that changes. Over the moving globe that was
  every frame, on every dimmed page, and it cost more than the globe itself.
  Blur the moving thing once (a `filter` on it) instead.
- **Measure, then judge by eye:** a faster render can change the look (a
  lower resolution draws WebGL lines wider and brighter). Compare
  screenshots and average brightness before and after, not just frame
  rates.
