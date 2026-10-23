# Business Rules

These files contain only the business rules currently in force for the wireframe.

Do not use this folder as a decision diary. Previous versions are recovered from Git history.

## Areas

- `common.md` — product-wide rules that do not belong to one domain.
- `campaigns.md` — campaign creation, lifecycle and budget-facing UX rules.
- `contracts.md` — contract grouping and contract-level behavior.
- `placements.md` — individual placement behavior and states.
- `creatives.md` — creative assignment, replacement and locking rules.
- `media.md` — authors, channels, representatives and media-selection rules.
- `negotiation.md` — proposals, responses, dates and negotiation behavior.
- `formats.md` — content forms, formats and technical-option structure.
- `platforms.md` — platform availability and platform-specific restrictions.

## Rule format

Keep rules short and testable in the UI. Use stable IDs only when useful for discussion, for example `BR-CON-001`.

When a rule changes, replace the old rule with the current one. Do not append a chronology.
