# Current State

Prototype version: `0.1.0`

## Current area

Global navigation and advertising campaign entry flow.

## Current task

The top-level navigation now includes client context, and the advertising campaign section has an entry point to campaign creation.

## Last accepted state

- Five top-level sections are defined: Рекламные кампании, Отчеты, Профиль и организации, Платежи и документы, Помощь.
- Each section is represented by a large clickable menu item.
- The navigation displays the current client's profile nickname and balance using mock data.
- Рекламные кампании is the default landing section.
- The Рекламные кампании page has a **Создать** button.
- **Создать** opens a separate **Создание рекламной кампании** page.
- The creation page currently contains only a placeholder; its fields and steps are not yet defined.
- The campaign menu item remains active while viewing campaign creation.
- Detailed internal structure of the other sections has not yet been designed.
- GitHub Pages publishes `prototype/` through `.github/workflows/pages.yml`.
- Wireframe preview URL: `https://fvstanislav.github.io/PleiadaWireframe/`.
- Prototype changes on `main` deploy automatically; no manual Actions run is required.

## Read for current work

- `rules/common.md`
- `rules/campaigns.md`
- `prototype/index.html`
- `prototype/styles.css`
- `prototype/app.js`
- `prototype/mock-data.js`

Read `PREVIEW.md` only for preview/deployment issues. Read additional `rules/*.md` only when the next task requires them.

## Prototype entry

`prototype/index.html`

## Maintenance rule

Replace this file's stale current-state information when work moves to another area. Do not append a chronological work log here; Git history is the log.
