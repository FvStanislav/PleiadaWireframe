# Live Preview

Expected URL: https://fvstanislav.github.io/PleiadaWireframe/

The live wireframe is published from `prototype/` by `.github/workflows/pages.yml`.

## Automatic publishing

A deployment runs automatically when a commit to `main` changes:

- `prototype/**`
- `.github/workflows/pages.yml`

The workflow uploads only the contents of `prototype/`, so repository documentation and business-rule files are not exposed as part of the site.

## One-time repository setting

GitHub Pages must be enabled once in the repository UI:

1. Open `Settings`.
2. Open `Pages`.
3. Under `Build and deployment`, set `Source` to `GitHub Actions`.

After that, future prototype changes should deploy automatically. No local software or local copy of the repository is required to review the wireframe.

If a deployment fails, inspect the GitHub Actions run before changing prototype code. A Pages configuration failure is not a prototype failure.
