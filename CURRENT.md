# Current State

Prototype version: `0.1.0`

## Current area

Advertiser and publisher workspaces: shared counterpart-based chats and placement discussions.

## Current task

Both workspaces now have a **Чаты** section organized by counterpart organizations. Each counterpart has a general chat and an expandable list of placement-specific discussions. Mini-chats from advertiser placements and publisher requests open the corresponding conversation and share their messages with the full chat section.

## Last accepted state

- Advertiser navigation includes **Чаты**. Publisher **Чаты** is implemented instead of a placeholder.
- In each workspace, the main chat list is grouped by counterparty; each counterparty exposes **Общий чат** and placement-linked discussions.
- General conversations are not tied to a placement. Placement threads identify their channel, campaign/source, split, cost and status.
- Every placement in advertiser campaign management has a **Чат** control. The channel **Связаться** action opens the responsible organization's general conversation.
- Publisher request **Связаться** and **Чат по размещению** open a mini-chat for that request.
- Mini-chat and full chat share in-session message data. Both workspaces can view the same sample bilateral conversations.
- Switching from publisher back to advertiser no longer reloads the page, preserving current-session chat messages.
- This is a mock interactive wireframe: no networked messaging, backend, authentication or persistent message storage.
- Existing campaign/group/trash/creative-library, placement status, publisher request and calendar flows remain.
- GitHub Pages publishes `prototype/` at `https://fvstanislav.github.io/PleiadaWireframe/`.

## Read for current work

- `rules/chats.md`
- `rules/common.md`
- `rules/placements.md`
- `rules/publisher.md`
- `prototype/chats.js`
- `prototype/chats.css`
- `prototype/management.js`
- `prototype/publisher.js`
- `prototype/app.js`
- `prototype/index.html`

Read other files only as required. `PREVIEW.md` is for deployment issues.

## Prototype entry

`prototype/index.html`

## Maintenance rule

Replace stale current-state information when work moves to another area. Git history is the log.
