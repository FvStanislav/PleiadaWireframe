# Current State

Prototype version: `0.1.0`

## Current area

Advertiser campaign lifecycle statuses and publisher **Заявки / Календарь** flows.

## Current task

Campaign, split and placement lifecycle statuses are now represented in the advertiser wireframe. Split status exposes a hover/focus breakdown of placement statuses inside that split.

## Last accepted state

- Campaign statuses are **Черновик**, **В работе**, **Завершена**.
- Split statuses are **Черновик**, **Модерация**, **Согласование**, **В работе**, **Завершен**, **Отменен**.
- Placement statuses are **Модерация**, **Согласование**, **Ждет публикации**, **Опубликовано**, **Отменено**.
- Placement lifecycle statuses do not exist independently while the parent split is still **Черновик**.
- A split can be **В работе** while placements inside it are simultaneously in different stages.
- Hovering or focusing a split status shows the count of placements in each status inside that split.
- Channels remain the visual grouping of placements but do not have an independent lifecycle status.
- The advertiser campaign list still contains three mock campaigns; **Рекламная кампания 2** and **Рекламная кампания 3** remain grouped under **VK Диваны**.
- Publisher navigation opens on **Заявки**; **Календарь** is also implemented.
- Publisher requests have status filters, search, sorting, detail/actions and calendar linking.
- The publisher calendar has weekly time slots, planned and potential placements, channel filtering and planned/all visibility modes.
- GitHub Pages publishes `prototype/` at `https://fvstanislav.github.io/PleiadaWireframe/`.

## Read for current work

- `rules/campaigns.md`
- `rules/placements.md`
- `rules/common.md`
- `rules/publisher.md`
- `prototype/campaign-list.js`
- `prototype/management.js`
- `prototype/management.css`
- `prototype/mock-data.js`
- `prototype/publisher.js`
- `prototype/publisher.css`
- `prototype/index.html`

Read additional rules and prototype files only for the next affected screen. `PREVIEW.md` is for deployment issues.

## Prototype entry

`prototype/index.html`

## Maintenance rule

Replace stale current-state information when work moves to another area. Git history is the log.
