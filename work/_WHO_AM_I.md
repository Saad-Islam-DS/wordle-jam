# Who owns what

| Person | GitHub       | Role                | Owns files                              | Ticket prefix |
|--------|--------------|---------------------|-----------------------------------------|---------------|
| A      | Saad-Islam-DS       | Game logic          | `src/game.js`                           | `A-*`         |
| B      | emeses-mo           | UI + styles         | `src/ui.js`, `styles.css`               | `B-*`         |
| C      | saimhussain369-arch | Input + word list   | `src/input.js`, `assets/words.txt`      | `C-*`         |

If role assignments feel off, swap them in a 30-second huddle and update this file in the first commit.

## Shared files (any person may edit, but coordinate)

- `README.md`
- `CLAUDE.md`
- `ARCHITECTURE.md`
- `index.html`
- `work/*.md`

## Branch names

- Person A → `person-a/<ticket-id>` (e.g. `person-a/A-02-score-guess`)
- Person B → `person-b/<ticket-id>`
- Person C → `person-c/<ticket-id>`
