# AI Editing Rules

This repository is a disposable UX wireframe, not a production frontend.

## Restore context first

At the start of work in a new session, read in this order:

1. `AGENTS.md`
2. `CONTEXT.md`
3. `CURRENT.md`
4. only the `rules/*.md` files relevant to the current task
5. only the prototype files relevant to the affected screen or interaction

Do not load the entire repository by default. Use the minimum context required for the current task.

## Product truth

- `rules/` contains the current business truth.
- When the user states or changes a business rule, update the relevant `rules/*.md` file in the same iteration.
- Do not invent missing business rules.
- Existing documented rules remain valid unless the user explicitly changes them.
- `CONTEXT.md` is orientation, not a substitute for detailed rules.
- Chat memory is not authoritative when it conflicts with the repository.
- Do not keep obsolete rule history inside Markdown. Git history is the history.

## Current-state context

- `CURRENT.md` records only the active area, current task, last accepted state and files relevant to current work.
- Update `CURRENT.md` when the active task or area changes materially.
- Keep `CURRENT.md` short. Replace stale information instead of appending a work log.
- Do not duplicate Git history inside `CURRENT.md`.

## Prototype scope

- Use plain HTML/CSS/JS and fixed mock data unless the user explicitly asks otherwise.
- Implement only interactions needed to evaluate UX: navigation, tabs, dropdowns, modals, selections and simple visual state changes.
- Do not add backend logic, APIs, persistence, authentication, permissions, production validation, state-management frameworks, build systems or production architecture unless explicitly requested.
- Do not implement real calculations when fixed backend-like values can be shown as mock data.
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

## Live preview

- GitHub Pages publishes the `main` branch through GitHub's built-in Pages deployment.
- Wireframe URL: `https://fvstanislav.github.io/PleiadaWireframe/prototype/`.
- Normal pushes to `main` are published automatically; no manual Actions run is required.
- The Pages site root is not the wireframe. Review the `/prototype/` URL.
- If deployment fails, inspect GitHub's built-in `pages build and deployment` run before changing prototype code.
- See `PREVIEW.md` for deployment-specific details.

## Versions

- Git commits are the primary rollback points.
- `VERSION` is a human-readable stable checkpoint, not a replacement for Git history.
- Change `VERSION` when the user explicitly approves or requests a checkpoint/version.

## File map

- `CONTEXT.md` — stable bootstrap context for the project.
- `CURRENT.md` — compact current work state for session recovery.
- `PREVIEW.md` — GitHub Pages preview setup and URL.
- `rules/` — business rules currently in force.
- `prototype/index.html` — prototype markup.
- `prototype/styles.css` — prototype styles.
- `prototype/mock-data.js` — fixed sample entities and states.
- `prototype/app.js` — lightweight interaction code only.