# TrustCheck

A mobile-first “Should I trust this?” assistant that explains why a message, link, QR code, or screenshot may be suspicious and what to do next. HCI group project.

- **Spec:** [spec/TrustCheck_Mobile_HCI_Spec.md](spec/TrustCheck_Mobile_HCI_Spec.md)
- **Portfolio:** `/` (desktop-friendly presentation site)
- **Prototype:** `/prototype` (phone-framed interactive prototype)
- **Live site:** https://jacobthree.github.io/TrustCheck/

## Run it

```bash
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run typecheck`, `npm run preview`.

`npm run screenshots` captures 30 screens at 390 × 844 into `docs/screenshots/` and lays them out as a 5 × 6 [grid](docs/screenshots/grid.png). It drives your installed Google Chrome; edit the `shots` list in [scripts/screenshots.mjs](scripts/screenshots.mjs) to change which screens appear.

## How it's organized

| Path | What's there |
|---|---|
| `src/app/` | Router (route map from spec §26, annotated with screen IDs S01–S34) and in-memory prototype state |
| `src/components/` | Reusable components from spec §18 |
| `src/features/` | Screens grouped by workflow: onboarding, checks, results, history, learn, settings |
| `src/data/` | Mock scenarios (spec §21), lessons, and all risk/error copy (spec §10, §22) |
| `src/pages/` | Portfolio page and prototype layouts |
| `src/types/` | Domain types (spec §11, §14) |

Analysis is simulated: `src/features/checks/mockAnalyze.ts` matches input text to a fixture in `src/data/scenarios.ts`. Every input screen has a **Use an example** option that triggers the demo scenario for that workflow. To demo the error states, pick **Use a blurry example** on the screenshot screen (E-03), or turn on **Settings → Simulate a failed check** (E-04).

History and settings are kept in memory and reset on page reload.

## Deployment

Every push to `main` builds and deploys to GitHub Pages via [.github/workflows/deploy.yml](.github/workflows/deploy.yml). You can also run it manually from the Actions tab.

The workflow builds with `BASE_PATH=/TrustCheck/` so assets and routes live under the repo path, and copies `index.html` to `404.html` so deep links such as `/TrustCheck/prototype/home` load the app instead of a GitHub 404. Local `npm run dev` still serves from `/`.
