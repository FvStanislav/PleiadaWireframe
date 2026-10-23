# Pleiada Wireframe

Disposable interactive wireframes for Pleiada product decisions.

This repository is intentionally simple: static HTML/CSS/JS, mock data, and compact business-rule files. It is not a production frontend and must not grow production architecture.

## Structure

- `rules/` — current business truth used by the wireframes.
- `prototype/` — clickable visual prototype.
- `AGENTS.md` — rules for AI-assisted edits.
- `VERSION` — human-readable prototype checkpoint version.

## Workflow

1. Discuss a product or UX rule.
2. Update the relevant file in `rules/` if the business truth changed.
3. Change only the necessary prototype files.
4. Commit the meaningful iteration separately.
5. Review the prototype visually.
6. If an iteration is bad, restore the previous Git commit instead of reconstructing it from memory.

Git history is the version history. Markdown files contain only the current truth, not a running diary of old decisions.
