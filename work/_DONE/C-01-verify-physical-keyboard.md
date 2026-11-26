# C-01: Verify physical keyboard input

**Owner:** Person C
**Estimate:** 10 min
**Depends on:** none

## Goal

Make sure typing on the physical keyboard works for letters, Backspace, Enter — and doesn't hijack other keys.

## Files to touch

- `src/input.js`

## Acceptance criteria

- [ ] Typing a–z appends to current guess (up to 5 letters).
- [ ] Backspace removes the last letter.
- [ ] Enter submits — rejected with message if < 5 letters or not in list.
- [ ] Ctrl/Cmd combos (e.g. Ctrl+R to reload) are not intercepted.
- [ ] Repeated keys (holding a letter) are ignored past word length — no crash.

## Notes for Claude

Already partially implemented. Test in browser; add missing edge cases only.
