# A-03: Deterministic daily answer (stretch)

**Owner:** Person A
**Estimate:** 10 min
**Depends on:** A-02

## Goal

Pick the same answer for all players on a given calendar day (like real Wordle).

## Files to touch

- `src/game.js`

## Acceptance criteria

- [ ] Replace `Math.random()` pick with a date-based index: `(daysSinceEpoch) % ANSWERS.length`.
- [ ] Two people opening the game on the same day get the same answer.
- [ ] A query-string override `?seed=42` picks index 42 (useful for testing).

## Notes for Claude

Simple: `Math.floor(Date.now() / 86400000) % ANSWERS.length`.
