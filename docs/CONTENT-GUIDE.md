# Writing a chapter

The Spanish must be correct. Everything else in this guide is secondary to that. When in doubt, use fewer Spanish words and get them right.

## The story so far

Season one is **Naufragios**, an adaptation of Cabeza de Vaca's *Relación* (1542). The story bible, cast, sources, and the full beat outline are in `STORY.md`. Read it first; this table only tracks what has been written.

**Narrator:** Álvar Núñez Cabeza de Vaca, treasurer of the Narváez expedition. First person, present tense.
**Where we are:** May 1528, northern Florida. The column is marching with Dulchanchellin toward Apalachee, guides from the first river walking beside him. A bigger river is ahead. Next beat: 9, the Suwannee.

Keep a running summary here as chapters are added, so the next chapter can be written without rereading everything. Mark anything not in the source `(invented)`.

| Ch | Title | Level | Share | Beat (STORY.md) | New words | Notes |
|---|---|---|---|---|---|---|
| 1 | Cabeza de Vaca | 1 | 7% | 1 | 11 (8 cognates + cabeza, vaca, oro) | Name, treasurer, Narváez's eye, the gold rattle, the argument on the beach. Family legend of the cow skull is the family's own tradition, not the *Relación*. |
| 2 | Cinco barcos | 1 | 8% | 2 | 7 (5 cognates + barco, hombre) | Memory, the night before the march. Sanlúcar 17 June 1527, five ships, six hundred, the commission Río de las Palmas to the cape of Florida, 45 days at Hispaniola, 140 desert. The captain who says the crossing is easy `(invented)`. |
| 3 | La tormenta | 1 | 11% | 3 | 7 (5 cognates + viento, mar) | Two ships sent to Trinidad, CdV ashore, men holding arms against the wind, voices and flutes and bells, a boat in a tree, two bodies, 60 men 20 horses 2 ships, the men ask to winter, Xagua. All from the source. |
| 4 | El notario | 1 | 10% | 4, 5 | 8 (6 cognates + tierra, comida) | Beats 4 and 5 merged; ch01 already carried the refusal line. Possession, Alaniz reads titles and the Requerimiento, Indians sign go away, the council (friar for marching, notary against), both men ask the notary for a testimony. Source throughout. |
| 5 | Hambre | 1 | 13% | 6 | 7 (5 cognates + hambre, arena) | 1 May, 2 lb biscuit and half lb bacon, fifteen days, sand, palmettos, pines split by lightning, no village. Pines sounding like the sea and the Trinidad men waking `(invented)`. |
| 6 | El río | 1 | 11% | 7 | 6 (4 cognates + agua, balsa) | Wide river, strong current, swimming and rafts, one day, up to 200 Indians, five or six taken as guides, half a league to houses and ripe maize. "Soldiers weep at less" `(invented)`. |
| 7 | Dulchanchellin | 1 | 11% | 8 | 6 (4 cognates + piel, ciervo) | Chief carried on a man's back, painted deer hide, reed flutes, many people, enemy of Apalachee, beads and bells for the hide. Colors unread and the guides walking beside him `(invented)`. Ends pointing at the big river (beat 9). |

## The weave ramp

One slope from the first chapter to the last. The ramp does not step at arc boundaries; the arcs are story structure. Two dials move a little every chapter.

### Share

The share of prose words that are Spanish. The target for chapter N is **6 + N percent**, capped at 95. Chapter 1 sits at 7, chapter 30 at 36, chapter 60 at 66, chapters 89 and 90 at 95. Land within three points of target. A chapter more than three points off in either direction gets rewritten.

Count the words inside woven segments (`es`) against all words in `paragraphs`. Drills do not count. `npm run weave` prints every chapter's share against its target and flags misses.

Reach the share by weaving words the reader already knows. The 12-word budget stands, so as the ramp climbs most of the Spanish in a chapter is vocabulary from earlier chapters. Do not add new words to hit the number.

### Level

`level` says what kinds of things may appear in Spanish. Ten levels of about nine chapters each. Each level adds one thing and includes everything below it.

| Level | Chapters | Adds |
|---|---|---|
| 1 | 1 to 9 | Cognate nouns, plus one or two high-value non-cognate nouns |
| 2 | 10 to 18 | Any concrete noun; articles attach (el, la, los, las) |
| 3 | 19 to 27 | Adjectives after nouns; plurals agree (las barcas, los hombres) |
| 4 | 28 to 35 | Fixed phrases (buenos días, no hay agua, un momento); place phrases with a preposition (en la playa, con el gobernador) |
| 5 | 36 to 44 | Present-tense verbs, first person, in short clauses (camino, tengo hambre, duermo en la arena) |
| 6 | 45 to 53 | Third-person present; one line of dialogue fully in Spanish |
| 7 | 54 to 60 | Full sentences of narration in the present; connectives (y, pero, porque, cuando) |
| 8 | 61 to 70 | Preterite for narration; dialogue fully Spanish |
| 9 | 71 to 79 | Paragraphs in Spanish, with English only for genuinely new material |
| 10 | 80 to 90 | Modernized passages of the 1542 text |

