# B-03: Color keyboard keys + tile flip animation

**Owner:** Person B
**Estimate:** 25 min
**Depends on:** B-02

## Goal

After a guess, (1) tiles flip one-by-one revealing their color, (2) matching keyboard keys get the same color — upgrading only (correct > present > absent).

## Files to touch

- `src/ui.js`
- `styles.css`

## Acceptance criteria

- [ ] Each tile in a submitted row flips with a 300ms CSS animation, staggered 100ms apart.
- [ ] After all tiles flip, `UI.renderGuess` updates the on-screen keyboard: each letter's key gets its status class.
- [ ] If a key is already `.correct`, a later `.present` or `.absent` does NOT downgrade it.
- [ ] Track per-letter best status in `UI` module state (don't expose externally).

## Notes for Claude

Status priority: `correct` > `present` > `absent`.
