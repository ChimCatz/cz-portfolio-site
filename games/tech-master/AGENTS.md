# AGENTS.md

## Working Title
- `Who Wants to Be a Tech Master?`

## Feature Summary
- Quiz-style progression game
- Part of the same CZ Portfolio Site project
- Intended future location: `games/tech-master/`
- Planned as a simple static mini-game page

## Current Scope
- UI prototype now exists in:
  - `index.html`
  - `style.css`
  - `script.js`
  - `sample-questions.js`
- Gameplay logic is still partial and prototype-only
- No scoreboard yet
- No leaderboard yet
- No fail-reset system yet
- No persistent state yet

## Core Structure
- Total questions: `30`
- Sequential progression from question 1 to question 30
- Reset to start on wrong answer
- Rank changes every `5` correct answers

## Difficulty Tiers
- `Q1-Q10` -> Easy
- `Q11-Q20` -> Medium
- `Q21-Q30` -> Hard

## Final Rank System
- `1-5` -> `Intern` -> `Learning the basics`
- `6-10` -> `Junior Developer` -> `Writing your first real code`
- `11-15` -> `Software Engineer` -> `Building working systems`
- `16-20` -> `Senior Engineer` -> `Solving complex problems`
- `21-25` -> `Tech Lead` -> `Leading technical direction`
- `26-30` -> `Chief Technology Officer` -> `Owning the entire system`

## Planned Behavior
- Wrong answer sends the player back to Level 1 / Intern
- Rank-up moment every `5` questions
- Difficulty transition feedback at question `10` and question `20`
- Future homepage integration should happen through the Challenges section

## Prototype Notes
- Current prototype is for visual and interaction testing only
- The UI should fit within one screen on desktop and mobile
- The tracker always shows 30 levels
- Current sample dataset is intentionally small and only covers:
  - Easy preview
  - Medium preview
  - Hard preview
- The prototype may show simple correct / incorrect states and next-question flow
- The full reset-on-fail mechanic is still pending
- Full question pool is still pending

## Working Guidance
- Keep the first version clear and maintainable
- Favor simple static deployment
- Avoid overengineering the initial version
- Keep the prototype visually aligned with the portfolio's dark editorial style
- Keep implementation simple until the concept and UI/UX are finalized
