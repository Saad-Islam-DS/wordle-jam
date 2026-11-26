// Person B owns this file.
// Exports: window.UI

(function () {
  const KEY_ROWS = ['qwertyuiop', 'asdfghjkl', 'Zxcvbnm B']; // Z=Enter, B=Backspace
  let boardEl, keyboardEl;
  let currentGuess = '';

  function buildBoard() {
    const { maxRows, wordLen } = Game.getState();
    boardEl.innerHTML = '';
    for (let r = 0; r < maxRows; r++) {
      const row = document.createElement('div');
      row.className = 'row';
      for (let c = 0; c < wordLen; c++) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.dataset.row = r;
        tile.dataset.col = c;
        row.appendChild(tile);
      }
      boardEl.appendChild(row);
    }
  }

  function buildKeyboard() {
    keyboardEl.innerHTML = '';
    for (const row of KEY_ROWS) {
      const rowEl = document.createElement('div');
      rowEl.className = 'key-row';
      for (const ch of row) {
        if (ch === ' ') continue;
        const key = document.createElement('button');
        const label = ch === 'Z' ? 'ENTER' : ch === 'B' ? '⌫' : ch.toUpperCase();
        const value = ch === 'Z' ? 'Enter' : ch === 'B' ? 'Backspace' : ch;
        key.textContent = label;
        key.dataset.key = value;
        key.className = 'key';
        rowEl.appendChild(key);
      }
      keyboardEl.appendChild(rowEl);
    }
  }

  function getTile(row, col) {
    return boardEl.querySelector(`.tile[data-row="${row}"][data-col="${col}"]`);
  }

  window.UI = {
    mount(board, keyboard) {
      boardEl = board;
      keyboardEl = keyboard;
      buildBoard();
      buildKeyboard();
    },

    setCurrentGuess(text) {
      currentGuess = text;
      const { currentRow, wordLen } = Game.getState();
      for (let c = 0; c < wordLen; c++) {
        const tile = getTile(currentRow, c);
        if (!tile) continue;
        tile.textContent = text[c] || '';
        tile.classList.toggle('filled', Boolean(text[c]));
      }
    },

    // Called by input after Game.submitGuess returns a result
    renderGuess({ row, word, statuses }) {
      for (let c = 0; c < word.length; c++) {
        const tile = getTile(row, c);
        if (!tile) continue;
        tile.textContent = word[c];
        tile.classList.remove('filled');
        tile.classList.add(statuses[c]);
      }
      // TODO (B): flip animation, update keyboard colors
    },

    showMessage(text) {
      const el = document.getElementById('message');
      if (el) el.textContent = text;
    },

    showEndScreen(won, answer) {
      this.showMessage(won ? '🎉 You got it!' : `Answer: ${answer.toUpperCase()}`);
    },
  };
})();
