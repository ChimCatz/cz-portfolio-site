# CZ Portfolio Site

Portfolio of CZ Catalan, published at https://chimcatz.github.io/cz-portfolio-site/

## Folders

| Folder | What it is |
|---|---|
| `rebrand/` | The new site (Astro). All new work happens here. |
| `legacy/` | The previous plain-HTML site, kept for reference and for copying content. Snapshot tag: `v1-final`. |
| `source-files/` | Original files the site is made from (full-size photo, Vanta package). Not published. |
| `setup/` | Installer script and lists for rebuilding the dev setup on a new PC. See `SETUP.md`. |
| `resources/` | Personal reference material. Ignored by git. |

## Working on the new site

```
cd rebrand
npm install      # first time only
npm run dev      # opens the site and live-reloads on every save
```

Other commands (run inside `rebrand/`):

- `npm run build`: build the final site into `rebrand/dist/`
- `npm run resume`: re-render the Resume page image after replacing
  `rebrand/public/resume/Chim_Zoe_Catalan_Resume.pdf` (needs Python with PyMuPDF)

## Inside `rebrand/`

- `src/pages/`: one file per page (`index.astro` is the homepage)
- `src/components/`: shared pieces (header, globe background)
- `src/layouts/`: the page wrapper every page uses
- `src/styles/global.css`: brand colors, fonts, and base formatting
- `src/assets/`: images that get optimized at build time
- `src/data/`: data files (e.g. `global_datasphere_1956_2030.csv`)
- `public/`: files served as-is (favicon, resume PDF, Vanta/three.js scripts)
- `scripts/`: helper scripts
