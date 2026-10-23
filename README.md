# Pleiada Wireframe

Disposable interactive wireframes for Pleiada product decisions.

This repository is intentionally simple: static HTML/CSS/JS, mock data, and compact business-rule files. It is not a production frontend and must not grow production architecture.

## Structure

- `AGENTS.md` — rules for AI-assisted edits and safe session recovery.
- `CONTEXT.md` — stable project bootstrap context.
- `CURRENT.md` — compact current work state.
- `rules/` — current business truth used by the wireframes.
- `prototype/` — clickable visual prototype.
- `VERSION` — human-readable prototype checkpoint version.

## Restore in a new chat

Read `AGENTS.md`, then `CONTEXT.md`, then `CURRENT.md`. After that, load only the rule and prototype files required for the current task.

## Workflow

1. Discuss a product or UX rule.
2. Update the relevant file in `rules/` if the business truth changed.
3. Update `CURRENT.md` when the active work area or task changes materially.
4. Change only the necessary prototype files.
5. Commit the meaningful iteration separately.
6. Review the prototype visually.
7. If an iteration is bad, restore the previous Git commit instead of reconstructing it from memory.

Git history is the version history. Markdown files contain only current truth/current state, not a running diary of old decisions.
