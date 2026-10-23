# Project Context

## What Pleiada is

Pleiada is an advertising buying platform being designed around complex media placements rather than a simple ad catalog. The product should let an advertiser define a campaign, choose suitable content formats and media, assemble placements, negotiate conditions with the media side, and then proceed with agreed placements.

The prototype in this repository exists only to make product and UX decisions visible and clickable before full design and development.

## Prototype purpose

Use the prototype to answer questions such as:

- what screen should exist;
- what information should be visible on it;
- where controls, buttons, statuses and blocks should be placed;
- how a user moves between screens;
- how alternative UX variants compare.

Do not treat prototype code as production frontend code.

## What is intentionally out of scope

Unless explicitly requested for a UX demonstration, do not implement:

- backend behavior;
- APIs or persistence;
- real calculations;
- production validation;
- authentication or permissions;
- production error handling;
- responsive polish;
- animations or visual effects;
- production architecture.

Backend entities and values may be represented as fixed mock data. Interactions should be simulated only when they help evaluate the UX.

## Product model orientation

The current product vocabulary includes these major areas:

- campaigns;
- formats and platforms;
- media/authors/platform inventory;
- placements;
- contracts that can group placements for negotiation;
- negotiation and agreement states;
- creatives and placement requirements.

This section is orientation only. Detailed business truth must live in `rules/*.md`. If a rule is absent there, do not infer or invent it from this file.

## Sources of truth

- `rules/*.md` contains the currently accepted business rules.
- `prototype/` contains the current visual hypothesis.
- Git history contains previous versions and rollback points.
- `VERSION` identifies a user-approved human-readable checkpoint when one exists.
- `CURRENT.md` tells a new session where work currently stands and which files are relevant.

Chat memory is not authoritative when it conflicts with the repository.

## Restore context in a new chat

Read in this order:

1. `AGENTS.md` — how to work safely in this repository.
2. `CONTEXT.md` — what this project and prototype are.
3. `CURRENT.md` — current area, task and accepted state.
4. Only the `rules/*.md` files listed in `CURRENT.md` or required by the task.
5. Only the prototype files required for the affected screen or interaction.

Do not read the whole repository by default. Load the minimum context needed for the current task.

## Maintaining context

When business truth changes, update the relevant `rules/*.md` file in the same iteration.

When the active work area or current task changes materially, update `CURRENT.md`. Keep it short and overwrite stale state instead of appending history.

Old states belong in Git history, not in growing Markdown logs.
