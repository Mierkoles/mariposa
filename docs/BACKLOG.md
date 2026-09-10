# Backlog

Ordered. Top is next.

## Now

- [x] Repo on GitHub, public, deployed to GitHub Pages with no login gate. (2026-09-10, ADR-007)
- [ ] Chapters 2 through 7 against STORY.md beats 2 to 7. A week of content before the first real daily run.
- [ ] Pull the 1542 text from Gutenberg or Cervantes Virtual into `tmp/source/` for reference while writing (not committed).
- [ ] Test on iPhone: install, offline, tap targets on woven words, gloss placement.

## Soon

- [ ] "Today" logic: one chapter per calendar day, not one per open. Reopening the same day should show the current chapter in rewind mode.
- [ ] Review drill: on days with due words, prepend one drill from an earlier chapter.
- [ ] Export/import progress as JSON (poor person's sync).
- [x] Better gloss placement: a floating tooltip under the word instead of inline. (2026-09-06, chronicle restyle)
- [ ] Redraw the icon in the chronicle palette (rubric on paper) as a maskable PNG with full-bleed background. The current orange icon predates the restyle and has rounded corners baked in.

## Later

- [ ] Audio: pre-generated chapter narration with a multilingual neural voice. Listen mode. Shadowing drill with speech recognition.
- [ ] Adaptive weave: per-reader ratio driven by word state, not just chapter level.
- [ ] Generation script: `scripts/generate-chapter.ts` that assembles the prompt from CONTENT-GUIDE.md and the due-word list, calls Claude, writes a draft to `tmp/` for review.
- [ ] Reverse weave: a short daily writing prompt where the reader swaps in the Spanish they know.
- [ ] Season two. Candidates: Bécquer's *Leyendas* (Gothic, mystery left intact), or a Sherlock Holmes retelling. Add a `source` field to the chapter schema when a second season exists.

## Decided against (for now)

- Accounts and server-side sync. Not until a second device actually hurts.
- Streak notifications. See PRD principles.
- A UI framework. Not until the DOM code gets in the way.
