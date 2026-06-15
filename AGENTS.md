# FAREVER PRO

Next.js 15 (App Router) dashboard for game modding/navigation. Single app, not a monorepo. Package manager is **npm** (`package-lock.json`).

## Cursor Cloud specific instructions

### Services
- **Next.js dev server** (the product): `npm run dev` → serves the dashboard at `http://localhost:9005` (port is hardcoded). This is the only service needed to use the app.
- **Genkit dev UI** (optional): `npm run genkit:dev` — local inspector for the AI flow in `src/ai/flows/`. Not needed by the app, which imports the flow directly.
- **Electron desktop shell** (optional): `npm run electron:dev` — wraps the web app in a native window; requires a GUI/display so it does not work headless. Test the web app at port 9005 instead.

### AI feature (Loot Oracle) requires an API key
The `optimizeGatheringRoutes` Genkit flow (`src/ai/flows/optimize-gathering-routes.ts`) calls Google Gemini (`googleai/gemini-2.5-flash`). It needs `GEMINI_API_KEY` (or `GOOGLE_API_KEY`) in the environment. Without it, only the **Loot Oracle** panel errors when invoked — the rest of the dashboard (Coordinate Vault, ESP Config, Mod Engine, Stepped Navigator, Telemetry HUD) works fully without any key. Firebase/Firestore is placeholder-only (dummy key, no `firebase.json`) and is not wired into active features.

### Lint / typecheck / build caveats
- There is **no lint script and no test suite** in this repo.
- `npm run typecheck` (`tsc --noEmit`) reports **pre-existing** errors in `src/components/ui/calendar.tsx` (a shadcn/react-day-picker version mismatch). These are unrelated to app functionality.
- `next.config.ts` sets `typescript.ignoreBuildErrors: true` and `eslint.ignoreDuringBuilds: true`, so `npm run build` succeeds despite the typecheck errors.
