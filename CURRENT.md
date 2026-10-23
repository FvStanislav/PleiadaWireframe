# Current State

Prototype version: `0.1.0`

## Current area

Advertising campaign creation flow.

## Current task

Campaign creation steps 1–3 are defined. Step 3 is **Сплит** with selected placements plus a searchable/sortable **Могут подойти** section.

## Last accepted state

- Five top-level sections are defined: Рекламные кампании, Отчеты, Профиль и организации, Платежи и документы, Помощь.
- The navigation displays the current client's profile nickname and balance using mock data.
- Рекламные кампании is the default landing section.
- The Рекламные кампании page has a **Создать** button.
- **Создать** opens a multi-step **Создание рекламной кампании** flow.
- Step 1 is **Параметры РК** and contains: Название, Формат контента, Платформа, Форматы размещения, Дополнительные опции, Бюджет, Даты проведения.
- Step 2 is **Подбор медиа** and contains: Тематика, Подписчиков, Просмотров на ролик, Охват, ER, ERR, География, Пол, Возраст.
- Step 3 is **Сплит**.
- Step 3 shows separate planned and preliminary budget values.
- **Подобрали для вас размещения** currently contains two mock channel cards that start in **Добавлено в сплит** state.
- A media card shows subscribers, views, reach, ER, ERR, publications per month, gender ratio and an age-distribution mini chart.
- The split toggle switches between green **Добавлено в сплит** and black **Добавить в сплит**.
- **Могут подойти** contains three additional mock channel cards that start outside the split with **Добавить в сплит**.
- **Могут подойти** has working name search and ordering by relevance, subscribers, views or price.
- Step 2 filter matching is not calculated in the prototype; the suggested list is fixed mock data.
- Split budget values do not currently recalculate when placement inclusion changes because no recalculation rule has been defined.
- Mock demographic distribution, relevance and price values exist only to visualize and sort the cards and are not business rules.
- **Назад** from step 3 returns to step 2 with current in-session state preserved.
- **Далее** from step 3 opens only a placeholder because later steps are not yet defined.
- The campaign menu item remains active throughout campaign creation.
- GitHub Pages publishes `prototype/` through `.github/workflows/pages.yml`.
- Wireframe preview URL: `https://fvstanislav.github.io/PleiadaWireframe/`.
- Prototype changes on `main` deploy automatically; no manual Actions run is required.

## Read for current work

- `rules/campaigns.md`
- `rules/formats.md`
- `rules/media.md`
- `rules/placements.md`
- `prototype/index.html`
- `prototype/styles.css`
- `prototype/app.js`
- `prototype/mock-data.js`
- `prototype/split.css`
- `prototype/split.js`

Read `PREVIEW.md` only for preview/deployment issues. Read additional `rules/*.md` only when the next task requires them.

## Prototype entry

`prototype/index.html`

## Maintenance rule

Replace this file's stale current-state information when work moves to another area. Do not append a chronological work log here; Git history is the log.
