# Publisher Rules

## Placement requests

- `BR-PUB-001` — **Заявки** is the publisher workspace list of incoming placement requests.
- `BR-PUB-002` — Each request shows **Канал**, **Формат**, **Стоимость**, **Дата публикации** and **Статус**.
- `BR-PUB-003` — Request statuses currently used by the publisher workspace are **Новая**, **Ждет ответа** and **Согласовано**.
- `BR-PUB-004` — The request list can be filtered by status.
- `BR-PUB-005` — The request list has a search field. In the current prototype it searches request channel and format text.
- `BR-PUB-006` — The request list can be sorted by publication date or amount.
- `BR-PUB-007` — In the current prototype, date sorting places earlier publication dates first and amount sorting places larger amounts first.

## Publication calendar

- `BR-PUB-008` — **Календарь** is the publisher workspace view of planned publication slots across the publisher's channels.
- `BR-PUB-009` — Calendar placement is slot-based: each visible slot has a calendar date and a publication time.
- `BR-PUB-010` — Planned placements are displayed in their assigned date/time slots.
- `BR-PUB-011` — Potential placements originating from requests that are not yet fully processed are also shown in the calendar and are visually distinguished in grey from planned placements.
- `BR-PUB-012` — The calendar can be filtered by one or more channels.
- `BR-PUB-013` — The calendar has a placement visibility filter with **Запланированные** and **Все размещения** modes.
- `BR-PUB-014` — **Запланированные** hides potential placements; **Все размещения** shows both planned and potential placements.
- `BR-PUB-015` — The current prototype uses a weekly slot grid and shows the publication time directly in each placement card as well as on the time axis.

Specific request channels, formats, prices, publication dates, calendar slots and calendar fixture placements shown in the prototype are mock data unless separately defined as business rules.
