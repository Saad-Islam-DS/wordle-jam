# C-05: Expand word list to a full 5-letter dictionary

**Owner:** Person C
**Estimate:** done
**Depends on:** C-03

## Goal

Players kept hitting "not in list" on common words like `start`, `spark`, `ponds`. Replace the 246-word curated list with a full English 5-letter dictionary so most real guesses are accepted.

## What this PR does

- `assets/words.txt` grows from 246 → ~15,921 lines.
- **Lines 1–50 are unchanged** — they're the curated "answer-worthy" pool `Game.init` picks from.
- Lines 51+ are the rest of the 5-letter words from [dwyl/english-words](https://github.com/dwyl/english-words) (MIT), filtered to `/^[a-z]{5}$/` and deduped (first occurrence wins, so the top-50 order is preserved).
- `Game.init`'s existing fetch + validation pipeline handles the new size with no code change (already deduping, already filtering).

## Acceptance criteria

- [x] `start`, `spark`, `ponds` are accepted as guesses.
- [x] First 50 lines of the file are the same words as before (so the answer pool is unchanged).
- [x] Every line matches `/^[a-z]{5}$/`.
- [x] No duplicates.
- [x] Opening via `file://` still falls back (no behavior change — `game.js` untouched).

## Source

```
https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt
```
Filtered with `grep -E '^[a-z]{5}$' | sort -u`, then prepended the existing 50 curated answers.
