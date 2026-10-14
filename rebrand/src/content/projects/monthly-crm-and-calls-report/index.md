---
title: "Monthly CRM and Calls Report: Activity and Outcomes, Month Over Month"
slug: monthly-crm-and-calls-report
order: 11
category: dashboard
status: shipped
badges:
  - label: "refresh"
    value: "monthly"
    tone: blue
  - label: "platform"
    value: "Zoho Analytics"
    tone: purple
  - label: "data"
    value: "sample"
kicker: "Zoho Analytics report"
summary: "A monthly report that puts CRM activity and call performance from two VoIP systems on one page, with every headline number shown against the month before."
thumb: ./thumb.png
flow:
  - "CRM and VoIP call logs"
  - "Zoho Analytics"
dashboards:
  - label: "Monthly CRM and Calls Analytics Report"
    src: "Monthly_CRM_and_Calls_Analytics_Report/Monthly_CRM_and_Calls_Analytics_Report.html"
    height: 1478
results:
  - value: "2"
    label: "parts on one page: CRM activity and call performance"
  - value: "12"
    label: "months of history in each trend chart"
  - value: "Monthly"
    label: "every headline number set against the month before"
facts:
  - label: "Role"
    value: "Built and maintained it"
  - label: "Type"
    value: "Zoho Analytics report"
  - label: "Sources"
    value: "CRM activity and two VoIP call logs"
tools:
  - "Zoho Analytics"
note: "The report above keeps its real layout and shows sample data. Tool and provider names are generalized."
---

## Two halves of the same month

CRM activity and call activity describe the same work from two sides: what was done in the CRM, and what happened on the phones. This report blends CRM activity with call data from two VoIP systems, so both sides sit on one page for the same month.

## CRM overview

**The month in four numbers.** CRM records modified, total leads, number of agents, and working days, each against last month.

**Lead outcomes.** Ten small tiles count what happened to the records: call backs, answering machines, unreachable contacts, do-not-call requests, records pending for QA, email and phone confirmations, rejected leads, not qualified or interested, and accepted or validated.

**Trend.** CRM records touched against total leads for the last 12 months.

## Call performance

**Volume and results.** Dials, connected calls, converted calls, and the overall conversion rate.

**Efficiency.** Dials per agent per day, call-to-connect rate, average connected duration, and call time efficiency.

**Trend.** Dials from each VoIP system against converted calls for the last 12 months.

## Context built in

Each tile shows last month's value and an arrow for the direction, so nobody has to open the previous report to know whether a number is good.

The agent count and the number of working days sit at the top for the same reason. A drop in dials reads differently in a shorter month or with fewer agents, and the report puts that context next to the numbers it explains.
