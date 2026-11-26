// Person C owns this file.
// Exports: window.Input

(function () {
  let currentGuess = '';
  const WORD_LEN = 5;

  function shakeRow(index) {
    const row = document.querySelectorAll('.row')[index];
    if (!row) return;
    row.animate(
      [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-6px)' },
        { transform: 'translateX(6px)' },
        { transform: 'translateX(-4px)' },
        { transform: 'translateX(4px)' },
        { transform: 'translateX(0)' },
      ],
      { duration: 400, easing: 'ease-in-out' }
    );
  }

  function handleKey(key) {
    const { gameOver, currentRow } = Game.getState();
    if (gameOver) return;

    if (key === 'Enter') {
      if (currentGuess.length !== WORD_LEN) {
        UI.showMessage('Not enough letters');
        shakeRow(currentRow);
        return;
      }
      const result = Game.submitGuess(currentGuess);
      if (!result) return;
      if (result.error) {
        UI.showMessage(result.error);
        shakeRow(currentRow);
        return;
      }
      UI.showMessage('');
      UI.renderGuess(result);
      currentGuess = '';
      if (result.gameOver) {
        UI.showEndScreen(result.won, result.answer);
      }
    } else if (key === 'Backspace') {
      currentGuess = currentGuess.slice(0, -1);
      UI.setCurrentGuess(currentGuess);
    } else if (/^[a-zA-Z]$/.test(key) && currentGuess.length < WORD_LEN) {
      currentGuess += key.toLowerCase();
      UI.setCurrentGuess(currentGuess);
    }
  }

  window.Input = {
    bind() {
      // Physical keyboard
      document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        if (e.key === 'Enter') {
          // A focused on-screen key would otherwise also fire a click on Enter.
          e.preventDefault();
          if (e.repeat) return;
        }
        handleKey(e.key);
      });
      // On-screen keyboard
      document.getElementById('keyboard').addEventListener('click', (e) => {
        const btn = e.target.closest('[data-key]');
        if (!btn) return;
        // Otherwise Space on the physical keyboard re-presses the last clicked key.
        btn.blur();
        handleKey(btn.dataset.key);
      });
    },
  };
})();
