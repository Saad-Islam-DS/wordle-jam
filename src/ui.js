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
      row.style.display = 'grid';
      row.style.gridTemplateColumns = `repeat(${wordLen}, 60px)`;
      row.style.gap = '6px';
      for (let c = 0; c < wordLen; c++) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.dataset.row = r;
        tile.dataset.col = c;
        // inline fallback so it's visible before styles.css lands
        tile.style.cssText = 'width:60px;height:60px;border:2px solid #3a3a3c;display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:bold;text-transform:uppercase;';
        row.appendChild(tile);
      }
      boardEl.appendChild(row);
    }
  }

  function buildKeyboard() {
    keyboardEl.innerHTML = '';
    keyboardEl.style.display = 'flex';
    keyboardEl.style.flexDirection = 'column';
    keyboardEl.style.gap = '6px';
    for (const row of KEY_ROWS) {
      const rowEl = document.createElement('div');
      rowEl.style.display = 'flex';
      rowEl.style.gap = '4px';
      rowEl.style.justifyContent = 'center';
      for (const ch of row) {
        if (ch === ' ') continue;
        const key = document.createElement('button');
        const label = ch === 'Z' ? 'ENTER' : ch === 'B' ? '⌫' : ch.toUpperCase();
        const value = ch === 'Z' ? 'Enter' : ch === 'B' ? 'Backspace' : ch;
        key.textContent = label;
        key.dataset.key = value;
        key.className = 'key';
        key.style.cssText = 'padding:12px 10px;background:#818384;color:white;border:none;border-radius:4px;font-weight:bold;cursor:pointer;';
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
        if (tile) tile.textContent = text[c] || '';
      }
    },

    // Called by input after Game.submitGuess returns a result
    renderGuess({ row, word, statuses }) {
      for (let c = 0; c < word.length; c++) {
        const tile = getTile(row, c);
        if (!tile) continue;
        tile.textContent = word[c];
        tile.style.background = `var(--${statuses[c]})`;
        tile.style.borderColor = `var(--${statuses[c]})`;
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
