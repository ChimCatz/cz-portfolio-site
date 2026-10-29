# World data chart: redesign material

Material for improving the "why data" chart on About Me
(`rebrand/src/components/DataGrowthChart.astro`). It was prepared on
2026-10-29 as a standalone reference chart, outside the site. Nothing here
has been put into the site yet.

Live reference (private Artifact): https://claude.ai/artifact/LgFiYBtgxfzoMjYQXXRhL3
Open `reference-chart.html` in a browser to see the same page offline.

## What's in this folder

| File | What it is |
|---|---|
| `reference-chart.html` | The finished reference chart: one page, plain HTML, CSS and JS, no libraries. It uses its own fonts and colours, not the site's brand. |
| `world-data-1968-2030.csv` | The yearly values behind the line, with the basis of every row and a `chart_style` column (solid or dashed). |
| `eras-and-milestones.csv` | The five eras (years, colour token) and the 16 milestones, each with a short label and a one-line description for tooltips. |
| `world-population-1968-2030.csv` | World population by year (Worldometer, from UN World Population Prospects 2024). An earlier draft used it; the final chart doesn't. Kept in case it is wanted later. |
| `source-images/` | Screenshots of the original sources (Hilbert's figure, Rivery's table, Statista's 2010–2028 chart) and the two source links. These are for reference only. Statista's chart is copyrighted, so don't publish the screenshot: link to it. |

## The design, and why

The final version came out of several rounds of feedback. These choices were
deliberate:

- **Log scale only.** A linear view and a population panel were tried and
  dropped. Log shows the whole 60 years at once, and the steep stretches
  stand out.
- **The area under the line is split into five coloured eras.** Each
  era's milestones are written inside its band, stacked from the bottom so
  they climb with the curve. There are no label boxes and no connector
  lines; earlier versions with boxes and leaders looked too busy.

  | Era | Years | Data grew | Milestones |
  |---|---|---|---|
  | Early computing | 1968–90 | ≈×97 (from the back-cast) | ARPANET 1969, Modern hard drive 1973, IBM PC 1981 |
  | The web | 1991–2003 | ×15 | World Wide Web 1991, Google 1998, Digital passes analog 2002 |
  | Social and smartphones | 2004–09 | ×14 in 6 years | Facebook 2004, YouTube 2005, AWS cloud 2006, iPhone 2007 |
  | Mobile internet and cloud | 2010–19 | ×32 | 4G networks 2010, Instagram 2010, Deep learning 2012, 5G 2019 |
  | The AI era | 2020–30 | ≈×10 (mostly forecast) | COVID-19 2020, ChatGPT & LLMs 2022 |

- **An era strip across the top** works as the legend: a colour bar per
  era with its years, how much data multiplied, and the era name. The
  multiplier is what tells the story of which eras rose fastest.
- **Only three values are written on the chart:** 1986 (first measured),
  2023 (latest actual) and 2030 (forecast). Everything else is in the
  hover/keyboard tooltip and the table.
- **Small ring markers on the line** mark the milestone years, so each name
  in a band can be matched to a point.
- **Dashed line** = estimate (before 1986) or forecast (after 2023).
- **The y-axis runs from 10 PB to 1,000 ZB.** The extra decade at the bottom
  is there on purpose: it makes the early bands tall enough to hold their
  text.
- **Colours** are a categorical palette in a fixed order (blue, orange,
  aqua, yellow, magenta), checked so neighbouring eras stay distinguishable
  for colourblind readers, with separate steps for light and dark
  backgrounds. The bands are tints of about 20% in light mode and 30% in
  dark mode, separated by 2px gaps. Text is always neutral, never in an era
  colour.
- **Narrow screens (under about 760px):** the bands keep their colours but
  lose the text inside them, and the eras and milestones are listed under
  the chart with colour swatches.

## Read this before using the numbers

1. **The definition differs from the site's current CSV.** The site's
   `src/data/global_datasphere_1956_2030.csv` counts **digital data
   only**: for 1986 it uses Hilbert's 2.6 EB × about 1% digital = 26 PB.
   This folder's CSV uses Hilbert's **total** (analog + digital) storage, so
   1986 is 2.6 EB, 100× higher. The two converge by 2007, when storage was
   about 94% digital.

   | Year | Site CSV (digital only) | This folder (total storage → data created) |
   |---|---|---|
   | 1986 | 26 PB | 2.6 EB |
   | 2000 | 12.7 EB | 54.5 EB |
   | 2007 | 281 EB | 295 EB |
   | 2010 | 2 ZB | 2 ZB |
   | 2020 | 64.2 ZB | 64 ZB |
   | 2023 | 120 ZB (forecast at 23%/yr) | 123 ZB (Statista 2024) |
   | 2028 | 413 ZB (modelled) | 394 ZB (Statista 2024 forecast) |
   | 2030 | 715 ZB (modelled) | ≈626 ZB (extended at 26%/yr) |

   **Decide which definition the site uses before merging anything.**
   Digital-only fits better with the post-2010 figures, which are digital.
   Total storage is what Hilbert's figure and Rivery's table show. The
   headline depends on the choice. With total storage: "47,000-fold since
   1986, a doubling every 2.4 years". With digital-only, 1986 to 2023 is
   about 4.6 million-fold.

2. **2021–2028 can be updated either way.** The site CSV fills 2021–2025
   with "2020 base × 23%" and models 2026–2030. Statista's 2024 chart (in
   `source-images/`) gives real values for 2021–2023 (84, 101, 123 ZB) and
   its own forecast for 2024–2028 (149, 182, 221, 291, 394 ZB). Those are
   better than the modelled rows whichever definition is chosen.

