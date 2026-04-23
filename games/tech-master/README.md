# Who Wants to Be a Tech Master?

## Purpose
This feature is a planned quiz-style mini-game that will live inside the same CZ Portfolio Site project. It is meant to become part of the homepage Challenges experience while remaining a standalone static page under `games/tech-master/`.

## Current Status
- UI prototype files now exist for visual testing
- Gameplay logic is still partial
- Current purpose is visual and interaction testing only
- No score system yet
- No leaderboard yet

## Game Concept Overview
- The player answers `30` questions in sequence.
- Questions increase in difficulty as the run progresses.
- A wrong answer resets the player back to the start.
- The player earns a higher rank every `5` correct answers.
- The overall tone should feel game-like, but still aligned with the portfolio's visual style.

## Final Rank System
- `1-5` -> `Intern` -> `Learning the basics`
- `6-10` -> `Junior Developer` -> `Writing your first real code`
- `11-15` -> `Software Engineer` -> `Building working systems`
- `16-20` -> `Senior Engineer` -> `Solving complex problems`
- `21-25` -> `Tech Lead` -> `Leading technical direction`
- `26-30` -> `Chief Technology Officer` -> `Owning the entire system`

## Difficulty Breakdown
- `Q1-Q10` -> Easy
- `Q11-Q20` -> Medium
- `Q21-Q30` -> Hard

## Reset-on-Fail Rule
- If the player gets a question wrong, the run resets back to Level 1 / Intern.

## Future File Expectations
- `index.html`
- `style.css`
- `script.js`
- `sample-questions.js`
- future full dataset file can replace the sample questions later

## Roadmap
- Phase 1 -> Concept + Structure
- Phase 2 -> UI Prototype (current)
- Phase 3 -> Question Flow Logic
- Phase 4 -> Scoring + Restart System
- Phase 5 -> Homepage Integration
