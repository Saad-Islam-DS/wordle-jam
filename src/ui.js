// Person B owns this file.
// Exports: window.UI

(function () {
  const KEY_ROWS = [
    [...'qwertyuiop'],
    [...'asdfghjkl'],
    ['Enter', ...'zxcvbnm', 'Backspace'],
  ];
  const KEY_LABELS = { Enter: 'ENTER', Backspace: '⌫' };
  let boardEl, keyboardEl;
  let currentGuess = '';
  let keyStatus = {};
  let revealEndsAt = 0;
  const FLIP_MS = 300;
  const STAGGER_MS = 100;
  const STATUS_RANK = { absent: 1, present: 2, correct: 3 };

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
      for (const value of row) {
        const key = document.createElement('button');
        key.type = 'button';
        key.textContent = KEY_LABELS[value] || value.toUpperCase();
        key.dataset.key = value;
        key.className = value.length > 1 ? 'key wide' : 'key';
        if (value === 'Backspace') key.setAttribute('aria-label', 'Backspace');
        rowEl.appendChild(key);
      }
      keyboardEl.appendChild(rowEl);
    }
  }

  function getTile(row, col) {
    return boardEl.querySelector(`.tile[data-row="${row}"][data-col="${col}"]`);
  }

  function updateKeys(word, statuses) {
    statuses.forEach((status, i) => {
      const letter = word[i];
      // a doubled letter can be correct and absent in one guess; the best status wins
      if (STATUS_RANK[status] > (STATUS_RANK[keyStatus[letter]] || 0)) keyStatus[letter] = status;
    });
    for (const [letter, status] of Object.entries(keyStatus)) {
      const key = keyboardEl.querySelector(`.key[data-key="${letter}"]`);
      key.classList.remove('correct', 'present', 'absent');
      key.classList.add(status);
    }
  }

  window.UI = {
    mount(board, keyboard) {
      boardEl = board;
      keyboardEl = keyboard;
      keyStatus = {};
      revealEndsAt = 0;
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
      const revealMs = (word.length - 1) * STAGGER_MS + FLIP_MS;
      revealEndsAt = Date.now() + revealMs;
      for (let c = 0; c < word.length; c++) {
        const tile = getTile(row, c);
        if (!tile) continue;
        tile.textContent = word[c];
        tile.style.animationDelay = `${c * STAGGER_MS}ms`;
        tile.classList.add('flip');
        // swap colors halfway through, while the tile is edge-on
        setTimeout(() => {
          tile.classList.remove('filled');
          tile.classList.add(statuses[c]);
        }, c * STAGGER_MS + FLIP_MS / 2);
      }
      setTimeout(() => updateKeys(word, statuses), revealMs);
    },

    showMessage(text) {
      const el = document.getElementById('message');
      if (el) el.textContent = text;
    },

    showEndScreen(won, answer) {
      // input calls this right after renderGuess; wait so the flip isn't spoiled
      setTimeout(() => {
        this.showMessage(won ? '🎉 You got it!' : `Answer: ${answer.toUpperCase()}`);
      }, Math.max(0, revealEndsAt - Date.now()));
    },
  };
})();
