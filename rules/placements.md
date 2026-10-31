# Placement Rules

## Campaign creation — step 3: Сплит

- `BR-PLC-001` — Step 3 shows a **Сплит** of media placements selected for the campaign.
- `BR-PLC-002` — The step displays **Запланированный бюджет** and **Предварительный бюджет** as separate informational values.
- `BR-PLC-003` — Recommended placements are displayed as a list of media cards under **Подобрали для вас размещения**.
- `BR-PLC-004` — A media card shows: media name, subscribers, views, reach, ER, ERR, audience gender ratio, audience age distribution, publications per month and placement price.
- `BR-PLC-005` — The placement price is displayed in rubles immediately to the left of the split inclusion button.
- `BR-PLC-006` — A placement already included in the split has a green **Добавлено в сплит** button.
- `BR-PLC-007` — Clicking **Добавлено в сплит** removes the placement from the current prototype split state and changes the button to black **Добавить в сплит**.
- `BR-PLC-008` — Clicking **Добавить в сплит** adds the placement back and restores green **Добавлено в сплит** state.
- `BR-PLC-009` — **Могут подойти** shows other media that conceptually match the step-2 filters; the prototype does not calculate that matching and uses fixed mock cards.
- `BR-PLC-010` — **Могут подойти** supports name search and ordering by relevance, subscribers, views or price.
- `BR-PLC-011` — Suggested media cards start outside the split with black **Добавить в сплит** state.
- `BR-PLC-012` — No budget recalculation rule is defined yet for adding or removing placements; the prototype budget values remain informational until that behavior is specified.

## Campaign management hierarchy

- `BR-PLC-013` — A campaign-management split card shows the split name, placement date range, channel count, placement count, split budget and split status.
- `BR-PLC-014` — A split card is expandable and reveals channels belonging to that split.
- `BR-PLC-015` — Each channel shows its placement count and budget and can reveal the placements nested under that channel. A channel does not have its own independent lifecycle status in the current model.
- `BR-PLC-016` — A nested placement shows its name, cost and status when the placement lifecycle has started.
- `BR-PLC-018` — Each placement has a **Креатив** action. In the current wireframe it opens an empty modal that can be closed; creative content inside this modal is not yet defined.
- `BR-PLC-019` — Next to **Креатив**, a placement can show a positive moderation indicator; hovering or focusing it displays **Креатив промодерирован**.
- `BR-PLC-020` — Split, channel and placement levels each have a pink-red **Отменить** action. In the current wireframe it opens a closable modal and does not execute cancellation.
- `BR-PLC-021` — Each channel has a **Связаться** action that opens a visual chat widget on the right side of the screen. The current wireframe does not implement real messaging.

## Split and placement lifecycle

- `BR-PLC-022` — Split statuses are **Черновик**, **Модерация**, **Согласование**, **В работе**, **Завершен**, **Отменен**.
- `BR-PLC-023` — Placement statuses are **Модерация**, **Согласование**, **Ждет публикации**, **Опубликовано**, **Отменено**.
- `BR-PLC-024` — While a split is **Черновик**, its preliminary placement composition does not yet have independent placement lifecycle statuses. Placement statuses begin after the split leaves **Черновик**.
- `BR-PLC-025` — A split status is a high-level state of the purchasing wave and does not require all placements inside the split to share that state. Mixed placement statuses inside one active split are normal.
- `BR-PLC-026` — Hovering or focusing the split status in campaign management shows a breakdown of the statuses of placements inside that split.
- `BR-PLC-027` — For a draft split, the split-status breakdown states that placement statuses will appear after the split is launched.

Specific channel names, placement names, statuses, demographic distributions, relevance values, prices, budget numbers and date ranges shown in the prototype are mock fixture data unless separately defined as business rules.
