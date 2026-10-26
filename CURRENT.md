# Current State

Prototype version: `0.1.0`

## Current area

Advertiser and publisher workspace shell, with advertiser campaign creation/management flows already defined.

## Current task

A separate publisher workspace is now available from a low-emphasis top-bar switch. Its top-level navigation is defined; individual publisher section contents remain placeholders until explicitly designed.

## Last accepted state

- The advertiser workspace keeps its existing navigation: Рекламные кампании, Отчеты, Профиль и организации, Платежи и документы, Помощь.
- A small **Кабинет паблишера** button is displayed near the center of the top bar.
- Clicking **Кабинет паблишера** switches the prototype into a separate publisher workspace for media representatives.
- Publisher navigation consists of: **Заявки**, **Календарь**, **Чаты**, **Управление каналами**, **Профиль**, **Платежи и документы**, **Помощь**.
- Publisher mode opens on **Заявки** by default.
- Publisher section pages currently contain neutral placeholders only; no publisher-specific workflows beyond navigation are defined yet.
- In publisher mode, the top-bar switch reads **Кабинет рекламодателя** and returns to the advertiser workspace.
- The navigation displays the current account nickname and balance using mock data.
- Рекламные кампании remains the advertiser default landing section.
- The advertiser campaign list contains three mock campaigns with date range, budget and status.
- **Рекламная кампания 1** is displayed as a standalone card.
- **Рекламная кампания 2** and **Рекламная кампания 3** are grouped inside **VK Диваны**.
- Clicking any campaign card or its **Перейти** button opens that campaign's own management page and split data.
- Every campaign card has a trash icon that opens a closable deletion modal without actual deletion.
- **Создать** opens the four-step campaign creation wizard.
- Step 1 is **Параметры РК**.
- Step 2 is **Подбор медиа**.
- Step 3 is **Сплит**.
- Step 4 is **Загрузка креатива**.
- After step 4 the wizard opens **Управление рекламной кампанией**.
- Campaign management includes **Добавить сплит**, **Креативы**, expandable split/channel/placement hierarchy, cancellation actions, creative moderation indication and a visual channel chat widget.
- GitHub Pages publishes `prototype/` through `.github/workflows/pages.yml`.
- Wireframe preview URL: `https://fvstanislav.github.io/PleiadaWireframe/`.
- Prototype changes on `main` deploy automatically.

## Read for current work

- `rules/common.md`
- `rules/campaigns.md`
- `rules/formats.md`
- `rules/media.md`
- `rules/placements.md`
- `rules/creatives.md`
- `prototype/index.html`
- `prototype/styles.css`
- `prototype/publisher.css`
- `prototype/app.js`
- `prototype/publisher.js`
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
