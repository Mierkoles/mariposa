# PICKUP

**What this is:** Mariposa, a daily Spanish reader. English story, more Spanish each chapter, drills after. See README.

**Where we are (2026-09-11):** Public repo, deployed to GitHub Pages on every push to `main`. Story is **Naufragios**, an adaptation of Cabeza de Vaca's 1542 account; bible written, chapters 1 to 7 drafted (beats 1 to 8), chronicle look done.

**Next action:** review the Spanish in chapters 2 to 7 (a model drafted them, nobody has read them yet), then install on the phone and read a week of it for real. Fix what feels off on the device before writing chapter 8 (beat 9, the Suwannee). Rules and prompt in [docs/CONTENT-GUIDE.md](docs/CONTENT-GUIDE.md); `npm run weave` checks the ramp.

**Then:** commit and push. Chapters 2 to 7 are uncommitted as of this note.

**Already done:**
- Vite + TypeScript PWA, offline capable, installs to a phone home screen
- Weave renderer with tap-to-reveal gloss card and just-in-time notes
- Three drill types: choose, reorder, comprehend
- Word states (new, learning, known) in localStorage
- `docs/STORY.md`: logline, cast, sources, three arcs, 90 beats mapped to weave levels, vocabulary ramp
- Weave ramp is one continuous slope (2026-09-11, ADR-008): Spanish share rises a point per chapter, ten grammar levels of about nine chapters each. `npm run weave` checks every chapter against it.
- `content/chapters/ch01.json` to `ch07.json`: the beach, Sanlúcar, the hurricane, the notary, the march, the first river, Dulchanchellin. All level 1, on the ramp.
- Chronicle look: paper and ink, Spanish in rubric red, EB Garamond, dark mode. Verified at 390px.
- GitHub Pages workflow. MIT for code, CC BY 4.0 for content. Forking notes in README.

**Run locally:** `npm run dev`

**Deeper notes:** `docs/` (PRD, TDD, STORY, CONTENT-GUIDE, DEPLOY, BACKLOG, DECISIONS)
