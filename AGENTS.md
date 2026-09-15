# AGENTS.md

## Purpose
This file preserves the key working context, design choices, and content decisions for this portfolio site so future updates can continue without re-explaining the same requirements.

## Project Overview
- Repo type: static multi-page portfolio site
- Main pages:
  - `czcatzzz.html`
  - `projects/leadflow-etl.html`
  - `projects/data-pivot-table-tool.html`
  - `projects/csv-advanced-search-engine.html`
  - `projects/call-conversion-tool.html`
- Shared assets:
  - Styles: `assets/css/styles.css`
  - JS: `assets/js/app.js`
  - Icons: `assets/icons/*`
  - Images: `assets/images/*`

## Navigation and Structure
- The site uses static HTML pages, not a JS router or framework.
- Sidebar navigation is shared across pages.
- `assets/js/app.js` handles:
  - section spy on `czcatzzz.html`
  - remaining carousel behavior for non-project sections
  - special sidebar active state for pages with `data-page="project-detail"`
- Data Studies detail pages should keep `body data-page="data-study-detail"` so the Data Studies nav item stays active.
- Project subpages should keep `body data-page="project-detail"` so the Projects nav item stays active.

## Current Design Direction
- Keep the overall visual language of the site intact.
- Avoid making every section look like the same repeated boxed card.
- Prefer a more connected editorial flow on project subpages:
  - some transparent sections
  - some lighter containers
  - not every area needs a strong border/background
- The user specifically felt heavy bordered blocks were too predictable and monotonous.

## Homepage Decisions

### Hero Section
- Social links were removed from the hero section.
- Keep hero cleaner and more focused on intro and CTA.

### Professional Overview / Skills Section (OUTDATED — no longer on homepage)
- **2026-09-08 audit note:** a full browser pass of the live site found no
  `Professional Overview`, `Social Credentials` panel, or homepage `Skills`
  logo-card grid anywhere in `czcatzzz.html`. This section of the doc
  describes an earlier design iteration that predates the current
  homepage structure (Hero -> intro -> Projects -> Data Studies ->
  Insights -> Challenges -> Trivia).
- Social links (LinkedIn/GitHub/Facebook/email) currently live in the
  `Socials` section at the bottom of `about-me.html`, not the homepage.
- No dedicated Skills logo-card grid currently exists on the site. Skills
  are mentioned inline as prose on the About Me page instead.
- The CSS for the old logo-card Skills grid and Social Credentials panel
  (`.skill-logo-card`, `.skills-grid`, `.hero-social-link`, etc.) was
  removed from `assets/css/styles.css` during the 2026-09-08 cleanup pass
  since it matched nothing in the current markup.
- If a homepage Skills section is wanted again, treat it as a new
  feature to design, not a restoration — don't assume the removed CSS
  is still a usable starting point without checking it against the
  current homepage layout.

