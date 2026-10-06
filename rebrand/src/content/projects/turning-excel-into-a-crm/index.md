---
title: "Turning Excel Into a CRM"
slug: turning-excel-into-a-crm
order: 6
kicker: "Advanced Excel"
summary: "Before any of the Python tools existed, the lead database lived in one Excel workbook: six sources, 160+ fields, formula-driven cleanup, and a live dashboard. This is that system."
banner: ./banner.png
thumb: ./thumb.png
bannerAlt: "Banner for Turning Excel Into a CRM: a spreadsheet grid feeding a dashboard, with the labels 30,000+ records, 160+ fields, and 6 sources."
results:
  - value: "30,000+"
    label: "lead records in one workbook"
  - value: "160+"
    label: "fields tracked per record"
  - value: "6"
    label: "sources merged into one structure"
evolution:
  - stage: "Then"
    title: "One compilation workbook"
    detail: "Monthly merges, formula cleanup, live dashboard"
  - stage: "Later"
    title: "The same patterns in Python"
    detail: "Cleanup rules and identity fields rebuilt at scale"
facts:
  - label: "Role"
    value: "Built and maintained it (day job)"
  - label: "Type"
    value: "Excel workbook"
  - label: "Core formulas"
    value: "Array FIND/TRIM cleanup, cross-sheet SUMIFS"
tools:
  - "Excel"
  - "Array formulas"
  - "SUMIFS"
note: "All figures on this page are illustrative. They show the shape of the workflow, not the size or makeup of any real contact database."
---

Before the [CRM Conversion Engine](/cz-portfolio-site/projects/crm-conversion-engine) existed, someone still had to compile and maintain the data it would later automate. That someone was me, and the tool was Excel.

Every month, lead records arrived from six different sources: two CRMs, two lead-data providers, a legacy database export, and purchased lists. Each had its own format, its own quirks, and no shared structure. The compilation workbook grew into a database of 30,000+ records across 160+ fields, and it had to stay accurate, deduplicated, and reportable without any outside tooling.

## Database snapshot

| Measure | Value |
| --- | --- |
| Total lead records | 30,860 |
| Active leads | 18,979 (61.5%) |
| Inactive leads | 11,881 (38.5%) |
| Fields tracked per record | 160+ |
| Data sources unified | 6 |
| Countries represented | 9+ |

## Cleaning company names with one formula

The core challenge was consistency. The same company showed up under slightly different names depending on the source: "Redwood Group Pte Ltd" in one export, "Redwood Group Pte. Ltd." in another. Normalizing that by hand at this scale wasn't realistic.

So I built a cleanup formula that strips legal suffixes automatically. It combines TRIM, LEFT, and an array-entered FIND against a keyword list of common suffixes (Pte, Ltd, Sdn Bhd, Inc, Limited, Tbk, PLC, and more), checks a name against every suffix in one pass, and trims it at the earliest match:

`=TRIM(LEFT(C2,MIN(IFERROR(FIND(Keywords!$A$1:$A$40,C2),LEN(C2)+1))-1))`

Adding a new suffix later just meant adding a row to the keyword list, not rewriting the formula.

| Raw company name | Cleaned output |
| --- | --- |
| Pacific Group Sdn Bhd | Pacific Group |
| Redwood Group Pte Ltd | Redwood Group |
| Oakridge Networks Ltd | Oakridge Networks |
| Cascade Logistics Ltd | Cascade Logistics |
| Crescent Networks Pte Ltd | Crescent Networks |
| Orion Capital Ltd | Orion Capital |

## A dashboard that never goes stale

Reporting was the second problem. Leadership needed to see how many active and inactive leads existed per source and per year without opening the raw sheet.

I built a dashboard sheet that uses SUMIFS across the whole database, cross-referencing a computed year field against every source and status combination. Every cell recalculates as records are added or a status changes, so the summary always matches the raw data.

| Source | Records | Share |
| --- | --- | --- |
| Operations CRM | 14,659 | 47.5% |
| Main CRM | 10,184 | 33.0% |
| Lead provider A | 4,629 | 15.0% |
| Legacy database export | 648 | 2.1% |
| Lead provider B | 586 | 1.9% |
| Purchased lists | 154 | 0.5% |
| **Total** | **30,860** | **100%** |

One real quirk this reflects: the raw source field sometimes stored the same source name in two different capitalizations, a manual-entry habit the dashboard and lookups had to tolerate rather than assume away.

## Treating the database as a living system

Day to day, the workbook was paired with a task-tracking sheet that logged record counts by source and status. Drift or stalled updates showed up immediately instead of weeks later during a reporting cycle.

That habit of tracking the database like a living system, not a static file, is what eventually made the case for automating the whole pipeline. The patterns I leaned on most here, source-aware cleanup rules, a normalized identity field, and status-based aggregation, are the same ones the Python tools later rebuilt at a much larger scale.

## What I learned

**Good structure outlives the tool.** The rules I designed in Excel carried straight over into Python. Only the scale changed.

**Watch the data, not just the reports.** Daily counts caught problems long before any monthly report would have.
