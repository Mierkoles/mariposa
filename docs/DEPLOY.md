# Deploying Mariposa

Target: GitHub Pages, from this repo, built by GitHub Actions. Free, no accounts beyond GitHub, no login gate. The site is public at `https://<owner>.github.io/mariposa/`.

There is nothing on the server worth protecting. Progress lives in each reader's own browser; nobody sees anyone else's. The story is in the repo under CC BY anyway.

## One-time setup

1. The repo must be public (GitHub Pages on a free personal account requires it).
2. Settings → Pages → Source: **GitHub Actions**. CLI equivalent:

   ```powershell
   gh api -X POST repos/<owner>/mariposa/pages -f build_type=workflow
   ```

3. Push to `main`. `.github/workflows/pages.yml` runs `npm ci`, `npm run build`, and publishes `dist/`.

## Base path

The app is served under `/mariposa/`, so `vite.config.ts` sets `base` and the PWA manifest `scope` and `start_url` to match. If you host at a domain root (custom domain, or a different host), set `base` to `/`.

## Custom domain (optional)

Settings → Pages → Custom domain, add a CNAME at your DNS provider, and set `base` to `/`. GitHub issues the certificate.

## Checking it works

1. Open the site in a private window. The home screen should load with chapter 1.
2. Install to the phone home screen. Turn on airplane mode. The chapter should still open.
3. Reset progress from the footer and confirm the journey line goes back to day 1.

## If you want a login gate later

The app has no auth code and should stay that way; a gate is the host's job. Two options that fit:

- **Cloudflare Pages + Cloudflare Access** (free, up to 50 users). Google login or a one-time PIN by email. Put an Access policy in front of the Pages site.
- **Azure Static Web Apps** (Free tier: GitHub login only; Standard tier adds Google). Add a `staticwebapp.config.json` with `{ "route": "/*", "allowedRoles": ["reader"] }` and invite readers to the `reader` role in the portal. Set `base` to `/`.

ADR-001 and ADR-007 in `DECISIONS.md` have the reasoning.
