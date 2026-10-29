# too-many-applicants

Revisions and new resources for: Insight: Too Many Applicants, Too Few Jobs, and How to Win

Page source: `rebrand/src/content/insights/too-many-applicants-too-few-jobs-and-how-to-win/`

## Done (2026-10-29)

The page now compares March with March:

| Country | On the page | Compared with |
|---|---|---|
| Philippines (PSA) | The March 2026 survey round | March 2025 |
| UK (ONS) | January to March 2026, a three-month average | January to March 2025 (and 2024 for redundancies and temporary work) |
| US (BLS) | Projections 2025 to 2035, unchanged | Not applicable |

- The PSA March 2026 and March 2025 full statistical tables and the ONS files
  used (A02, A05 SA and NSA, A06, EMP01, RED01, UNEM01 SA, CLA01) were moved
  into the page folder as two download zips, so they are no longer here.
- Job search methods (41% through relatives and friends) and the 4.1 weeks
  spent looking are not in the March tables. They stay July 2025 and are
  labeled that way.
- The ONS September 2026 bulletin PDF was removed from the page: none of its
  figures are used any more.
- Things the March data changed in the story: 18 to 24-year-olds are now half
  of the UK rise in unemployment (not more than all of it), the claimant count
  is lower than a year earlier, temporary workers who could not find a
  permanent job fell (24.8% to 23.0%), and Philippine underemployment fell
  (13.4% to 12.3%).

## Still here, not used

| Folder or file | What it is |
|---|---|
| `Philippines - PSA - Labor Force Survey/PSA February 2026 Full Statistical Tables/` | The month before March 2026. |
| `.../PSA March 2026/` to `.../PSA August 2026/` | Monthly headline tables (1 to 4, A to D). Good for a trend line, not for the detailed charts. |
| `.../Sources.txt` | The PSA page for each month. |
| `UK - ONS - Labor and Employment Data/` | The `nsa` copies of A02, EMP01, RED01 and UNEM01, EMP02 (public and private sector employment) and the saved ONS page. |
| `U.S - BLS - Employment Situation/` | US monthly jobs report, September 2026. If US current figures are added, download the March 2026 tables instead (released April 2026), for example A-10, A-4 and A-12. |

## Reading the files

- `.xlsx` files open in Excel or with Python `openpyxl`; the old `.xls`
  files need `pip install xlrd`.
- PSA tables have an "Estimates" block and a "Standard Error" block side by
  side. Use the estimates. "Pct of" tables are percent distributions; the
  first row of each holds the totals in thousands.
- ONS rows are three-month periods (`Jan-Mar 2026`); CLA01 is monthly.
