# CZ Portfolio Site

Static portfolio site built with plain HTML, CSS, and JavaScript.

## Pages

- `czcatzzz.html`: main portfolio page

## Current Structure

- Floating sidebar with section navigation
- Hero section with portfolio summary
- Professional Overview with cover image and social links
- Brain Challenge section
- Skills logo grid
- Projects carousel on homepage and project listings on project pages
- Lord's Recovery preview section

## Assets

- `assets/css/styles.css`: shared site styling
- `assets/js/app.js`: sidebar state, game reveal logic, and remaining carousel behavior
- `assets/js/particles-background.js`: shared CanvasParticles background controller
- `assets/icons/`: navigation and social icons
- `assets/images/`: image assets including the profile cover
- `page-elements/`: reference UI elements used as styling direction for some sections

## Local Preview

Open `czcatzzz.html` directly in a browser.

## Notes

- This is a static site and does not require a build step.
- Skills are content-driven directly in HTML.
- Related `More Projects` and `More Insights` sections on detail pages are rendered from metadata in `assets/js/app.js`.
- The current detail page is excluded automatically from its own related carousel.
- To add future project or insight pages more easily, update the matching metadata list in `assets/js/app.js` and use the existing placeholder section pattern on the detail page.
- The Skills section uses logo cards sourced from `assets/icons/`.
- Theme support is built in:
  - dark mode is the default
  - light mode is stored in `localStorage` with key `cz-theme`
  - shared light-mode overrides live in `assets/css/styles.css`
  - `assets/js/app.js` dispatches `cz-themechange` so shared effects like the particles background can refresh safely
- CanvasParticles background support is built in:
  - pages use a shared `<canvas id="site-particles-canvas" aria-hidden="true"></canvas>`
  - CanvasParticles is loaded from CDN, with site logic in `assets/js/particles-background.js`
  - particles are meant to behave as background atmosphere, not as an overlay over the main content area
  - current subtle particle colors:
    - dark mode: page background `#0F0F0F`, particles `rgba(255, 255, 255, 0.24)`
    - light mode: page background `#EBEBEB`, particles `rgba(34, 34, 34, 0.18)`
- Check mobile view whenever adding or changing sections.
- Current mobile expectations:
  - Skills show `2` logo cards per row
  - Insights prev/next buttons sit together at the top-right of the section content
  - Challenges game cards stack vertically

## Attribution

- Canvas Particles JS by Kyle Hoeckman:
  - `https://github.com/Khoeckman/canvasparticles-js`

## Supabase Integration

- Supabase is set up for frontend features that may need shared data later, such as likes, scoreboards, saved stats, comments, or lightweight content actions.
- Shared config lives in `assets/js/supabase.js`.
- The site uses the Supabase CDN plus the publishable key only.
- Global access is exposed through `window.supabaseClient` and `window.supabaseReady`.
- Security rule: never place a `service_role` key in this frontend project.
- To extend it later:
  - create the new table or policy in Supabase
  - add the page-specific read/write logic in the relevant script
  - reuse `window.supabaseClient` instead of creating extra clients per page

### Insight Likes

- Table name: `insight_likes`
- Columns used by the frontend: `slug`, `visitor_id`, `created_at`
- Visitor identity is stored locally in `localStorage` under `cz-visitor-id`
- Rule: one like per visitor per insight, enforced by unique `(slug, visitor_id)`
- Files involved:
  - `assets/js/supabase.js`
  - `assets/js/insight-likes.js`
  - `insights/*.html`
  - `assets/css/styles.css`
- Never use a Supabase `service_role` key in frontend HTML or browser JavaScript
