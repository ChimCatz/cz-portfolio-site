---
title: "Database Management Dashboard: A Weekly Health Check for the CRM"
slug: database-management-dashboard
order: 4
featured: true
category: dashboard
status: shipped
badges:
  - label: "refresh"
    value: "weekly"
    tone: blue
  - label: "platform"
    value: "Zoho Analytics"
    tone: purple
  - label: "data"
    value: "sample"
kicker: "Zoho Analytics dashboard"
summary: "A Zoho Analytics dashboard that shows on one screen how complete and how usable a contact database is: what's missing, who can't be reached, and where the records came from."
thumb: ./thumb.png
flow:
  - "Zoho CRM"
  - "Zoho Analytics"
dashboards:
  - label: "Database Management Dashboard"
    src: "Database_Management_Dashboard/Database_Management_Dashboard.html"
    height: 2494
results:
  - value: "Weekly"
    label: "refresh, read at a monthly level"
  - value: "6"
    label: "data-gap counters, from missing email to unreachable contacts"
  - value: "8"
    label: "breakdown charts, from country to email verification"
facts:
  - label: "Role"
    value: "Built and maintained it"
  - label: "Type"
    value: "Zoho Analytics dashboard"
  - label: "Updated"
    value: "Weekly"
tools:
  - "Zoho Analytics"
  - "Zoho CRM"
note: "The dashboard above keeps its real layout and shows sample data. Company, client, and vendor names are replaced with sample names."
---

## The question it answers

A CRM is only as useful as the records in it. This dashboard is a weekly check on that: how many records are missing the fields that matter most, how many contacts can't be reached, and what the database is made of.

## What's on it

**Health check tiles.** Counts of records with no email, no phone contact, no designation or title, no company, and no job level, plus the number of unreachable contacts. Next to them, a gauge sums the state of the database up as one score.

**Size and growth.** The total record count, and the new records added this month against last month.

**Breakdowns.** Eight charts split the database by country (top 10), lead category stage, active and inactive contacts, key lead statuses, lead type, where the contacts originated, job level, and email verification status.

## How the data gets there

CRM records sync into Zoho Analytics, where the tiles and charts are built. The dashboard is updated weekly and presents its insights at a monthly level, so the tiles answer "where are we this month" instead of reacting to every single edit.

## Built to be read without me

Every chart carries a one-line caption that says what it shows, so the dashboard explains itself to someone opening it for the first time.

One caption matters more than the rest. The lead category chart looks like a funnel, but its values are separate records at each stage, not one group of leads moving down. The caption says so, which keeps the chart from being read as a conversion rate.
