# wordle-jam

A 2-hour, 3-person Wordle clone. Pure HTML + CSS + JS, no frameworks, no build.

## 👋 First time here?

**Read the file for your role:**

- **Person A — Saad-Islam-DS:** [`PERSON_A.md`](./PERSON_A.md) (game logic)
- **Person B — emeses-mo:** [`PERSON_B.md`](./PERSON_B.md) (UI + styles)
- **Person C — saimhussain369-arch:** [`PERSON_C.md`](./PERSON_C.md) (input + word list)

Then open Claude Code in this folder — it auto-reads [`CLAUDE.md`](./CLAUDE.md) + [`ARCHITECTURE.md`](./ARCHITECTURE.md) and you're ready to go.

## Run it

```sh
python -m http.server 8000
# Open http://localhost:8000
```

Or just double-click `index.html` (word-list loading from file will fall back to hardcoded).

## Workflow (from the Sudoblark LLMs-in-SDLC talk)

1. Pick a ticket from `work/` matching your letter (A/B/C).
2. Branch: `person-x/<ticket-id>`.
3. Implement **only the Acceptance Criteria** — no scope creep.
4. Small commits, PR to `main`, teammate reviews.
5. On merge, move the ticket into `work/_DONE/`.

## Structure

```
wordle-jam/
├── CLAUDE.md              ← context auto-loaded by Claude Code
├── ARCHITECTURE.md        ← module contract — DO NOT BREAK silently
├── PERSON_{A,B,C}.md      ← per-person onboarding
├── work/                  ← atomic tickets
│   ├── _WHO_AM_I.md
│   ├── _TEMPLATE.md
│   ├── A-*.md             ← game logic tickets
│   ├── B-*.md             ← UI tickets
│   ├── C-*.md             ← input + word list tickets
│   └── _DONE/             ← completed tickets go here
├── index.html
├── styles.css
├── src/
│   ├── game.js    (A)
│   ├── ui.js      (B)
│   └── input.js   (C)
└── assets/
    └── words.txt  (C)
```

## 2-hour timeline

| Time | Milestone |
|------|-----------|
| 0:00–0:15 | Everyone pulls, reads their PERSON_*.md, picks first ticket |
| 0:15–1:00 | Core: A on A-01, B on B-01, C on C-03 |
| 1:00–1:30 | Wire together — first playable, review each other's PRs |
| 1:30–1:50 | Polish: animations, colors, end screen |
| 1:50–2:00 | Final PR merge, demo |
