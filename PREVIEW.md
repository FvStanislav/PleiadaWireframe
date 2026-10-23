# Live Preview

Wireframe URL: https://fvstanislav.github.io/PleiadaWireframe/

GitHub Pages publishes the wireframe through the custom workflow `.github/workflows/pages.yml`.

The workflow uploads only the contents of `prototype/`, so the prototype is served at the Pages site root.

## Automatic publishing

Commits to `main` that change `prototype/**` automatically run the Pages workflow and publish the new wireframe. No local software and no manual Actions run are required for normal prototype updates.

For wireframe review, open:

`https://fvstanislav.github.io/PleiadaWireframe/`

If the preview is stale or unavailable, inspect the `Deploy Pleiada wireframe to Pages` workflow before changing prototype code.
