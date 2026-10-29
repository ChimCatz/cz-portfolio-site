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
| `U.S - BLS - Employment Situation/` | US monthly jobs report, September 2026. Not used on the page yet. |

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

## Quick numbers (not checked yet)

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
