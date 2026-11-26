# Project context for Claude

You are helping a 3-person team ship a Wordle clone in 2 hours.

## Who you're working with

Open `work/_WHO_AM_I.md` — it lists which teammate owns which files. Ask the human which person they are, then only work on **their** tickets and **their** files. Do not touch files owned by another person without explicit instruction.

## Tech stack (fixed — do not change)

- Pure HTML + CSS + vanilla JS. No frameworks, no build step, no npm.
- Open `index.html` in a browser to run. For `fetch()` from `assets/`, serve with `python -m http.server 8000`.
- Browsers: modern Chromium / Firefox / Safari. No IE.

## Code conventions

- IIFE wrappers around each module (`(function(){ ... })();`). Expose public API as `window.Game`, `window.UI`, `window.Input`.
- Lowercase all words internally (answer + guesses).
- No comments explaining *what* — only *why* when non-obvious.
- No external dependencies. Pure JS only.
- 2-space indentation, single quotes, semicolons.

## Workflow (Sudoblark-style)

1. Pull latest `main`.
2. Open `work/` — find your next ticket (prefixed with your letter: A/B/C).
3. Create a branch: `person-X/<ticket-id>` (e.g. `person-a/A-02-score-guess`).
4. Read the ticket's Acceptance Criteria. Implement **only** those criteria. No scope creep.
5. Commit in small, reviewable chunks. Message format: `A-02: scoreGuess handles double letters`.
6. Push, open PR to `main`, ping a teammate for review.
7. On merge, move the ticket file into `work/_DONE/`.

## Data contract between modules

See `ARCHITECTURE.md`. **Do not change this contract without updating the doc AND telling both teammates.** Breaking the contract silently will destroy the integration.

## What NOT to do

- Do not add build tooling, bundlers, TypeScript, or frameworks.
- Do not rewrite another person's module.
- Do not touch `main` directly — always PR.
- Do not add `node_modules`, package.json, or any install step.
- Do not expand scope beyond the current ticket. Open a new ticket if you spot something.

## Running locally

```sh
# From repo root:
python -m http.server 8000
# Then open http://localhost:8000
```

## When stuck

Prefer asking the human over guessing at architecture. Breaking the contract hurts everyone.
