# A-01: Verify scoreGuess handles double letters correctly

**Owner:** Person A
**Estimate:** 15 min
**Depends on:** none
**Status:** `todo`

## Goal

Confirm the current `scoreGuess` in `src/game.js` handles tricky double-letter cases per Wordle rules, and add inline sanity checks.

## Files to touch

- `src/game.js`

## Acceptance criteria

- [ ] `scoreGuess("allee", "apple")` → `["correct","absent","present","absent","absent"]` (first L matches, second L has no remaining L in target)
- [ ] `scoreGuess("sissy", "mossy")` → `["absent","present","absent","correct","correct"]`
- [ ] `scoreGuess("abbey", "abbey")` → all `"correct"`
- [ ] Add a `console.assert` block at file bottom running these 3 cases on load (remove before final demo).
- [ ] Contract in `ARCHITECTURE.md` unchanged.

## Notes for Claude

The classic bug: marking both copies of a letter as "present" when the target only has one. Current code uses a two-pass + `used[]` array — verify logic, don't rewrite from scratch.
