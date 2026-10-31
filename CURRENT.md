# Current State

Prototype version: `0.1.0`

## Current area

Advertiser campaign list/management and publisher **Заявки / Календарь** flows.

## Current task

Campaign-list usability was expanded: campaign groups can be created in-session, campaign cards show split count/statuses, deleted campaigns move to a recoverable trash, creative-library styling is restored, and split cards show channel count.

## Last accepted state

- Campaign statuses are **Черновик**, **В работе**, **Завершена**.
- Split statuses are **Черновик**, **Модерация**, **Согласование**, **В работе**, **Завершен**, **Отменен**.
- Placement statuses are **Модерация**, **Согласование**, **Ждет публикации**, **Опубликовано**, **Отменено**.
- Placement lifecycle statuses do not exist independently while the parent split is still **Черновик**.
- A split can be **В работе** while placements inside it are simultaneously in different stages.
- Hovering or focusing a split status shows the count of placements in each status inside that split.
- Split cards show both channel count and placement count.
- Channels remain the visual grouping of placements but do not have an independent lifecycle status.
- Campaign cards show campaign status plus the number and status breakdown of splits inside the campaign.
- The campaign list has a **Создать группу** action. In the current prototype, new named groups are created in the current browser session and may remain empty.
- Deleting a campaign moves it to **Корзина** in the current browser session instead of immediately removing it permanently.
- The campaign trash allows **Восстановить** and **Удалить навсегда** actions.
- The advertiser campaign list still starts with three mock campaigns; **Рекламная кампания 2** and **Рекламная кампания 3** start grouped under **VK Диваны**.
- The campaign creative library is rendered as styled media-file cards again; the existing mock creative metadata remains unchanged.
- Publisher navigation opens on **Заявки**; **Календарь** is also implemented.
- Publisher requests have status filters, search, sorting, detail/actions and calendar linking.
- The publisher calendar has weekly time slots, planned and potential placements, channel filtering and planned/all visibility modes.
- GitHub Pages publishes `prototype/` at `https://fvstanislav.github.io/PleiadaWireframe/`.

## Read for current work

- `rules/campaigns.md`
- `rules/placements.md`
- `rules/creatives.md`
- `rules/common.md`
- `rules/publisher.md`
- `prototype/campaign-list.js`
- `prototype/campaign-list.css`
- `prototype/management.js`
- `prototype/management.css`
- `prototype/creative-library.js`
- `prototype/mock-data.js`
- `prototype/publisher.js`
- `prototype/publisher.css`
- `prototype/index.html`

Read additional rules and prototype files only for the next affected screen. `PREVIEW.md` is for deployment issues.

## Prototype entry

`prototype/index.html`

## Maintenance rule

Replace stale current-state information when work moves to another area. Git history is the log.
