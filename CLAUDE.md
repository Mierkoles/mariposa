# Mariposa (repo instructions)

A daily Spanish reader built on the diglot weave. Personal project, no backend. Anyone may fork it; see the README. Account-specific notes for the maintainer live in `CLAUDE.local.md`, which is not committed.

## Read first
- `PICKUP.md` for current state and next action.
- `docs/STORY.md` before writing or editing any chapter. It is the story bible for season one (Naufragios, Cabeza de Vaca). Facts come from the source; do not invent dates, numbers, names, or places.
- `docs/CONTENT-GUIDE.md` before writing or editing any chapter. The Spanish must be correct; that is the product.

## Conventions
- Vanilla TypeScript, no framework. Keep it that way until there is a reason not to.
- Content lives in `content/chapters/chNN.json`. Never inline story text in `src/`.
- Vocab ids are stable lemmas (`problema`, not `problemas`). The inflected form for an occurrence goes in the segment's `es`/`en`.
- A chapter introduces at most 12 new words. Cognates are cheap; non-cognates cost more, budget accordingly.
- Progress schema key is `mariposa.progress.v1`. Bump the version and migrate if the shape changes.
- `npm run build` must pass (it type-checks) before a commit.
- Prose in docs and chapters: plain and concrete. No em dashes. No "not X, but Y" constructions. No decorative triads. State the fact or cut it.

## Do not
- Do not add a backend, auth code, or analytics to the app. If the site is ever gated, that is the hosting platform's job (see `docs/DEPLOY.md`).
- Do not commit `tmp/`, `CLAUDE.local.md`, or any credential.
