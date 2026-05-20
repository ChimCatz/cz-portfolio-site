# Data Studies Page Guide

Use this folder as the home for every future Data Study.

## Recommended Folder Pattern

Create one folder per study:

- `data-studies/<slug>/`

Inside that folder, keep:

- the HTML page
- all charts
- header image
- dataset files
- any extra study-specific assets

Example:

- `data-studies/netflix-genre-performance-study/`
- `data-studies/netflix-genre-performance-study/netflix-genre-performance-study.html`
- `data-studies/netflix-genre-performance-study/header-image.png`
- `data-studies/netflix-genre-performance-study/chart-1.png`
- `data-studies/netflix-genre-performance-study/dataset.csv`

## Page Structure

Follow this order for most Data Studies:

1. Back link
2. `<h1>`
3. Header image
4. Header image caption if needed
5. Short subtitle / summary paragraph
6. Metadata row
7. Dataset note or methodology note
8. Dataset link
9. Main content sections
10. Charts / tables placed between paragraphs where they support the point
11. Key takeaways
12. Sources

## Content Layout Guide

### 1. Title

Use one clear title inside `<h1>`.

Example pattern:

- `"Study Title: Main Insight"`

Keep it descriptive and specific.

### 2. Header Image

Place the main header image directly under the title.

Use:

- one strong summary visual
- leaderboard-style image
- cover chart
- collage if needed

Current shared styling already makes this image responsive.

### 3. Header Image Caption

Optional.

Only add a caption if the image needs context.

Good use cases:

- explaining what the visual compares
- clarifying the timeframe
- explaining if it is a dashboard snapshot

### 4. Subtitle

Use 1 short paragraph under the header image.

Purpose:

- explain what the study is about
- explain what metrics were compared
- explain the main scope

### 5. Metadata Row

Use short tags such as:

- `Dataset: ...`
- `Tools: ...`
- `Focus: ...`
- `Records: ...`
- `Output: ...`

Keep these short and scan-friendly.

### 6. Dataset Note

Use a small note paragraph when the dataset needs explanation.

Good examples:

- data cleaning note
- multi-genre expansion note
- timeframe note
- row-count clarification

### 7. Dataset Link

If you include the dataset in the study folder, use a clear reference style.

Recommended wording:

- `Dataset: "filename.csv"`

Avoid sales-like wording such as “Download now”.

### 8. Section Pattern

For each main section:

- `<h2>`
- 2 to 4 paragraphs
- optional highlight block
- optional chart or table

Keep the flow narrative, not dashboard-like.

### 9. Charts and Images

Use charts only where they directly support the paragraph above or below them.

Recommended pattern:

- paragraph
- chart
- short caption
- next paragraph

Use compact figures for smaller charts when they should not dominate the section.

### 10. Highlight Blocks

Use highlight blocks only for important snapshots:

- key statistic summary
- methodology summary
- strong insight callout

Do not overuse them.

### 11. Key Takeaways

Use a short bullet list near the end.

Best for:

- final findings
- business implications
- practical conclusions

### 12. Sources

Always end with a sources section when external references were used.

Recommended content:

- dataset source
- article references
- supporting context links

## Writing Style

Keep the writing:

- direct
- analytical
- practical
- not too academic
- not too sales-like

The current site style works best when the study reads like a clean editorial analysis.

## Visual Rules

For Data Studies pages:

- no carousel
- no large dashboard shell
- no heavy boxed section backgrounds
- transparent section wrappers
- figures and highlight blocks provide the emphasis
- keep the floating up-arrow button

## Before Publishing a New Study

Check these:

1. Title is final and specific
2. Images are in the same study folder
3. Dataset link works
4. Light mode and dark mode both look correct
5. Charts are not oversized on mobile
6. Sidebar does not cover content
7. Homepage Data Studies link points to the correct file
