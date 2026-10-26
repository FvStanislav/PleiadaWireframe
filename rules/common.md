# Common Rules

## Workspaces

Pleiada currently has two separate interface workspaces: advertiser and publisher. They share the prototype shell but have different top-level navigation and content.

- `BR-COM-001` — The advertiser workspace top-level navigation consists of **Рекламные кампании**, **Отчеты**, **Профиль и организации**, **Платежи и документы**, **Помощь**.
- `BR-COM-002` — **Рекламные кампании** is the advertiser workspace's main campaign list.
- `BR-COM-003` — **Отчеты** provides advertiser reporting.
- `BR-COM-004` — **Профиль и организации** manages advertiser personal and legal-entity context.
- `BR-COM-005` — **Платежи и документы** manages advertiser legal documents and settlements.
- `BR-COM-006` — **Помощь** provides documentation and support.
- `BR-COM-007` — The main navigation displays the current account nickname and balance using mock data.
- `BR-COM-008` — A small low-emphasis **Кабинет паблишера** control is shown in the top bar of the advertiser workspace.
- `BR-COM-009` — **Кабинет паблишера** switches the prototype into a separate publisher workspace intended for media representatives.
- `BR-COM-010` — The publisher workspace navigation consists of **Заявки**, **Календарь**, **Чаты**, **Управление каналами**, **Профиль**, **Платежи и документы**, **Помощь**.
- `BR-COM-011` — The publisher workspace opens on **Заявки** by default.
- `BR-COM-012` — **Заявки** and **Календарь** are defined publisher screens; the remaining publisher sections stay as placeholders until their individual flows are explicitly defined.
- `BR-COM-013` — In publisher mode, the top-bar switch becomes **Кабинет рекламодателя** and returns to the advertiser workspace.

Publisher request and calendar behavior is defined in `rules/publisher.md`.

Prototype nickname, balance and placeholder content are mock data and are not product business rules.
