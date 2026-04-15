# AGENTS.md

## Purpose
This file preserves the key working context, design choices, and content decisions for this portfolio site so future updates can continue without re-explaining the same requirements.

## Project Overview
- Repo type: static multi-page portfolio site
- Main pages:
  - `index.html`
  - `leadflow-etl.html`
  - `data-pivot-table-tool.html`
  - `csv-advanced-search-engine.html`
  - `call-conversion-tool.html`
  - `lords-recovery.html`
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
  - carousel behavior
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

### Projects Section on Homepage
- Keep the existing carousel UI.
- Improve it, but preserve the current interaction model.
- Each project card should include a button linking to its own dedicated project page.
- The user wanted the extra whitespace on the right reduced.
- Current styling change:
  - project cards are centered more
  - text is justified and stretched more evenly
  - actions and meta chips are centered
- If revisiting this section later, continue reducing awkward empty space while keeping readability.

## Project Subpage Pattern
- Project pages were intentionally simplified.
- Desired order:
  1. leaderboard/banner at the top
  2. case study content
  3. supporting image
- Keep these pages simple and readable.
- Do not overcomplicate them with too many extra summary cards unless explicitly requested.
- GitHub repository links are welcome and now part of the pattern.

## Current Project Pages

### LeadFlow ETL
- File: `leadflow-etl.html`
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
- File: `csv-advanced-search-engine.html`
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
- File: `data-pivot-table-tool.html`
- Still placeholder/simple structure.
- Needs future:
  - leaderboard image
  - case study content
  - supporting image

### VOIP Call Conversion Tool
- File: `call-conversion-tool.html`
- Still placeholder/simple structure.
- Needs future:
  - leaderboard image
  - case study content
  - supporting image

## Asset Conventions
- Project assets live in their own folders under `assets/images/`.
- Existing project asset folders:
  - `assets/images/leadflow-etl/`
  - `assets/images/csv-advanced-search-engine/`
- Prefer this structure for future project pages as well.

## CSS Notes
- Main stylesheet is `assets/css/styles.css`.
- Relevant current custom blocks include:
  - homepage/project carousel styling
  - social credentials styles
  - simple project page styles
  - project GitHub link styles
  - project results strip styles
- When changing project page styling, favor subtle variation over identical repeated containers.

## JS Notes
- Main JS file: `assets/js/app.js`
- Keep support for:
  - carousels
  - section spy on homepage
  - active Projects nav item on project detail pages

## Content and Writing Preferences
- The user likes direct, practical project storytelling.
- Case studies should focus on:
  - real bottleneck/problem
  - technical solution
  - measurable performance/results
  - business/workflow impact
- Avoid overly generic portfolio filler text.
- Prefer clear operational language over buzzwords.

## Future Development Priorities
- Add full case studies for:
  - Data Pivot Table Tool
  - VOIP Call Conversion Tool
- Continue refining the Projects section on `index.html` so card text feels balanced and uses space better.
- Continue improving project subpage visual flow so sections feel connected and less repetitive.
- If more project pages are added, follow the simplified pattern unless the user asks for a richer layout.

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