3. **The 2007–2010 jump is partly a change of definition.** Before 2007 the
   numbers measure storage; from 2010 they measure data created, captured,
   copied and consumed, which counts every copy and stream. The real
   2004–2009 boom (social media, video, cloud, smartphones) is in there,
   but the step is overstated. The site already says this in its caption;
   keep saying it.

4. **Before 1986 is not data.** The 1968–1985 rows are extended back from
   1986 at 20% a year. The site starts its chart at 1986 for this reason
   (AGENTS.md, About Me details). If the redesign starts at 1968 to show
   ARPANET and the hard drive, mark that stretch as an estimate (dashed,
   "Estimated" label) and update the AGENTS.md note in the same change.

5. **"Read from a chart" values.** Statista's 2011, 2013, 2014, 2016, 2017
   and 2019 figures were read off the bar chart image. The site CSV marks
   them `sourced_unverified`; keep that.

## Bringing it into the site

These are suggestions. The rules in AGENTS.md take precedence.

1. **Pick the definition** (point 1 above) and update
   `src/data/global_datasphere_1956_2030.csv` to match: keep its columns
   and `basis` values, since the component throws on an unknown basis. Add
   eras either as a new column or as a list in the component.
2. **Restyle `DataGrowthChart.astro`** and keep what it already does well:
   drawn at build time, HTML labels so text stays the same size on phones,
   dots only on published figures, forecast marked, keyboard readout. Add:
   - the era bands, as SVG paths under the line, one per era, clipped to
     the area below the curve, with a 2px gap between them;
   - the era strip above the plot (bar, years and multiplier, name);
   - the milestones inside the bands. The reference measures each label
     and moves it right until the curve clears its top edge; see the
     "Milestones written inside each band" block in `reference-chart.html`.
     Text widths aren't known at build time, so either place them in a
     small script after fonts load, or use fixed positions per milestone
     and check them at the three viewport sizes;
   - below about 760px wide, hide the in-band text and show the era list.
3. **Use the site's brand, not the reference's.** Use Space Grotesk and
   Montserrat, and colours from `global.css` (`--text`, `--text-muted`,
   `--line` for gridlines). The page is dark, so use the reference's **dark**
   era steps: `#3987e5`, `#d95926`, `#199e70`, `#c98500`, `#d55181` at about
   30% opacity, and the line in `--text`. Check that the bands read on
   `--bg` behind the dimmed globe.
4. **Keep the performance rules:** no new libraries. Coalesce `pointermove`
   to one update per frame. Animate only transform and opacity, if anything
   animates at all. The tooltip must work by keyboard.
5. **Check it:** `npm run build`, then `npm run check -- --only=about` at
   1920x1080, 1366x768 and 360x800 (no sideways scrolling, footer under
   10%).
6. **Tidy up:** move what you use into the site and delete the rest of this
   folder, per `temp/README.md`.

## Sources

- Hilbert, M. & López, P. (2011). "The World's Technological Capacity to
  Store, Communicate, and Compute Information." *Science* 332(6025). Shown
  as Fig. S5.1 in the World Bank's World Development Report 2016
  (https://www.worldbank.org/en/publication/wdr2016).
- Statista (2024). Volume of data created, captured, copied and consumed
  worldwide, 2010 to 2028 (IDC-based). Copyrighted: link, don't host.
- Rivery: https://rivery.io/blog/big-data-statistics-how-much-data-is-there-in-the-world/
- Studio Network Solutions: https://www.studionetworksolutions.com/how-much-data-is-used-and-stored-in-the-world/
- Population: Worldometer (https://www.worldometers.info/world-population/world-population-by-year/),
  from UN World Population Prospects 2024, medium variant from 2024 on.
- Milestone years are common knowledge. Two are interpretations: "Digital
  passes analog" in 2002 is Hilbert & López's estimate, and "4G networks"
  in 2010 is when LTE spread, after the first launches in late 2009.
