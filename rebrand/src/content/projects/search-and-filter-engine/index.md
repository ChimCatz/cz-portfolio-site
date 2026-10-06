---
title: "Search & Filter Engine: From Hours of Excel Filtering to Seconds"
slug: search-and-filter-engine
order: 1
kicker: "Python desktop tool"
summary: "A desktop search engine for 100K+ row lead exports that understands company names and job titles, so filtering a 200-company target list takes seconds instead of hours."
banner: ./banner.png
thumb: ./thumb.png
bannerAlt: "Banner for the Search & Filter Engine: a magnifying glass over data rows, with the numbers under 10 seconds, 100K+ rows, and 90 to 95% accuracy."
results:
  - value: "<10 s"
    label: "per search, down from 1–3 hours by hand"
  - value: "100K+"
    label: "rows searched without lag"
  - value: "90–95%"
    label: "match accuracy, up from about 70%"
evolution:
  - stage: "Before"
    title: "Filtering in Excel"
    detail: "1–3 hours per target list, and Excel struggled past 50K rows"
  - stage: "Version 1"
    title: "Standalone search engine"
    detail: "Indexed search over normalized companies and titles"
  - stage: "Now"
    title: "Part of the tool suite"
    detail: "Sends its results straight to the conversion engine"
facts:
  - label: "Role"
    value: "Built it (day job)"
  - label: "Type"
    value: "Desktop app"
  - label: "Data"
    value: "40K–100K+ row CSV exports"
tools:
  - "Python"
  - "pandas"
  - "PySide6"
  - "Regex"
---

## The problem

I work with CRM and lead-provider exports every day, and once a file passes 50K to 100K rows, searching it becomes painful. Excel lags, filters freeze, and a simple request like "find all marketing managers at these 200 companies" turns into hours of manual filtering.

The real difficulty isn't the size, though. It's that lead data is messy. The same company shows up as "Acme Holdings Ltd" in one file and "Acme" in another, and the same job can be called "Head of Digital Growth" or "Marketing Director". A plain text search misses half of what you're looking for.

So I built a search engine specifically for this kind of data.

## Normalize first, then search

When a file loads, the tool maps its columns once and then normalizes the two fields that cause the most trouble:

- **Company names** are broken into brand roots, with weak tokens like Inc, Ltd, and Group removed, so "Acme Holdings Ltd" and "Acme Bank" are recognized as the same organization.
- **Job titles** are classified by **function** (sales, marketing, IT, and so on) and **seniority** (manager, director, C-level) using keyword rules, so you can search by what a role is, not just what it's called.

A search for "Head of Cybersecurity" then requires both the Head seniority and the Cybersecurity function, and common acronyms like CTO or CIO match their full titles too.

## Built for speed

Instead of scanning the whole file on every search, the engine builds its indexes up front and filters with vectorized pandas operations.

For bulk company lists, often 100 to 500 companies at once, it extracts only the strong keywords from each name and looks them up against the precomputed brand roots. That avoids slow fuzzy matching on every row and keeps search time predictable as files grow.

Job titles vary more, so each line of a title list becomes a pattern that requires all of its keywords. "Marketing Director" only matches titles containing both words.

## Filters that match how campaigns are defined

Target lists are usually defined as much by what to leave out as by what to include, so the filters work in both directions:

- Every picklist value (country, industry, company size, job level) can be **included, excluded, or ignored**.
- Company and title lists come in include and exclude versions, typed in or uploaded from a file.
- Flags like "has a phone number" or "has an email" are three-way toggles as well.
- **An exclusion always wins.** A record that matches both an include and an exclude list is removed.

The preview shows the first 100 matches for speed, while the export always contains every matched row with all of its original columns.

## From standalone tool to suite

The first version ended with an export: save the results, then load them into the conversion tool. In the tool suite, the search engine can now **hand its results directly to the conversion engine** in the same session, so a target list goes from search to a ready-to-import file without any saving and reloading in between.

## Results

- Searches that took **1 to 3 hours** by hand now run in **under 10 seconds**, even on 100K+ row files.
- Setting up a new file dropped from about **10 minutes to under 1 minute**.
- Match accuracy improved from roughly **70% to 90–95%**, because normalized names and titles catch what plain text search misses.

## What I learned

**Most of the speed comes from structure, not hardware.** Normalizing once and indexing up front made every later search cheap.

**Understanding the data beats clever matching.** The biggest accuracy gains came from knowing how company names and job titles actually vary in lead data, not from a more complex algorithm.
