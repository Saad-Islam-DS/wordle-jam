// Person A owns this file.
// Exports: window.Game

(function () {
  const MAX_ROWS = 6;
  const WORD_LEN = 5;

  let answer = '';
  let guesses = [];      // array of strings
  let currentRow = 0;
  let gameOver = false;
  let won = false;

  // TODO (A): load from assets/words.txt — for now hardcoded
  const ANSWERS = ['crane', 'slate', 'brick', 'plumb', 'ghost'];
  const ALLOWED = new Set([...ANSWERS, 'apple', 'tiger', 'about', 'audio']);

  function pickAnswer() {
    return ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
  }

  function scoreGuess(guess, target) {
    // Returns array of "correct" | "present" | "absent"
    // Handles double letters correctly.
    const result = Array(WORD_LEN).fill('absent');
    const targetChars = target.split('');
    const used = Array(WORD_LEN).fill(false);

    // First pass: correct
    for (let i = 0; i < WORD_LEN; i++) {
      if (guess[i] === targetChars[i]) {
        result[i] = 'correct';
        used[i] = true;
      }
    }
    // Second pass: present
    for (let i = 0; i < WORD_LEN; i++) {
      if (result[i] === 'correct') continue;
      for (let j = 0; j < WORD_LEN; j++) {
        if (!used[j] && guess[i] === targetChars[j]) {
          result[i] = 'present';
          used[j] = true;
          break;
        }
      }
    }
    return result;
  }

  window.Game = {
    init() {
      answer = pickAnswer();
      guesses = [];
      currentRow = 0;
      gameOver = false;
      won = false;
      console.log('[game] answer:', answer); // remove before demo
    },

    submitGuess(word) {
      if (gameOver) return null;
      word = (word || '').toLowerCase();
      if (word.length !== WORD_LEN) return { error: 'too short' };
      if (!ALLOWED.has(word)) return { error: 'not in list' };

      const statuses = scoreGuess(word, answer);
      guesses.push(word);
      const rowIndex = currentRow;
      currentRow++;
      won = word === answer;
      gameOver = won || currentRow >= MAX_ROWS;

      return { row: rowIndex, word, statuses, gameOver, won, answer: gameOver ? answer : null };
    },

    getState() {
      return { guesses, currentRow, maxRows: MAX_ROWS, wordLen: WORD_LEN, gameOver, won };
    },
  };
})();
