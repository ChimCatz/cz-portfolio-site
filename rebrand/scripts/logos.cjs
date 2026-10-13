// Turns the tool logo originals in source-files/logos/ into same-size PNGs in
// src/assets/logos/ for the "tools I reach for" block on About Me.
//
//   npm run logos
//
// Every logo ends up as the mark only (no product name), in one of two shapes:
//   glyph: the mark trimmed to its own edges, shown inside a white tile
//   bleed: a logo that is already a colored square (an app icon); it fills the tile
// `crop` cuts the mark out of a file that also has the name in it, as
// [left, top, width, height] in fractions of the image (0 to 1).
// To add a logo: put the original in source-files/logos/, add a line here,
// re-run, then add the tool in src/pages/about.astro.

const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const SRC = path.join(__dirname, '../../source-files/logos');
const OUT = path.join(__dirname, '../src/assets/logos');
const SIZE = 192;

// [output name, source file, shape, options]
const LOGOS = [
  // Languages
  ['python', 'devicon/python-original.svg', 'glyph'],
  ['mysql', 'devicon/mysql-original.svg', 'glyph'],
  ['visual-basic', 'devicon/visualbasic-original.svg', 'glyph'],
  ['zoho-deluge', 'zoho-deluge-logo-only-png.png', 'glyph', { flatten: '#ffffff' }],
  // Data and reporting
  ['excel', 'microsoft-office-excel-logo-only-svg.svg', 'glyph'],
  ['google-sheets', 'google-sheets-logo-png.png', 'glyph'],
  ['bigquery', 'google_bigquery-icon.svg', 'glyph'],
  ['zoho-analytics', 'zoho-analytics-logo-only-png.png', 'glyph'],
  ['tableau', 'Tableau_Logo.png', 'glyph', { crop: [0, 0, 0.215, 1] }],
  ['pandas', 'devicon/pandas-original.svg', 'glyph'],
  ['matplotlib', 'devicon/matplotlib-original.svg', 'glyph'],
  // CRM and outreach
  ['zoho-crm', 'zoho-crm-logo-only-jpeg.jpeg', 'glyph'],
  ['vtiger', 'vtiger-crm-logo-only-avif.avif', 'glyph'],
  ['zoho-marketing-automation', 'zoho-marketing-automation-logo-only-webp.webp', 'glyph'],
  ['lusha', 'lusha-jpeg.jpeg', 'bleed'],
  ['apollo', 'apollo-jpeg.jpeg', 'bleed'],
  ['clay', 'clay-jpeg.png', 'glyph'],
  ['pipileads', 'pipileads-jpeg.jpeg', 'bleed', { trim: true }],
  ['mailmeteor', 'mailmeteor-jpeg.jpeg', 'bleed'],
  // The ZeroBounce logo is mostly its name; what is left without it is the swoosh and envelope
  ['zerobounce', 'zerobounce-jpeg.jpeg', 'glyph', { crop: [0.11, 0.31, 0.52, 0.14] }],
  // Web analytics
  ['google-analytics', 'google-analytics-logo-withtext-svg.svg', 'glyph', { crop: [0, 0, 0.27, 1] }],
  ['google-tag-manager', 'google-tag-manager-logo-only.webp', 'glyph'],
  ['microsoft-clarity', 'microsoft-clarity-logo-png.png', 'glyph'],
  // AI and workflow
  ['claude', 'claude-ai.svg', 'glyph'],
  ['claude-code', 'claudecode-color.webp', 'glyph'],
  ['codex', 'codex-color.webp', 'glyph', { flatten: '#ffffff' }],
  ['chatgpt', 'chatgpt.webp', 'bleed', { flatten: 'corner' }],
  ['gemini', 'Google_Gemini_logo_2025.svg', 'glyph', { crop: [0, 0, 0.23, 1] }],
  ['vscode', 'devicon/vscode-original.svg', 'glyph'],
  ['git', 'git-svg.svg', 'glyph'],
  ['github', 'github/GitHub_Invertocat_Black.svg', 'glyph'],
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  for (const [name, file, shape, opts = {}] of LOGOS) {
    const src = path.join(SRC, file);
    // SVGs are drawn large first (about 1600px on the long side) so the result
    // stays sharp. SVG sizes come in different units, so step down until it fits.
    let buf;
    if (file.endsWith('.svg')) {
      const natural = await sharp(src).metadata();
      const wanted = Math.round((72 * 1600) / Math.max(natural.width, natural.height));
      for (const density of [wanted, 600, 300, 150, 72].filter((d) => d <= wanted)) {
        try {
          buf = await sharp(src, { density }).png().toBuffer();
          break;
        } catch {
          // too large at this density: try the next one down
        }
      }
    } else {
      buf = await sharp(src).png().toBuffer();
    }
    let meta = await sharp(buf).metadata();

    if (opts.crop) {
      const [l, t, w, h] = opts.crop;
      buf = await sharp(buf)
        .extract({
          left: Math.round(l * meta.width),
          top: Math.round(t * meta.height),
          width: Math.round(w * meta.width),
          height: Math.round(h * meta.height),
        })
        .toBuffer();
      meta = await sharp(buf).metadata();
    }

    if (opts.flatten) {
      let background = opts.flatten;
      if (background === 'corner') {
        // Fill the transparent corners with the logo's own color, sampled from its middle-left edge
        const { data } = await sharp(buf)
          .extract({ left: Math.round(meta.width * 0.06), top: Math.round(meta.height / 2), width: 1, height: 1 })
          .raw()
          .toBuffer({ resolveWithObject: true });
        background = { r: data[0], g: data[1], b: data[2] };
      }
      buf = await sharp(buf).flatten({ background }).toBuffer();
    }

    let image = sharp(buf);
    if (shape === 'glyph' || opts.trim) {
      // Cut away the empty (transparent or plain) border around the mark
      image = sharp(await image.trim({ threshold: 18 }).toBuffer());
    }

    if (shape === 'bleed') {
      image = image.resize(SIZE, SIZE, { fit: 'cover' });
    } else {
      image = image.resize(SIZE, SIZE, { fit: 'inside' });
    }

    const out = path.join(OUT, `${name}.png`);
    const info = await image.png({ compressionLevel: 9 }).toFile(out);
    console.log(`${shape.padEnd(5)} ${name.padEnd(28)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(1)} kB`);
  }
})();
