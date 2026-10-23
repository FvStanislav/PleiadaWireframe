# Current State

Prototype version: `0.1.0`

## Current area

Advertising campaign creation and management flow.

## Current task

Campaign creation steps 1–4 are defined. After step 4 the wizard ends and opens a separate **Управление рекламной кампанией** page with expandable split/channel hierarchy.

## Last accepted state

- Five top-level sections are defined: Рекламные кампании, Отчеты, Профиль и организации, Платежи и документы, Помощь.
- The navigation displays the current client's profile nickname and balance using mock data.
- Рекламные кампании is the default landing section.
- The Рекламные кампании page has a **Создать** button.
- **Создать** opens a four-step **Создание рекламной кампании** wizard.
- Step 1 is **Параметры РК** and contains: Название, Формат контента, Платформа, Форматы размещения, Дополнительные опции, Бюджет, Даты проведения.
- Step 2 is **Подбор медиа** and contains: Тематика, Подписчиков, Просмотров на ролик, Охват, ER, ERR, География, Пол, Возраст.
- Step 3 is **Сплит** with planned/preliminary budget, two selected mock channel cards, and a searchable/sortable **Могут подойти** section with three additional mock channel cards.
- Split cards show subscribers, views, reach, ER, ERR, publications per month, gender ratio, age distribution, price and split inclusion toggle.
- Step 4 is **Загрузка креатива** with a visual-only drag-and-drop area and **Выбрать файл** button.
- **Далее** from step 4 exits the wizard and opens **Управление рекламной кампанией**; there is no step 5 in the creation wizard.
- The management page title is **Управление рекламной кампанией** and the current mock subtitle is **Рекламная кампани 1**.
- The management page displays expandable split cards.
- Current mock **Сплит 1** shows a date range, **Размещений: 5 шт.**, and status **В работе**.
- Expanding **Сплит 1** shows **Канал 1** with status **Отменен** and nested **Размещение 1**, plus **Канал 2** with status **Заявка не отправлена** and nested **Размещение 2**.
- Only explicitly supplied nested placements are shown; the prototype does not invent additional placements to reconcile the split summary count.
- The campaign menu item remains active throughout campaign creation and campaign management.
- GitHub Pages publishes `prototype/` through `.github/workflows/pages.yml`.
- Wireframe preview URL: `https://fvstanislav.github.io/PleiadaWireframe/`.
- Prototype changes on `main` deploy automatically; no manual Actions run is required.

## Read for current work

- `rules/campaigns.md`
- `rules/formats.md`
- `rules/media.md`
- `rules/placements.md`
- `rules/creatives.md`
- `prototype/index.html`
- `prototype/styles.css`
- `prototype/app.js`
- `prototype/mock-data.js`
- `prototype/split.css`
- `prototype/split.js`
- `prototype/management.css`
- `prototype/management.js`

Read `PREVIEW.md` only for preview/deployment issues. Read additional `rules/*.md` only when the next task requires them.

## Prototype entry

`prototype/index.html`

## Maintenance rule

Replace this file's stale current-state information when work moves to another area. Do not append a chronological work log here; Git history is the log.
