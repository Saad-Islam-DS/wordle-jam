# Person C — saimhussain369-arch

Welcome! Read this first, then open `CLAUDE.md` for your Claude to pick up context.

**Your role:** Input handling + word list curation.
**Your files:** `src/input.js`, `assets/words.txt`
**Your tickets:** anything in `work/C-*.md`

## How we're working (from the Sudoblark talk)

- Humans own ideas, architecture, and merge decisions.
- Claude helps you draft code, but you review every change before committing.
- Tickets are atomic — each lives in `work/` and is tiny on purpose.
- Small, reviewable PRs. One ticket per branch per PR.
- Never push directly to `main`. Always open a PR.

## Your tickets (in order)

1. `work/C-03-word-list.md` — **start here**, it unblocks Person A's A-02
2. `work/C-01-verify-physical-keyboard.md`
3. `work/C-02-onscreen-keyboard.md` — depends on B-02 landing first

## Step-by-step: how to work

### 1. Clone + install nothing

```sh
git clone https://github.com/Saad-Islam-DS/wordle-jam.git
cd wordle-jam
```

No build, no `npm install`.

### 2. Run locally

```sh
python -m http.server 8000
# Open http://localhost:8000
```

### 3. Pick a ticket, make a branch

```sh
git pull --rebase origin main
git checkout -b person-c/C-03-word-list
```

Open the ticket file. Only do what the **Acceptance criteria** list says.

### 4. Open Claude Code in this folder

Claude auto-reads `CLAUDE.md` and `ARCHITECTURE.md`. Tell Claude:

> I'm Person C. Read `work/C-03-word-list.md` and implement it. Only touch my files: `src/input.js` and `assets/words.txt`.

### 5. Commit in small chunks

```sh
git add assets/words.txt
git commit -m "C-03: add 200 common 5-letter words"
```

Commit message format: `C-03: <what changed>`.

### 6. Push + open PR

```sh
git push -u origin person-c/C-03-word-list
gh pr create --fill --base main
```

Tag Saad (Person A) for review.

### 7. After merge

Move the ticket file into `work/_DONE/`.

## Hard rules

- **Do not touch** `src/game.js`, `src/ui.js`, or `styles.css`. Those belong to A and B.
- **Do not change the contract** in `ARCHITECTURE.md` without pinging A and B.
- When curating the word list: real English words only. Do not let Claude invent words — spot-check its output.
- If Claude suggests adding frameworks, npm, a bundler, etc. — say no. Pure HTML/CSS/JS only.

## Review responsibilities

You review Person A's and Person B's PRs. Focus: do their changes break the contract?

## Questions?

Ping Saad on whatever we're using.