Levels 5 and 8 start where the story motivates them: the first verbs arrive with the trading years, the preterite with the walk out of Texas. The rest are spaced evenly.

Do not skip levels. A word that appears woven must have been introduced in this chapter or an earlier one. Track this in the table above and in each chapter's `vocab`.

If the season ends up shorter than ninety chapters (see the open decisions in `STORY.md`), re-derive the slope so the last chapter still lands at 95, and re-space the levels to match.

## Chapter rules

- 250 to 400 words of prose. Three to five minutes to read.
- At most 12 new vocab items. Cognates count as half.
- Every new word appears at least twice in the chapter.
- At least two words from the previous three chapters must reappear (this is the manual SRS until it is automated).
- End on a hook. Put it in the `hook` field as a one-line teaser for tomorrow.
- Five or six drills: two `choose`, two `reorder`, one or two `comprehend`. Every drill uses only words the reader has met.
- `comprehend` questions are in Spanish, use woven segments for vocab, and test the plot, not translation.
- Notes are one line and answer the question a learner would actually ask on first sight (gender, false friend, why the article is missing). No grammar lectures.
- Every chapter advances by at least one beat from the outline in `STORY.md`. Numbers, dates, names, and places come from the source exactly or not at all. Dialogue, interior, and texture are ours; mark inventions in the table above.

## File format

`content/chapters/chNN.json`. See `src/types.ts` for the schema and `ch01.json` for a complete example.

- `id`: `chNN`.
- `vocab[].id`: lowercase, no accents, the lemma (`recepcion`, `problema`). Stable forever.
- Segments: `"plain english"` or `{ "id": "llave", "es": "llave", "en": "key" }`. Put the inflected form for that spot in `es`/`en`; keep capitalization matching the position in the sentence.
- Punctuation stays in the plain strings, outside the woven segment, except where it is part of a reorder token.

Run `npm run build` after adding a chapter. The type-check will catch a malformed file.

## Generation prompt

Use this with Claude when drafting a chapter. Review the Spanish before committing. Do not let the model invent vocab ids; give it the list of existing ids.

```
You are writing chapter {N} of "Naufragios", a serialized adaptation of Cabeza de Vaca's
Relación (1542) used to teach Spanish by the diglot weave method. Prose is English with
Spanish words woven in. First person, present tense, Cabeza de Vaca narrating.

Story so far:
{running summary table from CONTENT-GUIDE.md}

This chapter's beat, from STORY.md:
{paste the numbered beat}

Historical rule: every date, number, name, and place must come from the beat or the
Relación. Do not invent facts. Dialogue and interior are yours; if you add a named
person or an event not in the beat, mark it (invented) in a comment after the JSON.

Weave level for this chapter: {level}. Rules for that level:
{paste the row from the level table}

Target share of Spanish: about {6 + N} percent of the prose words, within three points.
Reach it by weaving words the reader already knows. Do not add vocab to hit the number.

Vocabulary the reader already knows (may be woven freely, use these exact ids):
{list of id: es (en)}

Words that must reappear in this chapter (due for review):
{list}

Write the chapter as JSON matching this TypeScript schema:
{paste Chapter, Segment, VocabEntry, Drill from src/types.ts}

Constraints:
- 250 to 400 words of prose across 4 to 6 paragraphs.
- Introduce at most {K} new vocab items, preferring cognates at low levels.
- Every new word appears at least twice.
- Vocab ids are lowercase lemmas with no accents. Do not reuse an existing id for a different word.
- Segments carry the inflected form for that spot; punctuation stays outside woven segments.
- 5 or 6 drills: two choose, two reorder, one or two comprehend. Drills use only known or newly introduced words.
- comprehend questions are in Spanish and test the plot.
- Notes: one line, only when a learner would actually wonder (gender, false friend, article).
- End on a hook and put a one-line teaser in "hook".
- Advance the story by the beat given. No filler. Do not explain the wonders.

Output only the JSON.
```

After generating: read every Spanish string aloud. Check gender agreement, accents, and that each `en` is what that word means in this sentence, not the dictionary headword.
