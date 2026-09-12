# Decisions

Append-only. Supersede with a new entry rather than editing an old one.

## ADR-001: Host on Azure Static Web Apps with platform auth (2026-09-06)

**Context.** The app must not be publicly reachable. It is a personal project, so it cannot live on the Marcus work subscriptions. Mark has a personal Azure account and a personal GitHub account (Mierkoles).

**Options considered.** Cloudflare Pages + Access (free, strong, but a second vendor); Azure Static Web Apps built-in auth (free, one vendor, Mark already knows Azure); Tailscale-only (no internet exposure at all, but no easy sharing and phone needs the client); Container Apps + Easy Auth (full backend, monthly cost, overkill for a static MVP).

**Decision.** Static Web Apps, Free tier, personal subscription. GitHub as the only login provider. Custom role `reader` required on every route; readers added by invitation.

**Consequences.** Zero auth code in the app. Up to 25 invited readers on Free. Preview environments for PRs come for free and inherit the same gate. If a backend is ever needed, SWA managed functions sit behind the same auth. Moving to a different host means rewriting `staticwebapp.config.json`, nothing else.

## ADR-002: Vanilla TypeScript, no framework (2026-09-06)

**Context.** The UI is a handful of screens and a few interactive widgets. Mark's other PWA (ink-notes) is no-build vanilla JS.

**Decision.** Vite + TypeScript with no UI framework. A build step is accepted for type-checking, JSON imports, and the PWA plugin.

**Consequences.** Small bundle (about 12 KB of JS). The `h()` helper in `main.ts` is the whole component model. Revisit if screens start needing shared state beyond `progress`.

## ADR-003: MVP ships fixed chapters, not generated ones (2026-09-06)

**Context.** The full idea is an adaptive weave where each reader's chapter is generated from their word states. That needs a backend, a Claude call per reader per day, and a review step to keep the Spanish correct.

**Decision.** Ship a fixed serialized story with a hand-tuned ramp. Personalization is limited to which words render in Spanish (driven by word state) and which get drilled. Generation is a script that produces drafts for human review, committed as content.

**Consequences.** The app stays static and offline. Content quality is a review problem, not a runtime problem. The adaptive version can be built later without changing the content schema, because word states already drive rendering.

## ADR-004: Progress in localStorage, no accounts (2026-09-06)

**Context.** One reader per device to start.

**Decision.** localStorage under a versioned key. No sync.

**Consequences.** Clearing site data resets progress. Two devices diverge. Export/import is the first fix if this hurts; accounts are the second, and probably never.

## ADR-005: Season one adapts a public domain source rather than an original plot (2026-09-06)

**Context.** The first draft story (a night-desk mystery in a Milwaukee hotel) was chosen for cognate density, had no planned ending, and matched nothing Mark reads. A serial written one day at a time with no destination drifts. The PRD says the story has to be good or the mechanism is worthless.

**Options considered.** Keep the hotel and write a story bible for it; weave a public domain English text verbatim (vocabulary uncontrolled, archaic register, no room for the plot-as-SRS mechanic); retell a public domain plot in our own prose (control every word, plot already proven); use a Spanish-language public domain text as the destination so level 6 lands on real literature.

**Decision.** Retell Cabeza de Vaca's *Relación* (1542) as season one, "Naufragios". Our prose at levels 1 to 5, modernized passages of the original at level 6. First person present, historical facts from the source only, inventions flagged.

**Consequences.** Every chapter has a sourced beat, so the outline is done before the writing starts and the no-fabrication rule is enforceable. Vocabulary ramps through survival domains (body, food, weather, walking) rather than hotel domains. The reader finishes reading a 16th-century Spanish text. Hotel chapter 1 is discarded. A second season would want a `source` field on the chapter schema; not needed yet.

## ADR-006: Chronicle look, with the Spanish rubricated (2026-09-06)

**Context.** The first pass was cream, monarch orange, and Palatino: the default look of a reading app, with an inline gloss that reflowed the paragraph. The story is a 16th-century account written for a king.

**Options considered.** Fix the defects and keep the generic look; an illustrated version with a route map (wants assets that do not exist yet); a manuscript-derived look.

**Decision.** Paper and ink. Spanish words set in rubric red, the way scribes marked what mattered, so the page turns red as the reader learns and the progress is visible in the text itself. EB Garamond for titles and the drop cap, self-hosted so offline still works. Gloss as a floating card that never reflows the prose. Drill feedback in a fixed bottom bar. No framework, one font dependency.

**Consequences.** About 75 KB of fonts in the precache. Chapters gain optional `place` and `date` for the header line. The orange icon no longer matches and needs redrawing (backlog). The route map remains available as a later layer on top of this.

## ADR-007: Public on GitHub Pages, no login gate (2026-09-10). Supersedes ADR-001.

**Context.** ADR-001 chose Azure Static Web Apps with a GitHub-login gate so the site would not be publicly reachable. Provisioning it was the thing standing between the project and its first daily use. Meanwhile the intent changed: the repo is going public under MIT and CC BY so anyone can fork the method, which puts the story in the open regardless of where the site lives.

**What the gate protected.** Nothing on a server. Progress is localStorage in each reader's browser; there is no backend, no account, no PII. The gate protected only the privacy of a hobby project, at the cost of a login on every device, an invite for every friend, and a third vendor or a paid tier for Google login.

**Decision.** Host on GitHub Pages from this repo, built by Actions, with no gate. The repo is public. The Azure workflow and `staticwebapp.config.json` are removed; DEPLOY.md keeps a short note on how to add a gate (Cloudflare Access, or SWA) if a reason appears.

**Triggers to revisit.** Sync or accounts (data on a server), audio (bandwidth), a generation API with a key, or a decision to keep unreviewed Spanish out of public view.

**Consequences.** Zero hosting cost and one vendor. The app is served under `/mariposa/`, so `base` and the manifest scope are set accordingly. The URL is tied to the owner's GitHub handle and is discoverable, which is accepted. The no-auth-code rule in CLAUDE.md stands.

## ADR-008: One continuous weave ramp (2026-09-11). Revises the level scheme in ADR-005.

**Context.** The ramp was six levels tied to the three story arcs, two per arc, with uneven widths (level 3 covered five chapters, level 4 covered twenty-five). Each arc boundary bundled several new grammar features into one chapter; level 5 added full sentences, the preterite, and all-Spanish dialogue at once. A reader would feel three staircases rather than one slope. Mark asked for a gradual curve.

**Options considered.** Keep six levels and even out the widths; keep the levels and add a per-chapter share target; replace the levels with a finer ladder plus a share target.

**Decision.** Two dials, both moving every chapter. The share of Spanish words in the prose rises one point per chapter (target 6 + N percent, capped at 95, tolerance three points), which puts chapter 1 at its measured 7 percent and the final chapters at 95. The grammar ladder has ten levels of about nine chapters, each adding one thing. Levels 5 and 8 start where the story motivates them (verbs with the trading years, the preterite with the walk); the rest are spaced evenly. Arcs are story structure only and the weave does not step at their boundaries.

**Consequences.** `level` is now 1 to 10; chapter 1 is unchanged. STORY.md carries a level marker on the beat where each level begins. `npm run weave` reports every chapter's share and level against the ramp and fails on a miss. The slope assumes ninety chapters; if the season shortens, re-derive it so the last chapter still lands at 95.
