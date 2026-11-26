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

  function el(tag, className, text) {
    const node = document.createElement(tag);
    node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function openEndScreen(won, answer) {
    const used = Game.getState().guesses.length;
    const backdrop = el('div', 'backdrop');
    const modal = el('div', 'modal');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'end-title');

    const title = el('h2', '', won ? '🎉 Nice!' : 'Out of guesses');
    title.id = 'end-title';
    const detail = el('p', '', won
      ? `Solved in ${used} ${used === 1 ? 'guess' : 'guesses'}.`
      : `The word was: ${answer.toUpperCase()}`);

    const again = el('button', 'play-again', 'Play again');
    again.type = 'button';
    // input.js cancels Enter on the document, which would stop it pressing this button
    again.addEventListener('keydown', (e) => e.stopPropagation());
    again.addEventListener('click', async () => {
      again.disabled = true;
      await Game.init();
      window.UI.reset();
    });

    modal.append(title, detail, again);
    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);
    again.focus();
  }

  window.UI = {
    mount(board, keyboard) {
      boardEl = board;
      keyboardEl = keyboard;
      this.reset();
    },

    reset() {
      keyStatus = {};
      revealEndsAt = 0;
      currentGuess = '';
      buildBoard();
      buildKeyboard();
      this.showMessage('');
      document.querySelector('.backdrop')?.remove();
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
      setTimeout(() => openEndScreen(won, answer), Math.max(0, revealEndsAt - Date.now()));
    },
  };
})();
