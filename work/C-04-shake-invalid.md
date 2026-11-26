# C-04: Shake row when guess isn't in word list

**Owner:** Person C
**Estimate:** 10 min
**Depends on:** none

## Goal

When a player hits Enter on a word that isn't in the word list, the current row shakes side-to-side so the rejection feels tactile, not just a text message.

## Files to touch

- `src/input.js`

## Acceptance criteria

- [ ] On `result.error === 'not in list'` (and `'too short'`), the current row's DOM element animates a quick horizontal shake (~400ms).
- [ ] Uses the Web Animations API (`element.animate(...)`) — no CSS changes needed, so B's work is untouched.
- [ ] Shake does not fire on a valid guess (correct/present/absent flow unchanged).
- [ ] If the row element can't be found for any reason, no error is thrown.

## Notes for Claude

Classic shake keyframes: 0 → -6px → 6px → -4px → 4px → 0. Grab the row via `document.querySelectorAll('.row')[currentRow]`.
