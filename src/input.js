// Person C owns this file.
// Exports: window.Input

(function () {
  let currentGuess = '';
  const WORD_LEN = 5;

  function handleKey(key) {
    const { gameOver, currentRow } = Game.getState();
    if (gameOver) return;

    if (key === 'Enter') {
      if (currentGuess.length !== WORD_LEN) {
        UI.showMessage('Not enough letters');
        return;
      }
      const result = Game.submitGuess(currentGuess);
      if (!result) return;
      if (result.error) {
        UI.showMessage(result.error);
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
        handleKey(e.key);
      });
      // On-screen keyboard
      document.getElementById('keyboard').addEventListener('click', (e) => {
        const btn = e.target.closest('[data-key]');
        if (!btn) return;
        handleKey(btn.dataset.key);
      });
    },
  };
})();
