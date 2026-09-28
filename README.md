# TrustCheck

A mobile-first “Should I trust this?” assistant that explains why a message, link, QR code, or screenshot may be suspicious and what to do next. HCI group project.

- **Spec:** [spec/TrustCheck_Mobile_HCI_Spec.md](spec/TrustCheck_Mobile_HCI_Spec.md)
- **Portfolio:** `/` (desktop-friendly presentation site)
- **Prototype:** `/prototype` (phone-framed interactive prototype)

## Run it

```bash
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run typecheck`, `npm run preview`.

## How it's organized

| Path | What's there |
|---|---|
| `src/app/` | Router (route map from spec §26, annotated with screen IDs S01–S34) and in-memory prototype state |
| `src/components/` | Reusable components from spec §18 |
| `src/features/` | Screens grouped by workflow: onboarding, checks, results, history, learn, settings |
| `src/data/` | Mock scenarios (spec §21), lessons, and all risk/error copy (spec §10, §22) |
| `src/pages/` | Portfolio page and prototype layouts |
| `src/types/` | Domain types (spec §11, §14) |

Analysis is simulated: `src/features/checks/mockAnalyze.ts` matches input text to a fixture in `src/data/scenarios.ts`. Every input screen has a **Use an example** option that triggers the demo scenario for that workflow.

History and settings are kept in memory and reset on page reload.