### Projects Section on Homepage
- Homepage Projects now uses a dedicated carousel layout modeled after the Insights section.
- Homepage project cards should:
  - show `4` cards at a time on desktop, laid out as a `2x2` grid per slide (`.projects-carousel-grid` is `grid-template-columns: repeat(2, 400px)`, so 4 cards per `.carousel-card` slide wraps into 2 rows x 2 columns)
  - collapse to `1` card per slide on mobile (handled dynamically by `syncResponsiveCarouselLayouts('projects')` in `assets/js/app.js`, which re-flattens all cards from `track.dataset.desktopMarkup` into one-card-per-slide below the mobile breakpoint)
  - **2026-09-15:** with 5 projects total, the desktop markup is split into two static `.carousel-card` slides (mirrors the Insights section's own 4+1 split pattern): slide 1 holds the first 4 projects in a 2x2 grid and is `is-active`; slide 2 holds just the 5th project alone. Prev/next arrows page between them (no dots wrapper on this section, same as Insights). When a 6th project is added, keep slide 2 as a 2-card grid (or add a slide 3) rather than letting a single un-chunked grid grow past 2x2 rows again.
  - keep the exact homepage project order (updated 2026-09-15 — Turning Excel Into a CRM moved to first per user request):
    - Turning Excel Into a CRM
    - LeadFlow ETL
    - CSV Advanced Search Engine
    - VOIP Call Conversion Tool
    - Data Pivot Table Tool
  - this same order is mirrored in `PROJECT_ITEMS` in `assets/js/app.js`, which drives the "related projects" carousel on every project detail page — keep both in sync when reordering again
  - use each project's leaderboard/banner image at the top of the card
- Preserve the existing project card wording unless the user explicitly asks for copy changes.
- The bottom "related projects" carousel on each individual project detail page (`.project-related-section[data-related-kind="projects"]`, JS-rendered from `PROJECT_ITEMS` in `assets/js/app.js`) already chunks in groups of 4 for detail pages (`desktopChunkSize = isDetailPage ? 4 : ...`) and excludes the current page's own slug, so with 5 total projects each detail page's related section already shows exactly the other 4 in one clean 2x2 slide automatically — no fix was needed there, only on the homepage's static markup.

### Data Studies Section on Homepage
- Homepage Data Studies uses a simple editorial text list, not cards and not a carousel.
- Keep the section heading as `Data Studies`.
- Each study entry should be:
  - linked title
  - short supporting description underneath
- The current homepage should only show the real published studies.
- Current live homepage study:
  - `"Netflix Genre Performance Study: Why Animation Leads and Horror Falls Behind"`

## Project Subpage Pattern
- Project pages were intentionally simplified.
- Desired order:
  1. leaderboard/banner at the top
  2. case study content
  3. supporting image
- Keep these pages simple and readable.
- Do not overcomplicate them with too many extra summary cards unless explicitly requested.
- GitHub repository links are welcome and now part of the pattern.
- Project detail pages now use the same bottom related-carousel pattern as Insight pages.
- The old duplicated static `More Projects` blocks were removed in favor of JS-rendered related sections.

## Current Project Pages

### LeadFlow ETL
- File: `projects/leadflow-etl.html`
- Final title to keep:
  - `How I Eliminated 6 Hours of Manual CRM Work with a Python ETL Tool`
- Assets:
  - leaderboard: `assets/images/leadflow-etl/leaderboard-image.png`
  - image: `assets/images/leadflow-etl/image-1.png`
- GitHub link:
  - `https://github.com/ChimCatz/LeadFlow-ETL`
- Important content note:
  - Manual process duration should remain `4 to 8 hours`, not `30 minutes to an hour`.

### CSV Advanced Search Engine
- File: `projects/csv-advanced-search-engine.html`
- Final title to keep:
  - `From 6 Hours to Seconds: Building a High-Speed CSV Search Engine for 100K+ Lead Data`
- Assets:
  - leaderboard: `assets/images/csv-advanced-search-engine/leaderboard.png`
  - image: `assets/images/csv-advanced-search-engine/image-1.png`
- GitHub link:
  - `https://github.com/ChimCatz/ContactSearchEngine`
- Includes key results strip:
  - Search Time: `1-3 hours -> <10 seconds`
  - Dataset Size: `40K-100K+ rows`
  - Setup Time: `~10 minutes -> <1 minute`
  - Accuracy: `~70% -> 90-95%`
  - Workflow Efficiency Gain: `90%+ time saved`

### Data Pivot Table Tool
- File: `projects/data-pivot-table-tool.html`
- Uses completed simple project-page structure.
- Assets:
  - leaderboard: `assets/images/data-pivot-table-tool/leaderboard.png`
  - images:
    - `assets/images/data-pivot-table-tool/image-1.png`
    - `assets/images/data-pivot-table-tool/image-2.png`
    - `assets/images/data-pivot-table-tool/image-3.png`
- GitHub link:
  - `https://github.com/ChimCatz/Data_Pivot_Table_tool`

### VOIP Call Conversion Tool
- File: `projects/call-conversion-tool.html`
- Uses completed simple project-page structure.
- Final public-facing title to keep:
  - `VOIP Call Conversion Tool`
- Assets:
  - leaderboard: `assets/images/call-conversion-tool/leaderboard.png`
  - image: `assets/images/call-conversion-tool/image-1.png`
- GitHub link:
  - `https://github.com/ChimCatz/call_conversion_matching_tool`

### Turning Excel Into a CRM
- File: `projects/turning-excel-into-a-crm.html`
- Final title to keep:
  - `Turning Excel Into a CRM` (short, no subtitle — see note below)
- Framing: positioned as the manual Excel-based system that predates and informed `LeadFlow ETL` (same six data sources: Lusha, Pipileads, Vtiger, Zoho, Datamine, Purchased). Both pages cross-link to each other.
- No GitHub repo for this one (it's a spreadsheet, not code). Instead uses a download link to a lite sample workbook:
  - `assets/downloads/turning-excel-into-a-crm/turning-excel-into-a-crm-lite.xlsx`
  - Lite version keeps a real sheet structure and real formulas (array `TRIM/LEFT/FIND` company-name cleanup referencing a `Keywords` sheet, cross-sheet `SUMIFS` dashboard by year/source/status) sampled down to 450 rows and ~17 relevant columns across 4 sheets (`Database`, `Summary`, `Keywords`, `Task`). Result: ~59KB.
  - **2026-09-15: `projects/advanced-excel/` (the real ~35-52MB source workbooks, the rar backup, the two source images, and private job-application notes) was deleted from disk entirely at the user's request**, now that the lite workbook and both images were already safely extracted into `assets/downloads/` and `assets/images/`. There is no longer a local copy of the real source data anywhere in this repo/working directory. If this project ever needs revisiting with real source data again, that would have to come from the user's own separate backup, not from this repo. The `projects/advanced-excel/` line in `.gitignore` can stay (harmless / documents past intent) or be removed — it matches nothing now.
- Assets:
  - leaderboard: `assets/images/turning-excel-into-a-crm/leaderboard.png`
  - inline figure: `assets/images/turning-excel-into-a-crm/image-1.png` (illustration of six sources feeding into one Excel workbook, used mid-article via `.insight-inline-figure`, not in a bottom gallery)
- Page title/H1 is intentionally short: just `Turning Excel Into a CRM` (no long subtitle in the `<h1>` or `<title>` tag; the eyebrow above the H1 carries "Advanced Excel / CRM Workflow" for context). Meta description avoids stating an exact record count too, uses "a large multi-source lead database."
- Page includes illustrative aggregate figures rendered as HTML tables via `.project-data-block` / `.project-data-table` CSS (added to `assets/css/styles.css`, with light-mode overrides):
  - Database Snapshot (total/active/inactive/fields/sources/countries/years)
  - Company Name Cleanup before/after examples
  - Leads by Source breakdown (notes a real `Vtiger`/`vtiger` casing inconsistency in the raw data, described qualitatively rather than with an exact count)
  - (A "Top Markets by country" table existed briefly but was removed 2026-09-15 as unnecessary detail / too close to real geographic business info.)
- **Important — these numbers are intentionally NOT real:** the user does not want the page to read as a disclosure of their employer's actual contact database size or composition. Current published total is `30,860` (framed publicly as "30,000+"), deliberately different from both the real workbook's actual count and from the first illustrative pass used in an earlier revision (`38,504` / "38,500+" — also fabricated, since replaced). Every breakdown table must keep summing exactly to whatever total is stated:
  - Leads by Source: Vtiger 14,659 (47.5%), Zoho 10,184 (33.0%), Lusha 4,629 (15.0%), Datamine 648 (2.1%), Pipileads 586 (1.9%), Purchased 154 (0.5%) → sums to 30,860.
  - Active/Inactive: 18,979 (61.5%) / 11,881 (38.5%) → sums to 30,860.
  - Fields tracked stated as "160+" (not the real 166); countries as "9+".
  - The Database Snapshot table's caption explicitly frames all figures as illustrative of the workflow's shape, not a disclosure of real contact data — keep that framing (or something equivalent) any time these numbers are touched again. Do not revert to real computed figures, and do not word captions in a way that confirms these numbers are a rounded/adjusted version of a specific real count (avoid phrasing like "adjusted from the real dataset") — keep them framed as representative/illustrative instead.
  - The real source workbook these were originally derived from no longer exists in this repo (see the 2026-09-15 deletion note above) — there is nothing left to recompute against. Treat the published figures above as the only figures available going forward.

## Asset Conventions
- Project assets live in their own folders under `assets/images/`.
- Project detail pages now live under `projects/`.
- Insight detail pages now live under `insights/`.
- Data Studies now use a self-contained folder-per-study structure under `data-studies/`.
- Keep each Data Study's HTML file, charts, header image, dataset, and related assets in the same study folder.
- Current live example:
  - `data-studies/netflix-genre-performance-study/`
- Chibi art assets live under `assets/chibicz/`.
- Current chibi placement rule:
  - all chibi images should use the same displayed size across the site
  - if one chibi size is changed, update all chibi images to match
  - current shared target size is `180x180` pixels unless the user asks otherwise
  - keep chibi wrappers visually tight: no extra padding and only minimal margin needed for placement
- Existing project asset folders:
  - `assets/images/leadflow-etl/`
  - `assets/images/csv-advanced-search-engine/`
- Prefer this structure for future project pages as well.
- Insight source files can live under `content/insights/<insight-name>/`.
- Use `data-studies/README.md` as the structural guide for future Data Studies pages.
- For insight pages, use the insight header image in both places:
  - the homepage Insights card image
  - the top header image on the individual Insight page
- Insight pages should include a floating bottom-right scroll-to-top button using `assets/icons/up-arrow.svg` and the shared `data-scroll-top` behavior.

## CSS Notes
- Main stylesheet is `assets/css/styles.css`.
- Relevant current custom blocks include:
  - simple project page styles
  - project GitHub link styles
  - project results strip styles
  - Data Studies detail page styles
  - `.related-home-clone*` styles for the shared bottom related-content carousel (project/insight detail pages)
- When changing project page styling, favor subtle variation over identical repeated containers.
- **Sidebar responsive behavior**: `#sidebar` is a vertically-centered floating
  pill on desktop (base rule, no media query), converts to a horizontal
  bottom-docked bar at `max-width:860px`, and has a narrower
  `min-width:861px and max-width:980px` tightening pass for the small-desktop
  range in between. Keep any future sidebar position rule scoped to one of
  these ranges — an earlier version had an unscoped `max-width:980px` rule
  that used `!important` and silently cancelled the 860px mobile-dock
  conversion for every page except the homepage, causing the nav to overlap
  body text on About Me/Project/Insight/Data Study pages at mobile widths
  (fixed 2026-09-08).
- **2026-09-08 cleanup**: removed ~1,674 lines of dead CSS (rules whose
  selectors matched nothing in any `.html`/`.js` file) — mostly leftovers
  from a removed "Lord's Recovery" page, an old pre-carousel static
  project-card grid, an old homepage Skills logo-grid + Social Credentials
  panel, an old `.homepage-related-clone` naming scheme superseded by
  `.related-home-clone`, and unused single-word Pokémon type classes
  (`.fire`, `.water`, etc. — type badges are actually rendered as SVG icons,
  not CSS-colored classes). Verified with a full Playwright pass across all
  pages/breakpoints before removal — no visual or functional changes.
- Data Studies page rules should stay centralized in `assets/css/styles.css`, not duplicated inline per page.
- Any new section or visual adjustment should be checked in mobile view as part of the default workflow, not only on desktop.
- Theme system notes:
  - dark mode is the default theme
  - light mode is driven from `:root[data-theme="light"]`
  - `assets/js/app.js` also syncs `body[data-theme-mode]` plus `body.theme-light` / `body.theme-dark` for future targeting
  - prefer adding theme-specific overrides near the shared theme section instead of creating more scattered per-page color fixes
  - if an older homepage override forces colors with `!important`, add the light-mode correction with equal or higher specificity rather than changing layout structure
- Current homepage mobile behaviors to preserve:
  - Skills section: `2` skill logo cards per row
  - Insights section: prev/next buttons grouped side-by-side at the top-right of the insights content area
  - Challenges section: game cards stacked vertically
- Particle background notes:
  - shared particle logic lives in `assets/js/particles-background.js`
  - CanvasParticles is loaded by CDN on all main site pages and `games/tech-master/index.html`
  - each supported page includes `<canvas id="site-particles-canvas" aria-hidden="true"></canvas>`
  - particle colors are controlled with `--page-bg` and `--particle-color`
  - current shared particle colors are intentionally subtle:
    - light mode: `--page-bg: #EBEBEB`, `--particle-color: rgba(34, 34, 34, 0.18)`
    - dark mode: `--page-bg: #0F0F0F`, `--particle-color: rgba(255, 255, 255, 0.24)`
  - particles should behave like page background only and should not visually sit on top of the main reading/content area
  - `main::before` in `assets/css/styles.css` is used so the main content area sits on the page background color while particles remain visible around it
  - if particle visibility breaks in light mode, check for older `body { background: ... !important; }` overrides later in the stylesheet
  - if theme switching breaks, keep the `cz-themechange` event flow in `assets/js/app.js` compatible with `assets/js/particles-background.js`

## JS Notes
- Main JS file: `assets/js/app.js`
- Keep support for:
  - non-project carousels
  - section spy on homepage
  - active Projects nav item on project detail pages
  - active Data Studies nav item on Data Studies detail pages
  - Brain Challenge reveal-on-click behavior
- Theme behavior:
  - selected theme is stored in `localStorage` under `cz-theme`
  - HTML pages set the saved theme early in `<head>` before loading CSS
  - the sidebar theme toggle swaps icons based on the next available mode
  - `assets/js/app.js` dispatches `cz-themechange` after theme updates so shared background effects can reinitialize safely
- Particle behavior:
  - `assets/js/particles-background.js` uses CanvasParticles mouse interaction for cursor response
  - reduced motion should keep a static background and skip the animation
  - avoid duplicate particle loops; rebuild or refresh the single shared canvas instance instead
- Related content is now metadata-driven in `assets/js/app.js`:
  - `PROJECT_ITEMS` powers project carousels
  - `INSIGHT_ITEMS` powers insight carousels
- Detail pages should use placeholder sections instead of hardcoded repeated cards:
  - projects: `<section class="container project-related-section" data-related-kind="projects" data-current-slug="<project-slug>"></section>`
  - insights: `<section class="container project-related-section insights-related-section" data-related-kind="insights" data-current-slug="<insight-slug>"></section>`
- The current page is intentionally excluded from its own `More Projects` or `More Insights` carousel using `data-current-slug`.
- When adding a new project or insight in the future:
  - add the metadata entry in `assets/js/app.js`
  - add the new detail page with the correct `data-current-slug`
  - update homepage content only where needed

## Supabase Integration
- Shared frontend client file: `assets/js/supabase.js`
- Load order pattern on pages that use shared scripts:
  - Supabase CDN first
  - `assets/js/supabase.js` second
  - page-specific/shared scripts after that
- Global client access:
  - `window.supabaseClient`
  - `window.supabaseReady`
  - `window.supabaseInitError`
- Only the publishable key is allowed in the frontend.
- Never place a `service_role` key in any HTML or browser JS file.
- Intended future uses include likes, scoreboards, run history, or other lightweight shared data features.
- When extending Supabase features later:
  - create the table/policies in Supabase first
  - keep queries in page-specific JS where the feature lives
  - reuse the shared client instead of creating duplicate initializers

### Insight Likes
- Frontend table used: `insight_likes`
- Frontend columns used:
  - `slug`
  - `visitor_id`
  - `created_at`
- Visitor identity is anonymous and local-only through `localStorage` key `cz-visitor-id`
- One-like-per-user rule is enforced by unique `(slug, visitor_id)`
- Files involved:
  - `assets/js/insight-likes.js`
  - all `insights/*.html` detail pages
  - `assets/css/styles.css`
- Keep this feature frontend-safe only:
  - never place a Supabase `service_role` key in HTML or client-side JS

## Content and Writing Preferences
- The user likes direct, practical project storytelling.
- Case studies should focus on:
  - real bottleneck/problem
  - technical solution
  - measurable performance/results
  - business/workflow impact
- Avoid overly generic portfolio filler text.
- Prefer clear operational language over buzzwords.
- The About Me page Website section now includes a library attribution bullet for Canvas Particles JS:
  - author: `Kyle Hoeckman`
  - repo: `https://github.com/Khoeckman/canvasparticles-js`

## Insight Page Notes
- Insight header images should be reused in two places:
  - the homepage/bottom-carousel insight card
  - the top banner of the individual insight page
- Non-header images inside insight article content should be displayed smaller than full width.
- Current preferred treatment for inline insight images:
  - around 70% width on desktop
  - full width on mobile

## Future Development Priorities
- Continue refining the Projects section on `czcatzzz.html` so card text and spacing feel balanced within the carousel layout.
- Continue improving project subpage visual flow so sections feel connected and less repetitive.
- If more project pages are added, follow the simplified pattern unless the user asks for a richer layout.
- Treat mobile responsiveness as part of the acceptance check for future additions and design changes.

## Tech Master Quiz Game
- This feature belongs inside the same portfolio project, not as a separate repo or app.
- Planned folder location: `games/tech-master/`
- It is intended to become a standalone static mini-game page inside the portfolio.
- Gameplay is not implemented yet.
- Score tracking is intentionally postponed.
- Future integration should come through the homepage Challenges section.
- Do not implement the game until the UI/UX and concept are finalized.

### Finalized Structure
- Total questions: `30`
- Question flow:
  - Q1-Q10: Easy
  - Q11-Q20: Medium
  - Q21-Q30: Hard
- Reset-on-fail mechanic:
  - if the player answers incorrectly, the run resets back to Level 1 / Intern
- Rank-up cadence:
  - rank changes every `5` correct answers
- Planned future feedback moments:
  - rank-up moment every 5 questions
  - difficulty increase notification at Q10 and Q20
- Future requirement:
  - mobile-friendly by design

### Finalized Rank System
- `1-5` -> `Intern` -> `Learning the basics`
- `6-10` -> `Junior Developer` -> `Writing your first real code`
- `11-15` -> `Software Engineer` -> `Building working systems`
- `16-20` -> `Senior Engineer` -> `Solving complex problems`
- `21-25` -> `Tech Lead` -> `Leading technical direction`
- `26-30` -> `Chief Technology Officer` -> `Owning the entire system`

## Git Commit Message Pattern
- User often asks for commit messages beginning with version prefixes.
- Recent examples:
  - `Version 2.0.0 - ...`
  - `Version 2.1.0 - ...`
- Keep future suggested commit messages concise and descriptive.

## Working Preference
- Save context by reading this file first before making future edits.
- When extending project pages:
  - look for matching images in `assets/images/<project-name>/`
  - preserve existing titles if the user has explicitly provided them
  - preserve GitHub links once added

## Trivia Block Context
- Root folder: `trivia/`
- Files: `trivia-data.js`, `trivia-icon.svg`, `README.md`
- Position: directly under Hero, above Professional Overview
- Not a nav/scroll-tracked section
- No `hero-trivia-card` wrapper
- Max-height target: `250px`
- Keep the UI simple: white text, source line, centered title with inline icon
- Buttons should be circular white carousel buttons matching the Insights style
- Trivia JS behavior lives in `assets/js/app.js`
