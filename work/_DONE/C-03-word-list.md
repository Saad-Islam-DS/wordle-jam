# C-03: Populate word list

**Owner:** Person C
**Estimate:** 20 min
**Depends on:** none

## Goal

Expand `assets/words.txt` from 25 placeholder words to a solid playable list.

## Files to touch

- `assets/words.txt`

## Acceptance criteria

- [ ] At least 200 common 5-letter words, one per line, lowercase, no duplicates.
- [ ] All entries pass `/^[a-z]{5}$/`.
- [ ] No profanity, slurs, or offensive terms.
- [ ] First 50 lines are "answer-worthy" words (common, well-known) — these are the ones Person A's `Game.init` will pick from. Remaining ~150+ are "allowed guesses only" (less common but valid English).

## Notes for Claude

Public word lists exist (e.g. the original Wordle list is widely mirrored). A curated hand-picked list of 200 is also fine for a 2h demo. Do NOT hallucinate words — every word must be a real English word spelled correctly.

If using a public source, add a comment at the top of the file citing it.
