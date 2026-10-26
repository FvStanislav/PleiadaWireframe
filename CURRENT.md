# Current State

Prototype version: `0.1.0`

## Current area

Advertising campaign creation and management flow.

## Current task

Campaign creation steps 1–4 are defined. The campaign list now contains three mock campaigns, each opening its own management page with its own split data and the same management actions.

## Last accepted state

- Five top-level sections are defined: Рекламные кампании, Отчеты, Профиль и организации, Платежи и документы, Помощь.
- The navigation displays the current client's profile nickname and balance using mock data.
- Рекламные кампании is the default landing section.
- The Рекламные кампании page has a **Создать** button.
- The campaign list contains **Рекламная кампания 1**, **Рекламная кампания 2** and **Рекламная кампания 3** as clickable cards with date range, budget and status.
- Clicking any campaign card or its **Перейти** button opens that campaign's own management page and split data.
- Every campaign card has a trash icon. It opens a closable deletion modal; no actual deletion is performed in the wireframe.
- **Создать** opens a four-step **Создание рекламной кампании** wizard.
- Step 1 is **Параметры РК** and contains: Название, Формат контента, Платформа, Форматы размещения, Дополнительные опции, Бюджет, Даты проведения.
- Step 2 is **Подбор медиа** and contains: Тематика, Подписчиков, Просмотров на ролик, Охват, ER, ERR, География, Пол, Возраст.
- Step 3 is **Сплит** with planned/preliminary budget, two selected mock channel cards, and a searchable/sortable **Могут подойти** section with three additional mock channel cards.
- Split cards show subscribers, views, reach, ER, ERR, publications per month, gender ratio, age distribution, price and split inclusion toggle.
- Step 4 is **Загрузка креатива** with a visual-only drag-and-drop area and **Выбрать файл** button.
- **Далее** from step 4 exits the wizard and opens **Управление рекламной кампанией**; there is no step 5 in the creation wizard.
- The management page title is **Управление рекламной кампанией** and shows the selected campaign name as its subtitle.
- The management page has an **Добавить сплит** button that opens the same step-by-step creation flow again from step 1.
- Next to **Добавить сплит**, the management page has a **Креативы** button.
- **Креативы** opens a separate campaign creative-library page with mock media-file cards; its back action returns to the currently selected campaign management page.
- The management page displays expandable split cards.
- Mock **Рекламная кампания 1** keeps the existing **Сплит 1** with budget **48 400 ₽** and the previously defined channels/placements.
- Mock **Рекламная кампания 2** and **Рекламная кампания 3** each have their own **Сплит 1** with separate dates, budgets, channels and placements.
- Nested placements show cost, status **Запланировано**, a **Креатив** button and a green moderation check; hovering/focusing the check shows **Креатив промодерирован**.
- **Креатив** opens an intentionally empty modal with a close control.
- Split, channel and placement levels each have a pink-red **Отменить** action that opens a closable prototype modal without performing cancellation.
- Each channel has a **Связаться** action that opens a visual chat widget on the right. Real messaging is not implemented.
- The campaign menu item remains active throughout campaign creation, campaign management and the creative library.
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
- `prototype/creative-library.js`
- `prototype/campaign-list.css`
- `prototype/campaign-list.js`

Read `PREVIEW.md` only for preview/deployment issues. Read additional `rules/*.md` only when the next task requires them.

## Prototype entry

`prototype/index.html`

## Maintenance rule

Replace this file's stale current-state information when work moves to another area. Do not append a chronological work log here; Git history is the log.
