---
title: "Call Analytics Tool: Matching Call Logs to CRM Records in Seconds"
slug: call-analytics-tool
order: 4
kicker: "Python desktop tool"
summary: "A desktop tool that cleans raw call logs and CRM exports, matches calls to contacts, and produces conversion metrics, monthly call imports, and a weekly operations report, in seconds instead of an hour."
banner: ./banner.png
thumb: ./thumb.png
bannerAlt: "Banner for the Call Analytics Tool: a phone with bar charts, with the numbers under 15 seconds, 98% less time, and 3-layer phone matching."
results:
  - value: "<15 s"
    label: "per dataset, down from about 60 minutes"
  - value: "98%"
    label: "less time spent per run"
  - value: "3-layer"
    label: "phone matching: full number, last 8, last 7 digits"
evolution:
  - stage: "Before"
    title: "Manual cleanup and matching"
    detail: "About 60 minutes of preparation per run"
  - stage: "Version 1"
    title: "Call conversion tool"
    detail: "Four steps from raw logs to a conversion report"
  - stage: "Now"
    title: "Call analytics in the suite"
    detail: "Monthly CRM call imports and a weekly operations report"
facts:
  - label: "Role"
    value: "Built it (day job)"
  - label: "Type"
    value: "Desktop app"
  - label: "Inputs"
    value: "Phone system call logs and CRM exports"
tools:
  - "Python"
  - "pandas"
  - "PySide6"
  - "openpyxl"
---

## The problem

I regularly had to match call logs from our phone systems against CRM lead data to see which calls actually led somewhere. The matching itself sounds simple. The preparation wasn't.

The call logs took around 30 minutes to prepare: formats varied between exports, columns had to be aligned, and phone numbers needed cleaning by hand. The CRM export added another 20 to 30 minutes, because a contact's numbers could be spread across several fields. That's close to an hour before any analysis could start, every single time.

So instead of getting faster at the cleanup, I removed it.

## Clean data in, clean matches out

**Format detection.** Different phone system exports follow different structures, so the tool identifies each format from its column patterns and routes it through the right processing. Dates, durations, and call directions all come out in one standard shape.

**Phone normalization.** Numbers arrive with spaces, symbols, and country codes, which caused constant mismatches. A cleaning step strips everything except digits before any matching begins.

**Every number per contact.** On the CRM side, a contact's number could sit in a mobile, direct line, or general phone field. Instead of picking one and hoping, the tool collects every number per contact into one normalized list.

## Matching that tolerates real data

Exact matching alone misses too much, so matching runs in layers: the full number first, then the last 8 digits, then the last 7. That catches numbers stored with and without country or area codes while keeping the process controlled.

Simple business rules keep the metrics honest. Not every call counts: the tool only uses eligible calls based on call direction and a minimum connection time, so the numbers reflect real conversations instead of raw volume.

## Four steps

The interface reduces the whole job to four steps: import call logs, import CRM data, run, and export. Behind that, the tool calculates total calls, unique contacts, converted calls, effectiveness rate, and coverage rate, with no manual formulas.

## From one report to the suite's call tool

In the tool suite, this grew into a broader call analytics tool. Besides the conversion metrics, it now prepares the **monthly call-log imports** for the CRM and builds a **weekly operations report** workbook, which replaced two separate older automations.

## Results

- About **60 minutes** of preparation per dataset became **under 15 seconds** from import to export, a roughly **98%** reduction.
- Results are consistent from run to run, with no manual cleanup and no avoidable matching errors.

## What I learned

**Most of the work is preparation.** The matching logic was the easy part. The real gains came from normalizing formats and phone numbers before matching ever started.

**Define what counts before you count it.** Filtering for eligible calls made the metrics something the team could trust and act on.
