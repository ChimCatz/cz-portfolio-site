---
title: "Globe Trivia: Spin the Planet, Click a Country, Get Its Tech Facts"
slug: globe-trivia
order: 20
category: fun
status: shipped
built: "Oct 2026"
badges:
  - label: "code"
    value: "written by AI"
    tone: "amber"
  - label: "facts"
    value: "853 sourced"
    tone: "purple"
  - label: "stack"
    value: "HTML · CSS · JS"
repo: "https://github.com/ChimCatz/globe-jss-with-data"
live:
  url: "https://chimcatz.github.io/globe-jss-with-data/"
  label: "Globe Trivia"
kicker: "Side project · AI-built"
summary: "A cartoon 3D globe with 853 sourced tech and data facts for 245 countries and territories. I planned it and wrote the prompts: Claude's deep research found and sourced the facts, and Claude Code wrote all of the code. A fun side project to see how far prompting can go, not a showcase of my coding."
thumb: ./thumb.png
thumbAlt: "Screenshot of Globe Trivia: a cartoon globe on a starry background, with a country search box, a Surprise me button and the count of sourced facts."
results:
  - value: "853"
    label: "facts, each linked to its source"
  - value: "245"
    label: "countries and territories, Antarctica included"
  - value: "185"
    label: "sources cited, from the ITU to company filings"
evolution:
  - stage: "Step 1"
    title: "Research the facts"
    detail: "Claude's deep research builds a dataset of sourced facts for 241 places"
  - stage: "Step 2"
    title: "Build the globe"
    detail: "Claude Code turns the dataset into a globe with a card for every fact"
  - stage: "Step 3"
    title: "Fill the gaps"
    detail: "A second research round for small territories, Antarctica and big tech nations"
  - stage: "Oct 2026 · live"
    title: "Faster, then online"
    detail: "Smoother rendering, then published on its own GitHub Pages site"
facts:
  - label: "My part"
    value: "The plan and the prompts"
  - label: "Facts researched by"
    value: "Claude, deep research"
  - label: "Code written by"
    value: "Claude Code, in VS Code"
  - label: "Facts span"
    value: "1869 to 2026"
  - label: "Runs on"
    value: "Its own GitHub Pages site"
tools:
  - "Claude (deep research)"
  - "Claude Code"
  - "VS Code"
  - "GitHub Pages"
note: "This is a side project for fun and for learning. I planned it and wrote the prompts; Claude researched the facts and Claude Code wrote every line of code, so it is not a showcase of my programming. Each fact carries its year and a link to its source, and newer figures may exist."
---

## Why I made it

I wanted to know how far planning and prompting alone could take a project. I didn't want a to-do app. I wanted something with real data in it, data I would have to trust and check.

So the brief was simple to say and hard to do: a globe you can spin, where clicking any country shows facts about its tech and data, and every fact has a source.

## Step 1: Research the facts

The facts came first. I used Claude's deep research to collect tech and data facts for every country and territory: internet use, e-government rankings, mobile data prices, broadband speeds, crypto adoption, cybersecurity, space, and tech history.

The output was a dataset, not a list of fun facts. Every row has a country, a fact, a source type, and a short source key. A separate table maps each key to the link it stands for. The source type matters: an international body, a news report and a company's own marketing are not equally reliable, and the globe shows which one each fact comes from.

A second research round filled the gaps. It covered small territories that had only one or two facts, added Antarctica, and gave the big tech nations more history: first cables, first satellites, first domains.

## Step 2: Let Claude Code build it

With the data ready, Claude Code wrote the globe in plain HTML, CSS and JavaScript, with no framework and no build step. Small Python scripts turn the research files into the data the page reads.

Click a country and the globe flies into a map of it. Each fact becomes a card with its headline number, a small chart for that kind of figure, the year, the source type and a link to the source.

![The Japan view: fact bubbles around the map, joined to fact cards in the side panel, each with its figure, year and source](./country.png "Japan's six facts: bubbles on the map, and a card for each fact with its figure, year, source type and link.")

## What I did, and what the AI did

My part was the plan and the prompts: what the globe should do, what each fact needed to include, what to research next, and what to change after each try. Claude did the research, and Claude Code wrote every line of code.

## What it taught me about data

The globe is the fun part. What I learned was mostly about data:

- **A fact is only as good as its source.** A script checks every fact's source key, its highlighted phrase and its link. Some publishers block automated checks, so those links still have to be opened by hand.
- **Names never match across datasets.** The research and the country list spell some places differently, so a short list of aliases connects them.
- **Fail loudly, don't guess.** When a new fact doesn't fit any rule, the build stops with an error instead of making up a card for it.
- **Dates belong next to the numbers.** Most figures are from 2020 to 2026 and will go out of date, so each card shows its year.

## Data and credits

Each fact links to its original source. Country shapes come from Natural Earth (public domain), country profiles from the mledoze/countries project (ODbL), and population figures from World Bank Open Data (CC BY 4.0). Flags come from flagcdn.com. The full list and the code are in the repo.
