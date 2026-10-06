---
title: "Analysis of Factors Influencing Lead Conversion: What Actually Predicts a Sale"
slug: lead-conversion-factors-study
date: 2026-09-16
summary: "A logistic-regression look at what actually predicts B2B lead conversion (data completeness, record age, seniority, and contactability) using a simulated CRM dataset built to reflect the same patterns."
banner: ./banner.png
bannerAlt: "Header visual for the Analysis of Factors Influencing Lead Conversion study."
facts:
  - label: "Dataset"
    value: "Simulated CRM and call-log records"
  - label: "Records"
    value: "~61,721 simulated records"
  - label: "Method"
    value: "Logistic regression"
  - label: "Focus"
    value: "Lead conversion drivers"
tools:
  - "Python"
  - "Claude Code"
  - "Gemini"
  - "ChatGPT"
dataset: ./simulated-lead-conversion-dataset.csv
note: "The slides below were originally put together to think through this question. To share it here without exposing any real records, I built a simulated dataset in Python that reproduces the same patterns and headline figures. It is not a literal copy of any real dataset."
copyright: "This study, its simulated dataset, and its analysis are my own original work, created for portfolio and demonstration purposes. The accompanying slides were built independently and do not contain or reference any real company records, tools, or confidential information."
---

## Introduction

Most conversations about lead conversion focus on targeting: the right country, the right industry, the right job title. This study asks a simpler question first — does the structure of the data and the way leads are worked matter more than who they are?

Using a simulated dataset of roughly **61,721 lead records**, built to reflect real CRM and call-log patterns, I ran logistic regression and conversion-rate comparisons across four angles: data completeness, record age, seniority and geography, and contactability.

## Methodology

Each factor was tested as its own logistic regression model, with conversion (yes/no) as the dependent variable. Some tests use the full dataset; others use a smaller cohort worked over a defined outreach window, matching how the original analysis was scoped.

> **Study snapshot:** logistic regression modeling, conversion-rate comparison across segments, time-window analysis (30/90/180/365 days), and call-level contactability comparisons.

## Data Completeness Is a Strong Predictor on Its Own

Each lead carries a "database score," a proxy for how complete and verified its record is. Logistic regression against this score returns a coefficient of **0.4065** and an odds ratio of roughly **1.50** — each one-point increase in score is associated with about 50% higher odds of conversion.

The bucketed view makes the effect easier to see. The 70–74 range is the single largest band at **27,930 records**, yet converts at only **0.91%**. Records scoring 80 and above make up about **16% of total leads** but generate roughly **85% of all conversions**, climbing from **27%** at 80–84 to over **97%** at 90 and above.

![Table and funnel chart showing conversion rate by database score bucket, from below 75 up to 100+.](./slide-06.png "Conversion rate climbs sharply once a lead's data-completeness score passes 80, while the largest volume band (70–74) converts at under 1%.")

That's a volume-versus-value problem: a large share of the database is low-probability, incomplete records. Improving verification at the point of entry looks like it would do more for conversion than adding raw volume to the bottom of the funnel.

## Record Age Drives Short-Term Speed, Not Long-Term Ceiling

The second question was whether a fresher record converts faster, or simply converts more. I measured how many conversions landed within 30, 90, 180, and 365 days of the record being created.

![Dashboard showing conversion counts and rates within 30, 90, 180, and 365 day windows since record creation.](./slide-10.png "Conversion rate rises steadily the longer a record has been in the system: 3.19% within 30 days, up to 4.21% within a year.")

About **31%** of total conversions happen within the first 30 days, and **41%** within the first year — meaning most conversions still land after a record's first year. Fresh records drive short-term velocity, but older records keep converting well past that point.

## Seniority Matters Far More Than Geography

Next, I tested whether country or job level had a meaningful effect on conversion probability, using a multivariate logistic regression with the largest market and the Manager job level as the baseline (about **5.6%** probability of conversion).

![Table showing country and job level regression coefficients relative to the baseline market and Manager job level.](./slide-14.png "Country coefficients stayed small (-0.19 to +0.08), while job-level coefficients swung much wider, from -0.89 for Director-level leads to +1.05 for Vice President-level leads.")

Country barely moved the needle, with coefficients ranging only from **-0.19 to +0.08**. Job level told a different story: **Vice President** and **Executive** leads converted at roughly **2.7–2.85× higher odds** than a Manager, while **Director** and **C-Level** leads converted at **54–59% lower odds** — a role-fit problem, not a targeting or geography one.

## Whether a Lead Was Ever Actually Reached Was the Biggest Driver of All

The last angle looked at contactability: whether a lead ever had a genuinely connected call, versus never being reached. This was measured independently across two separate outbound calling channels, referred to here as **Channel A** and **Channel B**.

![Chart comparing conversion rate for leads with no connected call versus leads with at least one connected call.](./slide-19.png "Leads reached by at least one connected call converted at roughly 3× the rate of leads that were never reached — a pattern that held across both calling channels measured.")

On both channels, a connected call lifted conversion roughly **3×**: **8.49%** vs **2.95%** on Channel A, **9.3%** vs **3.4%** on Channel B. Yet **69%** of Channel A leads and **53%** of Channel B leads had no connected call at all. This is an association, not proof of causation, but the consistency of the gap across two independent channels is hard to dismiss as noise.

> **Key read:** low conversion rates here were not primarily a targeting or geography problem. A large share of leads simply never reached meaningful engagement in the first place.

## Executive Summary

Put together, the four factors don't carry equal weight. Conversion was driven primarily by whether meaningful contact was established, supported by how complete the underlying data was. Country and record age mattered less by comparison.

![Executive summary slide listing three strategic focus areas: improve contactability, maintain high data quality, and balance fresh inflow with long-term nurturing.](./slide-31.png "The three strategic focus areas that came out of this analysis: improve contactability, maintain high data quality, and balance new-record inflow with long-term nurturing.")

## View the Original Presentation Slides

Below is a curated set of the original slides used to work through this analysis (view only — click any slide to open it larger).

![Slide 1](./slide-01.png) ![Slide 2](./slide-04.png) ![Slide 3](./slide-05.png) ![Slide 4](./slide-06.png) ![Slide 5](./slide-07.png) ![Slide 6](./slide-09.png) ![Slide 7](./slide-10.png) ![Slide 8](./slide-11.png) ![Slide 9](./slide-13.png) ![Slide 10](./slide-14.png) ![Slide 11](./slide-15.png) ![Slide 12](./slide-18.png) ![Slide 13](./slide-19.png) ![Slide 14](./slide-20.png) ![Slide 15](./slide-27.png) ![Slide 16](./slide-28.png) ![Slide 17](./slide-29.png) ![Slide 18](./slide-31.png)

## Key Takeaways

- **Data completeness is one of the strongest levers.** Leads scoring 80+ made up 16% of leads but generated 85% of conversions.
- **Record age affects speed, not ceiling.** Most conversions still land more than a year after the record was created.
- **Geography barely matters once you control for role.** Country coefficients ranged only from -0.19 to +0.08.
- **Seniority has a strong, non-linear effect.** VP-level leads converted at ~2.8x the odds of Managers; Directors and C-Level leads converted worse than Managers.
- **Contactability was the single biggest driver.** A connected call lifted conversion roughly 3x across two independent channels, yet over half of leads were never successfully reached.

## Tools Used

- **Python** — data analysis
- **Visual Studio Code + Claude Code** — for AI-assisted analysis
- **Gemini + ChatGPT** — for the data visualizations
- **GitHub** — for deployment
