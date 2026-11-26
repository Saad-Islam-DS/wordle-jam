# B-04: End-of-game screen

**Owner:** Person B
**Estimate:** 15 min
**Depends on:** B-01

## Goal

When game ends (won or lost), show a modal overlay with result + "Play again" button.

## Files to touch

- `src/ui.js`
- `styles.css`

## Acceptance criteria

- [ ] `UI.showEndScreen(won, answer)` renders a centered dim-backdrop modal.
- [ ] Win: shows "🎉 Nice!" + number of guesses used.
- [ ] Loss: shows "The word was: XXXXX".
- [ ] "Play again" button calls `Game.init()`, clears the board, closes the modal.
- [ ] Clicking backdrop does NOT close (prevents accidental dismissal).

## Notes for Claude

"Play again" needs a way to reset the board — may need a new `UI.reset()` method. Keep contract additions in `ARCHITECTURE.md` in sync.
