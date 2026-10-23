# AI Editing Rules

This repository is a disposable UX wireframe, not a production frontend.

## Product truth

- `rules/` contains the current business truth.
- When the user states or changes a business rule, update the relevant `rules/*.md` file in the same iteration.
- Do not invent missing business rules.
- Existing documented rules remain valid unless the user explicitly changes them.
- Do not keep obsolete rule history inside Markdown. Git history is the history.

## Prototype scope

- Use plain HTML/CSS/JS and fixed mock data unless the user explicitly asks otherwise.
- Implement only interactions needed to evaluate UX: navigation, tabs, dropdowns, modals, selections and simple visual state changes.
- Do not add backend logic, APIs, persistence, authentication, permissions, production validation, state-management frameworks, build systems or production architecture unless explicitly requested.
- Visual clarity and iteration speed matter more than code quality.

## Change safety

- Preserve all unrelated UI and rules.
- Prefer local edits over rewrites.
- Never delete unrelated files, screens, blocks or rules.
- Do not refactor merely for cleanliness.
- Keep mock data explicit and easy to edit.
- Every meaningful prototype iteration should be a separate Git commit.
- Never squash, rewrite or destroy previous prototype history.
- If an iteration is wrong, restore from Git rather than reconstructing the previous state from memory.

## Versions

- Git commits are the primary rollback points.
- `VERSION` is a human-readable stable checkpoint, not a replacement for Git history.
- Change `VERSION` when the user explicitly approves or requests a checkpoint/version.

## File map

- `rules/` — business rules currently in force.
- `prototype/index.html` — prototype markup.
- `prototype/styles.css` — prototype styles.
- `prototype/mock-data.js` — fixed sample entities and states.
- `prototype/app.js` — lightweight interaction code only.
