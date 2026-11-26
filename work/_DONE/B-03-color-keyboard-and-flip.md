# B-03: Hide used keys + tile flip animation

**Owner:** Person B
**Estimate:** 25 min
**Depends on:** B-02

## Goal

After a guess: (1) tiles flip one-by-one revealing their color, (2) any letter confirmed **not in the word** is hidden from the on-screen keyboard and can no longer be clicked.

## Files to touch

- `src/ui.js`
- `styles.css`

## Acceptance criteria

- [ ] Each tile in a submitted row flips with a 300ms CSS animation, staggered 100ms apart.
- [ ] After all tiles flip, `UI.renderGuess` hides every key whose letter was scored `absent` across all guesses so far.
- [ ] A hidden key cannot be clicked (either `display: none` or `visibility: hidden` + `pointer-events: none`). Prefer `visibility: hidden` so the keyboard layout doesn't shift.
- [ ] Letters scored `correct` or `present` stay visible and keep their color (green / yellow).
- [ ] Track per-letter best status in `UI` module state (don't expose externally).

## Notes for Claude

Status priority: `correct` > `present` > `absent`. Only `absent` letters get hidden — a `present` letter stays yellow and clickable even if the player hasn't placed it correctly yet.

If a letter appears both as `absent` and `present/correct` in different guesses (impossible in standard Wordle scoring for the same letter), prefer the non-absent status.
