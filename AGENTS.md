# AGENTS.md

## Purpose
This file preserves the key working context, design choices, and content decisions for this portfolio site so future updates can continue without re-explaining the same requirements.

## Project Overview
- Repo type: static multi-page portfolio site
- Main pages:
  - `index.html`
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
  - section spy on `index.html`
  - remaining carousel behavior for non-project sections
  - special sidebar active state for pages with `data-page="project-detail"`
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

### Professional Overview
- The old `Core Result` block and mini-stat block were removed.
- They were replaced with a `Social Credentials` panel in the right column.
- Social credentials currently include:
  - LinkedIn: `https://www.linkedin.com/in/chimzoecatalan/`
  - GitHub: `https://github.com/ChimCatz`
  - Facebook: `https://fb.com/chimzoecatalan/`
  - Google email: `catalanchimzoe.business@gmail.com`
- Use icon style based on the SVGs found in `assets/icons/social-media-icons.txt`.
- Current implementation uses inline SVG copied from that file.

### Skills Section
- The homepage Skills section now uses logo cards only.
- Remove percentages and descriptive paragraphs.
- Use a centered logo + name card layout.
- Skills must always be ordered by level first:
  - highest levels first
  - if two skills share the same level, sort them alphabetically
- Current order to preserve:
  - Google Sheets
  - Microsoft Excel
  - Data Analysis
  - Prompt Engineering
  - Vibe Coding
  - Vtiger CRM
  - Zoho Analytics
  - Zoho CRM
  - Codex
  - Google Analytics
  - Microsoft Clarity
  - mySQL
  - Python
  - Big Query
  - Tableau
- Assets are sourced from `assets/icons/` and `assets/images/brand-logos/`.
- Layout pattern:
  - 4 cards per row on desktop
  - 2 cards per row on mobile
- Cards should keep transparent, tinted backgrounds with centered logos.

### Projects Section on Homepage
- Homepage Projects now uses a dedicated carousel layout modeled after the Insights section.
- Homepage project cards should:
  - show `2` cards at a time on desktop
  - collapse to `1` card per slide on mobile
  - keep the exact homepage project order:
    - LeadFlow ETL
    - CSV Advanced Search Engine
    - VOIP Call Conversion Tool
    - Data Pivot Table Tool
  - use each project's leaderboard/banner image at the top of the card
- Preserve the existing project card wording unless the user explicitly asks for copy changes.

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

## Asset Conventions
- Project assets live in their own folders under `assets/images/`.
- Project detail pages now live under `projects/`.
- Insight detail pages now live under `insights/`.
- Existing project asset folders:
  - `assets/images/leadflow-etl/`
  - `assets/images/csv-advanced-search-engine/`
- Prefer this structure for future project pages as well.
- Insight source files can live under `content/insights/<insight-name>/`.
- For insight pages, use the insight header image in both places:
  - the homepage Insights card image
  - the top header image on the individual Insight page
- Insight pages should include a floating bottom-right scroll-to-top button using `assets/icons/up-arrow.svg` and the shared `data-scroll-top` behavior.

## CSS Notes
- Main stylesheet is `assets/css/styles.css`.
- Relevant current custom blocks include:
  - homepage/project static card grid styling
  - skills logo grid styling
  - social credentials styles
  - simple project page styles
  - project GitHub link styles
  - project results strip styles
- When changing project page styling, favor subtle variation over identical repeated containers.
- Any new section or visual adjustment should be checked in mobile view as part of the default workflow, not only on desktop.
- Current homepage mobile behaviors to preserve:
  - Skills section: `2` skill logo cards per row
  - Insights section: prev/next buttons grouped side-by-side at the top-right of the insights content area
  - Challenges section: game cards stacked vertically

## JS Notes
- Main JS file: `assets/js/app.js`
- Keep support for:
  - non-project carousels
  - section spy on homepage
  - active Projects nav item on project detail pages
  - Brain Challenge reveal-on-click behavior
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

## Content and Writing Preferences
- The user likes direct, practical project storytelling.
- Case studies should focus on:
  - real bottleneck/problem
  - technical solution
  - measurable performance/results
  - business/workflow impact
- Avoid overly generic portfolio filler text.
- Prefer clear operational language over buzzwords.

## Insight Page Notes
- Insight header images should be reused in two places:
  - the homepage/bottom-carousel insight card
  - the top banner of the individual insight page
- Non-header images inside insight article content should be displayed smaller than full width.
- Current preferred treatment for inline insight images:
  - around 70% width on desktop
  - full width on mobile

## Future Development Priorities
- Continue refining the Projects section on `index.html` so card text and spacing feel balanced within the carousel layout.
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
