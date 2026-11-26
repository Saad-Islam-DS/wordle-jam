# Architecture

Three modules, strict contract, zero shared state outside the contract.

```
┌──────────────┐    submitGuess()    ┌──────────────┐
│  Input (C)   │ ──────────────────► │  Game (A)    │
│              │                     │              │
│  physical kb │                     │  logic +     │
│  onscreen kb │ ◄─────── result ─── │  word list   │
└──────┬───────┘                     └──────────────┘
       │ setCurrentGuess()
       │ renderGuess()
       ▼
┌──────────────┐
│   UI (B)     │
│              │
│  grid tiles  │
│  keyboard    │
│  animations  │
└──────────────┘
```

## Contract — DO NOT BREAK

### `window.Game` (owned by Person A)
```js
Game.init()
  // Side effect: picks answer, resets state.

Game.submitGuess(word: string)
  // Returns one of:
  //   { error: "too short" | "not in list" }
  //   { row: number, word: string, statuses: string[], gameOver: boolean, won: boolean, answer: string|null }
  // statuses[i] is "correct" | "present" | "absent" for word[i].
  // answer is only populated when gameOver === true.

Game.getState()
  // Returns { guesses: string[], currentRow: number, maxRows: number, wordLen: number, gameOver: boolean, won: boolean }
```

### `window.UI` (owned by Person B)
```js
UI.mount(boardEl: HTMLElement, keyboardEl: HTMLElement)
  // Builds the 6x5 grid and QWERTY keyboard DOM.

UI.setCurrentGuess(text: string)
  // Paints letters-in-progress on the current row. Called on every keystroke.

UI.renderGuess({ row, word, statuses })
  // Paints a completed row with final colors + flip animation.

UI.showMessage(text: string)
  // Transient status line (e.g. "Not in word list").

UI.showEndScreen(won: boolean, answer: string)
  // Game-over modal, shown after the last row has flipped. "Play again" calls Game.init() then UI.reset().

UI.reset()
  // Clears the board, keyboard and message, and closes the modal.
```

### `window.Input` (owned by Person C)
```js
Input.bind()
  // Attaches physical keyboard listener + delegates clicks on #keyboard.
  // Calls Game.submitGuess on Enter, UI.setCurrentGuess on letter/backspace.
```

## Decisions log

- **2026-11-26**: Chose HTML/CSS/JS over Godot. Reason: Wordle is DOM-friendly, Godot setup would eat 30+ min of the 2h budget, and .tscn merge conflicts are painful with 3 devs.
- **2026-11-26**: IIFEs instead of ES modules. Reason: works with `file://` and no bundler.
- **2026-11-26**: Word list hardcoded in `game.js` with a stretch-goal ticket (A-03) to load from `assets/words.txt`. Reason: unblock other work.

## Open questions

- Dark mode only, or toggle? (Default: dark only.)
- Share result button? (Stretch goal — ticket B-04.)
