# Current State

Prototype version: `0.1.0`

## Current area

Advertising campaign creation flow.

## Current task

Campaign creation now has a defined first step with dependent platform and placement-format choices, plus Back/Next navigation.

## Last accepted state

- Five top-level sections are defined: Рекламные кампании, Отчеты, Профиль и организации, Платежи и документы, Помощь.
- The navigation displays the current client's profile nickname and balance using mock data.
- Рекламные кампании is the default landing section.
- The Рекламные кампании page has a **Создать** button.
- **Создать** opens a multi-step **Создание рекламной кампании** flow.
- Step 1 contains: Название, Формат контента, Платформа, Форматы размещения, Бюджет, Даты проведения.
- Формат контента controls which platforms and placement formats are available.
- Форматы размещения is a multi-select dropdown.
- Даты проведения is represented by start/end calendar inputs.
- **Далее** opens a placeholder step 2 because later steps are not yet defined.
- **Назад** from step 2 returns to step 1 with the current mock form state preserved in the page session.
- The campaign menu item remains active throughout campaign creation.
- GitHub Pages publishes `prototype/` through `.github/workflows/pages.yml`.
- Wireframe preview URL: `https://fvstanislav.github.io/PleiadaWireframe/`.
- Prototype changes on `main` deploy automatically; no manual Actions run is required.

## Read for current work

- `rules/campaigns.md`
- `rules/formats.md`
- `prototype/index.html`
- `prototype/styles.css`
- `prototype/app.js`
- `prototype/mock-data.js`

Read `PREVIEW.md` only for preview/deployment issues. Read additional `rules/*.md` only when the next task requires them.

## Prototype entry

`prototype/index.html`

## Maintenance rule

Replace this file's stale current-state information when work moves to another area. Do not append a chronological work log here; Git history is the log.
