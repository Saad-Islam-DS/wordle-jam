# B-01: Style the tile grid

**Owner:** Person B
**Estimate:** 20 min
**Depends on:** none

## Goal

Make the 6×5 grid look like real Wordle: centered, uniform tiles, letter visible, no inline styles.

## Files to touch

- `styles.css`
- `src/ui.js` (remove inline `style.cssText` once CSS classes handle it)

## Acceptance criteria

- [ ] Tiles are 62×62px, centered, bold uppercase letter, dark background matching `--bg`.
- [ ] Empty tiles have a thin border (`--tile-border`); tiles containing a letter in the current guess have a thicker border.
- [ ] `.tile.correct`, `.tile.present`, `.tile.absent` classes drive color (not inline styles).
- [ ] Update `UI.renderGuess` to add the class, not set `style.background`.
- [ ] No inline `style.cssText` left in `ui.js` for tiles or keys.

## Notes for Claude

Keep CSS variables already declared in `styles.css`. Use grid gap `6px`.
