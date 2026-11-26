# A-03: Non-repeating random answer across refreshes

**Owner:** Person A
**Estimate:** 10 min
**Depends on:** A-02

## Goal

Every page refresh picks a new random answer the player hasn't already seen. Persist seen answers in `localStorage` so refreshing doesn't repeat yesterday's word.

## Files to touch

- `src/game.js`

## Acceptance criteria

- [ ] On each `Game.init()`, pick a random answer from `ANSWERS` **excluding** any word already recorded in `localStorage` under key `wordle-jam:seen`.
- [ ] As soon as an answer is picked, append it to the `seen` list in `localStorage`.
- [ ] If all `ANSWERS` are seen, silently reset the `seen` list and pick from the full pool again (so the game is always playable).
- [ ] If `localStorage` is unavailable (private mode / exception), fall back to `Math.random()` with no persistence — game still works.

## Notes for Claude

Store `seen` as a JSON array of strings. On read, validate it's an array; on parse failure, treat as empty.
