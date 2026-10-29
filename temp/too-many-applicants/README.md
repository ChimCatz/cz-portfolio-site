# too-many-applicants

Revisions and new resources for: Insight: Too Many Applicants, Too Few Jobs, and How to Win

Page source: `rebrand/src/content/insights/too-many-applicants-too-few-jobs-and-how-to-win/`

## What is here

| Folder | What it is |
|---|---|
| `Philippines - PSA - Labor Force Survey/PSA March 2026 Full Statistical Tables/` | **Main Philippine set.** Tables 1 to 11, the latest month with full tables. |
| `.../PSA March 2025 Full Statistical Tables/` | **Year-earlier comparison** for March 2026. Old `.xls` format. |
| `.../PSA February 2026 Full Statistical Tables/` | Extra: the month before. |
| `.../PSA March 2026/` to `.../PSA August 2026/` | Monthly headline tables (1 to 4, A to D). Good for a trend line, not for the detailed charts. |
| `.../Sources.txt` | The PSA page for each month. |
| `UK - ONS - Labor and Employment Data/` | **Main UK set.** ONS time-series tables from the October 2026 release, with every quarter back to 1992, so January to March 2026 and 2025 are both in them. See the UK section below. |
| `U.S - BLS - Employment Situation/` | US monthly jobs report, **September 2026**. Not used on the page yet. See the US section below. |

## The timeline: March 2026

| Country | "March 2026" means | Year-earlier comparison |
|---|---|---|
| Philippines (PSA) | The March 2026 survey round | March 2025 |
| UK (ONS) | January to March 2026, a three-month average (how the UK survey is always reported) | January to March 2025 |
| US (BLS) | Projections 2025 to 2035: a ten-year outlook, not a month. They stay as they are. | Not applicable |

Say on the page that the UK figure is January to March, not March alone.

File names were shortened to stay under the Windows path limit. The table
number and the month are always in the name. "Pct of" means the table is a
percent distribution; the first row of each holds the totals in thousands.

## Decisions

- **Compare March with March.** Use March 2026 for the Philippine figures and
  March 2025 for "a year earlier". Never set a March figure against a July one:
  youth unemployment swings with the school year (15.0% in February 2026,
  12.6% in March 2026, 18.1% in July 2025). Graduates join the labor force
  around April to July, so July is high every year.
- The UK figures cover May to July 2026, so the two countries are now two to
  four months apart instead of a year. Update the "Different countries,
  different years" note on the page to say so.

## Page figure -> new table

| On the page (July 2025 tables) | Use in the March sets |
|---|---|
| Youth vs overall unemployment (Table 2) | Table 1 (counts by age group) |
| Unemployment by education (Tables 4 and 18) | Table 5 (employed by grade) and Table 11 (unemployed by grade) |
| College graduates vs high-skill jobs (Tables 4 and 7) | Table 5 and Table 6 (occupation) |
| Want more hours (Table 1) | Table 1 (underemployed) and Table 10 |
| Short-term or seasonal work (Tables 14 and 20) | Table 9 (nature of employment) |
| **How job-seekers search, 41% (Table 19)** | **Not in these sets.** Keep July 2025 and label it. |
| **Average 4.1 weeks looking** | **Not in these sets.** Keep July 2025 and label it. |

## UK files (ONS)

The file names are the ONS dataset codes: `sa` = seasonally adjusted, `nsa` =
not seasonally adjusted, then the release month. Rows are three-month
periods; use the row labelled `Jan-Mar 2026` (and `Jan-Mar 2025`).

| On the page (September 2026 bulletin) | File |
|---|---|
| Table 1: headline rates, employment rate 16 to 64 | `a02saoct2026.xls` (A02) |
| Tables 2(1) and 2(2): unemployment by age, the 18 to 24 vs all gap | `a05saoct2026.xls` (A05), sheet People |
| Table 12: 18 to 24s in or out of full-time education | `a06nsaoct2026.xls` (A06). Not seasonally adjusted: compare Jan-Mar with Jan-Mar only. |
| Table 9(1): how long young adults have been looking | `unem01saoct2026.xls` (UNEM01), sheet People, the 18-24 columns |
| Table 3: temporary and part-time workers who could not find a permanent or full-time job | `emp01saoct2026.xls` (EMP01), sheet People |
| Table 22: redundancies per 1,000 employees | `red01saoct2026.xls` (RED01), sheet All |
| Claimant count | `cla01oct2026.xlsx` (CLA01), sheet `1 UK`. Monthly, not three-month: use the March 2026 row. |
| Not used on the page | `emp02sep2026.xls` (public and private sector employment), the `nsa` copies of A02, A05, EMP01, RED01 and UNEM01, and the saved ONS page. |

ONS note in every file: estimates from January to March 2025 onwards
include the full effect of the survey improvements made from 2024, so
January to March 2025 vs 2026 is a fair comparison. ONS still advises against
reading much into short-term changes.

## US files (BLS)

The page's US figures are the BLS Employment Projections 2025 to 2035 (in the
page folder). They are a ten-year outlook, so they do not need a March
version. The `U.S - BLS - Employment Situation/` tables are **September 2026**,
not March. If US current figures are added to the page, download the March
2026 Employment Situation tables instead (released in April 2026), for
example A-10 (unemployment rates by age), A-4 (by education) and A-12 (by
duration). They cover a single month, like the PSA ones.

## Quick numbers (not checked yet)

UK, `a05saoct2026.xls`, seasonally adjusted:

| | Jan-Mar 2025 | Jan-Mar 2026 |
|---|---|---|
| Unemployment, 18 to 24 | 12.6% | 14.6% |
| Unemployment, 16 and over | 4.6% | 5.0% |

| Redundancies per 1,000 employees (RED01) | 3.8 | 4.2 |
| Temporary employees who could not find a permanent job (EMP01) | 24.8% (389,000) | 23.0% (371,000) |
| Part-time workers who could not find a full-time job (EMP01) | 890,000 (10.5%) | 893,000 (10.4%) |
| Unemployed 18 to 24s looking 6 to 12 months (UNEM01) | 71,000 | 105,000 (+48%) |
| Unemployed 18 to 24s looking over 6 months (UNEM01) | 176,000 | 240,000 (+36%) |
| Claimant count, March (CLA01) | 1.71m | 1.67m |

Checked against the page: for May to July 2026 these files give exactly the
figures now on the page (14.4%, 4.9%, 3.9 redundancies, 25.6% and 416,000
temporary, 904,000 part-time, 120,000 looking 6 to 12 months, +41%), so they
are the right tables.

Things that change the story in March:

- The claimant count is **lower** than a year earlier (1.67m vs 1.71m), so
  "rising since January 2026" needs rechecking. The August 2026 figure has
  also been revised from 1.69m to 1.67m.
- Temporary workers who could not find a permanent job **fell** (24.8% to
  23.0%), where the July figure rose.
- Youth unemployment, redundancies and long job searches all rose, as on the
  page now.

Philippines:

From Table 1, my quick calculation (unemployed divided by labor force):

| | Feb 2026 | Mar 2026 |
|---|---|---|
| Youth (15 to 24) | 15.0% | 12.6% |
| All ages | 5.1% | 5.0% |
| Underemployment (share of employed) | 11.8% | 12.3% |

## Reading the files

- `.xlsx` files open in Excel or with Python `openpyxl`.
- The March 2025 files are the old `.xls` format: Excel opens them; Python
  needs `pip install xlrd`.
- Each table has an "Estimates" block and a "Standard Error" block side by
  side. Use the estimates.
