---
title: "CRM Conversion Engine: Turning Any Lead File Into a Clean Import"
slug: crm-conversion-engine
order: 2
kicker: "Python ETL tool"
summary: "A Python ETL tool that converts exports from CRMs and lead-data providers into each system's import format, with identity matching built in, so a clean import file takes seconds instead of 4 to 8 hours."
banner: ./banner.png
thumb: ./thumb.png
bannerAlt: "Banner for the CRM Conversion Engine: arrows converting between two databases, with the numbers about 18 seconds, 95% less time, and 80 to 90% fewer errors."
results:
  - value: "~18 s"
    label: "to convert 40K+ records, down from 4–8 hours"
  - value: "80–90%"
    label: "fewer import errors"
  - value: "<1 min"
    label: "to set up a new file, down from about 10"
evolution:
  - stage: "Before"
    title: "Manual cleanup and macros"
    detail: "4–8 hours of preparation per clean import file"
  - stage: "Version 1"
    title: "Standalone ETL app"
    detail: "One pipeline per source, with identity matching"
  - stage: "Now"
    title: "The suite's central engine"
    detail: "Reused by the reconciliation tool and by scripts"
facts:
  - label: "Role"
    value: "Built it (day job)"
  - label: "Type"
    value: "Desktop app and Python library"
  - label: "Data"
    value: "60K–350K record exports"
tools:
  - "Python"
  - "pandas"
  - "RapidFuzz"
  - "PySide6"
  - "openpyxl"
---

## The problem

Exporting CRM data was easy. Making it usable was not.

Each dataset, often 60K to 350K records, came from a different place: one of two CRMs or one of several lead-data providers. Every source had its own column names, its own phone formats, its own missing fields, and no reliable way to tell whether a contact already existed. Preparing a single clean import file took **4 to 8 hours** of manual work, and errors still slipped through.

The goal was strict: get processing down to minutes and push accuracy above 95%.

## One pipeline per source

The engine is a Python desktop app with a dedicated transformer for each source-to-destination route: CRM to CRM, provider to CRM, CRM to campaign spreadsheet, and a hand-mapped route for anything unfamiliar.

Each pipeline applies its own rules instead of a generic mapping:

- **Field alignment** to the destination's exact column layout.
- **Normalization** of departments, revenue bands, and industries into standard categories using keyword rules.
- **Phone formatting by country**, so numbers come out in one consistent style. For example, a local number that starts with a trunk 0 gets the country's dial code instead.

Early versions guessed the pipeline from the file's headers. That worked until two exports with nearly identical headers needed different pipelines. Now the tool still makes a suggestion, but the user confirms the pipeline before anything runs. Being explicit turned out to be safer than being clever.

## Identity matching

The hardest problem was knowing whether a contact already existed. The engine solves it in two layers:

1. **Exact email match** against a dictionary index of the master file, which resolves most records instantly.
2. **Fuzzy matching** with RapidFuzz for the rest, weighting name similarity at 70% and company similarity at 30%, with a 92% confidence threshold.

Every result is labeled with how it was matched, so the output can be checked instead of trusted blindly. Record IDs belong to the main CRM, so the engine reads them for matching but strips them from every file going back into it. New records get their ID from the CRM itself.

## Less setup, fewer surprises

A mapping screen auto-maps known columns and previews sample values, cutting setup from about 10 minutes to under 1 minute. Unmapped required fields are highlighted until they're resolved.

For unfamiliar files, the user maps the full destination layout by hand. The tool then shows a five-row preview and a check of which fields are still empty, and both have to be confirmed before anything is saved.

## Performance

Indexed lookups replace brute-force comparisons, and the heavy work runs off the interface thread so the window never freezes. In real runs, **40K+ records convert in about 18 seconds**, and larger files scale predictably because matching works against pre-built indexes.

## From standalone app to the suite's engine

In the tool suite, this engine became the **single source of every import format**. The reconciliation tool imports its transformer and matcher directly, and scripts can call the same pipelines without opening the interface. When a format changes, it changes in one place.

## Results

- Preparing an import went from **4 to 8 hours** to **seconds**: about 18 seconds for 40K+ records.
- Import-related errors dropped by roughly **80 to 90%**.
- Setup for a new file dropped from about **10 minutes to under 1 minute**.

## What I learned

**Explicit beats automatic when mistakes are expensive.** Auto-detection saved a click but occasionally picked the wrong pipeline. Making the user confirm it cost one click and removed a whole class of errors.

**Build the engine so other tools can use it.** Keeping the logic separate from the window is what let the conversion code become the foundation for the rest of the suite.
