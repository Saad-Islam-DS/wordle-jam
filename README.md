# wordle-jam

A 2-hour, 3-person Wordle-clone build. Pure HTML + CSS + JS, no frameworks.

## Run it

Open `index.html` in a browser. That's it.

## Task split

Each person owns different files to minimize merge conflicts.

### Person A — Game logic (`src/game.js`)
- Pick a daily answer from `assets/words.txt`
- `submitGuess(word)` → returns array of letter statuses: `"correct" | "present" | "absent"`
- Track guesses (max 6), win/lose state
- Validate guess is in word list

### Person B — UI + styles (`src/ui.js`, `styles.css`)
- 6×5 grid of tiles
- On-screen keyboard (QWERTY)
- Tile flip animation on guess submit
- Color letter tiles + keyboard keys based on status
- Win / lose modal

### Person C — Input + word list (`src/input.js`, `assets/words.txt`)
- Physical keyboard handling (letters, backspace, enter)
- On-screen keyboard click handling
- Curate 5-letter word list (answers + allowed guesses)
- Stretch: share result, stats in localStorage

## 2-hour timeline

| Time | Milestone |
|------|-----------|
| 0:00–0:15 | Everyone pulls, agrees on data contract between files |
| 0:15–1:00 | Build core: A ships `submitGuess`, B ships empty grid + keyboard, C ships input events |
| 1:00–1:30 | Wire together — first playable |
| 1:30–1:50 | Polish: animations, colors, win modal |
| 1:50–2:00 | Final commit, celebrate |

## Data contract (don't change without telling everyone)

```js
// game.js exports:
window.Game = {
  init(),                     // set up answer, reset state
  submitGuess(word),          // returns {statuses: [...], gameOver: bool, won: bool} or null if invalid
  getState(),                 // {guesses, currentRow, maxRows, answer}
};

// ui.js exports:
window.UI = {
  renderGuess(row, word, statuses),  // paint one row
  updateKeyboard(letterStatuses),    // {a: "absent", b: "present", ...}
  showEndScreen(won, answer),
};

// input.js exports:
window.Input = {
  onLetter(cb),   // cb(letter)
  onBackspace(cb),
  onEnter(cb),
};
```

## Git workflow

```sh
git pull --rebase            # before you start
# ... work in YOUR files only ...
git add <your-files>
git commit -m "A: submitGuess returns statuses"
git pull --rebase
git push
```
