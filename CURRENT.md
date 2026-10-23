# Current State

Prototype version: `0.1.0`

## Current area

Advertising campaign creation flow.

## Current task

Campaign creation steps 1 and 2 are defined. Step 2 is **Подбор медиа** with audience/media filters.

## Last accepted state

- Five top-level sections are defined: Рекламные кампании, Отчеты, Профиль и организации, Платежи и документы, Помощь.
- The navigation displays the current client's profile nickname and balance using mock data.
- Рекламные кампании is the default landing section.
- The Рекламные кампании page has a **Создать** button.
- **Создать** opens a multi-step **Создание рекламной кампании** flow.
- Step 1 is **Параметры РК** and contains: Название, Формат контента, Платформа, Форматы размещения, Дополнительные опции, Бюджет, Даты проведения.
- Step 2 is **Подбор медиа** and contains: Тематика, Подписчиков, Просмотров на ролик, Охват, ER, ERR, География, Пол, Возраст.
- Тематика and Пол are multi-select fields.
- Subscriber, views, reach and age filters are numeric min/max ranges.
- ER and ERR are percentage min/max ranges with 0.01 step.
- География is a hierarchical multi-select: Россия → Москва, Пермь; Китай → Пекин, Шанхай.
- Selecting or clearing a country automatically selects or clears all cities under it; partial city selection shows an indeterminate country state.
- **Назад** from step 2 returns to step 1 with current in-session state preserved.
- **Далее** from step 2 opens only a placeholder because later steps are not yet defined.
- The campaign menu item remains active throughout campaign creation.
- GitHub Pages publishes `prototype/` through `.github/workflows/pages.yml`.
- Wireframe preview URL: `https://fvstanislav.github.io/PleiadaWireframe/`.
- Prototype changes on `main` deploy automatically; no manual Actions run is required.

## Read for current work

- `rules/campaigns.md`
- `rules/formats.md`
- `rules/media.md`
- `prototype/index.html`
- `prototype/styles.css`
- `prototype/app.js`
- `prototype/mock-data.js`

Read `PREVIEW.md` only for preview/deployment issues. Read additional `rules/*.md` only when the next task requires them.

## Prototype entry

`prototype/index.html`

## Maintenance rule

Replace this file's stale current-state information when work moves to another area. Do not append a chronological work log here; Git history is the log.
