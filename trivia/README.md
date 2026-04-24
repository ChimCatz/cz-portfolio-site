## Trivia Folder

This folder stores the frontend-only data used by the homepage Trivia block.

Trivia lives directly under the Hero section and above Professional Overview. It is not part of navigation and should not be added to sidebar or top navbar tracking.

Data is stored in `trivia-data.js`, and the UI logic lives in `assets/js/app.js`.

The icon is expected at `trivia/trivia-icon.svg` as the preferred asset path for future updates. The current repo may temporarily use a different file variant until that SVG is present.

The UI is intentionally simple:
- no `hero-trivia-card` wrapper
- no background panel
- centered title with inline icon
- white/simple trivia text plus a smaller source line
- circular buttons that reuse the Insights carousel button style

The max height target for the Trivia block is `250px`.

Random order behavior:
- shuffle on load
- Next moves forward through the shuffled list
- reshuffle after the end
- Previous wraps backward
- auto-rotate every `1` hour

This system is fully frontend-only and does not depend on any backend or API.
