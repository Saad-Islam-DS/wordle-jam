# A-02: Load answers + allowed guesses from assets/words.txt

**Owner:** Person A
**Estimate:** 20 min
**Depends on:** C-03 (word list populated)

## Goal

Replace the hardcoded `ANSWERS` + `ALLOWED` in `src/game.js` with a `fetch()` from `assets/words.txt` at `Game.init()`.

## Files to touch

- `src/game.js`
- `index.html` (if `Game.init` needs to become async)

## Acceptance criteria

- [ ] `Game.init()` becomes async and awaits the fetch.
- [ ] `index.html` boot script awaits `Game.init()` before `Input.bind()`.
- [ ] If fetch fails (opened via `file://`), fall back to the existing hardcoded list so demo still works.
- [ ] Every word in `assets/words.txt` is trimmed + lowercased + length-5 before being added to `ALLOWED`.
- [ ] A subset (e.g. first 500 lines, or a separate `answers` section) is used as `ANSWERS` pool.

## Notes for Claude

Assume the file format is one word per line. Coordinate with Person C if they add a header or JSON format.
