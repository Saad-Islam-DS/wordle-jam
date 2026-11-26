# B-02: Style the on-screen keyboard

**Owner:** Person B
**Estimate:** 15 min
**Depends on:** B-01

## Goal

Keyboard looks like Wordle: 3 rows, wider Enter + Backspace keys, hover state.

## Files to touch

- `styles.css`
- `src/ui.js` (swap inline styles for classes)

## Acceptance criteria

- [ ] Keys are ~40×52px, grey background, white bold text, 4px radius.
- [ ] Enter + Backspace keys are ~1.5× wider.
- [ ] Hover darkens the key.
- [ ] `.key.correct`, `.key.present`, `.key.absent` classes exist (consumed by B-03).

## Notes for Claude

Mobile friendliness is a stretch — focus on desktop first.
