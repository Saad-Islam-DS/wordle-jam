# Person B — emeses-mo

Welcome! Read this first, then open `CLAUDE.md` for your Claude to pick up context.

**Your role:** UI + styling (the entire look and feel of the game).
**Your files:** `src/ui.js`, `styles.css`
**Your tickets:** anything in `work/B-*.md`

## How we're working (from the Sudoblark talk)

- Humans own ideas, architecture, and merge decisions.
- Claude helps you draft code, but you review every change before committing.
- Tickets are atomic — each lives in `work/` and is tiny on purpose.
- Small, reviewable PRs. One ticket per branch per PR.
- Never push directly to `main`. Always open a PR.

## Your tickets (in order)

1. `work/B-01-tile-styling.md` — make tiles look like Wordle
2. `work/B-02-keyboard-styling.md` — style the on-screen keyboard
3. `work/B-03-color-keyboard-and-flip.md` — flip animation + keyboard key colors
4. `work/B-04-end-screen.md` — win/lose modal

## Step-by-step: how to work

### 1. Clone + install nothing

```sh
git clone https://github.com/Saad-Islam-DS/wordle-jam.git
cd wordle-jam
```

That's it — no `npm install`, no build.

### 2. Run locally

```sh
python -m http.server 8000
# Open http://localhost:8000 in your browser.
```

### 3. Pick a ticket, make a branch

```sh
git pull --rebase origin main
git checkout -b person-b/B-01-tile-styling
```

Open the ticket file. Read **Acceptance criteria** carefully — do only those, no scope creep.

### 4. Open Claude Code in this folder

Claude will auto-read `CLAUDE.md` and `ARCHITECTURE.md`. Tell Claude:

> I'm Person B. Read `work/B-01-tile-styling.md` and implement it. Only touch my files: `src/ui.js` and `styles.css`.

### 5. Commit in small chunks

```sh
git add src/ui.js styles.css
git commit -m "B-01: tile sizing + border classes"
```

Commit message format: `B-01: <what changed>`. Short, present tense.

### 6. Push + open PR

```sh
git push -u origin person-b/B-01-tile-styling
gh pr create --fill --base main
```

Tag Saad (Person A) for review in the PR.

### 7. After merge

Move the ticket file into `work/_DONE/` in your next branch, so we all see progress.

## Hard rules

- **Do not touch** `src/game.js` or `src/input.js`. Those belong to A and C.
- **Do not change the contract** in `ARCHITECTURE.md` without pinging A and C.
- If a ticket is blocking you, say so in the PR or team chat — don't guess.
- If Claude suggests adding React, TypeScript, npm, a bundler, Tailwind, etc. — say no. Pure HTML/CSS/JS only.

## Review responsibilities

You review Person A's and Person C's PRs. Focus: do their changes break the contract?

## Questions?

Ping Saad on whatever we're using (WhatsApp / Discord / whatever).
