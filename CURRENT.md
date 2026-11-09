# Current State

Prototype version: `0.1.0`

## Current area

Advertiser and publisher navigation; shared chats and campaign/placement workflows.

## Current task

Added **Статистика** as the first menu item in both workspaces. Both screens intentionally contain only the page title: dashboards, tables, metrics and filters have not been designed yet.

## Last accepted state

- **Статистика** appears first in advertiser and publisher navigation, but the default landing pages remain **Рекламные кампании** and **Заявки** respectively.
- Both workspaces provide counterpart-grouped **Чаты**, with organization-wide general chats and placement-linked discussions. Mini-chats reuse the same in-session messages.
- Advertiser campaign list supports groups, split status counts and campaign trash with restore/permanent-delete mock actions.
- Campaign management shows split/channel/placement hierarchy, statuses, creative library and placement chat actions.
- Publisher **Заявки** and **Календарь** are defined and interactive in the prototype.
- Chat messages and other mock UI changes live only within the current browser session.
- GitHub Pages publishes `prototype/` at `https://fvstanislav.github.io/PleiadaWireframe/`.

## Read for current work

- `rules/common.md`
- `rules/chats.md`
- `prototype/index.html`
- `prototype/app.js`
- `prototype/publisher.js`

Read additional rules and prototype files only as required. `PREVIEW.md` is for deployment issues.

## Prototype entry

`prototype/index.html`

## Maintenance rule

Replace stale current-state information when work moves to another area. Git history is the log.
