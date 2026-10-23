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

- `BR-PLC-013` — A campaign-management split card shows the split name, placement date range, placement count, split budget and split status.
- `BR-PLC-014` — A split card is expandable and reveals channels belonging to that split.
- `BR-PLC-015` — Each channel shows its own status, placement count and budget and can reveal the placements nested under that channel.
- `BR-PLC-016` — A nested placement shows its name, cost and status.
- `BR-PLC-017` — The current placement status shown in the management wireframe is **Запланировано**.
- `BR-PLC-018` — Each placement has a **Креатив** action. In the current wireframe it opens an empty modal that can be closed; creative content inside this modal is not yet defined.

Specific channel names, placement names, statuses, demographic distributions, relevance values, prices, budget numbers and date ranges shown in the prototype are mock fixture data unless separately defined as business rules.