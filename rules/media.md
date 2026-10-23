# Media Rules

## Campaign creation — step 2: Подбор медиа

- `BR-MED-001` — **Тематика** is a multi-select field with: **Авто**, **Недвижимость**, **Здоровье**, **Психология**.
- `BR-MED-002` — **Подписчиков** is a numeric range from **0** to **10,000,000**.
- `BR-MED-003` — **Просмотров на ролик** is a numeric range from **0** to **100,000,000**.
- `BR-MED-004` — **Охват** is a numeric range from **0** to **10,000,000**.
- `BR-MED-005` — **ER** is a percentage range from **0%** to **100%** with a **0.01 percentage point** step.
- `BR-MED-006` — **ERR** is a percentage range from **0%** to **100%** with a **0.01 percentage point** step.
- `BR-MED-007` — **География** is a hierarchical multi-select.
- `BR-MED-008` — Current geography hierarchy: **Россия → Москва, Пермь**; **Китай → Пекин, Шанхай**.
- `BR-MED-009` — Selecting or clearing a parent geography item automatically selects or clears all its child items.
- `BR-MED-010` — If only some child geography items are selected, the parent is shown in a partial/indeterminate state.
- `BR-MED-011` — **Пол** is a multi-select field with: **Мужской**, **Женский**.
- `BR-MED-012` — **Возраст** is a numeric range from **10** to **120**.

These are selection filters for campaign media matching. No additional media-ranking, validation or matching logic is defined yet.
