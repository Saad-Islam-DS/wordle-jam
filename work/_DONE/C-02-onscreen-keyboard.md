# C-02: Hook up on-screen keyboard clicks

**Owner:** Person C
**Estimate:** 10 min
**Depends on:** B-02 (keyboard DOM exists)

## Goal

Clicking an on-screen key behaves exactly like a physical keypress.

## Files to touch

- `src/input.js`

## Acceptance criteria

- [ ] Clicking a letter key appends it to the current guess.
- [ ] Clicking ⌫ removes last letter.
- [ ] Clicking ENTER submits.
- [ ] Clicking has no effect once game is over.
- [ ] Works on touch devices (pointer events OK; click is fine).

## Notes for Claude

Already partially implemented using event delegation on `#keyboard`. Validate `data-key` matches B's rendered markup.
