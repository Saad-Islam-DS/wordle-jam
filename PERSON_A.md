# Person A — Saad-Islam-DS (you)

**Your role:** Game logic.
**Your files:** `src/game.js`
**Your tickets:** anything in `work/A-*.md`

## Your tickets (in order)

1. `work/A-01-verify-scoring.md`
2. `work/A-02-load-words-from-file.md` — depends on C-03
3. `work/A-03-daily-seed.md` — stretch

## Workflow

```sh
git pull --rebase origin main
git checkout -b person-a/A-01-verify-scoring
# work
git add src/game.js
git commit -m "A-01: verify scoreGuess double-letter cases"
git push -u origin person-a/A-01-verify-scoring
gh pr create --fill --base main
```

Move the completed ticket into `work/_DONE/` on merge.

## Review responsibilities

You review Person B's and Person C's PRs. Focus: does their change break the contract in `ARCHITECTURE.md`? Everything else is their call.
