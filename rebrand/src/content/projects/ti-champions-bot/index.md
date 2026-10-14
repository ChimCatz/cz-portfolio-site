---
title: "TI Champions Bot: Fixing Dota\u00A02 Bots One Match Log at a Time"
slug: ti-champions-bot
order: 6
category: other
status: ongoing
version: "0.7.9"
built: "Oct 2026"
badges:
  - label: "language"
    value: "Lua"
  - label: "base"
    value: "Open Hyper AI"
repo: "https://github.com/ChimCatz/TI_Champions_Bot"
kicker: "Dota 2 bot script"
summary: "A customized Dota 2 bot script in Lua, built on the open-source Open Hyper AI. I play a local match against the bots, read the console log, find the root cause of what went wrong, and ship the fix as the next version."
banner: ./banner.webp
thumb: ./banner.webp
bannerAlt: "Illustrated banner: an armored robot raising a shield in a tournament arena, above the words Dota 2 Workshop Script, TI Champions Bot."
results:
  - value: "16"
    label: "versions logged in the changelog, 0.6.4 to 0.7.9"
  - value: "127"
    label: "heroes scored for each of the five positions in the draft"
  - value: "200"
    label: "bad buy-list entries removed by one static audit"
evolution:
  - stage: "0.6.4 · Aug 2026"
    title: "Baseline"
    detail: "A compile crash was silently breaking rune logic for every bot"
  - stage: "0.7.0"
    title: "Positions recorded once"
    detail: "Ended heroes drafted for one role and played as another"
  - stage: "0.7.6"
    title: "Static audit"
    detail: "200 placeholder tokens stripped from 83 buy-list files"
  - stage: "0.7.9 · now"
    title: "Draft variety and aggression"
    detail: "A wider hero pool, and bots that trade in a fair fight"
facts:
  - label: "Role"
    value: "Customize and maintain it"
  - label: "Built on"
    value: "Open Hyper AI (open source)"
  - label: "Language"
    value: "Lua, on Valve's bot scripting API"
  - label: "Runs in"
    value: "Local custom lobbies"
tools:
  - "Lua"
  - "Dota 2 bot scripting API"
  - "Git"
note: "TI Champions Bot is still in progress and is not a finished product. It is built on Open Hyper AI by forest0xia: the base architecture and the original hero files come from that project. This page describes version 0.7.9."
---

## The problem

Dota 2 lets a script decide everything a bot does: which hero it drafts, which lane it walks to, when it fights, and what it buys. Open Hyper AI is a community script that does all of that, and it is large: about 130 hero files on top of a shared library of roughly 300 functions.

In local lobbies it also did things no player would. A carry laned mid for a whole game. Supports drifted to the river and stayed there. Both teams walked into each other at Roshan. There is no debugger for any of this, only the console log the game writes during a match.

So I started treating each match as a data problem: collect the log, find the pattern, and trace it to the line that caused it.

## The method: play, log, root-cause

Every version starts with a match. I play or spectate a local lobby, save the console log, and work backwards from each odd behavior to its cause in the source. A fix goes in only when the cause is known, not when a guess makes the symptom go away.

The changelog records that reasoning for each version. Version 0.7.7, for example, is a batch of 15 fixes that all came from one spectated 5v5 match played by bots alone.

## Three bugs worth the hunt

**A hero drafted for one position and played as another.** A support was picked for position 4 and then treated as the carry everywhere else. The draft loop and the position lookup each asked the engine for the team's players, and the two calls could return them in a different order. Positions are now recorded once at pick time and never worked out again. A later bug with the same symptom had a different cause: one side's lane table was stored under one index and read under another, which sent its carry to the middle lane for an entire game.

**Buy lists that opened with an item that does not exist.** A static audit parsed every hero's purchase list and compared it against the table of real item names. It found 15 different placeholder tokens, left over from cosmetic names, appearing 200 times across 83 files. All of them were stripped in one version.

**A comeback system that overcorrected.** Bots that fall behind receive a gold and experience boost. The first design multiplied real earnings every second, and it was linked to heroes jumping about 12 levels in under 10 seconds. It was replaced by a flat grant every 60 seconds, scaled by each hero's own net-worth gap, with a hard cap per hero for the whole game.

## A draft that scores every hero

Picks are not a fixed list. The draft scores all 127 heroes for each of the five positions, factors in counter and synergy data, and then chooses at random from a weighted shortlist of the top five. It supports Captain's Mode, Random Draft, and 1v1 Mid.

Tuning it is its own source of bugs. In version 0.7.9, a cap meant to limit under-tuned heroes turned out to default to zero, which had quietly blocked about 18 heroes from ever being picked. Raising the cap to one per team and softening the penalty brought them back. Nine heroes stay banned on purpose, because the problems they have come from the game engine and not from the script.

## Logs that check themselves

Finding a lane bug the first time took several matches. To avoid paying that cost again, the script now writes short, tagged, rate-limited lines to the log, such as `[TICB-VALIDATE]` when a hero's lane does not match its position, and a heartbeat every 10 seconds. A regression shows up in the first log that contains it.

A small test harness also stubs the game's own functions, so the Lua source can be parsed and a few rules checked without starting the game.

## What is still open

- There are no automated in-game tests. Behavior is still verified by playing matches and reading the log by hand, which is the main limit of the whole workflow.
- Aggression is a balance, not a fix. Bots that retreat too early and bots that overextend are two ends of the same setting, and it has been tuned several times.
- Lane and position assignment has failed for at least three different reasons. The diagnostics now warn when it happens, but the engine behavior behind it is still a sharp edge.
- The comeback system has to be switched on by hand each match, because the game does not expose player data to bot scripts.

## What I learned

**The same symptom can have three causes.** Three "wrong lane" bugs looked identical in a match and came from three different places. Patching the symptom would have hidden two of them.

**Audit the data, not only the logic.** The buy-list problem was not a logic bug. It was bad values in a table, found by comparing two lists, which is the same check that catches bad values in any dataset.

**Make the system report on itself.** A log line written once keeps checking every match after it.

<p class="prose-footnote">Dota 2 and The International are trademarks of Valve Corporation. This is a fan project and is not affiliated with, sponsored by, or endorsed by Valve.</p>
