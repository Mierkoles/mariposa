# PICKUP

**What this is:** Mariposa, a daily Spanish reader. English story, more Spanish each chapter, drills after. See README.

**Where we are (2026-09-10):** Public repo, deployed to GitHub Pages on every push to `main`. Story is **Naufragios**, an adaptation of Cabeza de Vaca's 1542 account; bible written, chapter 1 done, chronicle look done.

**Next action:** chapters 2 through 7 against beats 2 to 7 in [docs/STORY.md](docs/STORY.md), so there is a week of content before the first real daily run. Rules and prompt in [docs/CONTENT-GUIDE.md](docs/CONTENT-GUIDE.md).

**Then:** install it on the phone and read chapter 1 for real. Fix what feels off on the device before writing chapter 8.

**Already done:**
- Vite + TypeScript PWA, offline capable, installs to a phone home screen
- Weave renderer with tap-to-reveal gloss card and just-in-time notes
- Three drill types: choose, reorder, comprehend
- Word states (new, learning, known) in localStorage
- `docs/STORY.md`: logline, cast, sources, three arcs, 90 beats mapped to weave levels, vocabulary ramp
- `content/chapters/ch01.json`: "Cabeza de Vaca", the beach in Florida, April 1528
- Chronicle look: paper and ink, Spanish in rubric red, EB Garamond, dark mode. Verified at 390px.
- GitHub Pages workflow. MIT for code, CC BY 4.0 for content. Forking notes in README.

**Run locally:** `npm run dev`

**Deeper notes:** `docs/` (PRD, TDD, STORY, CONTENT-GUIDE, DEPLOY, BACKLOG, DECISIONS)
