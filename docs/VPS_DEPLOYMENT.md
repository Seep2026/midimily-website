# VPS deployment checklist

The production VPS can build the current site from this repository alone. PageAgent runtime code is vendored under `src/vendor/page-agent`, so the VPS does not need a sibling `../page-agent` checkout.

## Required server files

Keep these environment variables on the VPS, preferably in `.env.production` in the project directory:

```bash
VITE_AI_NAVIGATOR_BASE_URL=https://tokenfleet.cn/v1
VITE_AI_NAVIGATOR_API_KEY=replace-with-production-key
VITE_AI_NAVIGATOR_MODEL=glm-5.1
```

Do not commit real API keys.

## Deploy command

From the repository directory on the VPS:

```bash
./scripts/deploy-vps.sh --branch main
```

The script does the following:

1. `git fetch` and fast-forward update the selected branch.
2. Reset generated `public/solutions/**/slidev` artifacts from the previous build.
3. Load `.env.production` or `.env.local`.
4. Verify the AI navigator environment variables.
5. Run `npm ci` from `package-lock.json`.
6. Rebuild all decks with `npm run deck:build:all`.
7. Build the website with `npm run build`.
8. Reload nginx when systemd reports nginx is active.

## Why npm only

This project uses `package-lock.json` as the production lockfile. The deploy script intentionally uses `npm ci` even if pnpm is installed, so production builds do not depend on a stale `pnpm-lock.yaml`.

## Build notes

Vite may print a warning about `eval` inside vendored PageAgent `PageController.ts`. The Midimily integration disables PageAgent's JavaScript execution tool, and the warning does not block production builds.
