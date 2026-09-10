# Mariposa: technical design

## Shape

A static progressive web app. No backend. Content is JSON bundled into the build. Progress lives in localStorage. There is no auth; if a gate is ever wanted it belongs to the hosting platform, not the app.

```
content/chapters/*.json  --import.meta.glob-->  src/content.ts
                                                   |
src/main.ts (screens) --> src/weave.ts (prose)  ---+
                      --> src/drills.ts (exercises)
                      --> src/store.ts (progress, localStorage)
```

## Stack

- Vite 8, TypeScript 6, no UI framework. DOM built with a tiny `h()` helper in `main.ts`.
- `vite-plugin-pwa` generates the manifest and a Workbox service worker. Because content is bundled, the precache is a complete offline copy of the app.
- GitHub Pages for hosting. GitHub Actions builds `dist/` and publishes it.

## Content model

See `src/types.ts` and `docs/CONTENT-GUIDE.md`.

- `Chapter` has `vocab` (words introduced here), `paragraphs` (arrays of `Segment`), `drills`, and an optional `hook`.
- A `Segment` is either a plain string or `{ id, es, en }`. The renderer picks `es` or `en` per reader.
- `VocabEntry.id` is the stable lemma. Inflected forms live on each segment so "la vaca" and "las vacas" share one id.
- Chapters are discovered by glob and sorted by `number`. Adding a chapter is adding a file.

## Weave rules (`src/weave.ts`)

`showSpanish(progress, chapter, id)`:

1. If `id` is in the current chapter's `vocab`, Spanish. The chapter is teaching it.
2. Otherwise Spanish if the reader's state for `id` is not `new`.

Woven words render as `<button class="w">`. Tap toggles a gloss with the English; the first tap also shows the vocab note. Each tap records a lookup, which resets the word's streak and demotes known to learning.

## Word states (`src/store.ts`)

| State | Enter when |
|---|---|
| new | never seen |
| learning | chapter containing the word is opened; or a miss/lookup on a known word |
| known | three consecutive correct drill answers with no lookup in between |

Stored as `mariposa.progress.v1` in localStorage:

```ts
{ completed: { [chapterId]: isoDate }, words: { [vocabId]: { state, lookups, streak, firstSeen, lastSeen } } }
```

This is deliberately simpler than FSRS. When chapters become adaptive, the scheduler will read `lastSeen`, `streak`, and `lookups` to produce a "must include" list for the next chapter. That is the seam where an SRS algorithm plugs in.

## Drills (`src/drills.ts`)

| Type | Input | Grades | Updates word state |
|---|---|---|---|
| choose | prompt with `___`, four options | index match | `vocab` id |
| reorder | tokens, English hint | joined tokens match | optional `vocab` |
| comprehend | Spanish question, options | index match | none (it tests plot, not a word) |

Every drill is authored per chapter, not generated at runtime. That keeps the app free of language logic and keeps quality in the content review step.

## Look (`src/style.css`)

The chronicle. Paper and ink, with the Spanish words rubricated (set in red) the way a scribe marked what mattered, so the page visibly turns red as the reader learns. Tokens live on `:root` with a `prefers-color-scheme: dark` override.

- Display face: EB Garamond (500, 500 italic, 600), self-hosted from `@fontsource/eb-garamond` so it is in the precache and works offline. About 75 KB of woff2. Body text stays on the system serif stack (Iowan Old Style on iOS).
- Small-caps eyebrows use the font's real small caps via `font-variant-caps`.
- Chapter header: eyebrow "Capítulo I · place, date" (from the optional `place` and `date` fields), title, a hairline rule with a hedera (❦), drop cap on the first paragraph.
- Woven words: rubric red. New this chapter adds a hairline underline; known drops to ink.
- Gloss: a floating card appended to `body`, positioned in document coordinates under the tapped word and clamped to the viewport, so the prose never reflows. One open at a time; any tap elsewhere closes it; `closeGloss()` runs on every screen change.
- Drill feedback: a bar fixed to the bottom of the viewport (safe-area aware) so the option tiles stay where they were tapped. Correct fills verdigris, wrong outlines rubric.
- Home: season title, a journey line ("Día N de 90 · place") with a hairline that fills as chapters complete, today's card, rewind list with completion dates.

## Screens (`src/main.ts`)

home → read → drills (one per screen) → finish → home. Rewind opens a completed chapter in read mode with no drills. The whole app is one `<main>` replaced per screen; no router, no URL state. Add a router when there is a second entry point worth linking to.

## Hosting

GitHub Pages, no login gate (ADR-007). The app has one screen at one URL and no router, so there is no SPA fallback to configure. `base` in `vite.config.ts` is `/mariposa/` to match the Pages path, and the PWA manifest `scope` and `start_url` use the same value.

## Build and deploy

`npm run build` runs `tsc` then `vite build`. `.github/workflows/pages.yml` runs that on Ubuntu with Node 22 and publishes `dist/` through `actions/deploy-pages`, so what ships is exactly what CI built.

## Later

- Audio: pre-generate per-chapter MP3 with a multilingual neural voice (Azure Speech), store under `public/audio/`, add a listen mode and a shadowing drill.
- Adaptive chapters: a generation script (Claude API) that takes the reader's due-word list and a plot outline and writes the next chapter under constraints; human review before it lands in `content/`.
- Sync: if a second device matters, the smallest fix is export/import of the progress JSON. Accounts come after that, if ever.
