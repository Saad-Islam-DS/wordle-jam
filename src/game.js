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

  const FALLBACK_ANSWERS = ['crane', 'slate', 'brick', 'plumb', 'ghost'];
  const FALLBACK_ALLOWED = [...FALLBACK_ANSWERS, 'apple', 'tiger', 'about', 'audio'];
  const ANSWER_POOL_SIZE = 50;

  let ANSWERS = FALLBACK_ANSWERS;
  let ALLOWED = new Set(FALLBACK_ALLOWED);

  async function loadWords() {
    try {
      const res = await fetch('assets/words.txt');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const lines = (await res.text()).split(/\r?\n/);
      const seen = new Set();
      const words = [];
      for (const raw of lines) {
        const w = raw.trim().toLowerCase();
        if (/^[a-z]{5}$/.test(w) && !seen.has(w)) {
          seen.add(w);
          words.push(w);
        }
      }
      if (words.length === 0) throw new Error('no valid words');
      ANSWERS = words.slice(0, ANSWER_POOL_SIZE);
      ALLOWED = new Set(words);
    } catch (err) {
      // file:// or server missing — fall back so demo still works.
      console.warn('[game] word list load failed, using fallback:', err.message);
    }
  }

  const SEEN_KEY = 'wordle-jam:seen';

  function readSeen() {
    try {
      const raw = localStorage.getItem(SEEN_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function writeSeen(list) {
    try {
      localStorage.setItem(SEEN_KEY, JSON.stringify(list));
    } catch {
      // localStorage unavailable (private mode) — persistence is best-effort.
    }
  }

  function pickAnswer() {
    let seen = readSeen();
    let pool = ANSWERS.filter((w) => !seen.includes(w));
    if (pool.length === 0) {
      // Everyone's been seen — reset so the game stays playable.
      seen = [];
      pool = ANSWERS;
    }
    const picked = pool[Math.floor(Math.random() * pool.length)];
    writeSeen([...seen, picked]);
    return picked;
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
    async init() {
      await loadWords();
      answer = pickAnswer();
      guesses = [];
      currentRow = 0;
      gameOver = false;
      won = false;
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

  // Sanity checks — ensure scoreGuess handles double letters.
  // Remove before final demo if console noise is an issue.
  (function runSanityChecks() {
    const cases = [
      ['allee', 'apple', ['correct', 'present', 'absent', 'absent', 'correct']],
      ['sissy', 'mossy', ['absent', 'absent', 'correct', 'correct', 'correct']],
      ['abbey', 'abbey', ['correct', 'correct', 'correct', 'correct', 'correct']],
      ['speed', 'abide', ['absent', 'absent', 'present', 'absent', 'present']],
    ];
    for (const [g, t, expected] of cases) {
      const actual = scoreGuess(g, t);
      console.assert(
        JSON.stringify(actual) === JSON.stringify(expected),
        `scoreGuess(${g}, ${t}) expected ${expected} got ${actual}`
      );
    }
  })();
})();
