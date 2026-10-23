# Campaign Rules

## Campaign list and creation

- `BR-CAM-001` — **Рекламные кампании** is the main list of advertising campaigns.
- `BR-CAM-002` — The campaign list has a **Создать** action for starting a new advertising campaign.
- `BR-CAM-003` — The **Создать** action opens a separate campaign creation flow.
- `BR-CAM-004` — Campaign creation is a multi-step flow with separate pages and **Назад / Далее** navigation.
- `BR-CAM-005` — The first campaign-creation step contains the following fields: **Название**, **Формат контента**, **Платформа**, **Форматы размещения**, **Бюджет**, **Даты проведения**.
- `BR-CAM-006` — **Формат контента** is a single-choice field.
- `BR-CAM-007` — **Платформа** is a single-choice field whose available values depend on the selected content format.
- `BR-CAM-008` — **Форматы размещения** is a multi-select dropdown whose available values depend on the selected content format.
- `BR-CAM-009` — **Бюджет** is a monetary field.
- `BR-CAM-010` — **Даты проведения** is a date range selected through calendar controls.
- `BR-CAM-011` — Changing **Формат контента** resets the selected platform and selected placement formats because their available values depend on the content format.

Only step 1 is currently defined. Later campaign-creation steps remain intentionally unspecified until the user defines them.
