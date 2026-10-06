---
title: "CRM Reconciliation Tool: Syncing Updates Back Without Breaking the Master Data"
slug: crm-reconciliation-tool
order: 3
kicker: "Python desktop tool"
summary: "A tool that compares records updated by the calling team against the full master database and turns them into separate, ordered import files, so only safe, intended changes reach the main CRM."
banner: ./banner.png
thumb: ./thumb.png
bannerAlt: "Banner for the CRM Reconciliation Tool: two record streams merging into one, with the labels identity matching, ordered import files, and no blank overwrites."
results:
  - value: "1 run"
    label: "builds the whole import package"
  - value: "0"
    label: "existing values erased by blank fields"
  - value: "Ordered"
    label: "import files, one category at a time"
evolution:
  - stage: "Before"
    title: "Conversion plus manual checks"
    detail: "Each update reviewed and split by hand"
  - stage: "Version 1"
    title: "Reconciliation tool"
    detail: "Matching, duplicate handling, and rules in one run"
  - stage: "Now"
    title: "Shares the conversion engine"
    detail: "Both tools produce the exact same import format"
facts:
  - label: "Role"
    value: "Built it (day job)"
  - label: "Type"
    value: "Desktop app"
  - label: "Job"
    value: "Two-CRM data reconciliation"
tools:
  - "Python"
  - "pandas"
  - "PySide6"
  - "openpyxl"
---

## The problem

The calling team works in an operations CRM all day: updating statuses, logging activity, adding notes. The main CRM holds the cleaned master records. At some point, everything the team learned has to flow back into the master data.

That sounds like a simple export and import, but it's where data quietly breaks:

- A contact matched to the **wrong master record** overwrites someone else's data.
- The same person appears **several times** with slightly different details.
- An empty field in the update **erases a value** the master record already had.
- A contact who asked not to be contacted gets **added back** as a new record.

The reconciliation tool exists to make that sync safe by default.

## How it works

The tool takes four inputs:

1. The records the team updated.
2. A complete export of the master database.
3. A rules table that says how each lead status should be handled.
4. An optional suppression list of contacts who must never be imported.

It then runs every record through the same steps.

**Find the right master record.** Each updated record is matched by its record ID first, then by email. If the ID and the email point to two different master records, the row isn't guessed at. It's flagged as a conflict for review, with the record that uniquely owns the email suggested as the correct match.

**Consolidate duplicates.** Rows that resolve to the same person are merged into one, so the master record receives one update instead of several competing ones.

**Apply the rules table.** For each status, the table decides whether a record is skipped, gets a status-only update, or gets a full update. It's a spreadsheet, so the team can adjust the policy without touching any code.

**Block what must not be imported.** Anyone on the suppression list is set aside in a separate file instead of being imported.

## Safe by design

A few rules are built in rather than left to the person running the tool:

- **Blank never erases.** An empty activity field in the update never clears an existing value in the master record.
- **The CRM assigns new IDs.** Unmatched records go out without an ID, so the main CRM creates one, and they're marked for review before import.
- **Every category gets its own file.** The output is a numbered package: status updates first, then full updates, then new records and conflicts to review, and finally the excluded rows for reference. Each file can be imported, checked, and confirmed one at a time.

Before anything is written, the tool shows a summary of new records, conflicts, rows for manual review, skipped rows, and exclusions, so surprises show up in the counts, not in the CRM.

## Built on the conversion engine

Full updates need exactly the same format the [CRM Conversion Engine](/cz-portfolio-site/projects/crm-conversion-engine) produces, so instead of rebuilding that logic, this tool imports the engine's transformer and matcher directly. Two tools, one definition of what a correct import looks like.

## What I learned

**Make the safe path the default.** The most important features here are the ones that prevent a mistake, not the ones that save time.

**Split the work by risk.** Separate files for low-risk status updates and high-risk new records let the team move fast where it's safe and slow down only where it matters.

**When in doubt, flag instead of guessing.** A conflict that's surfaced for review costs a minute. A wrong merge in the master database can cost days.
