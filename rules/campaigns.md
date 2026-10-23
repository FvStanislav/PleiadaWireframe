# Campaign Rules

## Campaign list and creation

- `BR-CAM-001` — **Рекламные кампании** is the main list of advertising campaigns.
- `BR-CAM-002` — The campaign list has a **Создать** action for starting a new advertising campaign.
- `BR-CAM-003` — The **Создать** action opens a separate campaign creation flow.
- `BR-CAM-004` — Campaign creation is a multi-step flow with separate pages and **Назад / Далее** navigation.
- `BR-CAM-005` — Step 1 is **Параметры РК** and contains: **Название**, **Формат контента**, **Платформа**, **Форматы размещения**, **Дополнительные опции**, **Бюджет**, **Даты проведения**.
- `BR-CAM-006` — **Формат контента** is a single-choice field.
- `BR-CAM-007` — **Платформа** is a single-choice field whose available values depend on the selected content format.
- `BR-CAM-008` — **Форматы размещения** is a multi-select dropdown whose available values depend on the selected content format.
- `BR-CAM-009` — **Дополнительные опции** is a multi-select dropdown whose available values depend on the selected content format.
- `BR-CAM-010` — **Бюджет** is a monetary field.
- `BR-CAM-011` — **Даты проведения** is a date range selected through calendar controls.
- `BR-CAM-012` — Changing **Формат контента** resets the selected platform, placement formats and additional options because their available values depend on the content format.
- `BR-CAM-013` — Step 2 is **Подбор медиа**. Its media-selection fields and constraints are defined in `rules/media.md`.
- `BR-CAM-014` — **Назад** from step 2 returns to step 1 while preserving the current in-session prototype state.
- `BR-CAM-015` — Step 3 is **Сплит**. Its placement-card content and inclusion behavior are defined in `rules/placements.md`.
- `BR-CAM-016` — **Назад** from step 3 returns to step 2 while preserving the current in-session prototype state.
- `BR-CAM-017` — Step 4 is **Загрузка креатива**. Its upload interface is defined in `rules/creatives.md`.
- `BR-CAM-018` — **Назад** from step 4 returns to step 3.
- `BR-CAM-019` — After step 4 the creation wizard ends and opens a separate **Управление рекламной кампанией** page; this page is not another wizard step.

## Campaign management

- `BR-CAM-020` — **Управление рекламной кампанией** displays the campaign name/subtitle and a list of campaign splits.
- `BR-CAM-021` — Each split is represented by an expandable card showing split name, placement date range, placement count, budget and current split status.
- `BR-CAM-022` — Expanding a split reveals its channels; each channel shows its own status, placement count and budget and can reveal its nested placements.
- `BR-CAM-023` — The management page has an **Добавить сплит** action that opens the same multi-step creation flow again, starting from step 1.

Steps 1–4 are the complete campaign-creation wizard currently defined. Campaign management begins after the wizard.