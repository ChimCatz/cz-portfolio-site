---
title: "VoIP Call Tracking Dashboard: Two Phone Systems, One Hourly Feed"
slug: voip-call-tracking-dashboard
order: 1
featured: true
category: dashboard
kicker: "Apps Script and Google Sheets"
summary: "Calls lived in two VoIP systems with two report formats. I connected both to one Google Sheets workbook through their APIs, so call activity sits in one place and refreshes itself every hour."
thumb: ./thumb.png
flow:
  - "VoIP provider APIs"
  - "Google Apps Script"
  - "Google Sheets"
dashboards:
  - label: "VoIP Call Tracking Dashboard"
    src: "VoIP_Call_Tracking_Tool/VoIP_Call_Tracking_Dashboard.html"
    fluid: true
results:
  - value: "2"
    label: "VoIP providers merged into one 19-column schema"
  - value: "Hourly"
    label: "automatic refresh through the providers' APIs"
  - value: "12"
    label: "call KPIs driven by six filters"
evolution:
  - stage: "Before"
    title: "Two systems, two reports"
    detail: "Each provider had its own export and its own format"
  - stage: "Step 1"
    title: "History loaded once"
    detail: "Older calls imported from CSV and checked against expected counts"
  - stage: "Now"
    title: "Hourly API refresh"
    detail: "New calls are appended automatically and duplicates are skipped"
facts:
  - label: "Role"
    value: "Built it"
  - label: "Type"
    value: "Google Sheets workbook with Apps Script"
  - label: "On this page"
    value: "Web replica with about 150,000 sample call records"
tools:
  - "Google Apps Script"
  - "Google Sheets"
  - "REST APIs"
  - "JavaScript"
note: "The dashboard above is a web replica of the workbook. Provider names are generalized, agent names are fictional, and phone numbers are masked. Call counts, times, and durations are presented as sample data."
---

## The problem

Calls were tracked in two separate VoIP systems, each with its own report format. Looking at call activity as a whole meant exporting from each system and working with two files that didn't line up.

I wanted one place where every call from both systems landed in the same shape and stayed current without anyone exporting anything.

## One schema for two providers

Google Apps Script signs in to each provider's API and pages through the call records for a time window. The two APIs return different fields, so the script converts both into a single 19-column schema: provider, direction, outcome, agent, caller, callee, and the call, ringing, connected, and talk durations in seconds.

Agent names differ between the two systems as well. An agent mapping sheet ties each provider's names to one display name, so a person's calls are counted together.

## A refresh that looks after itself

**Hourly trigger.** A time-driven trigger runs the refresh even when nobody has the sheet open. A menu item turns it on or off.

**Overlap window.** Each run re-reads from one day before the latest stored call and stops five minutes before "now", so late-arriving and still-in-progress calls are picked up on a later run.

**No double counting.** Every call gets a record key made of the provider and its call ID. Keys already in the sheet are skipped, so overlapping windows never count a call twice.

**Locking and logging.** A script lock stops a manual refresh and a scheduled one from running at the same time. Every run writes the range it requested and the records it fetched, added, and skipped to a refresh log, including failed runs and the provider's error message.

**Credentials.** API keys and logins live in Script Properties, not in the code or the sheet.

## The dashboard

Sheet formulas (COUNTIFS and SUMIFS) turn the records into twelve KPIs such as total calls, connection rate, total talk time, and average calls per day. Six filters drive them: start date, end date, provider, agent, direction, and outcome. A second sheet lists every record behind the numbers.

## Try it

The page above is a web replica of the workbook, with the same sheets and the same KPI criteria, recalculated in your browser. Change a filter and every KPI updates.

- **Filter Details** lists every call that matches the filters and exports them as CSV.
- **Agent Mapping** shows how each provider's agent names map to one display name.
- **Refresh Log** shows each import and hourly API run, including the failed ones.
- **How it works** has the pipeline and two short excerpts from the script.
