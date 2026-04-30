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
- Check mobile view whenever adding or changing sections.
- Current mobile expectations:
  - Skills show `2` logo cards per row
  - Insights prev/next buttons sit together at the top-right of the section content
  - Challenges game cards stack vertically
