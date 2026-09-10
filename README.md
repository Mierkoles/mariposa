# Mariposa

A Spanish reader that starts in English and turns into Spanish, one short chapter a day.

The story is the lesson. Each chapter weaves a few more Spanish words into the English prose. Tap a word to see what it means. Then five or six quick drills built only from that chapter. Words you keep getting right stay Spanish from then on. Words you keep looking up come back.

The technique is the diglot weave (Robbins Burling, 1968). The daily loop is borrowed from Duolingo. The difference is that every sentence belongs to a plot you want to follow.

Season one is **Naufragios**: Cabeza de Vaca's own account of the Narváez expedition to Florida in 1528 and the eight years it took four survivors to walk out. By the last chapters the reader is reading the 1542 text. The story bible is [docs/STORY.md](docs/STORY.md).

## Status

Alpha. One chapter written. Deploys to GitHub Pages on every push to `main`. See [PICKUP.md](PICKUP.md) for the next step.

## Run it

```powershell
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
npm run preview    # serve dist/
```

## Layout

| Path | What |
|---|---|
| `content/chapters/*.json` | The story. One file per chapter. Schema in `src/types.ts`, authoring rules in `docs/CONTENT-GUIDE.md`. |
| `src/` | The app. Vanilla TypeScript, no framework. `weave.ts` decides English or Spanish per word, `drills.ts` renders exercises, `store.ts` keeps progress in localStorage. |
| `.github/workflows/pages.yml` | Build in Actions, publish `dist/` to GitHub Pages. |
| `docs/` | PRD, technical design, content guide, backlog, decisions. |

## Forking

Take it from here. The app does not care what language or story you use; the chapters are JSON and the method is in `docs/`. To make it yours: change the UI strings in `src/main.ts` and `src/drills.ts`, rename or keep the `es`/`en` fields in `src/types.ts`, write a weave-level ladder for your language in `docs/CONTENT-GUIDE.md`, replace `docs/STORY.md` and `content/chapters/`, and pick your own hosting in `docs/DEPLOY.md`.

One plain warning: nothing here checks that the target language is correct. A model drafted these chapters and a person reviewed them. Do the same, or find someone who reads the language.

## License

Code: MIT ([LICENSE](LICENSE)). Story content under `content/` and `docs/STORY.md`: CC BY 4.0 ([content/LICENSE.md](content/LICENSE.md)). Corrections to the Spanish are welcome.

## Docs

- [docs/PRD.md](docs/PRD.md): what it is and why
- [docs/TDD.md](docs/TDD.md): how it works
- [docs/STORY.md](docs/STORY.md): the story bible, cast, sources, and 90-beat outline
- [docs/CONTENT-GUIDE.md](docs/CONTENT-GUIDE.md): how to write a chapter, including the generation prompt
- [docs/DEPLOY.md](docs/DEPLOY.md): GitHub Pages setup, and how to add a login gate if you want one
- [docs/BACKLOG.md](docs/BACKLOG.md): what is next
- [docs/DECISIONS.md](docs/DECISIONS.md): why it is built this way
